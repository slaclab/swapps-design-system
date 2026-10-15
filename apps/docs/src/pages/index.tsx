import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
}

function FeatureCard({ title, description, link, linkLabel }: FeatureCardProps) {
  return (
    <div className="col col--4" style={{ marginBottom: "1.5rem" }}>
      <div className="feature-card">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={link}>{linkLabel} &rarr;</Link>
      </div>
    </div>
  );
}

const features: FeatureCardProps[] = [
  {
    title: "Getting Started",
    description:
      "Learn how to install the component library, set up your project, and start building consistent interfaces.",
    link: "/docs/getting-started/introduction",
    linkLabel: "Read the guide",
  },
  {
    title: "Foundations",
    description:
      "Explore the design principles, colors, typography, spacing, and accessibility guidelines that underpin the system.",
    link: "/docs/foundations/design-principles",
    linkLabel: "View foundations",
  },
  {
    title: "Components",
    description:
      "Browse reusable application-level components built on IBM Carbon — headers, navigation, layouts, and more.",
    link: "/docs/components/overview",
    linkLabel: "Explore components",
  },
  {
    title: "Themes & Branding",
    description:
      "Configure organization-specific identity including logos, colors, and naming — without modifying shared components.",
    link: "/docs/themes/overview",
    linkLabel: "Learn about themes",
  },
  {
    title: "Patterns",
    description:
      "Discover recommended patterns for application layouts, navigation, loading states, error handling, and responsive design.",
    link: "/docs/patterns/application-layouts",
    linkLabel: "Browse patterns",
  },
  {
    title: "Development",
    description:
      "Set up your development environment, learn how to build and test components, and contribute to the design system.",
    link: "/docs/development/setup",
    linkLabel: "Start developing",
  },
];

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="A shared foundation for consistent software interfaces across laboratories and development teams.">
      <header className="hero hero--swapps">
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p style={{ maxWidth: 600, margin: "1rem auto 2rem", opacity: 0.8 }}>
            Developed and maintained by SWAPPS at SLAC National Accelerator
            Laboratory. Designed for adoption by any software development team.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="button button--primary button--lg" to="/docs/getting-started/introduction">
              Get Started
            </Link>
            <Link className="button button--outline button--lg" to="/docs/components/overview">
              Browse Components
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="features-section">
          <div className="container">
            <div className="row">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
