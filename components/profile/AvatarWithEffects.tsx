import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAvatarEffects } from "@/lib/hooks/useAvatarEffects";

/**
 * Avatar component with interactive effects
 * 
 * This component displays the user's avatar with special interaction effects:
 * - First click: RGB circle animation around the avatar
 * - Second click: Confetti explosion with page overlay
 * - Hover tooltip showing interaction hints
 * 
 * The component uses the useAvatarEffects hook to manage state and interactions.
 * 
 * @param props - Component props
 * @param props.profile - Profile data containing avatar, name, and interaction text
 * @param props.profile.avatar - Avatar image URL
 * @param props.profile.name - User's full name for fallback initials
 * @param props.profile.clickMeText - Text shown on first hover
 * @param props.profile.clickAgainText - Text shown on second hover
 */
interface AvatarWithEffectsProps {
  profile: {
    avatar: string;
    name: string;
    clickMeText: string;
    clickAgainText: string;
  };
}

export const AvatarWithEffects = ({ profile }: AvatarWithEffectsProps) => {
  // Get avatar effects state and handlers from custom hook
  const { avatarClicks, isRGBActive, handleAvatarClick } = useAvatarEffects();

  /**
   * Generates user initials from full name
   * 
   * Takes the first letter of each word in the name and joins them
   * Example: "John Doe" -> "JD"
   * 
   * @param name - Full name string
   * @returns Initials string
   */
  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="relative cursor-pointer group flex justify-center" onClick={handleAvatarClick}>
      {/* Main Avatar Component */}
      <Avatar 
        className={`
          w-20 h-20 sm:w-24 sm:h-24 
          ring-2 sm:ring-4 
          ${isRGBActive ? 'ring-transparent shadow-lg shadow-blue-500/50' : 'ring-white dark:ring-gray-700'} 
          transition-all duration-300 
          group-hover:scale-105 
          relative z-20
        `}
      >
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback className="text-base sm:text-lg font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          {getInitials(profile.name)}
        </AvatarFallback>
      </Avatar>

      {/* RGB Circle Effect */}
      {isRGBActive && (
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-1"
          style={{
            width: '112px',
            height: '112px',
            '@media (min-width: 640px)': {
              width: '128px',
              height: '128px'
            }
          }}
        >
          <div className="w-full h-full rounded-full rgb-circle">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900"></div>
          </div>
        </div>
      )}

      {/* Hover Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {avatarClicks === 0 ? profile.clickMeText : profile.clickAgainText}
      </div>
    </div>
  );
}; 