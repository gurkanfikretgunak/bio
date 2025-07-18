import { usePlatformDetection } from "@/lib/hooks/usePlatformDetection";

/**
 * Platform Detection Component
 * 
 * This component displays information about the user's current platform/device.
 * It uses the usePlatformDetection hook to determine the platform and shows
 * it in a small, unobtrusive text format.
 * 
 * Features:
 * - Automatic platform detection
 * - Loading state handling
 * - Responsive text sizing
 * - Subtle styling to not distract from main content
 * 
 * @param props - Component props
 * @param props.profile - Profile data containing platform display text
 * @param props.profile.viewedFromText - Text to display before platform name
 */
interface PlatformDetectionProps {
  profile: {
    viewedFromText: string;
  };
}

export const PlatformDetection = ({ profile }: PlatformDetectionProps) => {
  // Get platform information from custom hook
  const { platform, isLoading } = usePlatformDetection();

  // Don't render while loading to prevent layout shift
  if (isLoading) return null;

  return (
    <div className="text-center mt-3 sm:mt-4">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {profile.viewedFromText} {platform}
      </p>
    </div>
  );
}; 