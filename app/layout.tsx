import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import bioData from "../data/bio.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: bioData.seo.title,
  description: bioData.seo.description,
  keywords: bioData.seo.keywords,
  authors: [{ name: bioData.profile.name, url: bioData.profile.website }],
  creator: bioData.profile.name,
  publisher: bioData.profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bio.gurkanfikretgunak.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: bioData.seo.title,
    description: bioData.seo.description,
    siteName: bioData.seo.title,
    images: [
      {
        url: bioData.seo.ogImage,
        width: 1200,
        height: 630,
        alt: bioData.seo.title,
      },
    ],
  },
  twitter: {
    card: bioData.seo.twitterCard as "summary_large_image",
    title: bioData.seo.title,
    description: bioData.seo.description,
    images: [bioData.seo.ogImage],
    creator: "@gurkanfikretgunak",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_code_here",
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
                try {
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                } catch (e) {
                  // Fallback to light theme if there's an error
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
