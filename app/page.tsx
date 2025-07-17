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
import { useState, useEffect } from "react";

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
  
  useEffect(() => {
    setPlatform(getPlatformInfo());
  }, []);
  
  const handleQRClick = (url: string) => {
    setQrUrl(url);
    setIsQRModalOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Profile Section */}
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto ring-4 ring-white dark:ring-gray-700">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-lg font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{profile.name}</h1>
              {profile.verified && (
                <div className="w-5 h-5 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 font-medium">Full Stack Developer</p>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Links - Icon Only */}
        <div className="space-y-2">
          <div className="px-4">
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex justify-center gap-3">
            {links.filter(link => !link.featured).map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap] || ExternalLink;
              
              return (
                <div key={link.id} className="relative group">
                  {link.id === 'qrcode' ? (
                    <button
                      onClick={() => handleQRClick(link.url)}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all duration-200"
                    >
                      <IconComponent 
                        className="w-5 h-5 text-gray-700 dark:text-white" 
                      />
                    </button>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all duration-200"
                    >
                      <IconComponent 
                        className="w-5 h-5 text-gray-700 dark:text-white" 
                      />
                    </a>
                  )}
                  {/* Hover Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    {link.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Platform Detection */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Viewed from {platform}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 bg-white dark:bg-gray-900">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
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
          
          <div className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
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
        title="Share Profile"
        profile={{
          name: profile.name,
          title: "Full Stack Developer",
          avatar: profile.avatar
        }}
      />
    </div>
  );
}
