import React, { useState, useEffect, useRef, useCallback } from "react";

export interface EmbeddedDisplayProps {
  src: string;
  macros?: Record<string, string>;
  width?: number | string;
  height?: number | string;
  overflow?: "visible" | "hidden" | "scroll";
  loading?: "lazy" | "eager" | "manual";
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

type LoadState = "idle" | "loading" | "loaded" | "error";

export function EmbeddedDisplay({
  src,
  macros = {},
  width = "100%",
  height = "auto",
  overflow = "visible",
  loading = "lazy",
  fallback,
  onLoad,
  onError,
  className,
}: EmbeddedDisplayProps) {
  const [state, setState] = useState<LoadState>(
    loading === "eager" ? "loading" : "idle"
  );
  const [Component, setComponent] = useState<React.ComponentType<Record<string, string>> | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const doLoad = useCallback(async () => {
    setState("loading");
    try {
      const mod = await import(/* @vite-ignore */ src);
      const Comp = mod.default ?? mod[Object.keys(mod)[0]];
      if (typeof Comp !== "function") {
        throw new Error(`Module at "${src}" does not export a React component.`);
      }
      setComponent(() => Comp);
      setState("loaded");
      onLoad?.();
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      setState("error");
      onError?.(e);
    }
  }, [src, onLoad, onError]);

  useEffect(() => {
    if (loading === "eager") {
      doLoad();
    }
  }, [loading, doLoad]);

  useEffect(() => {
    if (loading !== "lazy" || state !== "idle") return;
    const el = containerRef.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observerRef.current?.disconnect();
          doLoad();
        }
      },
      { rootMargin: "200px" }
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [loading, state, doLoad]);

  return (
    <div
      ref={containerRef}
      className={`swapps-embedded-display ${className ?? ""}`}
      style={{
        width,
        height,
        overflow,
        position: "relative",
        minHeight: state === "idle" || state === "loading" ? 60 : undefined,
      }}
    >
      {state === "loading" &&
        (fallback ?? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              opacity: 0.5,
              fontSize: "0.875rem",
            }}
          >
            Loading display…
          </div>
        ))}

      {state === "error" && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            fontSize: "0.875rem",
            border: "1px solid #da1e28",
            borderRadius: "4px",
            backgroundColor: "#fff1f1",
            color: "#da1e28",
          }}
        >
          <strong>Failed to load display</strong>
          <br />
          <code style={{ fontSize: "0.8rem" }}>{src}</code>
          {error && (
            <>
              <br />
              <span style={{ opacity: 0.7 }}>{error.message}</span>
            </>
          )}
        </div>
      )}

      {state === "loaded" && Component && <Component {...macros} />}

      {state === "idle" && loading === "manual" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            opacity: 0.4,
            fontSize: "0.875rem",
          }}
        >
          Display not loaded.
        </div>
      )}
    </div>
  );
}
