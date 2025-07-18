// Types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

/**
 * Get Firebase config for server-side use (metadata generation)
 * Loads from YAML file on server-side
 * @returns Promise<FirebaseConfig> - The Firebase configuration object
 */
export async function getServerFirebaseConfig(): Promise<FirebaseConfig> {
  if (typeof window !== 'undefined') {
    throw new Error('getServerFirebaseConfig can only be called on the server side');
  }

  try {
    // Dynamic import to avoid client-side bundling
    const { getFirebaseConfig } = await import('../config/yamlReader');
    return getFirebaseConfig();
  } catch (error) {
    console.error('❌ Error loading server Firebase config:', error);
    throw error;
  }
} 