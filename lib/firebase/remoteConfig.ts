import { fetchAndActivate, getValue, getRemoteConfig } from "firebase/remote-config";
import { initializeRemoteConfig, FirebaseConfig } from "./clientConfig";

// Bio data interface with SEO metadata
export interface BioData {
  profile: {
    name: string;
    username: string;
    title: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
    shareTitle: string;
    surpriseText: string;
    secretFeatureText: string;
    repositoriesTitle: string;
    verified: boolean;
    company: {
      name: string;
      url: string;
      icon: string;
    };
    clickMeText: string;
    clickAgainText: string;
    viewedFromText: string;
    platformDetection: {
      title: string;
      subtitle: string;
      downloadText: string;
      iosLink: string;
      androidLink: string;
    };
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    twitterCard: string;
    siteName: string;
    metadataBase: string;
    googleVerification?: string;
  };
  links: Array<{
    id: string;
    title: string;
    url: string;
    icon: string;
    description: string;
    color: string;
    featured: boolean;
  }>;
  favorites: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string;
    languageColor: string;
  }>;
  footer: {
    text: string;
    githubUrl: string;
    repositoryUrl: string;
    badge: string;
    year: number;
    cursor: {
      textBefore: string;
      textAfter: string;
      url: string;
      logo: string;
    };
  };
}

/**
 * Fetches bio data from Firebase Remote Config
 * @param config Firebase configuration object
 * @returns Promise<BioData> - The bio data
 */
export async function fetchBioData(config: FirebaseConfig): Promise<BioData> {
  try {
    console.log('🔄 Fetching bio data from Remote Config...');
    
    const remoteConfig = initializeRemoteConfig(config);
    
    // Fetch and activate the latest values
    console.log('🔄 Fetching latest Remote Config values...');
    await fetchAndActivate(remoteConfig);
    
    // Get the bio parameter value
    const bioValue = getValue(remoteConfig, 'bio');
    const bioString = bioValue.asString();
    
    if (!bioString) {
      throw new Error('Bio parameter is empty or not found in Remote Config');
    }
    
    console.log('✅ Bio data fetched successfully from Remote Config');
    console.log('📊 Bio data length:', bioString.length, 'characters');
    
    try {
      const bioData = JSON.parse(bioString) as BioData;
      
      // Validate that required fields exist
      if (!bioData.profile || !bioData.seo || !bioData.links || !bioData.favorites || !bioData.footer) {
        throw new Error('Invalid bio data structure - missing required fields');
      }
      
      console.log('✅ Bio data parsed and validated successfully');
      return bioData;
    } catch (parseError) {
      console.error('❌ Error parsing bio data JSON:', parseError);
      throw new Error('Failed to parse bio data from Remote Config');
    }
    
  } catch (error) {
    console.error('❌ Error fetching bio data from Remote Config:', error);
    console.log('🔄 Remote Config failed, throwing error...');
    throw error;
  }
}

/**
 * Fetches bio data with timeout and retry logic
 * @param config Firebase configuration object
 * @param maxRetries - Maximum number of retry attempts
 * @param timeoutMs - Timeout in milliseconds
 * @returns Promise<BioData> - The bio data
 */
export async function fetchBioDataWithRetry(config: FirebaseConfig, maxRetries: number = 3, timeoutMs: number = 30000): Promise<BioData> {
  let lastError: any = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} to fetch bio data...`);
      
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout while fetching bio data')), timeoutMs);
      });
      
      // Race between fetch and timeout
      const bioData = await Promise.race([
        fetchBioData(config),
        timeoutPromise
      ]);
      
      console.log(`✅ Bio data fetched successfully on attempt ${attempt}`);
      return bioData;
    } catch (error) {
      lastError = error;
      console.error(`❌ Attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
        console.log(`🔄 Retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  
  console.error(`❌ All ${maxRetries} attempts failed. Last error:`, lastError);
  throw lastError;
}

/**
 * Checks if Remote Config is available and working
 * @param config Firebase configuration object
 * @returns Promise<boolean> - True if Remote Config is available
 */
export async function isRemoteConfigAvailable(config: FirebaseConfig): Promise<boolean> {
  try {
    console.log('🔄 Checking Remote Config availability...');
    
    const remoteConfig = initializeRemoteConfig(config);
    
    // Try to fetch without activating
    await fetchAndActivate(remoteConfig);
    
    // Check if bio parameter exists
    const bioValue = getValue(remoteConfig, 'bio');
    const hasValue = bioValue.asString().length > 0;
    
    console.log('✅ Remote Config is available:', hasValue);
    return hasValue;
  } catch (error) {
    console.error('❌ Remote Config is not available:', error);
    return false;
  }
} 