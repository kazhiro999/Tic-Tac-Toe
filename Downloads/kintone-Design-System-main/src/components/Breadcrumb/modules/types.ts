export type BreadcrumbStructure = {
  portalUrl: string;
  items: BreadcrumbItem[];
};

export type BreadcrumbItem = {
  title?: string;
  label: string;
  href?: string;
  current?: boolean;
};
