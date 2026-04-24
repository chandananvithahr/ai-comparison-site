import { Tool } from '@/lib/tools'
import AffiliateButton from './AffiliateButton'

interface ComparisonTableProps {
  tool1: Tool
  tool2: Tool
}

function CheckIcon({ value }: { value: boolean }) {
  return value ? (
    <svg
      className="w-5 h-5 text-green-500 mx-auto"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ) : (
    <svg
      className="w-5 h-5 text-red-400 mx-auto"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

function RatingBar({ rating, max = 5 }: { rating: number; max?: number }) {
  const pct = (rating / max) * 100
  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-800">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

interface RowProps {
  label: string
  val1: React.ReactNode
  val2: React.ReactNode
  highlight?: boolean
}

function Row({ label, val1, val2, highlight }: RowProps) {
  return (
    <tr className={highlight ? 'bg-blue-50' : 'bg-white even:bg-gray-50'}>
      <td className="px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-200">
        {label}
      </td>
      <td className="px-4 py-3 text-sm text-center text-gray-800 border-b border-gray-200">
        {val1}
      </td>
      <td className="px-4 py-3 text-sm text-center text-gray-800 border-b border-gray-200">
        {val2}
      </td>
    </tr>
  )
}

export default function ComparisonTable({ tool1, tool2 }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="px-4 py-4 text-left text-sm font-semibold w-1/3">
              Feature
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold w-1/3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
                  {tool1.logoInitials}
                </div>
                <span>{tool1.name}</span>
              </div>
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold w-1/3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">
                  {tool2.logoInitials}
                </div>
                <span>{tool2.name}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <Row
            label="Category"
            val1={tool1.category}
            val2={tool2.category}
          />
          <Row
            label="Starting Price"
            val1={<span className="font-semibold">${tool1.pricing.startingPrice}/mo</span>}
            val2={<span className="font-semibold">${tool2.pricing.startingPrice}/mo</span>}
          />
          <Row
            label="Free Tier"
            val1={
              tool1.pricing.hasFree ? (
                <span className="text-green-700 font-medium">
                  {tool1.pricing.freeLabel}
                </span>
              ) : (
                <span className="text-red-500">No free tier</span>
              )
            }
            val2={
              tool2.pricing.hasFree ? (
                <span className="text-green-700 font-medium">
                  {tool2.pricing.freeLabel}
                </span>
              ) : (
                <span className="text-red-500">No free tier</span>
              )
            }
          />
          <Row
            label="Has Free Plan"
            val1={<CheckIcon value={tool1.pricing.hasFree} />}
            val2={<CheckIcon value={tool2.pricing.hasFree} />}
          />
          <Row
            label="Our Rating"
            val1={<RatingBar rating={tool1.rating} />}
            val2={<RatingBar rating={tool2.rating} />}
            highlight
          />

          {/* Pros section */}
          <tr className="bg-green-50">
            <td
              colSpan={3}
              className="px-4 py-2 text-xs font-bold text-green-800 uppercase tracking-wide border-b border-gray-200"
            >
              Strengths
            </td>
          </tr>
          {[0, 1, 2].map((i) => (
            <Row
              key={`pro-${i}`}
              label={`Pro ${i + 1}`}
              val1={
                <div className="flex items-start gap-2 text-left">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs">{tool1.pros[i]}</span>
                </div>
              }
              val2={
                <div className="flex items-start gap-2 text-left">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs">{tool2.pros[i]}</span>
                </div>
              }
            />
          ))}

          {/* Cons section */}
          <tr className="bg-red-50">
            <td
              colSpan={3}
              className="px-4 py-2 text-xs font-bold text-red-700 uppercase tracking-wide border-b border-gray-200"
            >
              Weaknesses
            </td>
          </tr>
          {[0, 1, 2].map((i) => (
            <Row
              key={`con-${i}`}
              label={`Con ${i + 1}`}
              val1={
                <div className="flex items-start gap-2 text-left">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-xs">{tool1.cons[i]}</span>
                </div>
              }
              val2={
                <div className="flex items-start gap-2 text-left">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-xs">{tool2.cons[i]}</span>
                </div>
              }
            />
          ))}

          {/* CTA row */}
          <tr className="bg-gray-50">
            <td className="px-4 py-5 text-sm font-semibold text-gray-700 border-t border-gray-200">
              Get Started
            </td>
            <td className="px-4 py-5 text-center border-t border-gray-200">
              <AffiliateButton
                url={tool1.affiliateUrl}
                toolName={tool1.name}
                variant="primary"
                size="sm"
              />
            </td>
            <td className="px-4 py-5 text-center border-t border-gray-200">
              <AffiliateButton
                url={tool2.affiliateUrl}
                toolName={tool2.name}
                variant="secondary"
                size="sm"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
