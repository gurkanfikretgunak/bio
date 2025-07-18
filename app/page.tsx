'use client';

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import bioData from "../data/bio.json";
import { ThemeToggle } from "@/components/theme-toggle";
import { QRCodeModal } from "@/components/qr-code-modal";
import { SplashScreen } from "@/components/splash-screen";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { FeaturedLinks } from "@/components/links/FeaturedLinks";
import { AdditionalLinks } from "@/components/links/AdditionalLinks";
import { PlatformDetection } from "@/components/ui/PlatformDetection";
import { ConfettiOverlay } from "@/components/effects/ConfettiOverlay";
import { GitHubRepositoriesModal } from "@/components/modals/GitHubRepositoriesModal";
import { useAvatarEffects } from "@/lib/hooks/useAvatarEffects";

/**
 * Main Home Page Component
 * 
 * This is the main entry point for the biolink application. It orchestrates
 * all the different components and manages the overall application state.
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
 * - Footer with company information
 * - Various modals (QR code, GitHub repositories)
 * - Confetti overlay for special interactions
 */

export default function Home() {
  // Extract data from bio.json
  const { profile, links, footer } = bioData;
  
  // Modal states
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  
  // Loading and content display states
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Avatar effects from custom hook
  const { isConfettiActive } = useAvatarEffects();
  
  /**
   * Handles splash screen completion
   * 
   * This function is called when the splash screen animation completes.
   * It sets the loading state to false and shows the main content with
   * a small delay for smooth transition.
   */
  const handleSplashComplete = () => {
    setIsLoading(false);
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
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

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



      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 sm:py-8 bg-white dark:bg-gray-900">
        <div className="max-w-md mx-auto px-3 sm:px-4 text-center space-y-3 sm:space-y-4">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {footer.text} • {" "}
            <a 
              href={footer.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <a 
              href={footer.repositoryUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              MIT License
            </a>
            <span>•</span>
            <span>Built with Next.js</span>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              {footer.badge}
            </div>
          </div>
          
          <div className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed px-2 sm:px-0">
            A modern, minimalist biolink application designed to showcase your digital presence. 
            Perfect for sharing your professional profile, social links, and contact information in one place.
          </div>
          
          <div className="text-xs text-gray-400 dark:text-gray-500">
            © {footer.year} {profile.name}. All rights reserved.
          </div>
        </div>
      </footer>

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
        profile={{ repositoriesTitle: profile.repositoriesTitle }}
      />
    </div>
  );
}
