export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Starter',
    description: 'Perfect for individuals getting started with SEO',
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: 'border-border',
    badge: null,
    features: [
      '1 website audit/month',
      '5 keyword tracking',
      'Basic SEO report',
      'Uptime monitoring (1 site)',
      'Email alerts',
      'Community support',
    ],
    limits: [
      'No competitor analysis',
      'No AI suggestions',
      'No API access',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing businesses and marketing professionals',
    monthlyPrice: 49,
    yearlyPrice: 39,
    color: 'border-primary',
    badge: 'Most Popular',
    features: [
      '10 website audits/month',
      '500 keyword tracking',
      'Full SEO & performance reports',
      'Competitor analysis (5 competitors)',
      'AI content suggestions',
      'Uptime monitoring (5 sites)',
      'PDF export reports',
      'API access (10K calls/mo)',
      'Priority email support',
    ],
    limits: [],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For agencies and large teams with advanced needs',
    monthlyPrice: 149,
    yearlyPrice: 119,
    color: 'border-accent',
    badge: 'Best Value',
    features: [
      'Unlimited website audits',
      'Unlimited keyword tracking',
      'White-label reports',
      'Unlimited competitor analysis',
      'Advanced AI SEO engine',
      'Uptime monitoring (unlimited)',
      'Team collaboration (10 seats)',
      'API access (unlimited)',
      'Google Analytics integration',
      'Google Search Console sync',
      'Dedicated account manager',
    ],
    limits: [],
    cta: 'Contact Sales',
    popular: false,
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'James Patterson',
    role: 'Head of SEO',
    company: 'GrowthHive Agency',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: 'WebShark completely transformed how we handle SEO for our 40+ clients. The competitor analysis alone saves us 10+ hours per week. The AI suggestions are incredibly accurate.',
    metric: '+340% organic traffic',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Digital Marketing Manager',
    company: 'NexaTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b76c?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: "The audit reports are incredibly detailed. We identified 47 critical SEO issues on our website in minutes. After fixing them, our Google rankings improved dramatically within 6 weeks.",
    metric: '47 issues fixed in day 1',
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    role: 'Founder & CEO',
    company: 'LaunchPad Ventures',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: 'As a startup founder, I needed a tool that gives me enterprise-level SEO intelligence without the enterprise price. WebShark nails it. The uptime monitoring alone is worth the subscription.',
    metric: '99.9% uptime maintained',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    role: 'SEO Specialist',
    company: 'ContentFirst Media',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: "WebShark's keyword tracking is best-in-class. I track 300+ keywords across 8 client sites and get daily ranking updates. The SERP analysis gives me competitive intelligence I can't find anywhere else.",
    metric: '300+ keywords tracked daily',
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'E-commerce Director',
    company: 'ShopVault Inc.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: 'WebShark paid for itself in the first week. Found critical performance issues hurting our conversion rate. After fixing them, our page load time dropped by 60% and conversions went up 28%.',
    metric: '+28% conversion rate',
  },
  {
    id: 6,
    name: 'Sofia Rodriguez',
    role: 'Marketing Director',
    company: 'BrandForge Studio',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: "The white-label reporting feature is a game-changer for our agency. We send beautifully branded PDF reports to clients every week. It's helped us retain 95% of our clients year over year.",
    metric: '95% client retention rate',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What is WebShark and how does it work?',
    answer: 'WebShark is a comprehensive website intelligence platform that crawls your website to analyze SEO health, performance, competitors, and more. Simply enter a URL to get a full audit report with actionable recommendations powered by AI.'
  },
  {
    question: 'How many websites can I analyze?',
    answer: 'This depends on your plan. Starter allows 1 audit per month, Pro allows 10 audits per month, and Enterprise provides unlimited audits. All plans support continuous monitoring for your added websites.'
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! Our Pro plan includes a 14-day free trial with full access to all Pro features. No credit card required to start. You can upgrade or cancel anytime during the trial period.'
  },
  {
    question: 'How accurate is the keyword ranking data?',
    answer: 'WebShark pulls data from multiple sources including Google Search APIs and our proprietary crawler network. Rankings are updated daily for Pro and Enterprise plans, giving you accurate, real-time SERP position data.'
  },
  {
    question: 'Can I integrate WebShark with Google Analytics?',
    answer: 'Yes! Enterprise plan users can connect Google Analytics and Google Search Console directly to WebShark for unified reporting. We also support WordPress plugin integration and a full REST API.'
  },
  {
    question: 'How does competitor analysis work?',
    answer: "Add competitor URLs to your dashboard and WebShark will analyze their SEO strategy, estimated traffic, top keywords, backlink profile, and content gaps. You'll see side-by-side comparisons to identify opportunities."
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'Starter users get community forum access. Pro users get priority email support with 24-hour response times. Enterprise users get a dedicated account manager and phone/video call support.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your account settings. You\'ll retain access until the end of your current billing period.'
  },
  {
    question: 'Does WebShark offer white-label reporting?',
    answer: 'Yes, white-label PDF reports are available on the Enterprise plan. You can customize reports with your agency logo, brand colors, and custom domain for a fully professional client presentation.'
  },
  {
    question: 'Is my data secure?',
    answer: 'We take security seriously. WebShark uses industry-standard TLS 1.3 encryption, SOC 2 Type II compliant infrastructure, and never shares your data with third parties. All data is stored in secure, redundant data centers.'
  },
];

