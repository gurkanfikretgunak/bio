import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  FileText,
  User,
  MessageCircle,
  QrCode
} from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";

/**
 * Featured Links Component
 * 
 * This component renders the main featured links section with special handling
 * for different link types. The GitHub link has special functionality to open
 * a repositories modal, while other links navigate to external URLs.
 * 
 * Features:
 * - Responsive card layout
 * - Icon mapping for different platforms
 * - Special GitHub repositories modal trigger
 * - Hover effects and animations
 * - Accessibility support
 * 
 * @param props - Component props
 * @param props.links - Array of featured link objects
 * @param props.onGitHubClick - Callback function for GitHub repositories modal
 */

// Icon mapping for different link types
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: XIcon,
  email: Mail,
  portfolio: User,
  blog: FileText,
  website: ExternalLink,
  contact: MessageCircle,
  qrcode: QrCode,
};

// Type definitions for link objects
interface Link {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  featured: boolean;
}

interface FeaturedLinksProps {
  links: Link[];
  onGitHubClick: () => void;
}

export const FeaturedLinks = ({ links, onGitHubClick }: FeaturedLinksProps) => {
  // Filter to only show featured links
  const featuredLinks = links.filter(link => link.featured);

  return (
    <div className="space-y-2">
      {featuredLinks.map((link) => {
        // Get the appropriate icon component for this link
        const IconComponent = iconMap[link.icon as keyof typeof iconMap] || ExternalLink;
        
        return (
          <Card 
            key={link.id} 
            className="border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
          >
            <CardContent className="p-0">
              {/* Special handling for GitHub link */}
              {link.id === 'github' ? (
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full">
                  {/* Icon with background color */}
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: link.color }}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  
                  {/* Link Information */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                      {link.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {link.description}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Repositories Modal Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onGitHubClick}
                      className="text-xs px-2 sm:px-3 py-1 sm:py-1.5"
                    >
                      <span className="hidden sm:inline">Show Repos</span>
                      <span className="sm:hidden">Repos</span>
                    </Button>
                    
                    {/* External Link Button */}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Standard link handling for non-GitHub links */
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 w-full text-left transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {/* Icon with background color */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: link.color }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Link Information */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {link.description}
                    </p>
                  </div>
                  
                  {/* External Link Icon */}
                  <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                </a>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}; 