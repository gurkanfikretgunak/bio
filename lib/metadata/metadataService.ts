import { Metadata } from "next";

// Server-side metadata generation - Static metadata for Bio App
export async function generateServerMetadata(): Promise<Metadata> {
  try {
    console.log('🔄 Generating static metadata for Bio App...');
    
    // Static metadata for Bio App
    const metadata: Metadata = {
      title: "Bio App - Modern Biolink Application",
      description: "A modern, responsive biolink application similar to Linktree, built with Next.js and TypeScript.",
      keywords: ["biolink", "profile", "links", "nextjs", "typescript", "portfolio", "social media"],
      authors: [{ name: "Gurkan Fikret Gunak", url: "https://gurkanfikretgunak.com" }],
      creator: "Gurkan Fikret Gunak",
      publisher: "Bio App",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL("https://gurkanfikretgunak.com"),
      alternates: {
        canonical: "/",
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        title: "Bio App - Modern Biolink Application",
        description: "A modern, responsive biolink application similar to Linktree, built with Next.js and TypeScript.",
        siteName: "Bio App",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "Bio App - Modern Biolink Application",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Bio App - Modern Biolink Application",
        description: "A modern, responsive biolink application similar to Linktree, built with Next.js and TypeScript.",
        images: ["/og-image.png"],
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
    };
    
    console.log('✅ Static metadata generated successfully for Bio App');
    return metadata;
    
  } catch (error) {
    console.error('❌ Error generating metadata:', error);
    throw error;
  }
} 