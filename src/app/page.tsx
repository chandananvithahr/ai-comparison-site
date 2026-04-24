import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedComparisons, getPopularTools } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import AffiliateButton from '@/components/AffiliateButton'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Find the Best AI Video Tool | AI Tool Compare',
  description:
    'Expert comparisons of Runway, Kling, HeyGen, Synthesia, Descript, Opus Clip, Pika, and Captions AI. Find the best AI video tool for your needs with side-by-side analysis.',
}

const bestForCategories = [
  {
    slug: 'youtubers',
    label: 'YouTubers',
    icon: '🎬',
    description: 'Long-form content, tutorials, and vlogs',
  },
  {
    slug: 'social-media',
    label: 'Social Media',
    icon: '📱',
    description: 'TikTok, Reels, and Shorts creators',
  },
]

export default function HomePage() {
  const comparisons = getFeaturedComparisons()
  const popularTools = getPopularTools()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              Updated April 2025 — 8 tools compared
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Find the Best{' '}
              <span className="text-yellow-300">AI Video Tool</span>
              <br />
              for Your Workflow
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Unbiased, side-by-side comparisons of every major AI video tool.
              Expert analysis on pricing, quality, and features — so you can
              choose with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/compare/runway-vs-kling"
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3.5 rounded-xl text-base transition-colors duration-150"
              >
                See Top Comparison
              </Link>
              <Link
                href="/best-for/youtubers"
                className="border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl text-base transition-colors duration-150"
              >
                Best for YouTubers
              </Link>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            {[
              { number: '8', label: 'Tools Reviewed' },
              { number: '3+', label: 'Comparisons' },
              { number: '100%', label: 'Independent' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-white">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Featured Comparisons
          </h2>
          <p className="text-gray-500 text-lg">
            In-depth, side-by-side analyses of the top AI video tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
            >
              {/* Tool logos */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {comp.tool1.logoInitials}
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-gray-400 font-medium text-sm">vs</span>
                </div>
                <div className="w-11 h-11 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {comp.tool2.logoInitials}
                </div>
              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {comp.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {comp.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-3">
                  <span className="text-gray-500">
                    <span className="font-semibold text-gray-800">
                      {comp.tool1.name}
                    </span>{' '}
                    {comp.tool1.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">
                    <span className="font-semibold text-gray-800">
                      {comp.tool2.name}
                    </span>{' '}
                    {comp.tool2.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-blue-600 font-medium group-hover:underline">
                  Compare &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best For Categories */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Find the Right Tool For You
            </h2>
            <p className="text-gray-500 text-lg">
              Curated recommendations based on your specific use case
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {bestForCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/best-for/${cat.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 text-xl mb-1 group-hover:text-blue-600 transition-colors">
                  Best AI Tools for {cat.label}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{cat.description}</p>
                <span className="text-blue-600 font-medium text-sm group-hover:underline">
                  See recommendations &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Top Rated AI Video Tools
          </h2>
          <p className="text-gray-500 text-lg">
            Sorted by our expert rating — updated monthly
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} rank={index + 1} />
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Why Trust Our Comparisons?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Every tool is tested hands-on by our team. We focus on real-world
            use cases, not marketing claims.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              {
                title: 'Hands-On Testing',
                desc: 'We use every tool ourselves and base our reviews on real experience, not spec sheets.',
              },
              {
                title: 'No Paid Reviews',
                desc: 'Our rankings are purely based on performance. We disclose all affiliate relationships.',
              },
              {
                title: 'Regularly Updated',
                desc: 'AI tools evolve fast. We update our comparisons monthly to keep data accurate.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-xl p-5">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Newsletter / CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Not sure where to start?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Read our most popular comparison — Runway vs Kling — and get a
            clear verdict on which AI video generator wins.
          </p>
          <Link
            href="/compare/runway-vs-kling"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors duration-150"
          >
            Read Runway vs Kling &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}
