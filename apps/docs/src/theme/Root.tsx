import React from "react";
import { PreviewConfigProvider } from "../contexts/PreviewConfigContext";

export default function Root({ children }: { children: React.ReactNode }) {
  return <PreviewConfigProvider>{children}</PreviewConfigProvider>;
}
