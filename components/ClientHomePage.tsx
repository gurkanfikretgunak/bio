'use client';

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { QRCodeModal } from "@/components/qr-code-modal";
import { SplashScreen } from "@/components/splash-screen";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { FeaturedLinks } from "@/components/links/FeaturedLinks";
import { AdditionalLinks } from "@/components/links/AdditionalLinks";
import { PlatformDetection } from "@/components/ui/PlatformDetection";
import { ConfettiOverlay } from "@/components/effects/ConfettiOverlay";
import { GitHubRepositoriesModal } from "@/components/modals/GitHubRepositoriesModal";
import { Footer } from "@/components/layout/Footer";
import { useAvatarEffects } from "@/lib/hooks/useAvatarEffects";
import { ProfileSkeleton } from "@/components/ui/ProfileSkeleton";
import { FeaturedLinksSkeleton, AdditionalLinksSkeleton, FooterSkeleton } from "@/components/ui/LinksSkeleton";
import { BioData } from "@/lib/firebase/remoteConfig";
import { FirebaseConfig } from "@/lib/firebase/clientConfig";

interface ClientHomePageProps {
  firebaseConfig: FirebaseConfig;
}

/**
 * Client Home Page Component
 * 
 * This component contains all the client-side logic for the biolink application.
 * It receives the Firebase configuration from the server component and manages
 * the overall application state.
 * 
 * Features:
 * - Modular component architecture
 * - Responsive design
 * - Dark mode support
 * - Interactive animations and effects
 * - Modal management
 * - Accessibility support
 * 
 * The page is structured with:
 * - Splash screen loading state
 * - Theme toggle (fixed position)
 * - Profile section with avatar effects
 * - Featured links section
 * - Additional links section
 * - Platform detection display
 * - Footer component with company information
 * - Various modals (QR code, GitHub repositories)
 * - Confetti overlay for special interactions
 */
export function ClientHomePage({ firebaseConfig }: ClientHomePageProps) {
  // Bio data from Firebase
  const [bioData, setBioData] = useState<BioData | null>(null);
  
  // Modal states
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  
  // Loading and content display states
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  // Avatar effects from custom hook
  const { isConfettiActive } = useAvatarEffects();
  
  /**
   * Handles splash screen completion
   * 
   * This function is called when the splash screen animation completes.
   * It receives the loaded data from Firebase and sets up the main content.
   */
  const handleSplashComplete = (data: BioData) => {
    setBioData(data);
    setIsLoading(false);
    setIsDataLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };
  
  /**
   * Handles QR code modal opening
   * 
   * @param url - The URL to generate QR code for
   */
  const handleQRClick = (url: string) => {
    setQrUrl(url);
    setIsQRModalOpen(true);
  };
  
  /**
   * Handles GitHub repositories modal opening
   */
  const handleGitHubClick = () => {
    setIsGitHubModalOpen(true);
  };
  
  // Show splash screen while loading
  if (isLoading) {
    return <SplashScreen firebaseConfig={firebaseConfig} onComplete={handleSplashComplete} />;
  }

  // Show loading skeletons while data is being processed
  if (isDataLoading || !bioData) {
    return (
      <div className={`min-h-screen bg-white dark:bg-gray-900 transition-all duration-500 flex flex-col ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Fixed Theme Toggle */}
        <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
          <ThemeToggle />
        </div>
        
        {/* Main Content Container with Skeletons */}
        <main className="flex-1 max-w-md mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
          {/* Profile Section Skeleton */}
          <ProfileSkeleton />

          {/* Featured Links Section Skeleton */}
          <FeaturedLinksSkeleton />

          {/* Additional Links Section Skeleton */}
          <AdditionalLinksSkeleton />
        </main>

        {/* Footer Skeleton */}
        <FooterSkeleton />
      </div>
    );
  }

  // Extract data from bioData state
  const { profile, footer } = bioData;
  const links = bioData.links;

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-all duration-500 flex flex-col ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Confetti Overlay Component */}
      <ConfettiOverlay 
        isActive={isConfettiActive} 
        profile={{
          surpriseText: profile.surpriseText,
          secretFeatureText: profile.secretFeatureText
        }}
      />
      
      {/* Fixed Theme Toggle */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Main Content Container */}
      <main className="flex-1 max-w-md mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
        {/* Profile Section with Avatar Effects */}
        <ProfileSection profile={profile} />

        {/* Featured Links Section */}
        <FeaturedLinks 
          links={links} 
          onGitHubClick={handleGitHubClick}
        />

        {/* Additional Links Section */}
        <div className="space-y-2">
          <div className="px-2 sm:px-4">
            <Separator className="my-3 sm:my-4 bg-gray-200 dark:bg-gray-700" />
          </div>
          
          <AdditionalLinks 
            links={links} 
            onQRClick={handleQRClick}
          />
          
          {/* Platform Detection Component */}
          <PlatformDetection profile={profile} />
        </div>
      </main>

      {/* Footer Component */}
      <Footer profile={profile} footer={footer} />

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        url={qrUrl}
        title={profile.shareTitle}
        profile={{
          name: profile.name,
          title: profile.title,
          avatar: profile.avatar
        }}
      />

      {/* GitHub Repositories Modal Component */}
      <GitHubRepositoriesModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        profile={profile}
        favorites={bioData.favorites}
      />
    </div>
  );
} 