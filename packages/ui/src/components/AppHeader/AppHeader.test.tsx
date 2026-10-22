import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AppHeader } from "./AppHeader";
import { SWAPPSThemeProvider } from "../../theme";
import type { SWAPPSThemeConfig } from "../../theme";

function StatefulThemeProvider({
  initial,
  children,
}: {
  initial: SWAPPSThemeConfig;
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState(initial);
  return (
    <SWAPPSThemeProvider config={config} onConfigChange={setConfig}>
      {children}
    </SWAPPSThemeProvider>
  );
}

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

describe("AppHeader navigation", () => {
  it("renders navigation items", () => {
    const navigation = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings" },
    ];
    render(<AppHeader appTitle="My App" navigation={navigation} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders with no navigation when navigation is empty", () => {
    render(<AppHeader appTitle="My App" navigation={[]} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});

describe("AppHeader search", () => {
  it("renders a search slot when provided", () => {
    render(
      <AppHeader
        appTitle="My App"
        search={<input data-testid="search-input" placeholder="Search..." />}
      />
    );
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("does not render search container when search is not provided", () => {
    const { container } = render(<AppHeader appTitle="My App" />);
    expect(
      container.querySelector(".swapps-header__search")
    ).not.toBeInTheDocument();
  });
});

describe("AppHeader admin", () => {
  it("renders admin button when admin is configured", () => {
    render(
      <AppHeader
        appTitle="My App"
        admin={{ href: "/admin" }}
      />
    );
    expect(screen.getByLabelText("Admin")).toBeInTheDocument();
  });

  it("renders admin with custom label", () => {
    render(
      <AppHeader
        appTitle="My App"
        admin={{ href: "/admin", label: "Administration" }}
      />
    );
    expect(screen.getByLabelText("Administration")).toBeInTheDocument();
  });

  it("hides admin when visible is false", () => {
    render(
      <AppHeader
        appTitle="My App"
        admin={{ href: "/admin", visible: false }}
      />
    );
    expect(screen.queryByLabelText("Admin")).not.toBeInTheDocument();
  });
});

describe("AppHeader actions", () => {
  it("renders action items with aria-labels", () => {
    render(
      <AppHeader
        appTitle="My App"
        actions={[
          { label: "Drafts", href: "/drafts" },
          { label: "New Entry", href: "/new" },
        ]}
      />
    );
    expect(screen.getByLabelText("Drafts")).toBeInTheDocument();
    expect(screen.getByLabelText("New Entry")).toBeInTheDocument();
  });

  it("renders action labels as visible text inside the button", () => {
    render(
      <AppHeader
        appTitle="My App"
        actions={[{ label: "New Entry", href: "/new" }]}
      />
    );
    const button = screen.getByLabelText("New Entry");
    expect(button.querySelector(".swapps-header__action-label")).toHaveTextContent(
      "New Entry"
    );
  });

  it("calls onClick for action items", () => {
    const handler = vi.fn();
    render(
      <AppHeader
        appTitle="My App"
        actions={[{ label: "Create", onClick: handler }]}
      />
    );
    fireEvent.click(screen.getByLabelText("Create"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("applies primary class to primary actions", () => {
    render(
      <AppHeader
        appTitle="My App"
        actions={[{ label: "New Entry", href: "/new", primary: true }]}
      />
    );
    expect(screen.getByLabelText("New Entry")).toHaveClass(
      "swapps-header__action--primary"
    );
  });
});

describe("AppHeader utilities", () => {
  it("renders theme toggle when enabled", () => {
    render(
      <StatefulThemeProvider initial={{ appearance: "light", branding: { organizationName: "" } }}>
        <AppHeader appTitle="My App" utilities={{ themeToggle: true }} />
      </StatefulThemeProvider>
    );
    expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
  });

  it("toggles theme on click", () => {
    render(
      <StatefulThemeProvider initial={{ appearance: "light", branding: { organizationName: "" } }}>
        <AppHeader appTitle="My App" utilities={{ themeToggle: true }} />
      </StatefulThemeProvider>
    );
    fireEvent.click(screen.getByLabelText("Switch to dark mode"));
    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
  });

  it("renders report bug button", () => {
    const handler = vi.fn();
    render(
      <AppHeader
        appTitle="My App"
        utilities={{ reportBug: { onClick: handler } }}
      />
    );
    expect(screen.getByLabelText("Report a bug")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Report a bug"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("renders help button", () => {
    const handler = vi.fn();
    render(
      <AppHeader
        appTitle="My App"
        utilities={{ help: { onClick: handler } }}
      />
    );
    expect(screen.getByLabelText("Help")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Help"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("renders account button", () => {
    const handler = vi.fn();
    render(
      <AppHeader
        appTitle="My App"
        utilities={{ account: { onClick: handler } }}
      />
    );
    expect(screen.getByLabelText("Account")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Account"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("renders custom labels for utility buttons", () => {
    render(
      <AppHeader
        appTitle="My App"
        utilities={{
          reportBug: { onClick: () => {}, label: "File an issue" },
          help: { onClick: () => {}, label: "Documentation" },
          account: { onClick: () => {}, label: "User profile" },
        }}
      />
    );
    expect(screen.getByLabelText("File an issue")).toBeInTheDocument();
    expect(screen.getByLabelText("Documentation")).toBeInTheDocument();
    expect(screen.getByLabelText("User profile")).toBeInTheDocument();
  });
});

describe("AppHeader globalActions", () => {
  it("renders custom global actions alongside structured utilities", () => {
    render(
      <StatefulThemeProvider initial={{ appearance: "light", branding: { organizationName: "" } }}>
        <AppHeader
          appTitle="My App"
          utilities={{ themeToggle: true }}
          globalActions={<button data-testid="custom-action">Custom</button>}
        />
      </StatefulThemeProvider>
    );
    expect(screen.getByTestId("custom-action")).toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to dark mode/)).toBeInTheDocument();
  });
});

describe("AppHeader with all regions", () => {
  it("renders all regions together", () => {
    const bugHandler = vi.fn();
    const accountHandler = vi.fn();

    render(
      <StatefulThemeProvider initial={{ appearance: "light", branding: { organizationName: "SLAC" } }}>
        <AppHeader
          appTitle="E-Log"
          search={<input data-testid="search" placeholder="Search..." />}
          navigation={[{ label: "Dashboard", href: "/dashboard" }]}
          admin={{ href: "/admin" }}
          actions={[
            { label: "Drafts", href: "/drafts" },
            { label: "New Entry", href: "/new", primary: true },
          ]}
          utilities={{
            themeToggle: true,
            reportBug: { onClick: bugHandler },
            help: { href: "/docs" },
            account: { onClick: accountHandler },
          }}
        />
      </StatefulThemeProvider>
    );

    expect(screen.getByText("[SLAC]")).toBeInTheDocument();
    expect(screen.getByText("E-Log")).toBeInTheDocument();
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByLabelText("Admin")).toBeInTheDocument();
    expect(screen.getByLabelText("Drafts")).toBeInTheDocument();
    expect(screen.getByLabelText("New Entry")).toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to dark mode/)).toBeInTheDocument();
    expect(screen.getByLabelText("Report a bug")).toBeInTheDocument();
    expect(screen.getByLabelText("Help")).toBeInTheDocument();
    expect(screen.getByLabelText("Account")).toBeInTheDocument();
  });
});

describe("AppHeader with SWAPPSThemeProvider", () => {
  it("inherits orgName from theme context when prop is not provided", () => {
    const config: SWAPPSThemeConfig = {
      appearance: "light",
      branding: { organizationName: "Fermilab" },
    };
    render(
      <SWAPPSThemeProvider config={config}>
        <AppHeader appTitle="Beam Monitor" />
      </SWAPPSThemeProvider>
    );
    expect(screen.getByText("[Fermilab]")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveAttribute(
      "aria-label",
      "Fermilab Beam Monitor"
    );
  });

  it("explicit orgName prop overrides theme context", () => {
    const config: SWAPPSThemeConfig = {
      appearance: "light",
      branding: { organizationName: "Fermilab" },
    };
    render(
      <SWAPPSThemeProvider config={config}>
        <AppHeader appTitle="My App" orgName="SLAC" />
      </SWAPPSThemeProvider>
    );
    expect(screen.getByText("[SLAC]")).toBeInTheDocument();
    expect(screen.queryByText("[Fermilab]")).not.toBeInTheDocument();
  });

  it("inherits logoUrl from theme context branding", () => {
    const config: SWAPPSThemeConfig = {
      appearance: "dark",
      branding: {
        organizationName: "LBNL",
        logoUrl: "/lbnl-logo.svg",
      },
    };
    render(
      <SWAPPSThemeProvider config={config}>
        <AppHeader appTitle="Detector Dashboard" />
      </SWAPPSThemeProvider>
    );
    expect(screen.getByAltText("LBNL")).toBeInTheDocument();
    expect(screen.getByAltText("LBNL")).toHaveAttribute(
      "src",
      "/lbnl-logo.svg"
    );
  });

  it("explicit logo prop overrides theme context logoUrl", () => {
    const config: SWAPPSThemeConfig = {
      appearance: "light",
      branding: {
        organizationName: "LBNL",
        logoUrl: "/lbnl-logo.svg",
      },
    };
    render(
      <SWAPPSThemeProvider config={config}>
        <AppHeader
          appTitle="My App"
          logo={<img src="/custom.svg" alt="Custom" />}
        />
      </SWAPPSThemeProvider>
    );
    expect(screen.getByAltText("Custom")).toBeInTheDocument();
    expect(screen.queryByAltText("LBNL")).not.toBeInTheDocument();
  });

  it("renders without branding when theme context has empty org name", () => {
    const config: SWAPPSThemeConfig = {
      appearance: "light",
      branding: { organizationName: "" },
    };
    render(
      <SWAPPSThemeProvider config={config}>
        <AppHeader appTitle="Shared Tool" />
      </SWAPPSThemeProvider>
    );
    expect(screen.queryByText(/\[.*\]/)).not.toBeInTheDocument();
  });
});
