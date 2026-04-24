import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'AI Video Tool Comparison | Find the Best AI Video Tool',
    template: '%s | AI Tool Compare',
  },
  description:
    'Compare the best AI video tools side-by-side. Find the right AI video generator, editor, or avatar platform for your needs with expert reviews and pricing.',
  keywords: [
    'AI video tools',
    'AI video generator comparison',
    'best AI video tools',
    'Runway vs Kling',
    'HeyGen vs Synthesia',
    'AI video editing',
  ],
  authors: [{ name: 'AI Tool Compare' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aitoolcompare.com',
    siteName: 'AI Tool Compare',
    title: 'AI Video Tool Comparison | Find the Best AI Video Tool',
    description:
      'Compare the best AI video tools side-by-side. Expert reviews, pricing comparisons, and unbiased recommendations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Video Tool Comparison | Find the Best AI Video Tool',
    description:
      'Compare the best AI video tools side-by-side. Expert reviews and pricing comparisons.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
