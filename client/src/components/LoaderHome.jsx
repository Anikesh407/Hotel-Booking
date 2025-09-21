import React from 'react'
import { assets } from '../assets/assets'

const LoaderHome = () => {
  return (
    <div className="min-h-screen bg-[url('/src/assets/heroImg.png')] bg-no-repeat bg-cover bg-center opacity-93 relative">
      {/* Header Skeleton */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 md:py-6 z-50">
        {/* Logo Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-30 bg-white/20 rounded animate-pulse"></div>
        </div>

        {/* Desktop Nav Skeleton */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col gap-0.5">
              <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
              <div className="h-0.5 w-0 bg-white/20"></div>
            </div>
          ))}
        </div>

        {/* Desktop Right Skeleton */}
        <div className="hidden md:flex items-center gap-4">
          <div className="h-7 w-7 bg-white/20 rounded animate-pulse"></div>
          <div className="h-10 w-20 bg-white/20 rounded-full animate-pulse"></div>
        </div>

        {/* Mobile Menu Button Skeleton */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="h-6 w-6 bg-white/20 rounded animate-pulse"></div>
          <div className="h-4 w-6 bg-white/20 rounded animate-pulse"></div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:32 text-white h-screen pt-20">
        {/* Banner Skeleton */}
        <div className="bg-white/20 px-3.5 py-1 rounded-full mt-20 h-8 w-64 animate-pulse"></div>

        {/* Main Heading Skeleton */}
        <div className="max-w-xl mt-4 space-y-2">
          <div className="h-8 md:h-12 bg-white/20 rounded animate-pulse"></div>
          <div className="h-8 md:h-12 bg-white/20 rounded animate-pulse w-4/5"></div>
          <div className="h-8 md:h-12 bg-white/20 rounded animate-pulse w-3/5"></div>
        </div>

        {/* Description Skeleton */}
        <div className="max-w-130 mt-2 space-y-2">
          <div className="h-4 bg-white/20 rounded animate-pulse"></div>
          <div className="h-4 bg-white/20 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-white/20 rounded animate-pulse w-4/5"></div>
        </div>

        {/* Search Form Skeleton */}
        <div className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto w-full max-w-4xl shadow-lg">
          {/* Destination Input Skeleton */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded border border-gray-200 animate-pulse"></div>
          </div>

          {/* Check In Input Skeleton */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded border border-gray-200 animate-pulse"></div>
          </div>

          {/* Check Out Input Skeleton */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded border border-gray-200 animate-pulse"></div>
          </div>

          {/* Guests Input Skeleton */}
          <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
            <div className="h-4 w-12 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-10 w-16 bg-gray-200 rounded border border-gray-200 animate-pulse"></div>
          </div>

          {/* Search Button Skeleton */}
          <div className="flex items-center justify-center gap-1 rounded-md bg-gray-800 py-3 px-4 my-auto max-md:w-full max-md:py-1">
            <div className="h-7 w-7 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
    </div>
  )
}

export default LoaderHome;