export const BLOG_POSTS = [
  {
    id: '1',
    title: '10 SEO Audits Every Website Needs in 2025',
    slug: '10-seo-audits-every-website-needs',
    excerpt: 'Discover the most critical SEO audit checks that separate high-ranking websites from those buried on page 3 of Google search results.',
    category: 'SEO Tips',
    author: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b76c?w=40&h=40&fit=crop&crop=face',
    publishedAt: 'June 2, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['SEO', 'Audit', 'Best Practices'],
    featured: true,
  },
  {
    id: '2',
    title: 'How to Outrank Competitors Using Keyword Gap Analysis',
    slug: 'keyword-gap-analysis-guide',
    excerpt: "Keyword gap analysis reveals the exact search terms your competitors rank for that you don't. Here's a step-by-step guide to close the gap.",
    category: 'Strategy',
    author: 'Alex Morgan',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    publishedAt: 'May 28, 2025',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['Keywords', 'Competitor Analysis', 'Strategy'],
    featured: false,
  },
  {
    id: '3',
    title: 'Core Web Vitals: The Complete 2025 Optimization Guide',
    slug: 'core-web-vitals-2025-guide',
    excerpt: "Google's Core Web Vitals are more important than ever. Learn how to measure, diagnose, and improve your LCP, FID, and CLS scores.",
    category: 'Performance',
    author: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    publishedAt: 'May 20, 2025',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop',
    tags: ['Performance', 'Core Web Vitals', 'Google'],
    featured: false,
  },
  {
    id: '4',
    title: 'Building a Winning Backlink Strategy in the AI Era',
    slug: 'backlink-strategy-ai-era',
    excerpt: 'Backlinks remain a top Google ranking factor, but the rules have changed. Discover modern link-building strategies that actually work in 2025.',
    category: 'Link Building',
    author: 'Emma Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    publishedAt: 'May 14, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop',
    tags: ['Backlinks', 'Link Building', 'Authority'],
    featured: false,
  },
  {
    id: '5',
    title: 'AI-Powered SEO: How Machine Learning is Changing Search',
    slug: 'ai-powered-seo-machine-learning',
    excerpt: "From content generation to ranking prediction, AI is reshaping SEO. Here's what every marketer needs to know about the AI revolution in search.",
    category: 'AI & SEO',
    author: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face',
    publishedAt: 'May 8, 2025',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad979?w=600&h=400&fit=crop',
    tags: ['AI', 'SEO', 'Machine Learning'],
    featured: false,
  },
  {
    id: '6',
    title: 'Local SEO in 2025: The Ultimate Checklist for Small Businesses',
    slug: 'local-seo-2025-checklist',
    excerpt: 'Local search is more competitive than ever. Use this comprehensive checklist to dominate local Google results and drive foot traffic.',
    category: 'Local SEO',
    author: 'David Kim',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    publishedAt: 'April 30, 2025',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
    tags: ['Local SEO', 'Small Business', 'Google Maps'],
    featured: false,
  },
];

