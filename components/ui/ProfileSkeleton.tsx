import React from "react"
import { Skeleton } from "./skeleton"

export function ProfileSkeleton() {
  return (
    <div className="text-center space-y-3 sm:space-y-4">
      {/* Avatar Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
      </div>
      
      {/* Name Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 mx-auto" />
        <Skeleton className="h-5 w-32 mx-auto" />
      </div>
      
      {/* Bio Skeleton */}
      <div className="space-y-2 px-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
      
      {/* Location and Website Skeleton */}
      <div className="flex justify-center space-x-6">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
} 