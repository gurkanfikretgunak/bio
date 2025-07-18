'use client';

import React from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  title?: string;
  message?: string;
  errorCode?: string;
  showRetry?: boolean;
}

export function ErrorDialog({
  isOpen,
  onClose,
  onRetry,
  title = "Connection Error",
  message = "Unable to connect to the server. Please check your internet connection and try again.",
  errorCode,
  showRetry = true
}: ErrorDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 relative transform transition-all duration-300 ease-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
            </div>
          </div>

          {/* Error Title */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
            {title}
          </h2>

          {/* Error Message */}
          <p className="text-gray-600 dark:text-gray-300 text-center mb-4 leading-relaxed">
            {message}
          </p>

          {/* Error Code */}
          {errorCode && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-medium">Error Code:</span> {errorCode}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            {showRetry && onRetry && (
              <Button
                onClick={onRetry}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6 py-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 