export const FEATURES_LIST = [
  {
    id: 'audit',
    icon: 'Search',
    title: 'Website Audit System',
    description: 'Comprehensive technical SEO audits that analyze 200+ ranking factors including page speed, mobile usability, broken links, and accessibility.',
    color: 'blue',
    stats: '200+ factors checked',
    details: [
      'Full technical SEO crawl',
      'Core Web Vitals analysis',
      'Mobile responsiveness check',
      'Broken link detection',
      'Schema markup validation',
      'Accessibility scoring',
    ]
  },
  {
    id: 'seo',
    icon: 'TrendingUp',
    title: 'SEO Intelligence Dashboard',
    description: 'Track keyword rankings, analyze SERP positions, monitor backlinks, and get AI-powered optimization recommendations in real-time.',
    color: 'cyan',
    stats: '500+ keywords tracked',
    details: [
      'Daily SERP ranking updates',
      'Keyword difficulty scoring',
      'Backlink profile analysis',
      'Meta tag optimization',
      'Sitemap validation',
      'robots.txt checker',
    ]
  },
  {
    id: 'competitor',
    icon: 'Target',
    title: 'Competitor Intelligence',
    description: 'Uncover competitor SEO strategies, traffic estimates, keyword gaps, and backlink sources to identify growth opportunities.',
    color: 'purple',
    stats: 'Analyze unlimited competitors',
    details: [
      'Traffic estimation',
      'Keyword gap analysis',
      'Backlink comparison',
      'Content strategy insights',
      'Ranking overlap analysis',
      'SERP feature tracking',
    ]
  },
  {
    id: 'monitoring',
    icon: 'Activity',
    title: 'Performance Monitoring',
    description: 'Real-time uptime monitoring, speed testing, and server response analysis with instant downtime alerts.',
    color: 'green',
    stats: '1-min monitoring intervals',
    details: [
      '99.9% SLA monitoring',
      'Global speed testing',
      'Server response tracking',
      'SSL certificate monitoring',
      'Multi-location checks',
      'Instant downtime alerts',
    ]
  },
  {
    id: 'ai',
    icon: 'Sparkles',
    title: 'AI Content & SEO Engine',
    description: "AI-powered content recommendations, meta description generation, blog topic suggestions, and content scoring to outrank competitors.",
    color: 'orange',
    stats: 'GPT-powered insights',
    details: [
      'AI SEO recommendations',
      'Content gap detection',
      'Meta description generator',
      'Blog topic suggestions',
      'Content quality scoring',
      'Readability analysis',
    ]
  },
  {
    id: 'reports',
    icon: 'BarChart3',
    title: 'Analytics & Reporting',
    description: 'Beautiful, comprehensive reports with traffic insights, conversion data, and engagement metrics. Export to PDF for client sharing.',
    color: 'blue',
    stats: 'White-label PDF reports',
    details: [
      'Traffic analytics overview',
      'Conversion funnel tracking',
      'Engagement rate analysis',
      'White-label PDF export',
      'Scheduled report delivery',
      'Custom branding options',
    ]
  },
];

export const STATS = [
  { label: 'Websites Analyzed', value: 2400000, suffix: '+', prefix: '' },
  { label: 'Keywords Tracked', value: 85000000, suffix: '+', prefix: '' },
  { label: 'SEO Issues Found', value: 12000000, suffix: '+', prefix: '' },
  { label: 'Happy Customers', value: 47000, suffix: '+', prefix: '' },
];

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Add Your Website',
    description: 'Enter any website URL and WebShark instantly begins crawling and analyzing every aspect of your online presence.',
    icon: 'Globe',
    color: 'blue',
  },
  {
    step: 2,
    title: 'Get Deep Insights',
    description: 'Receive a comprehensive audit covering SEO health, performance metrics, competitor comparisons, and 200+ ranking factors.',
    icon: 'Brain',
    color: 'cyan',
  },
  {
    step: 3,
    title: 'AI Recommendations',
    description: "WebShark's AI engine prioritizes your action items by impact, giving you a clear roadmap to climb search rankings faster.",
    icon: 'Sparkles',
    color: 'purple',
  },
  {
    step: 4,
    title: 'Track & Grow',
    description: 'Monitor your progress with daily ranking updates, automated alerts, and growth reports that show measurable results.',
    icon: 'TrendingUp',
    color: 'green',
  },
];
