import { MetadataRoute } from "next";
import { socials } from "@/lib/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${socials.website}/sitemap.xml`,
  };
}
