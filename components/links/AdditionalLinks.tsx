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
 * Additional Links Component
 * 
 * This component renders secondary links as icon-only buttons with hover tooltips.
 * These links are typically less important than featured links and appear in a 
 * compact horizontal layout.
 * 
 * Features:
 * - Icon-only compact design
 * - Hover tooltips with arrow indicators
 * - Special QR code modal trigger
 * - Responsive sizing
 * - Accessibility support with proper ARIA labels
 * 
 * @param props - Component props
 * @param props.links - Array of non-featured link objects
 * @param props.onQRClick - Callback function for QR code modal
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

interface AdditionalLinksProps {
  links: Link[];
  onQRClick: (url: string) => void;
}

export const AdditionalLinks = ({ links, onQRClick }: AdditionalLinksProps) => {
  // Filter to only show non-featured links
  const additionalLinks = links.filter(link => !link.featured);

  // Don't render if no additional links
  if (additionalLinks.length === 0) return null;

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {additionalLinks.map((link) => {
        // Get the appropriate icon component for this link
        const IconComponent = iconMap[link.icon as keyof typeof iconMap] || ExternalLink;
        
        return (
          <div key={link.id} className="relative group">
            {/* Special handling for QR code link */}
            {link.id === 'qrcode' ? (
              <button
                onClick={() => onQRClick(link.url)}
                className="inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all duration-200"
                aria-label={`Open ${link.title}`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
              </button>
            ) : (
              /* Standard external link handling */
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all duration-200"
                aria-label={`Visit ${link.title}`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
              </a>
            )}
            
            {/* Hover Tooltip */}
            <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              {link.title}
              
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}; 