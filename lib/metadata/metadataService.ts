import { Metadata } from "next";

// Server-side metadata generation from Firebase Remote Config
export async function generateServerMetadata(): Promise<Metadata> {
  try {
    console.log('🔄 Generating server-side metadata from Remote Config...');
    
    // Dynamic import to avoid client-side bundling
    const { loadGoogleServiceConfig } = await import("../config/yamlReader");
    const { fetchBioDataWithRetry } = await import("../firebase/remoteConfig");
    
    // Load Firebase config from YAML
    const config = loadGoogleServiceConfig();
    
    // Fetch dynamic bio data from Remote Config (no fallback)
    const bioData = await fetchBioDataWithRetry(config.firebase, 2, 10000);
    
    // Use dynamic SEO data from Remote Config
    const seo = bioData.seo;
    const profile = bioData.profile;
    
    const metadata: Metadata = {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      authors: [{ name: profile.name, url: profile.website }],
      creator: profile.name,
      publisher: seo.siteName,
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(seo.metadataBase),
      alternates: {
        canonical: "/",
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        title: seo.title,
        description: seo.description,
        siteName: seo.siteName,
        images: [
          {
            url: seo.ogImage,
            width: 1200,
            height: 630,
            alt: seo.title,
          },
        ],
      },
      twitter: {
        card: seo.twitterCard as "summary_large_image",
        title: seo.title,
        description: seo.description,
        images: [seo.ogImage],
        creator: profile.username ? `@${profile.username}` : undefined,
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
      verification: seo.googleVerification ? {
        google: seo.googleVerification,
      } : undefined,
    };
    
    console.log('✅ Dynamic metadata generated successfully from Remote Config');
    return metadata;
    
  } catch (error) {
    console.error('❌ Error generating server-side metadata:', error);
    throw error;
  }
} 