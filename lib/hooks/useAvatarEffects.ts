import { useState } from 'react';
import confetti from 'canvas-confetti';

/**
 * Custom hook for managing avatar interaction effects
 * 
 * This hook handles the complex avatar interaction logic including:
 * - RGB circle animation on first click
 * - Confetti explosion on second click
 * - State management for both effects
 * - Automatic cleanup and reset timers
 * 
 * @returns Object containing state and handlers for avatar effects
 */
export const useAvatarEffects = () => {
  // Track number of avatar clicks for different effects
  const [avatarClicks, setAvatarClicks] = useState(0);
  
  // State for RGB circle animation around avatar
  const [isRGBActive, setIsRGBActive] = useState(false);
  
  // State for confetti overlay and page darkening effect
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  /**
   * Handles avatar click interactions
   * 
   * First click: Activates RGB circle animation for 5 seconds
   * Second click: Triggers confetti explosion with page overlay for 3 seconds
   * 
   * The click counter resets after each effect completes
   */
  const handleAvatarClick = () => {
    if (avatarClicks === 0) {
      // First click - Start RGB animation
      setIsRGBActive(true);
      setAvatarClicks(1);
      
      // Auto-stop RGB animation after 5 seconds
      setTimeout(() => {
        setIsRGBActive(false);
        setAvatarClicks(0);
      }, 5000);
      
    } else if (avatarClicks === 1) {
      // Second click - Confetti explosion and page darkening
      setIsConfettiActive(true);
      setIsRGBActive(false);
      setAvatarClicks(0);
      
      // Confetti configuration
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#ff9ff3', '#54a0ff'];
      
      // Initial big explosion from center
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });
      
      // Continuous small explosions animation
      (function frame() {
        // Side explosions
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        
        // Falling confetti from top
        confetti({
          particleCount: 3,
          angle: 90,
          spread: 45,
          origin: { x: Math.random(), y: 0 },
          colors: colors
        });
        
        // Continue animation until duration ends
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      
      // Clear overlay effect after 3 seconds
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 3000);
    }
  };

  return {
    avatarClicks,
    isRGBActive,
    isConfettiActive,
    handleAvatarClick
  };
}; 