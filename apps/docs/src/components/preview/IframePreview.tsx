import React, { useRef, useState, useEffect, useCallback } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePreviewConfig } from "../../contexts/PreviewConfigContext";
import type { PreviewCategory } from "./ComponentPreview";

interface IframePreviewProps {
  component: string;
  props: Record<string, unknown>;
  label?: string;
  category?: PreviewCategory;
}

export default function IframePreview({
  component,
  props,
  label,
  category = "ui",
}: IframePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(48);
  const [ready, setReady] = useState(false);
  const { previewConfig } = usePreviewConfig();
  const frameSrc = useBaseUrl("/preview-frame");

  const buildConfig = useCallback(() => {
    return category === "ui"
      ? previewConfig
      : { ...previewConfig, branding: { organizationName: "" } };
  }, [previewConfig, category]);

  // Send updates to iframe whenever props, config, or ready state changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow || !ready) return;
    iframe.contentWindow.postMessage(
      {
        type: "preview-update",
        component,
        props,
        config: buildConfig(),
      },
      "*"
    );
  }, [component, props, ready, buildConfig]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "preview-ready") {
        setReady(true);
      }
      if (event.data?.type === "preview-resize") {
        const h = event.data.height;
        if (typeof h === "number" && h > 0) {
          setHeight(h);
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="swapps-preview">
      {label && <div className="swapps-preview__header">{label}</div>}
      <div className="swapps-preview__content">
        <iframe
          ref={iframeRef}
          src={frameSrc}
          title={`${component} preview`}
          style={{
            border: "none",
            width: "100%",
            height,
            display: "block",
            overflow: "hidden",
          }}
        />
      </div>
    </div>
  );
}
