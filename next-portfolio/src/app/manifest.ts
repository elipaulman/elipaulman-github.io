import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elijah Paulman",
    short_name: "Eli Paulman",
    start_url: "/",
    display: "browser",
    background_color: "#ff5a1f",
    theme_color: "#ff5a1f",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
