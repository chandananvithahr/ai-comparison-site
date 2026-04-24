import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBestForContent, getAllBestForSlugs } from '@/lib/mdx'
import { getToolsByBestFor } from '@/lib/tools'
import AffiliateButton from '@/components/AffiliateButton'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllBestForSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = getBestForContent(params.slug)
  if (!content) return { title: 'Category Not Found' }

  const { frontmatter } = content
  return {
    title: `${frontmatter.title} | AI Tool Compare`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
    },
  }
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbulp]|<\/[hbulp])(.+)/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[123]>)/g, '$1')
    .replace(/(<\/h[123]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
}

const categoryLabels: Record<string, string> = {
  youtubers: 'YouTubers',
  'social-media': 'Social Media Creators',
  filmmakers: 'Filmmakers',
  podcasters: 'Podcasters',
  business: 'Business',
  beginners: 'Beginners',
  elearning: 'E-Learning',
}

export default function BestForPage({ params }: PageProps) {
  const content = getBestForContent(params.slug)
  if (!content) notFound()

  const { frontmatter, content: mdxContent } = content
  const rankedTools = getToolsByBestFor(params.slug)
  const categoryLabel = categoryLabels[params.slug] || params.slug
  const htmlContent = renderMarkdown(mdxContent)

  const winner = rankedTools[0]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Best For</span>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{categoryLabel}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {frontmatter.title}
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          {frontmatter.description}
        </p>
      </header>

      {/* Winner Banner */}
      {winner && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏆</span>
            <span className="text-sm font-bold text-yellow-700 uppercase tracking-wide">
              Our Top Pick for {categoryLabel}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {winner.logoInitials}
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {winner.name}
              </h2>
              <p className="text-gray-600 text-sm">{winner.tagline}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-amber-600 font-semibold">
                  {winner.rating.toFixed(1)}/5
                </span>
                <span className="text-gray-400 text-sm">|</span>
                <span className="text-gray-600 text-sm">
                  From ${winner.pricing.startingPrice}/mo
                </span>
                {winner.pricing.hasFree && (
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    Free tier
                  </span>
                )}
              </div>
            </div>
            <AffiliateButton
              url={winner.affiliateUrl}
              toolName={winner.name}
              variant="primary"
              size="md"
              className="flex-shrink-0"
            />
          </div>
        </div>
      )}

      {/* Ranked list */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          All Tools Ranked for {categoryLabel}
        </h2>
        <div className="space-y-4">
          {rankedTools.map((tool, index) => (
            <div
              key={tool.slug}
              className={`bg-white border rounded-xl p-5 flex items-center gap-5 hover:shadow-sm transition-shadow ${
                index === 0
                  ? 'border-blue-300 ring-2 ring-blue-100'
                  : 'border-gray-200'
              }`}
            >
              {/* Rank badge */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  index === 0
                    ? 'bg-yellow-400 text-yellow-900'
                    : index === 1
                    ? 'bg-gray-300 text-gray-700'
                    : index === 2
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                #{index + 1}
              </div>

              {/* Logo */}
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {tool.logoInitials}
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900">{tool.name}</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">
                    {tool.category}
                  </span>
                  {index === 0 && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-medium">
                      Best Pick
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-0.5 truncate">
                  {tool.tagline}
                </p>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="font-semibold text-amber-600">
                    {tool.rating.toFixed(1)}/5
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">
                    From ${tool.pricing.startingPrice}/mo
                  </span>
                  {tool.pricing.hasFree && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      Free tier
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-sm text-blue-600 font-medium hover:underline hidden sm:block"
                >
                  Review
                </Link>
                <AffiliateButton
                  url={tool.affiliateUrl}
                  toolName={tool.name}
                  variant="primary"
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MDX Content */}
      <article
        className="prose max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Bottom CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">
          Compare tools head-to-head
        </h2>
        <p className="text-gray-400 mb-6">
          Read our detailed side-by-side comparisons with pricing and feature
          breakdowns.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/compare/runway-vs-kling"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Runway vs Kling
          </Link>
          <Link
            href="/compare/heygen-vs-synthesia"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            HeyGen vs Synthesia
          </Link>
        </div>
      </div>
    </div>
  )
}
