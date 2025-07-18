import Image from "next/image";
import { MapPin, Globe } from "lucide-react";
import { AvatarWithEffects } from "./AvatarWithEffects";

/**
 * Profile Section Component
 * 
 * This component renders the main profile information section including:
 * - Interactive avatar with effects
 * - User name with verification badge
 * - Job title and company information
 * - Bio/description text
 * - Location and website links
 * 
 * The component is fully responsive and includes hover effects for interactive elements.
 * 
 * @param props - Component props
 * @param props.profile - Complete profile data object
 * @param props.profile.avatar - Avatar image URL
 * @param props.profile.name - User's full name
 * @param props.profile.verified - Whether user has verified status
 * @param props.profile.title - Job title/profession
 * @param props.profile.company - Company information object
 * @param props.profile.company.name - Company name
 * @param props.profile.company.url - Company website URL
 * @param props.profile.company.icon - Company logo/icon URL
 * @param props.profile.bio - User's bio/description text
 * @param props.profile.location - User's location
 * @param props.profile.website - User's personal website URL
 * @param props.profile.clickMeText - Avatar hover text for first click
 * @param props.profile.clickAgainText - Avatar hover text for second click
 */
interface ProfileSectionProps {
  profile: {
    avatar: string;
    name: string;
    verified: boolean;
    title: string;
    company: {
      name: string;
      url: string;
      icon: string;
    };
    bio: string;
    location: string;
    website: string;
    clickMeText: string;
    clickAgainText: string;
  };
}

export const ProfileSection = ({ profile }: ProfileSectionProps) => {
  return (
    <div className="text-center space-y-3 sm:space-y-4">
      {/* Interactive Avatar Component */}
      <AvatarWithEffects 
        profile={{
          avatar: profile.avatar,
          name: profile.name,
          clickMeText: profile.clickMeText,
          clickAgainText: profile.clickAgainText
        }}
      />
      
      {/* User Information Section */}
      <div className="space-y-2">
        {/* Name and Verification Badge */}
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {profile.name}
          </h1>
          
          {/* Verification Badge - Only shows if user is verified */}
          {profile.verified && (
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Job Title */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
          {profile.title}
        </p>
        
        {/* Company Information - Clickable link */}
        <a 
          href={profile.company.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <Image 
            src={profile.company.icon} 
            alt="Company Logo" 
            width={14} 
            height={14} 
            className="filter brightness-0 dark:brightness-100 sm:w-4 sm:h-4"
          />
          <span>{profile.company.name}</span>
        </a>
        
        {/* Bio/Description Text */}
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
          {profile.bio}
        </p>
        
        {/* Location and Website Links */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {/* Location Information */}
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{profile.location}</span>
          </div>
          
          {/* Website Link */}
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
            <a 
              href={profile.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs sm:text-sm"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 