import React from "react"
import { Skeleton } from "./skeleton"

export function FeaturedLinksSkeleton() {
  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Featured Links Skeleton */}
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="px-2 sm:px-4">
          <Skeleton className="h-12 sm:h-14 w-full rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export function AdditionalLinksSkeleton() {
  return (
    <div className="space-y-2">
      {/* Separator Skeleton */}
      <div className="px-2 sm:px-4">
        <Skeleton className="h-px w-full my-3 sm:my-4" />
      </div>
      
      {/* Additional Links Skeleton */}
      {[1, 2, 3].map((index) => (
        <div key={index} className="px-2 sm:px-4">
          <Skeleton className="h-12 sm:h-14 w-full rounded-lg" />
        </div>
      ))}
      
      {/* Platform Detection Skeleton */}
      <div className="px-2 sm:px-4 pt-2">
        <div className="text-center space-y-2">
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
          <div className="flex justify-center space-x-3">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function FooterSkeleton() {
  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6">
      <div className="max-w-md mx-auto text-center space-y-2">
        <Skeleton className="h-4 w-40 mx-auto" />
        <Skeleton className="h-3 w-24 mx-auto" />
      </div>
    </div>
  )
} 