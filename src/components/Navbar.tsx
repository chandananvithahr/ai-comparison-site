'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-blue-600 text-white font-bold text-sm px-2 py-1 rounded">
              AI
            </span>
            <span className="font-bold text-gray-900 text-lg">
              ToolCompare
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 font-medium text-sm"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center gap-1">
                Comparisons
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <div className="py-2">
                  <Link
                    href="/compare/runway-vs-kling"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Runway vs Kling
                  </Link>
                  <Link
                    href="/compare/heygen-vs-synthesia"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    HeyGen vs Synthesia
                  </Link>
                  <Link
                    href="/compare/descript-vs-opus-clip"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Descript vs Opus Clip
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center gap-1">
                Best For
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <div className="py-2">
                  <Link
                    href="/best-for/youtubers"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Best for YouTubers
                  </Link>
                  <Link
                    href="/best-for/social-media"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Best for Social Media
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <div className="py-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Comparisons
              </p>
              <Link
                href="/compare/runway-vs-kling"
                className="block py-2 pl-3 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileOpen(false)}
              >
                Runway vs Kling
              </Link>
              <Link
                href="/compare/heygen-vs-synthesia"
                className="block py-2 pl-3 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileOpen(false)}
              >
                HeyGen vs Synthesia
              </Link>
              <Link
                href="/compare/descript-vs-opus-clip"
                className="block py-2 pl-3 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileOpen(false)}
              >
                Descript vs Opus Clip
              </Link>
            </div>
            <div className="py-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Best For
              </p>
              <Link
                href="/best-for/youtubers"
                className="block py-2 pl-3 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileOpen(false)}
              >
                Best for YouTubers
              </Link>
              <Link
                href="/best-for/social-media"
                className="block py-2 pl-3 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileOpen(false)}
              >
                Best for Social Media
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
