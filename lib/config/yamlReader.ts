export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface GoogleServiceConfig {
  firebase: FirebaseConfig;
}

let cachedConfig: GoogleServiceConfig | null = null;

/**
 * Loads Firebase configuration from google-service.yaml file (Server-side only)
 * @returns GoogleServiceConfig - The parsed Google Service configuration
 */
export function loadGoogleServiceConfig(): GoogleServiceConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  // Check if we're on the server side
  if (typeof window !== 'undefined') {
    throw new Error('loadGoogleServiceConfig can only be called on the server side');
  }

  try {
    // Dynamic imports to avoid client-side issues
    const fs = require('fs');
    const path = require('path');
    const yaml = require('js-yaml');
    
    // Path to the google-service.yaml file in the bio/ directory
    const yamlPath = path.join(process.cwd(), 'google-service.yaml');
    
    console.log('📄 Loading Firebase configuration from:', yamlPath);
    
    // Read and parse the YAML file
    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const config = yaml.load(fileContents) as GoogleServiceConfig;
    
    console.log('✅ Google Service configuration loaded successfully');
    
    // Cache the configuration
    cachedConfig = config;
    
    return config;
  } catch (error) {
    console.error('❌ Error loading Google Service configuration:', error);
    throw new Error('Failed to load Google Service configuration from google-service.yaml');
  }
}

/**
 * Gets Firebase configuration from Google Service YAML (Server-side only)
 * @returns Firebase configuration object
 */
export function getFirebaseConfig(): FirebaseConfig {
  const config = loadGoogleServiceConfig();
  return config.firebase;
} 