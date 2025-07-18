'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
// Import BioData interface from Firebase Remote Config
import { BioData } from "../lib/firebase/remoteConfig";
import { FirebaseConfig } from "../lib/firebase/config";
import { ErrorDialog } from "./ui/error-dialog";

interface SplashScreenProps {
  firebaseConfig: FirebaseConfig;
  onComplete: (data: BioData) => void;
}

export function SplashScreen({ firebaseConfig, onComplete }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingText, setLoadingText] = useState('Preparing your digital presence...');
  const [error, setError] = useState<{
    title: string;
    message: string;
    code?: string;
  } | null>(null);

  // Firebase data loading function
  const loadBioDataFromFirebase = async (): Promise<BioData> => {
    // Dynamic import to avoid SSR issues
    const { fetchBioDataWithRetry } = await import("../lib/firebase/remoteConfig");
    
    // Update loading text to show remote config fetch
    setLoadingText('Fetching "bio" parameter...');
    
    return await fetchBioDataWithRetry(firebaseConfig, 2, 10000);
  };

  const loadDataAndResources = async () => {
    try {
      // Reset error state
      setError(null);
      setIsLoading(true);
      setFadeOut(false);
      
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
      
      // Small delay to show the status
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update loading text
      setLoadingText('Loading resources...');
      
      // Preload critical images
      const imagesToPreload = [
        '/profile-picture.png',
        '/vercel.svg',
        '/next.svg',
        '/globe.svg',
        '/file.svg',
        '/window.svg'
      ];

      const promises = imagesToPreload.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = src;
        });
      });

      await Promise.all(promises);
      
      // Minimum loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoadingText('Ready!');
      setIsLoading(false);
      setFadeOut(true);
      
      // Complete fade out, then notify parent with data
      setTimeout(() => {
        onComplete(bioData);
      }, 500);
      
    } catch (error: any) {
      console.error('❌ Error loading application data:', error);
      
      // Set error state based on error type
      if (error.message?.includes('Timeout')) {
        setError({
          title: 'Connection Timeout',
          message: 'The request took too long to complete. Please check your internet connection and try again.',
          code: 'TIMEOUT_ERROR'
        });
      } else if (error.message?.includes('Network')) {
        setError({
          title: 'Network Error',
          message: 'Unable to connect to the server. Please check your internet connection and try again.',
          code: 'NETWORK_ERROR'
        });
      } else if (error.message?.includes('Remote Config')) {
        setError({
          title: 'Configuration Error',
          message: 'Unable to load application configuration. Please try again later.',
          code: 'CONFIG_ERROR'
        });
      } else {
        setError({
          title: 'Loading Error',
          message: 'An unexpected error occurred while loading your profile. Please try again.',
          code: 'UNKNOWN_ERROR'
        });
      }
      
      setIsLoading(false);
      setLoadingText('');
    }
  };

  useEffect(() => {
    loadDataAndResources();
  }, [firebaseConfig, onComplete]);

  const handleRetry = () => {
    loadDataAndResources();
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      {/* Main Splash Screen */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Image 
                src="/vercel.svg" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="filter brightness-0 invert"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bio Link
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Loading your profile...
            </p>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center">
              <div className="relative">
                {/* Spinning circle */}
                <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-500"></div>
                
                {/* Pulsing dot in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Loading text */}
          {loadingText && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {loadingText}
            </div>
          )}
        </div>
      </div>

      {/* Error Dialog */}
      <ErrorDialog
        isOpen={!!error}
        onClose={handleCloseError}
        onRetry={handleRetry}
        title={error?.title}
        message={error?.message}
        errorCode={error?.code}
        showRetry={true}
      />
    </>
  );
} 