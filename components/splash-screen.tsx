'use client';

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { BioData } from "../lib/firebase/remoteConfig";
import { FirebaseConfig } from "../lib/firebase/clientConfig";

interface SplashScreenProps {
  firebaseConfig: FirebaseConfig;
  onComplete: (data: BioData) => void;
}

export function SplashScreen({ firebaseConfig, onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingText, setLoadingText] = useState('Preparing your digital presence...');
  const [error, setError] = useState<string | null>(null);

  // Firebase Remote Config data loading function
  const loadBioDataFromFirebase = async (): Promise<BioData> => {
    // Dynamic import to avoid SSR issues
    const { fetchBioDataWithRetry } = await import("../lib/firebase/remoteConfig");
    
    // Update loading text to show remote config fetch
    setLoadingText('Fetching bio data from Remote Config...');
    
    return await fetchBioDataWithRetry(firebaseConfig, 3, 20000);
  };

  const loadDataAndResources = async () => {
    try {
      // Update loading text
      setLoadingText('Connecting to Firebase...');
      
      // Small delay to show the status
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update loading text
      setLoadingText('Fetching Remote Config...');
      
      // Fetch bio data from Firebase Remote Config
      const bioData = await loadBioDataFromFirebase();
      
      // Update loading text
      setLoadingText('Processing profile data...');
      
      // Small delay to show completion
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Start fade out animation
      setFadeOut(true);
      
      // Complete the loading after fade out
      setTimeout(() => {
        onComplete(bioData);
      }, 500);
      
    } catch (error: any) {
      console.error('❌ Error during splash screen loading:', error);
      setError(error.message || 'Failed to load bio data');
      setLoadingText('Connection failed. Please check your internet connection and try again.');
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoadingText('Retrying connection...');
    loadDataAndResources();
  };

  useEffect(() => {
    loadDataAndResources();
  }, [firebaseConfig]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-all duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User 
              className="w-12 h-12 text-white"
              aria-label="Bio App Icon"
            />
          </div>
          
          {/* Loading spinner */}
          {!error && <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>}
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Bio App
          </h2>
          <p className={`text-sm text-gray-600 dark:text-gray-400 max-w-xs ${error ? 'text-red-600 dark:text-red-400' : 'animate-pulse'}`}>
            {loadingText}
          </p>
        </div>
        
        {/* Progress bar or error actions */}
        {error ? (
          <div className="flex flex-col items-center space-y-3">
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
} 