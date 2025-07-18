import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateServerMetadata } from "@/lib/metadata/metadataService";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Server-side metadata from YAML file
export async function generateMetadata(): Promise<Metadata> {
  console.log('🔄 Generating server-side metadata from YAML...');
  
  return await generateServerMetadata();
}

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
