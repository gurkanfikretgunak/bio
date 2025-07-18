// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";

// Client-side generated config
import { firebaseConfig as generatedConfig } from "../config/firebaseConfig";

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
 * Firebase App instance - initialized once and reused
 */
let firebaseApp: any = null;

/**
 * Firebase Remote Config instance - initialized once and reused
 */
let remoteConfigInstance: any = null;

/**
 * Get Firebase config for client-side use
 * Always uses the generated config from build-time YAML processing
 * @returns FirebaseConfig - The Firebase configuration object
 */
export function getClientFirebaseConfig(): FirebaseConfig {
  return generatedConfig;
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

/**
 * Initialize Firebase App with provided config
 * @param config Firebase configuration object
 * @returns Firebase App instance
 */
export function initializeFirebaseApp(config: FirebaseConfig) {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    // Check if Firebase is already initialized
    if (getApps().length === 0) {
      console.log('🔥 Initializing Firebase App...');
      firebaseApp = initializeApp(config);
      console.log('✅ Firebase App initialized successfully');
    } else {
      console.log('🔥 Using existing Firebase App...');
      firebaseApp = getApp();
    }
    
    return firebaseApp;
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    throw error;
  }
}

/**
 * Initialize Firebase Remote Config with provided config
 * @param config Firebase configuration object
 * @returns Remote Config instance
 */
export function initializeRemoteConfig(config: FirebaseConfig) {
  if (remoteConfigInstance) {
    return remoteConfigInstance;
  }

  try {
    console.log('🔧 Initializing Remote Config...');
    
    const app = initializeFirebaseApp(config);
    remoteConfigInstance = getRemoteConfig(app);
    
    // Configure Remote Config settings
    remoteConfigInstance.settings = {
      minimumFetchIntervalMillis: 60000, // 1 minute
      fetchTimeoutMillis: 30000, // 30 seconds
    };
    
    // Remote Config is ready to use
    console.log('ℹ️ Remote Config configured for production use');
    
    console.log('✅ Remote Config initialized successfully');
    return remoteConfigInstance;
  } catch (error) {
    console.error('❌ Error initializing Remote Config:', error);
    throw error;
  }
}

/**
 * Get Firebase App instance
 * @returns Firebase App instance
 */
export function getFirebaseApp() {
  return firebaseApp;
}

/**
 * Get Remote Config instance
 * @returns Remote Config instance
 */
export function getRemoteConfigInstance() {
  return remoteConfigInstance;
} 