import type { Metadata } from "next";
import { ogImage } from "@/lib/media";
import { site } from "@/lib/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  og?: Parameters<typeof ogImage>[0];
};

/** Metadados por página: title, description, canonical, Open Graph e Twitter. */
export function pageMetadata({ title, description, path, og = "default" }: PageSeo): Metadata {
  const image = ogImage(og);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: site.name,
      title: `${title} — ${site.shortName}`,
      description,
      url: path,
      images: [{ ...image, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.shortName}`,
      description,
      images: [image.url],
    },
  };
}
