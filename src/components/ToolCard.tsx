import Link from 'next/link'
import { Tool } from '@/lib/tools'
import AffiliateButton from './AffiliateButton'

interface ToolCardProps {
  tool: Tool
  rank?: number
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalf && (
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm font-medium text-gray-700 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ToolCard({ tool, rank }: ToolCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {rank && (
            <span className="bg-blue-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
              #{rank}
            </span>
          )}
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: '#2563eb' }}
          >
            {tool.logoInitials}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">
              {tool.name}
            </h3>
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
              {tool.category}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tool.tagline}</p>

      <StarRating rating={tool.rating} />

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <span className="font-semibold text-gray-900">
            ${tool.pricing.startingPrice}/mo
          </span>
          {tool.pricing.hasFree && (
            <span className="ml-2 text-xs bg-green-50 text-green-700 font-medium px-2 py-0.5 rounded-full border border-green-200">
              Free tier
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {tool.pros.slice(0, 2).map((pro, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {pro}
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <AffiliateButton url={tool.affiliateUrl} toolName={tool.name} variant="primary" />
        <Link
          href={`/tools/${tool.slug}`}
          className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600"
        >
          Full Review
        </Link>
      </div>
    </div>
  )
}
