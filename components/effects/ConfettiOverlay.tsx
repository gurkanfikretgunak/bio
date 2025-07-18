/**
 * Confetti Overlay Component
 * 
 * This component creates a full-screen overlay with confetti animations
 * and surprise messages. It appears when the user double-clicks the avatar.
 * 
 * Features:
 * - Full-screen dark overlay with backdrop blur
 * - Animated surprise messages with bouncing effect
 * - Layered above all other content (z-index 40)
 * - Responsive text sizing for different screen sizes
 * 
 * @param props - Component props
 * @param props.isActive - Whether the confetti overlay is currently active
 * @param props.profile - Profile data containing surprise messages
 * @param props.profile.surpriseText - Main surprise message text
 * @param props.profile.secretFeatureText - Secondary feature discovery text
 */
interface ConfettiOverlayProps {
  isActive: boolean;
  profile: {
    surpriseText: string;
    secretFeatureText: string;
  };
}

export const ConfettiOverlay = ({ isActive, profile }: ConfettiOverlayProps) => {
  // Only render if confetti is active
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="text-center space-y-4 animate-pulse">
        {/* Confetti Emoji - Large bouncing animation */}
        <div className="text-6xl animate-bounce">🎉</div>
        
        {/* Main Surprise Message */}
        <div className="text-2xl sm:text-3xl text-white font-bold animate-bounce">
          {profile.surpriseText}
        </div>
        
        {/* Secondary Feature Discovery Message */}
        <div className="text-lg sm:text-xl text-gray-300">
          {profile.secretFeatureText}
        </div>
        
        {/* Instruction Text for User */}
        <div className="text-sm text-gray-400">
          You triggered confetti by double-clicking the avatar!
        </div>
      </div>
    </div>
  );
}; 