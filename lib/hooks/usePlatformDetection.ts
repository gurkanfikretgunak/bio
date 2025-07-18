import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting user's platform/device
 * 
 * This hook analyzes the user agent string to determine what platform
 * the user is viewing the application from. Useful for displaying
 * platform-specific information or analytics.
 * 
 * Supported platforms:
 * - iOS (iPhone/iPad)
 * - Android
 * - macOS
 * - Windows
 * - Linux
 * - Web (fallback)
 * 
 * @returns Object containing platform information and loading state
 */
export const usePlatformDetection = () => {
  // Current detected platform
  const [platform, setPlatform] = useState<string>('Unknown');
  
  // Loading state for server-side rendering compatibility
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Analyzes user agent string to determine platform
   * 
   * This function checks the navigator.userAgent string for specific
   * platform indicators and returns the most likely platform name.
   * 
   * @returns Platform name as string
   */
  const detectPlatform = (): string => {
    // Return unknown if window is not available (SSR)
    if (typeof window === 'undefined') return 'Unknown';
    
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Check for mobile platforms first
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      return 'iOS';
    } else if (userAgent.includes('android')) {
      return 'Android';
    } 
    // Check for desktop platforms
    else if (userAgent.includes('mac')) {
      return 'macOS';
    } else if (userAgent.includes('win')) {
      return 'Windows';
    } else if (userAgent.includes('linux')) {
      return 'Linux';
    } 
    // Fallback for unknown platforms
    else {
      return 'Web';
    }
  };

  /**
   * Effect to run platform detection on component mount
   * 
   * This runs once when the component mounts to detect the platform
   * and update the state accordingly. The loading state is set to false
   * once detection is complete.
   */
  useEffect(() => {
    const detectedPlatform = detectPlatform();
    setPlatform(detectedPlatform);
    setIsLoading(false);
  }, []);

  return {
    platform,
    isLoading,
    detectPlatform
  };
}; 