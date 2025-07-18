import { Github } from "lucide-react";
import { GitHubRepositories } from "@/components/github-repositories";

/**
 * GitHub Repositories Modal Component
 * 
 * This component creates a full-screen modal that displays the user's GitHub
 * repositories. It includes a header with title and close button, and the
 * main GitHubRepositories component content.
 * 
 * Features:
 * - Full-screen responsive modal
 * - Backdrop blur and overlay
 * - Close on backdrop click
 * - Responsive sizing for different screen sizes
 * - Scrollable content area
 * - Accessibility support with proper ARIA attributes
 * 
 * @param props - Component props
 * @param props.isOpen - Whether the modal is currently open
 * @param props.onClose - Callback function to close the modal
 * @param props.profile - Profile data containing modal title
 * @param props.profile.repositoriesTitle - Title text for the modal header
 */
interface GitHubRepositoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    repositoriesTitle: string;
    name: string;
    username: string;
    shareTitle: string;
    avatar: string;
    title: string;
  };
  favorites: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string;
    languageColor: string;
  }>;
}

export const GitHubRepositoriesModal = ({ 
  isOpen, 
  onClose, 
  profile,
  favorites
}: GitHubRepositoriesModalProps) => {
  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 p-1 sm:p-2 md:p-4">
      {/* Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={onClose}
        aria-label="Close modal"
      />
      
      {/* Modal Content Container */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-2xl max-w-7xl w-full mx-auto my-1 sm:my-2 md:my-4 lg:my-8 max-h-[98vh] sm:max-h-[96vh] md:max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            
            {/* Title with GitHub Icon */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white">
                {profile.repositoriesTitle}
              </h2>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 transition-colors duration-200"
              aria-label="Close repositories modal"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Modal Body - Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(98vh-60px)] sm:max-h-[calc(96vh-80px)] md:max-h-[calc(90vh-100px)]">
          <GitHubRepositories favorites={favorites} profile={profile} />
        </div>
      </div>
    </div>
  );
}; 