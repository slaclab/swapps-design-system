import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders the header with appTitle", () => {
    render(<AppShell appTitle="My App">Content</AppShell>);
    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("renders the header with orgName", () => {
    render(
      <AppShell appTitle="My App" orgName="SLAC">
        Content
      </AppShell>
    );
    expect(screen.getByText("[SLAC]")).toBeInTheDocument();
  });

  it("renders children in the content area", () => {
    render(<AppShell appTitle="My App">Main content here</AppShell>);
    expect(screen.getByText("Main content here")).toBeInTheDocument();
  });

  it("applies custom className to root element", () => {
    const { container } = render(
      <AppShell appTitle="My App" className="custom-class">
        Content
      </AppShell>
    );
    expect(container.querySelector(".swapps-app-shell")).toHaveClass(
      "custom-class"
    );
  });
});

describe("AppShell left panel", () => {
  it("renders the left panel when provided", () => {
    render(
      <AppShell appTitle="My App" leftPanel={<div>Filter controls</div>}>
        Content
      </AppShell>
    );
    expect(screen.getByText("Filter controls")).toBeInTheDocument();
  });

  it("does not render the left panel when omitted", () => {
    const { container } = render(
      <AppShell appTitle="My App">Content</AppShell>
    );
    expect(
      container.querySelector(".swapps-app-shell__left-panel")
    ).not.toBeInTheDocument();
  });

  it("applies default width to the left panel", () => {
    const { container } = render(
      <AppShell appTitle="My App" leftPanel={<div>Filters</div>}>
        Content
      </AppShell>
    );
    const panel = container.querySelector(".swapps-app-shell__left-panel");
    expect(panel).toHaveStyle({ width: "256px" });
  });

  it("applies custom width to the left panel", () => {
    const { container } = render(
      <AppShell
        appTitle="My App"
        leftPanel={<div>Filters</div>}
        leftPanelWidth={320}
      >
        Content
      </AppShell>
    );
    const panel = container.querySelector(".swapps-app-shell__left-panel");
    expect(panel).toHaveStyle({ width: "320px" });
  });
});

describe("AppShell right panel", () => {
  it("renders the right panel when provided", () => {
    render(
      <AppShell appTitle="My App" rightPanel={<div>Properties</div>}>
        Content
      </AppShell>
    );
    expect(screen.getByText("Properties")).toBeInTheDocument();
  });

  it("does not render the right panel when omitted", () => {
    const { container } = render(
      <AppShell appTitle="My App">Content</AppShell>
    );
    expect(
      container.querySelector(".swapps-app-shell__right-panel")
    ).not.toBeInTheDocument();
  });

  it("applies custom width to the right panel", () => {
    const { container } = render(
      <AppShell
        appTitle="My App"
        rightPanel={<div>Properties</div>}
        rightPanelWidth={280}
      >
        Content
      </AppShell>
    );
    const panel = container.querySelector(".swapps-app-shell__right-panel");
    expect(panel).toHaveStyle({ width: "280px" });
  });
});

describe("AppShell bottom panel", () => {
  it("renders the bottom panel when provided", () => {
    render(
      <AppShell appTitle="My App" bottomPanel={<div>Code preview</div>}>
        Content
      </AppShell>
    );
    expect(screen.getByText("Code preview")).toBeInTheDocument();
  });

  it("does not render the bottom panel when omitted", () => {
    const { container } = render(
      <AppShell appTitle="My App">Content</AppShell>
    );
    expect(
      container.querySelector(".swapps-app-shell__bottom-panel")
    ).not.toBeInTheDocument();
  });

  it("applies default height to the bottom panel", () => {
    const { container } = render(
      <AppShell appTitle="My App" bottomPanel={<div>Code</div>}>
        Content
      </AppShell>
    );
    const panel = container.querySelector(".swapps-app-shell__bottom-panel");
    expect(panel).toHaveStyle({ height: "200px" });
  });

  it("applies custom height to the bottom panel", () => {
    const { container } = render(
      <AppShell
        appTitle="My App"
        bottomPanel={<div>Code</div>}
        bottomPanelHeight={150}
      >
        Content
      </AppShell>
    );
    const panel = container.querySelector(".swapps-app-shell__bottom-panel");
    expect(panel).toHaveStyle({ height: "150px" });
  });
});

describe("AppShell header props forwarding", () => {
  it("forwards navigation items to AppHeader", () => {
    render(
      <AppShell
        appTitle="My App"
        navigation={[
          { label: "Home", href: "/" },
          { label: "Data", href: "/data" },
        ]}
      >
        Content
      </AppShell>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
  });

  it("forwards headerProps to AppHeader", () => {
    render(
      <AppShell
        appTitle="My App"
        headerProps={{ search: <input placeholder="Search..." /> }}
      >
        Content
      </AppShell>
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});

describe("AppShell full layout", () => {
  it("renders all panels and content together", () => {
    const { container } = render(
      <AppShell
        orgName="SLAC"
        appTitle="Screen Builder"
        navigation={[{ label: "Home", href: "/" }]}
        leftPanel={<div>Assets</div>}
        leftPanelWidth={120}
        rightPanel={<div>Inspector</div>}
        rightPanelWidth={140}
        bottomPanel={<div>Code</div>}
        bottomPanelHeight={80}
      >
        Canvas
      </AppShell>
    );
    expect(screen.getByText("[SLAC]")).toBeInTheDocument();
    expect(screen.getByText("Screen Builder")).toBeInTheDocument();
    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("Inspector")).toBeInTheDocument();
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Canvas")).toBeInTheDocument();
    expect(
      container.querySelector(".swapps-app-shell__left-panel")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".swapps-app-shell__right-panel")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".swapps-app-shell__bottom-panel")
    ).toBeInTheDocument();
  });
});
