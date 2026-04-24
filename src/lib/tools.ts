export interface ToolPricing {
  startingPrice: number
  hasFree: boolean
  freeLabel?: string
  paidLabel?: string
}

export interface Tool {
  name: string
  slug: string
  tagline: string
  pricing: ToolPricing
  pros: [string, string, string]
  cons: [string, string, string]
  rating: number
  affiliateUrl: string
  bestFor: string[]
  category: string
  logoInitials: string
}

export const tools: Tool[] = [
  {
    name: 'Runway',
    slug: 'runway',
    tagline: 'Professional AI video generation and editing platform',
    pricing: {
      startingPrice: 15,
      hasFree: true,
      freeLabel: 'Free (125 credits)',
      paidLabel: 'From $15/mo',
    },
    pros: [
      'Industry-leading video generation quality',
      'Powerful inpainting and masking tools',
      'Extensive creative control with motion brush',
    ],
    cons: [
      'Free tier credits deplete quickly',
      'Steeper learning curve for beginners',
      'Can be slow during peak usage hours',
    ],
    rating: 4.7,
    affiliateUrl: '#',
    bestFor: ['youtubers', 'social-media', 'filmmakers'],
    category: 'AI Video Generation',
    logoInitials: 'RW',
  },
  {
    name: 'Kling',
    slug: 'kling',
    tagline: 'High-fidelity AI video generation with realistic motion',
    pricing: {
      startingPrice: 10,
      hasFree: true,
      freeLabel: 'Free (66 credits/day)',
      paidLabel: 'From $10/mo',
    },
    pros: [
      'Exceptional realism in human motion',
      'Generous free tier with daily credits',
      'Strong physics simulation capabilities',
    ],
    cons: [
      'Slower generation times vs competitors',
      'Less intuitive interface for new users',
      'Limited editing tools after generation',
    ],
    rating: 4.5,
    affiliateUrl: '#',
    bestFor: ['filmmakers', 'social-media'],
    category: 'AI Video Generation',
    logoInitials: 'KL',
  },
  {
    name: 'Pika',
    slug: 'pika',
    tagline: 'Fast and fun AI video creation for everyone',
    pricing: {
      startingPrice: 8,
      hasFree: true,
      freeLabel: 'Free (250 credits/mo)',
      paidLabel: 'From $8/mo',
    },
    pros: [
      'Very user-friendly and approachable UI',
      'Fast generation speeds',
      'Great for short social media clips',
    ],
    cons: [
      'Less realism compared to Runway or Kling',
      'Limited to shorter video lengths',
      'Fewer advanced controls',
    ],
    rating: 4.2,
    affiliateUrl: '#',
    bestFor: ['social-media', 'beginners'],
    category: 'AI Video Generation',
    logoInitials: 'PK',
  },
  {
    name: 'HeyGen',
    slug: 'heygen',
    tagline: 'AI avatar videos and voice cloning for business',
    pricing: {
      startingPrice: 29,
      hasFree: true,
      freeLabel: 'Free (1 video)',
      paidLabel: 'From $29/mo',
    },
    pros: [
      'Hyper-realistic AI avatars and presenters',
      'Excellent voice cloning in 40+ languages',
      'Built-in video translation feature',
    ],
    cons: [
      'Higher price point than competitors',
      'Free tier is extremely limited (1 video)',
      'Avatar customization can feel restricted',
    ],
    rating: 4.6,
    affiliateUrl: '#',
    bestFor: ['youtubers', 'social-media', 'business'],
    category: 'AI Avatar Video',
    logoInitials: 'HG',
  },
  {
    name: 'Descript',
    slug: 'descript',
    tagline: 'Edit video by editing text — the podcast and video editor',
    pricing: {
      startingPrice: 24,
      hasFree: true,
      freeLabel: 'Free (1 hr transcription)',
      paidLabel: 'From $24/mo',
    },
    pros: [
      'Revolutionary text-based video editing',
      'AI-powered filler word removal',
      'Overdub voice cloning for corrections',
    ],
    cons: [
      'Not suitable for generative AI video',
      'Export quality can be inconsistent',
      'Collaboration features need improvement',
    ],
    rating: 4.4,
    affiliateUrl: '#',
    bestFor: ['youtubers', 'podcasters', 'social-media'],
    category: 'AI Video Editing',
    logoInitials: 'DS',
  },
  {
    name: 'Opus Clip',
    slug: 'opus-clip',
    tagline: 'Repurpose long videos into viral short clips automatically',
    pricing: {
      startingPrice: 19,
      hasFree: true,
      freeLabel: 'Free (60 min/mo)',
      paidLabel: 'From $19/mo',
    },
    pros: [
      'AI automatically finds the best clips',
      'Auto-generates captions and b-roll',
      'One-click multi-platform publishing',
    ],
    cons: [
      'Clip selection can miss key moments',
      'Limited manual editing capabilities',
      'Relies heavily on automation',
    ],
    rating: 4.3,
    affiliateUrl: '#',
    bestFor: ['youtubers', 'social-media', 'podcasters'],
    category: 'AI Clip Repurposing',
    logoInitials: 'OC',
  },
  {
    name: 'Captions AI',
    slug: 'captions-ai',
    tagline: 'Auto-generate captions, edit with AI, grow your audience',
    pricing: {
      startingPrice: 7,
      hasFree: true,
      freeLabel: 'Free (basic captions)',
      paidLabel: 'From $7/mo',
    },
    pros: [
      'Best-in-class auto-captions accuracy',
      'AI eye contact correction feature',
      'Very affordable entry price',
    ],
    cons: [
      'Primarily mobile-first app',
      'Limited to short-form video editing',
      'Advanced features locked to higher tiers',
    ],
    rating: 4.1,
    affiliateUrl: '#',
    bestFor: ['social-media', 'beginners'],
    category: 'AI Captions & Editing',
    logoInitials: 'CA',
  },
  {
    name: 'Synthesia',
    slug: 'synthesia',
    tagline: 'Create professional AI presenter videos at scale',
    pricing: {
      startingPrice: 29,
      hasFree: true,
      freeLabel: 'Free demo (3 videos)',
      paidLabel: 'From $29/mo',
    },
    pros: [
      '230+ diverse AI avatars available',
      'Enterprise-grade team collaboration',
      'SCORM export for e-learning platforms',
    ],
    cons: [
      'Expensive for individual creators',
      'Avatars can look artificial up close',
      'Limited creative video customization',
    ],
    rating: 4.4,
    affiliateUrl: '#',
    bestFor: ['business', 'elearning'],
    category: 'AI Avatar Video',
    logoInitials: 'SY',
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug)
}

