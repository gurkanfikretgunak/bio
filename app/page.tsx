'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  MapPin, 
  Globe,
  FileText,
  User,
  MessageCircle,
  QrCode
} from "lucide-react";
import bioData from "../data/bio.json";
import { ThemeToggle } from "@/components/theme-toggle";
import { XIcon } from "@/components/icons/x-icon";
import { QRCodeModal } from "@/components/qr-code-modal";
import { SplashScreen } from "@/components/splash-screen";
import { GitHubRepositories } from "@/components/github-repositories";
import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: XIcon,
  email: Mail,
  portfolio: User,
  blog: FileText,
  website: Globe,
  contact: MessageCircle,
  qrcode: QrCode,
};

// Platform detection utility
const getPlatformInfo = () => {
  if (typeof window === 'undefined') return 'Unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    return 'iOS';
  } else if (userAgent.includes('android')) {
    return 'Android';
  } else if (userAgent.includes('mac')) {
    return 'macOS';
  } else if (userAgent.includes('win')) {
    return 'Windows';
  } else if (userAgent.includes('linux')) {
    return 'Linux';
  } else {
    return 'Web';
  }
};

export default function Home() {
  const { profile, links, footer } = bioData;
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [platform, setPlatform] = useState('Unknown');
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [isRGBActive, setIsRGBActive] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  
  useEffect(() => {
    setPlatform(getPlatformInfo());
  }, []);
  
  const handleSplashComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };
  
  const handleQRClick = (url: string) => {
    setQrUrl(url);
    setIsQRModalOpen(true);
  };

  const handleAvatarClick = () => {
    if (avatarClicks === 0) {
      // First click - Start RGB animation
      setIsRGBActive(true);
      setAvatarClicks(1);
      
      // Stop RGB animation after 5 seconds
      setTimeout(() => {
        setIsRGBActive(false);
        setAvatarClicks(0);
      }, 5000);
    } else if (avatarClicks === 1) {
      // Second click - Confetti and page darkening effect
      setIsConfettiActive(true);
      setIsRGBActive(false);
      setAvatarClicks(0);
      
      // Confetti explosion
      const duration = 3000;
      const end = Date.now() + duration;
      
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#ff9ff3', '#54a0ff'];
      
      // Initial big explosion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });
      
      // Continuous small explosions
      (function frame() {
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
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      
      // Clear effects after 3 seconds
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 3000);
    }
  };
  
  // Show splash screen while loading
  if (isLoading) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-all duration-500 flex flex-col ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Confetti Overlay */}
      {isConfettiActive && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-center space-y-4 animate-pulse">
            <div className="text-6xl animate-bounce">🎉</div>
            <div className="text-2xl sm:text-3xl text-white font-bold animate-bounce">
              {profile.surpriseText}
            </div>
            <div className="text-lg sm:text-xl text-gray-300">
              {profile.secretFeatureText}
            </div>
            <div className="text-sm text-gray-400">
              You triggered confetti by double-clicking the avatar!
            </div>
          </div>
        </div>
      )}
      
      {/* Theme Toggle */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
        {/* Profile Section */}
        <div className="text-center space-y-3 sm:space-y-4">
                      <div className="relative cursor-pointer group flex justify-center" onClick={handleAvatarClick}>
              <Avatar className={`w-20 h-20 sm:w-24 sm:h-24 ring-2 sm:ring-4 ${isRGBActive ? 'ring-transparent shadow-lg shadow-blue-500/50' : 'ring-white dark:ring-gray-700'} transition-all duration-300 group-hover:scale-105 relative z-20`}>
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-base sm:text-lg font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isRGBActive && (
                <div className="absolute w-28 h-28 sm:w-32 sm:h-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full rgb-circle z-10 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900"></div>
                </div>
              )}
              {/* Hover hint */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {avatarClicks === 0 ? profile.clickMeText : profile.clickAgainText}
              </div>
            </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{profile.name}</h1>
              {profile.verified && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">{profile.title}</p>
            
            <a 
              href={profile.company.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <Image 
                src={profile.company.icon} 
                alt="Company" 
                width={14} 
                height={14} 
                className="filter brightness-0 dark:brightness-100 sm:w-4 sm:h-4"
              />
              <span>{profile.company.name}</span>
            </a>
            
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">{profile.bio}</p>
            
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{profile.location}</span>
              </div>
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

        {/* Links Section */}
        <div className="space-y-2">
          {links.filter(link => link.featured).map((link) => {
            const IconComponent = iconMap[link.icon as keyof typeof iconMap] || ExternalLink;
            
            return (
              <Card key={link.id} className="border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
                <CardContent className="p-0">
                  {link.id === 'github' ? (
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full">
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: link.color }}
                      >
                        <IconComponent 
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate">{link.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{link.description}</p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsGitHubModalOpen(true)}
                          className="text-xs px-2 sm:px-3 py-1 sm:py-1.5"
                        >
                          <span className="hidden sm:inline">Show Repos</span>
                          <span className="sm:hidden">Repos</span>
                        </Button>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 w-full text-left transition-colors rounded-lg"
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: link.color }}
                      >
                        <IconComponent 
                          className="w-5 h-5 text-white" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{link.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{link.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Links - Icon Only */}
        <div className="space-y-2">
          <div className="px-2 sm:px-4">
            <Separator className="my-3 sm:my-4 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex justify-center gap-2 sm:gap-3">
            {links.filter(link => !link.featured).map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap] || ExternalLink;
              
              return (
                <div key={link.id} className="relative group">
                  {link.id === 'qrcode' ? (
                    <button
                      onClick={() => handleQRClick(link.url)}
                      className="inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all duration-200"
                    >
                      <IconComponent 
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white" 
                      />
                    </button>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all duration-200"
                    >
                      <IconComponent 
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white" 
                      />
                    </a>
                  )}
                  {/* Hover Tooltip */}
                  <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    {link.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Platform Detection */}
          <div className="text-center mt-3 sm:mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {profile.viewedFromText} {platform}
            </p>
          </div>
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

      {/* GitHub Repositories Modal */}
      {isGitHubModalOpen && (
        <div className="fixed inset-0 z-50 p-1 sm:p-2 md:p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsGitHubModalOpen(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-2xl max-w-7xl w-full mx-auto my-1 sm:my-2 md:my-4 lg:my-8 max-h-[98vh] sm:max-h-[96vh] md:max-h-[90vh] overflow-hidden">
            <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.repositoriesTitle}
                  </h2>
                </div>
                <button
                  onClick={() => setIsGitHubModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[calc(98vh-60px)] sm:max-h-[calc(96vh-80px)] md:max-h-[calc(90vh-100px)]">
              <GitHubRepositories />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
