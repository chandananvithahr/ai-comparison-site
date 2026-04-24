import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="bg-blue-600 text-white font-bold text-sm px-2 py-1 rounded">
                AI
              </span>
              <span className="font-bold text-white text-lg">ToolCompare</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Unbiased, expert comparisons of the best AI video tools to help
              you make the right choice for your creative workflow.
            </p>
          </div>

          {/* Comparisons */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Comparisons
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/compare/runway-vs-kling"
                  className="hover:text-blue-400"
                >
                  Runway vs Kling
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/heygen-vs-synthesia"
                  className="hover:text-blue-400"
                >
                  HeyGen vs Synthesia
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/descript-vs-opus-clip"
                  className="hover:text-blue-400"
                >
                  Descript vs Opus Clip
                </Link>
              </li>
            </ul>
          </div>

          {/* Best For */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Best For
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/best-for/youtubers"
                  className="hover:text-blue-400"
                >
                  Best for YouTubers
                </Link>
              </li>
              <li>
                <Link
                  href="/best-for/social-media"
                  className="hover:text-blue-400"
                >
                  Best for Social Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Tools Reviewed
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/runway" className="hover:text-blue-400">
                  Runway
                </Link>
              </li>
              <li>
                <Link href="/tools/kling" className="hover:text-blue-400">
                  Kling
                </Link>
              </li>
              <li>
                <Link href="/tools/heygen" className="hover:text-blue-400">
                  HeyGen
                </Link>
              </li>
              <li>
                <Link href="/tools/synthesia" className="hover:text-blue-400">
                  Synthesia
                </Link>
              </li>
              <li>
                <Link href="/tools/descript" className="hover:text-blue-400">
                  Descript
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AI Tool Compare. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-500 text-center max-w-md">
            <strong className="text-gray-400">Affiliate Disclosure:</strong>{' '}
            This site may earn commissions from links to tools we review.
            Opinions are our own.
          </p>
        </div>
      </div>
    </footer>
  )
}
