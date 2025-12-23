import { Organization, WebSite, BreadcrumbList } from "@/types/structured-data";

interface StructuredDataProps {
  data: Organization | WebSite | BreadcrumbList;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

