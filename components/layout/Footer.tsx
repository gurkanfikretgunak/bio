import Image from "next/image";

/**
 * Footer Compont
 * 
 * This component renders the application footer with all relevant information including:
 * - Creator information and GitHub link
 * - License and technology stack information
 * - Development status badge
 * - Application description
 * - Cursor development credit with logo
 * - Copyright information
 * 
 * Features:
 * - Fully responsive design
 * - Dark mode support
 * - External links with proper attributes
 * - Animated status badge
 * - Hover effects on interactive elements
 * - Accessibility support
 * 
 * @param props - Component props
 * @param props.profile - Profile data containing user information
 * @param props.profile.name - User's name for copyright
 * @param props.footer - Footer configuration data
 * @param props.footer.text - Creator text
 * @param props.footer.githubUrl - GitHub profile URL
 * @param props.footer.repositoryUrl - Repository URL
 * @param props.footer.badge - Development status badge text
 * @param props.footer.year - Copyright year
 * @param props.footer.cursor - Cursor development credit information
 * @param props.footer.cursor.textBefore - Text before Cursor logo
 * @param props.footer.cursor.textAfter - Text after Cursor logo
 * @param props.footer.cursor.url - Cursor website URL
 * @param props.footer.cursor.logo - Cursor logo image URL
 */
interface FooterProps {
  profile: {
    name: string;
  };
  footer: {
    text: string;
    githubUrl: string;
    repositoryUrl: string;
    badge: string;
    year: number;
    cursor: {
      textBefore: string;
      textAfter: string;
      url: string;
      logo: string;
    };
  };
}

export const Footer = ({ profile, footer }: FooterProps) => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-6 sm:py-8 bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto px-3 sm:px-4 text-center space-y-3 sm:space-y-4">
        
        {/* Creator Information */}
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
        
        {/* License and Technology Stack */}
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
        
        {/* Development Status Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            {footer.badge}
          </div>
        </div>
        
        {/* Application Description */}
        <div className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed px-2 sm:px-0">
          A modern, minimalist biolink application designed to showcase your digital presence. 
          Perfect for sharing your professional profile, social links, and contact information in one place.
        </div>
        
        {/* Cursor Development Credit */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <a 
            href={footer.cursor.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <span>{footer.cursor.textBefore} </span>
            <Image 
              src={footer.cursor.logo} 
              alt="Cursor Logo" 
              width={16} 
              height={16} 
              className="w-4 h-4"
            />
            <span>{footer.cursor.textAfter}</span>
          </a>
        </div>
        
        {/* Copyright Information */}
        <div className="text-xs text-gray-400 dark:text-gray-500">
          © {footer.year} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}; 