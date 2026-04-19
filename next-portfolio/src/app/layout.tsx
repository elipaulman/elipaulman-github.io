import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { personal, socials } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personal.name} | Software Engineer`,
  description: personal.about.short,
  metadataBase: new URL(socials.website),
  keywords: [
    "Elijah Paulman",
    "Eli Paulman",
    "software engineer",
    "software quality engineer",
    "Apple",
    "Amazon",
    "Ohio State University",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "automation",
    "full-stack developer",
  ],
  authors: [{ name: personal.name, url: socials.website }],
  creator: personal.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: socials.website,
  },
  icons: {
    icon: "/images/favicon-32x32.png",
  },
  openGraph: {
    title: `${personal.name} | Software Engineer`,
    description: personal.about.short,
    url: socials.website,
    siteName: personal.name,
    type: "website",
    images: [
      {
        url: "/images/Elijah_Paulman_Headshot.jpg",
        width: 1200,
        height: 630,
        alt: `${personal.name} — Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | Software Engineer`,
    description: personal.about.short,
    images: ["/images/Elijah_Paulman_Headshot.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.dataset.theme = theme;
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} bg-[var(--bg)] text-[var(--text)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
