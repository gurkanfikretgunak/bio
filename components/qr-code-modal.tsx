'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  profile?: {
    name: string;
    title: string;
    avatar: string;
  };
}

export function QRCodeModal({ isOpen, onClose, url, title = "QR Code", profile }: QRCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready before starting animation
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, url, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        }, (error) => {
          if (error) {
            setError('Failed to generate QR code');
            console.error('QR code generation failed:', error);
          } else {
            setError(null);
          }
        });
      }
    } else if (shouldRender) {
      // Start closing animation
      setIsAnimating(false);
      // Remove from DOM after animation completes
      setTimeout(() => {
        setShouldRender(false);
      }, 500);
    }
  }, [isOpen, url, shouldRender]);

  const handleClose = () => {
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 p-4">
      {/* Animated Background with Blur */}
      <div 
        className={`absolute inset-0 backdrop-blur-sm transition-all duration-500 ${
          isAnimating ? 'bg-black/30' : 'bg-black/0'
        }`}
        style={{
          background: isAnimating 
            ? 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)'
            : 'transparent'
        }}
        onClick={handleClose}
      >
        {/* Animated waves */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      {/* Modal Content */}
      <div className="flex items-center justify-center min-h-full">
        <div 
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full mx-4 relative transform transition-all duration-500 ease-out ${
            isAnimating 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-full opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Profile Header */}
          {profile && (
            <div className="flex items-center gap-3 p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <Avatar className="w-12 h-12 ring-2 ring-blue-100 dark:ring-blue-900">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {profile.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {profile.title}
                </p>
              </div>
            </div>
          )}
          
          <div className="p-6">
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h4>
              
              <div className="flex justify-center mb-4">
                {error ? (
                  <div className="text-red-500 text-sm">{error}</div>
                ) : (
                  <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700">
                    <canvas ref={canvasRef} className="block rounded-lg" />
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Scan this QR code to visit this profile
              </p>
            </div>
            
                         <div className="flex gap-3">
               <Button
                 onClick={handleClose}
                 variant="outline"
                 className="flex-1 h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
               >
                 Close
               </Button>
               <Button
                 onClick={() => {
                   if (canvasRef.current) {
                     try {
                       const link = document.createElement('a');
                       link.download = 'qr-code.png';
                       link.href = canvasRef.current.toDataURL('image/png');
                       document.body.appendChild(link);
                       link.click();
                       document.body.removeChild(link);
                     } catch (error) {
                       console.error('Download failed:', error);
                     }
                   }
                 }}
                 className="flex-1 h-9 bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
               >
                 Download
               </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
} 