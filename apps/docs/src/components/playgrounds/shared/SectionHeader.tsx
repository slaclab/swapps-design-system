import React from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
  first?: boolean;
}

export default function SectionHeader({ children, first }: SectionHeaderProps) {
  return (
    <h4
      style={{
        margin: first ? "0 0 0.75rem" : "1rem 0 0.75rem",
        fontSize: "0.8125rem",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        color: "var(--ifm-color-emphasis-600)",
        width: "100%",
      }}
    >
      {children}
    </h4>
  );
}
