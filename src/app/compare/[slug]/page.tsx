import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getComparison, getAllComparisonSlugs } from '@/lib/mdx'
import { getToolBySlug } from '@/lib/tools'
import ComparisonTable from '@/components/ComparisonTable'
import AffiliateButton from '@/components/AffiliateButton'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllComparisonSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const comparison = getComparison(params.slug)
  if (!comparison) return { title: 'Comparison Not Found' }

  const { frontmatter } = comparison
  return {
    title: `${frontmatter.title} | AI Tool Compare`,
    description: frontmatter.description,
    openGraph: {
      title: `${frontmatter.title} | AI Tool Compare`,
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
  // Simple markdown renderer for MDX content
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)\n(?!<li>)/gs, '<ul>$1</ul>\n')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbul]|<\/[hbul]|<p>)(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[123]>)/g, '$1')
    .replace(/(<\/h[123]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1')
}

export default function ComparePageRoute({ params }: PageProps) {
  const comparison = getComparison(params.slug)
  if (!comparison) notFound()

  const { frontmatter, content } = comparison
  const slugParts = params.slug.split('-vs-')
  const tool1Slug = slugParts[0]
  const tool2Slug = slugParts.slice(1).join('-')

  const tool1 = getToolBySlug(tool1Slug)
  const tool2 = getToolBySlug(tool2Slug)

  if (!tool1 || !tool2) notFound()

  const htmlContent = renderMarkdown(content)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Affiliate Disclosure */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 mb-8 text-sm text-gray-600">
        <strong className="font-semibold text-gray-700">Affiliate disclosure:</strong>{' '}
        This page contains affiliate links. We may earn a commission if you purchase
        through our links — at no extra cost to you.
      </div>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-blue-600">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Comparisons</span>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{frontmatter.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {tool1.logoInitials}
          </div>
          <div className="text-3xl font-extrabold text-gray-400">vs</div>
          <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {tool2.logoInitials}
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {frontmatter.title}
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-3xl">
          {frontmatter.description}
        </p>

        {frontmatter.winner && (
          <div className="mt-6 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2.5 rounded-lg">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span className="font-semibold">Our Pick: {frontmatter.winner}</span>
          </div>
        )}
      </header>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Quick Comparison
        </h2>
        <ComparisonTable tool1={tool1} tool2={tool2} />
      </section>

      {/* MDX Content */}
      <article
        className="prose max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to get started?
        </h2>
        <p className="text-gray-600 mb-6">
          Both tools offer free tiers — try them yourself before committing to a
          paid plan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <AffiliateButton
            url={tool1.affiliateUrl}
            toolName={tool1.name}
            variant="primary"
            size="lg"
            className="flex-1 justify-center"
          />
          <AffiliateButton
            url={tool2.affiliateUrl}
            toolName={tool2.name}
            variant="secondary"
            size="lg"
            className="flex-1 justify-center"
          />
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Affiliate links — we may earn a commission at no extra cost to you.
        </p>
      </section>
    </div>
  )
}
