import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getToolBySlug, tools } from '@/lib/tools'
import { getToolContent } from '@/lib/mdx'
import AffiliateButton from '@/components/AffiliateButton'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug)
  if (!tool) return { title: 'Tool Not Found' }

  return {
    title: `${tool.name} Review ${new Date().getFullYear()} — Pricing, Features & Rating | AI Tool Compare`,
    description: `In-depth ${tool.name} review. ${tool.tagline}. Starting from $${tool.pricing.startingPrice}/mo. ${tool.pricing.hasFree ? 'Free tier available.' : ''}`,
    openGraph: {
      title: `${tool.name} Review | AI Tool Compare`,
      description: tool.tagline,
      type: 'article',
    },
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-lg font-bold text-gray-800 ml-1">
        {rating.toFixed(1)}/5
      </span>
    </div>
  )
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  const mdxContent = getToolContent(params.slug)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Tools</span>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <header className="mb-10">
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
            style={{ backgroundColor: '#2563eb' }}
          >
            {tool.logoInitials}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
              {tool.name}
            </h1>
            <p className="text-lg text-gray-500 mb-3">{tool.tagline}</p>
            <span className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
              {tool.category}
            </span>
          </div>
        </div>

        <StarRating rating={tool.rating} />
      </header>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Starting Price', value: `$${tool.pricing.startingPrice}/mo` },
          { label: 'Free Tier', value: tool.pricing.hasFree ? 'Yes' : 'No' },
          { label: 'Category', value: tool.category },
          { label: 'Our Rating', value: `${tool.rating.toFixed(1)} / 5` },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"
          >
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {item.label}
            </div>
            <div className="font-bold text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pros
          </h2>
          <ul className="space-y-3">
            {tool.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cons
          </h2>
          <ul className="space-y-3">
            {tool.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <span className="text-3xl font-extrabold text-gray-900">
              ${tool.pricing.startingPrice}
            </span>
            <span className="text-gray-500">/month</span>
          </div>
          {tool.pricing.hasFree && (
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1.5 rounded-full border border-green-200">
              Free tier: {tool.pricing.freeLabel}
            </span>
          )}
        </div>
      </section>

      {/* MDX content (if available) */}
      {mdxContent && (
        <article className="prose max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{
              __html: mdxContent.content
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/^- (.+)$/gm, '<li>$1</li>')
                .replace(/\n\n/g, '</p><p>'),
            }}
          />
        </article>
      )}

      {/* CTA */}
      <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">
          Ready to try {tool.name}?
        </h2>
        <p className="text-blue-100 mb-6">
          {tool.pricing.hasFree
            ? `Start for free with ${tool.pricing.freeLabel} — no credit card needed.`
            : `Plans start from $${tool.pricing.startingPrice}/month.`}
        </p>
        <AffiliateButton
          url={tool.affiliateUrl}
          toolName={tool.name}
          variant="outline"
          size="lg"
        />
        <p className="text-xs text-blue-200 mt-4">
          * Affiliate link — we may earn a commission at no extra cost to you.
        </p>
      </div>
    </div>
  )
}