export function getToolsByBestFor(category: string): Tool[] {
  return tools
    .filter((tool) => tool.bestFor.includes(category))
    .sort((a, b) => b.rating - a.rating)
}

export function getFeaturedComparisons(): Array<{
  slug: string
  title: string
  description: string
  tool1: Tool
  tool2: Tool
}> {
  const runway = getToolBySlug('runway')!
  const kling = getToolBySlug('kling')!
  const heygen = getToolBySlug('heygen')!
  const synthesia = getToolBySlug('synthesia')!
  const descript = getToolBySlug('descript')!
  const opusClip = getToolBySlug('opus-clip')!

  return [
    {
      slug: 'runway-vs-kling',
      title: 'Runway vs Kling',
      description:
        'Which AI video generator produces better results in 2024? We compare quality, pricing, and features head-to-head.',
      tool1: runway,
      tool2: kling,
    },
    {
      slug: 'heygen-vs-synthesia',
      title: 'HeyGen vs Synthesia',
      description:
        'The ultimate AI avatar video showdown. Find out which platform is better for your business or content creation needs.',
      tool1: heygen,
      tool2: synthesia,
    },
    {
      slug: 'descript-vs-opus-clip',
      title: 'Descript vs Opus Clip',
      description:
        'Two powerful AI editing tools — but which one is right for you? Compare features for podcasters and YouTubers.',
      tool1: descript,
      tool2: opusClip,
    },
  ]
}

export function getPopularTools(): Tool[] {
  return tools.sort((a, b) => b.rating - a.rating).slice(0, 6)
}
