import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppHeader } from "./AppHeader";

describe("AppHeader", () => {
  it("renders the application title", () => {
    render(<AppHeader appTitle="My App" />);
    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("renders the organization prefix when provided", () => {
    render(<AppHeader appTitle="My App" orgName="SLAC" />);
    expect(screen.getByText("[SLAC]")).toBeInTheDocument();
  });

  it("does not render an org prefix when orgName is omitted", () => {
    render(<AppHeader appTitle="My App" />);
    expect(screen.queryByText(/\[.*\]/)).not.toBeInTheDocument();
  });

  it("renders navigation items", () => {
    const navItems = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings" },
    ];
    render(<AppHeader appTitle="My App" navItems={navItems} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders with no navigation when navItems is empty", () => {
    render(<AppHeader appTitle="My App" navItems={[]} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("includes a skip-to-content link", () => {
    render(<AppHeader appTitle="My App" />);
    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
  });

  it("supports a custom skip-to-content label", () => {
    render(
      <AppHeader appTitle="My App" skipToContentLabel="Aller au contenu" />
    );
    expect(screen.getByText("Aller au contenu")).toBeInTheDocument();
  });

  it("sets an accessible aria-label on the header", () => {
    render(<AppHeader appTitle="My App" orgName="SLAC" />);
    expect(screen.getByRole("banner")).toHaveAttribute(
      "aria-label",
      "SLAC My App"
    );
  });

  it("allows overriding aria-label", () => {
    render(
      <AppHeader appTitle="My App" aria-label="Custom header label" />
    );
    expect(screen.getByRole("banner")).toHaveAttribute(
      "aria-label",
      "Custom header label"
    );
  });

  it("renders a custom logo element", () => {
    render(
      <AppHeader
        appTitle="My App"
        logo={<img src="/logo.svg" alt="Logo" />}
      />
    );
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });
});
