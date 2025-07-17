'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
      setFadeOut(true);
      
      // Complete fade out, then notify parent
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    preloadImages();
  }, [onComplete]);

  return (
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

        {/* Loading text */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {isLoading ? 'Preparing your digital presence...' : 'Ready!'}
        </div>
      </div>
    </div>
  );
} 