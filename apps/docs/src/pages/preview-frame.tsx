import React, { useState, useEffect, useRef, useCallback } from "react";
import Head from "@docusaurus/Head";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { SWAPPSThemeProvider } from "@swapps/ui";
import type { SWAPPSThemeConfig } from "@swapps/ui";
import { DEFAULT_THEME_CONFIG } from "@swapps/ui";
import AppHeaderRenderer from "./renderers/AppHeaderRenderer";

type RendererComponent = React.ComponentType<Record<string, unknown>>;

const RENDERERS: Record<string, RendererComponent> = {
  AppHeader: AppHeaderRenderer as RendererComponent,
};

interface PreviewMessage {
  type: "preview-update";
  component: string;
  props: Record<string, unknown>;
  config: SWAPPSThemeConfig;
}

export default function PreviewFrame() {
  const [component, setComponent] = useState<string | null>(null);
  const [props, setProps] = useState<Record<string, unknown>>({});
  const [config, setConfig] = useState<SWAPPSThemeConfig>(DEFAULT_THEME_CONFIG);
  const contentRef = useRef<HTMLDivElement>(null);
  const readyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const carbonCssUrl = useBaseUrl("/carbon-iframe.css");

  const sendHeight = useCallback(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      window.parent.postMessage({ type: "preview-resize", height }, "*");
    }
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data as PreviewMessage;
      if (data?.type !== "preview-update") return;
      setComponent(data.component);
      setProps(data.props ?? {});
      if (data.config) setConfig(data.config);
    }
    window.addEventListener("message", handleMessage);

    readyIntervalRef.current = setInterval(() => {
      window.parent.postMessage({ type: "preview-ready" }, "*");
    }, 100);

    return () => {
      window.removeEventListener("message", handleMessage);
      if (readyIntervalRef.current) clearInterval(readyIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (component && readyIntervalRef.current) {
      clearInterval(readyIntervalRef.current);
      readyIntervalRef.current = null;
    }
  }, [component]);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(sendHeight);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [sendHeight]);

  useEffect(sendHeight, [component, props, config, sendHeight]);

  const Renderer = component ? RENDERERS[component] : null;

  return (
    <>
      <Head>
        <link rel="stylesheet" href={carbonCssUrl} />
        <style>{`
          /* Hide Docusaurus chrome — navbar, footer, sidebar —
             but keep .main-wrapper visible since our content is inside it. */
          html, body, #__docusaurus {
            margin: 0;
            padding: 0;
            background: transparent;
          }
          .navbar, .footer {
            display: none !important;
          }
          .main-wrapper {
            padding: 0 !important;
            margin: 0 !important;
          }
          /* Docusaurus wraps pages in a container */
          .main-wrapper > .container,
          .main-wrapper > div {
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
          }
        `}</style>
      </Head>
      <div ref={contentRef}>
        <SWAPPSThemeProvider config={config}>
          {Renderer ? <Renderer {...props} /> : null}
        </SWAPPSThemeProvider>
      </div>
    </>
  );
}
