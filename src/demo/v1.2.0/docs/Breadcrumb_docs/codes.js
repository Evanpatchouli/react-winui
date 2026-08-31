const BreadcrumbImportCode = `import Breadcrumb from "@evanpatchouli/react-winui/breadcrumb";
import "@evanpatchouli/react-winui/styles.css";`;

const BreadcrumbUsageCode = `<Breadcrumb
  items={[
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { label: "Breadcrumb" }
  ]}
/>`;

const BreadcrumbOverflowCode = `<Breadcrumb
  items={[
    { href: "/", label: "Home" },
    { href: "/workspace", label: "Workspace" },
    { href: "/workspace/design", label: "Design" },
    { href: "/workspace/design/components", label: "Components" },
    { label: "Breadcrumb" }
  ]}
  maxVisibleItems={4}
/>`;

export { BreadcrumbImportCode, BreadcrumbOverflowCode, BreadcrumbUsageCode };
