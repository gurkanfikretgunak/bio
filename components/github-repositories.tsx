'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { QRCodeModal } from '@/components/qr-code-modal';
import { 
  Github, 
  Star, 
  GitFork, 
  Eye, 
  QrCode,
  ExternalLink,
  Heart
} from 'lucide-react';
import bioData from "../data/bio.json";

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  languageColor: string;
  updatedAt: string;
  isPrivate: boolean;
}



const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'bio',
    description: 'Modern biolink application built with Next.js and TypeScript',
    url: 'https://github.com/gurkanfikretgunak/bio',
    stars: 45,
    forks: 12,
    watchers: 8,
    language: 'TypeScript',
    languageColor: '#3178c6',
    updatedAt: '2 days ago',
    isPrivate: false
  },
  {
    id: '2',
    name: 'web-scraper',
    description: 'Powerful web scraping tool with automation capabilities',
    url: 'https://github.com/gurkanfikretgunak/web-scraper',
    stars: 123,
    forks: 28,
    watchers: 15,
    language: 'Python',
    languageColor: '#3776ab',
    updatedAt: '1 week ago',
    isPrivate: false
  },
  {
    id: '3',
    name: 'react-components',
    description: 'Reusable React components library with TypeScript support',
    url: 'https://github.com/gurkanfikretgunak/react-components',
    stars: 89,
    forks: 24,
    watchers: 12,
    language: 'JavaScript',
    languageColor: '#f1e05a',
    updatedAt: '3 days ago',
    isPrivate: false
  },
  {
    id: '4',
    name: 'api-gateway',
    description: 'Microservices API gateway with authentication and rate limiting',
    url: 'https://github.com/gurkanfikretgunak/api-gateway',
    stars: 67,
    forks: 15,
    watchers: 9,
    language: 'Go',
    languageColor: '#00add8',
    updatedAt: '5 days ago',
    isPrivate: false
  }
];



export function GitHubRepositories() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [qrTitle, setQrTitle] = useState('');
  const { favorites, profile } = bioData;

  const handleQRClick = (url: string, title: string) => {
    setQrUrl(url);
    setQrTitle(title);
    setIsQRModalOpen(true);
  };

  return (
    <div className="w-full p-3 sm:p-4 md:p-6">

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Repositories Section */}
        <div className="xl:col-span-2 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              Repositories
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 self-start sm:self-auto text-xs sm:text-sm px-2 sm:px-3"
              onClick={() => window.open(`https://github.com/${profile.username}`, '_blank')}
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
            </Button>
          </div>

                     <div className="space-y-2 sm:space-y-3">
             {mockRepositories.map((repo) => (
               <Card key={repo.id} className="hover:shadow-md transition-shadow">
                 <CardContent className="p-2 sm:p-3 md:p-4">
                   <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                     <div className="flex-1 min-w-0">
                       <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                         <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer truncate">
                           {repo.name}
                         </h3>
                         {repo.isPrivate && (
                           <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-1 sm:px-2 py-0.5 sm:py-1 rounded self-start">
                             Private
                           </span>
                         )}
                       </div>
                       <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2">
                         {repo.description}
                       </p>
                       <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4 text-xs text-gray-500 dark:text-gray-400">
                         <div className="flex items-center gap-1">
                           <div 
                             className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                             style={{ backgroundColor: repo.languageColor }}
                           />
                           <span className="truncate text-xs">{repo.language}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <Star className="w-3 h-3" />
                           <span className="text-xs">{repo.stars}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <GitFork className="w-3 h-3" />
                           <span className="text-xs">{repo.forks}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <Eye className="w-3 h-3" />
                           <span className="text-xs">{repo.watchers}</span>
                         </div>
                         <span className="hidden md:inline text-xs">Updated {repo.updatedAt}</span>
                         <span className="md:hidden text-xs">{repo.updatedAt}</span>
                       </div>
                     </div>
                     <div className="flex items-center gap-1 sm:gap-2 sm:ml-4 self-start">
                       <Button
                         variant="outline"
                         size="sm"
                         onClick={() => handleQRClick(repo.url, repo.name)}
                         className="flex items-center gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5"
                       >
                         <QrCode className="w-3 h-3 sm:w-4 sm:h-4" />
                         <span className="hidden sm:inline text-xs">QR</span>
                       </Button>
                       <Button
                         variant="outline"
                         size="sm"
                         onClick={() => window.open(repo.url, '_blank')}
                         className="flex items-center gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5"
                       >
                         <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                         <span className="hidden sm:inline text-xs">View</span>
                       </Button>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
        </div>

        {/* Vertical Separator */}
        <div className="hidden xl:block xl:col-span-1 relative">
          <div className="absolute left-0 top-0 bottom-0 flex items-center">
            <Separator orientation="vertical" className="h-full bg-gray-200 dark:bg-gray-700" />
          </div>
          
          {/* Favorites Section */}
          <div className="ml-3 sm:ml-4 lg:ml-6 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500" />
              <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 dark:text-white">
                Favorites
              </h2>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {favorites.map((repo) => (
                <Card 
                  key={repo.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleQRClick(repo.url, repo.name)}
                >
                  <CardContent className="p-2 sm:p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white mb-1 truncate">
                          {repo.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {repo.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: repo.languageColor }}
                              />
                              <span className="truncate text-xs">{repo.language}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span className="text-xs">{repo.stars}</span>
                            </div>
                          </div>
                          <QrCode className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Separator and Favorites */}
        <div className="xl:hidden">
          <Separator className="my-3 sm:my-4 md:my-6 bg-gray-200 dark:bg-gray-700" />
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-500" />
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                Favorites
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {favorites.map((repo) => (
                <Card 
                  key={repo.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleQRClick(repo.url, repo.name)}
                >
                  <CardContent className="p-2 sm:p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white mb-1 truncate">
                          {repo.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {repo.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: repo.languageColor }}
                              />
                              <span className="truncate text-xs">{repo.language}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span className="text-xs">{repo.stars}</span>
                            </div>
                          </div>
                          <QrCode className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        url={qrUrl}
        title={`Repository: ${qrTitle}`}
        profile={{
          name: profile.name,
          title: "Full Stack Developer",
          avatar: profile.avatar
        }}
      />
    </div>
  );
} 