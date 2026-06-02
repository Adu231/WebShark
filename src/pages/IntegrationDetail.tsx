import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  ArrowLeft, CheckCircle2, Zap, Sparkles, Globe, Activity,
  Code, Copy, Check, RefreshCw, Play, Send, Terminal, Settings,
  HelpCircle, ShieldCheck, Cpu, Sliders, MessageSquare, Link2,
  Database, Flame, BellRing, BookOpen
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { cn } from '@/lib/utils';

// Mock charts data
const ANALYTICS_DATA = [
  { time: '10:00', pageviews: 240, organic: 140 },
  { time: '11:00', pageviews: 310, organic: 190 },
  { time: '12:00', pageviews: 450, organic: 270 },
  { time: '13:00', pageviews: 380, organic: 220 },
  { time: '14:00', pageviews: 520, organic: 340 },
  { time: '15:00', pageviews: 640, organic: 410 },
];

const SEARCH_CONSOLE_DATA = [
  { day: 'Mon', clicks: 120, impressions: 2400 },
  { day: 'Tue', clicks: 180, impressions: 3100 },
  { day: 'Wed', clicks: 250, impressions: 4500 },
  { day: 'Thu', clicks: 210, impressions: 3900 },
  { day: 'Fri', clicks: 290, impressions: 5200 },
  { day: 'Sat', clicks: 340, impressions: 6100 },
];

type IntegrationSlug = 'google-analytics' | 'google-search-console' | 'wordpress' | 'shopify' | 'hubspot' | 'slack' | 'zapier' | 'rest-api';

interface Metadata {
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  heroGradient: string;
  description: string;
  features: string[];
}

const METADATA: Record<IntegrationSlug, Metadata> = {
  'google-analytics': {
    title: 'Google Analytics 4',
    subtitle: 'Synchronize organic traffic stats and user engagement metrics.',
    badge: 'Traffic Sync',
    icon: Globe,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    heroGradient: 'from-orange-500/15 via-orange-600/5 to-transparent',
    description: 'Bring active user flows, channel attributions, and organic visitor traffic directly into your WebShark dashboard. Uncover traffic trends alongside technical SEO audits to correlate speed optimizations with bounce rates.',
    features: [
      'Automatic traffic correlation with SEO score updates',
      'Bounce rate and page load speed overlay graphs',
      'Real-time active visitor attributions',
      'Zero-config OAuth secure verification'
    ]
  },
  'google-search-console': {
    title: 'Google Search Console',
    subtitle: 'Import search queries, clicks, and impressions data.',
    badge: 'SERP Data',
    icon: Activity,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    heroGradient: 'from-blue-500/15 via-blue-600/5 to-transparent',
    description: 'Track keyword CTR, impressions, and query rankings without leaving WebShark. Correlate actual click-through volumes with crawler coverage errors to fix traffic leakages.',
    features: [
      'Comprehensive query difficulty overlap checks',
      'Index status and XML sitemap synchronization',
      'Average ranking position alerts',
      'Mobile visibility validation alerts'
    ]
  },
  'wordpress': {
    title: 'WordPress Plugin',
    subtitle: 'Optimize content on-page directly from your wp-admin dashboard.',
    badge: 'CMS Plugin',
    icon: Code,
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    heroGradient: 'from-sky-500/15 via-sky-600/5 to-transparent',
    description: 'Install our lightweight open-source plugin inside your WordPress site to pull AI content recommendations, edit meta tags in real-time, and run quick site audits from your admin bar.',
    features: [
      'Real-time readability and keyword density scores inside Gutenberg',
      'One-click XML sitemap submission auto-syncs to Search Console',
      'Broken link scanner with auto-redirect suggestions',
      'SSL and database tables maintenance check integration'
    ]
  },
  'shopify': {
    title: 'Shopify Integration',
    subtitle: 'Maximize product listings visibility and revenue conversions.',
    badge: 'E-commerce',
    icon: ShieldCheck,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    heroGradient: 'from-green-500/15 via-green-600/5 to-transparent',
    description: 'Boost product listings rankings in Google Shopping. Monitor schema structures, identify product media performance gaps, and optimize page speeds to maximize cart checkouts.',
    features: [
      'JSON-LD rich snippet schema generator for all collection lists',
      'Image alt tag auto-optimizer and bulk format editor',
      'Page speed boosters specifically tailored for Liquid themes',
      'Real-time ranking reports for product collections'
    ]
  },
  'hubspot': {
    title: 'HubSpot CRM Sync',
    subtitle: 'Push audit leads and attribution logs directly into contact lists.',
    badge: 'CRM Integration',
    icon: Database,
    color: 'text-amber-600',
    bg: 'bg-amber-600/10',
    border: 'border-amber-600/20',
    heroGradient: 'from-amber-600/15 via-amber-600/5 to-transparent',
    description: 'Connect your marketing funnels. Send SEO audit leads and search performance statistics directly to contact profiles to customize marketing outreach and conversion segments.',
    features: [
      'Sync lead site audit reports directly to contact timelines',
      'Create smart list segments based on organic traffic sources',
      'Trigger custom workflows on ranking improvements',
      'Seamless webhook setups with field mappings'
    ]
  },
  'slack': {
    title: 'Slack Alerts Integration',
    subtitle: 'Get instant alerts for ranking drops and downtime notifications.',
    badge: 'Notifications',
    icon: MessageSquare,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    heroGradient: 'from-purple-500/15 via-purple-600/5 to-transparent',
    description: 'Keep your team aligned on platform health and SEO movements. Configure customizable alerts for downtime outages, SSL certificate expirations, and critical crawl issues directly inside your Slack channels.',
    features: [
      'Instant channels notification during site outage alerts',
      'Weekly summaries of top keyword rank movements',
      'Custom webhook settings per Slack channel',
      'Rich interactive layout with quick links'
    ]
  },
  'zapier': {
    title: 'Zapier Automation',
    subtitle: 'Integrate WebShark audits with 6,000+ app connectors.',
    badge: 'No-Code Flows',
    icon: Link2,
    color: 'text-orange-600',
    bg: 'bg-orange-600/10',
    border: 'border-orange-600/20',
    heroGradient: 'from-orange-600/15 via-orange-600/5 to-transparent',
    description: 'Build robust pipelines. Push new technical audit failures directly into Jira, create custom client invoices in Stripe on report downloads, or log backlinks inside Google Sheets automatically.',
    features: [
      'Multi-trigger audit support (Core Web Vitals fail, rank drop)',
      'Prebuilt workflow templates with zero coding requirements',
      'Attribution tracking logs built-in',
      'Instant connection tests inside Zapier dashboard'
    ]
  },
  'rest-api': {
    title: 'WebShark REST API',
    subtitle: 'Access raw audit reports, rank trackers, and analytics via code.',
    badge: 'Developer API',
    icon: Cpu,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    heroGradient: 'from-teal-500/15 via-teal-600/5 to-transparent',
    description: 'Develop custom SEO integrations. Connect WebShark analytics dashboard directly to client internal systems. Pull audit details, keyword positions, SSL status, and historical logs programmatically.',
    features: [
      'Restful standards with structured JSON response payloads',
      'High-performance limits (up to 1,000,000 calls/mo on Enterprise)',
      'Clean developer documentation with quick integration templates',
      'Fully-interactive developer console sandbox'
    ]
  }
};

export default function IntegrationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find integration metadata
  const currentSlug = useMemo(() => {
    if (!slug) return 'google-analytics' as IntegrationSlug;
    if (Object.keys(METADATA).includes(slug)) {
      return slug as IntegrationSlug;
    }
    return 'google-analytics' as IntegrationSlug;
  }, [slug]);

  const meta = METADATA[currentSlug];

  // Global State Simulations
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // 1. Google Analytics Simulation
  const [gaChartData, setGaChartData] = useState(ANALYTICS_DATA);
  const [gaSyncing, setGaSyncing] = useState(false);

  const triggerGaSync = () => {
    setGaSyncing(true);
    toast.loading('Syncing Google Analytics traffic data...');
    setTimeout(() => {
      setGaSyncing(false);
      setConnected(true);
      setGaChartData(
        ANALYTICS_DATA.map(d => ({
          ...d,
          pageviews: d.pageviews + Math.floor(Math.random() * 50),
          organic: d.organic + Math.floor(Math.random() * 30),
        }))
      );
      toast.dismiss();
      toast.success('Analytics sync complete! Pageviews data updated.');
    }, 2000);
  };

  // 2. Google Search Console Simulation
  const [gscChartData, setGscChartData] = useState(SEARCH_CONSOLE_DATA);
  const [gscSyncing, setGscSyncing] = useState(false);
  const [domainToVerify, setDomainToVerify] = useState('');
  const [domainVerified, setDomainVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const verifyGscDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainToVerify.trim()) {
      toast.error('Please enter a valid domain (e.g., example.com)');
      return;
    }
    setVerifying(true);
    toast.loading(`Verifying ownership of ${domainToVerify}...`);
    setTimeout(() => {
      setVerifying(false);
      setDomainVerified(true);
      setConnected(true);
      toast.dismiss();
      toast.success(`Domain ${domainToVerify} successfully verified in Search Console!`);
    }, 2500);
  };

  const triggerGscSync = () => {
    setGscSyncing(true);
    toast.loading('Fetching queries data from Search Console...');
    setTimeout(() => {
      setGscSyncing(false);
      setGscChartData(
        SEARCH_CONSOLE_DATA.map(d => ({
          ...d,
          clicks: d.clicks + Math.floor(Math.random() * 40),
          impressions: d.impressions + Math.floor(Math.random() * 300),
        }))
      );
      toast.dismiss();
      toast.success('Search Console data updated!');
    }, 1800);
  };

  // 3. WordPress Plugin Simulation
  const [wpKeyCopied, setWpKeyCopied] = useState(false);
  const [wpConnected, setWpConnected] = useState(false);
  const [wpTesting, setWpTesting] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText('ws_wp_plugin_a9b8c7d6e5f4g3h2i1j0');
    setWpKeyCopied(true);
    toast.success('API Key copied to clipboard! Paste it inside wp-admin WebShark plugin settings.');
    setTimeout(() => setWpKeyCopied(false), 2000);
  };

  const verifyWpConnection = () => {
    setWpTesting(true);
    toast.loading('Testing WordPress REST endpoint connection...');
    setTimeout(() => {
      setWpTesting(false);
      setWpConnected(true);
      setConnected(true);
      toast.dismiss();
      toast.success('WordPress site connected! WebShark Gutenberg optimizations active.');
    }, 2000);
  };

  // 4. Shopify Integration
  const [storeUrl, setStoreUrl] = useState('');
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [shopifyLinking, setShopifyLinking] = useState(false);

  const handleShopifyConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeUrl.trim()) {
      toast.error('Please enter your myshopify.com store address');
      return;
    }
    setShopifyLinking(true);
    toast.loading('Attaching schema hooks and theme loaders...');
    setTimeout(() => {
      setShopifyLinking(false);
      setShopifyConnected(true);
      setConnected(true);
      toast.dismiss();
      toast.success('Shopify store connected! JSON-LD schema feeds are now live.');
    }, 2200);
  };

  // 5. HubSpot CRM Sync
  const [hubspotLinked, setHubspotLinked] = useState(false);
  const [hubspotSyncing, setHubspotSyncing] = useState(false);
  const [hubFields, setHubFields] = useState({
    name: true,
    email: true,
    company: true,
    seoScore: true,
    trafficEst: false,
  });

  const handleHubspotLink = () => {
    setHubspotSyncing(true);
    toast.loading('Connecting HubSpot portal CRM...');
    setTimeout(() => {
      setHubspotSyncing(false);
      setHubspotLinked(true);
      setConnected(true);
      toast.dismiss();
      toast.success('HubSpot Portal connected! Custom contact properties created.');
    }, 2000);
  };

  const saveHubspotFields = () => {
    toast.success('Contact field mapping saved successfully!');
  };

  // 6. Slack Alerts
  const [slackWebhookUrl, setSlackWebhookUrl] = useState('');
  const [slackConnected, setSlackConnected] = useState(false);
  const [slackToggles, setSlackToggles] = useState({
    downtime: true,
    weeklyDigest: false,
    rankChanges: true,
    criticalAudits: true,
  });
  const [slackTestText, setSlackTestText] = useState('WebShark Alert: shop.yoursite.com speed audit failed! score: 64/100');
  const [slackTestingAlert, setSlackTestingAlert] = useState(false);
  const [showSlackBubble, setShowSlackBubble] = useState(false);

  const connectSlack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slackWebhookUrl.trim()) {
      toast.error('Please enter a valid incoming Slack webhook URL');
      return;
    }
    setSlackConnected(true);
    setConnected(true);
    toast.success('Slack incoming Webhook connected successfully!');
  };

  const sendSlackTestNotification = () => {
    if (!slackConnected) {
      toast.error('Please connect your incoming Slack webhook URL first');
      return;
    }
    setSlackTestingAlert(true);
    toast.loading('Pushing alert to Slack hook...');
    setTimeout(() => {
      setSlackTestingAlert(false);
      setShowSlackBubble(true);
      toast.dismiss();
      toast.success('Test message sent to channel!');
      setTimeout(() => setShowSlackBubble(false), 5000);
    }, 1500);
  };

  // 7. Zapier Automation
  const [zapierConnected, setZapierConnected] = useState(false);
  const [zapToggles, setZapToggles] = useState({
    auditFailJira: true,
    rankChangeSheet: false,
    reportDownloadStripe: true,
  });

  const handleZapierConnect = () => {
    setConnecting(true);
    toast.loading('Redirecting to Zapier developer portal connection authorize page...');
    setTimeout(() => {
      setConnecting(false);
      setZapierConnected(true);
      setConnected(true);
      toast.dismiss();
      toast.success('Authorized WebShark inside Zapier! Preset templates active.');
    }, 2000);
  };

  // 8. REST API Playground
  const [apiMethod, setApiMethod] = useState<'GET /v1/audits' | 'POST /v1/keyword-tracker' | 'GET /v1/uptime-status'>('GET /v1/audits');
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [apiRunning, setApiRunning] = useState(false);
  const [apiOutput, setApiOutput] = useState<string>('// Select an endpoint and click Send Request to fetch live JSON...');

  const copyPlaygroundApiKey = () => {
    navigator.clipboard.writeText('ws_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6');
    setApiKeyCopied(true);
    toast.success('API Secret Key copied!');
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const runApiRequest = () => {
    setApiRunning(true);
    setApiOutput('// Requesting endpoint...');
    setTimeout(() => {
      setApiRunning(false);
      setConnected(true);
      if (apiMethod === 'GET /v1/audits') {
        setApiOutput(JSON.stringify({
          status: 'success',
          endpoint: '/v1/audits',
          timestamp: new Date().toISOString(),
          data: {
            domain: 'yourwebsite.com',
            score: 92,
            crawl_stats: {
              pages_crawled: 184,
              critical_issues: 3,
              warnings: 12,
              notices: 28,
            },
            issues_breakdown: [
              { id: 'err_missing_alts', name: 'Images missing alt tags', severity: 'warning', count: 18 },
              { id: 'err_core_web_vitals', name: 'LCP slow response time (> 2.5s)', severity: 'critical', count: 1 },
              { id: 'err_robots_sitemap', name: 'XML Sitemap not found in robots.txt', severity: 'notice', count: 1 }
            ]
          }
        }, null, 2));
      } else if (apiMethod === 'POST /v1/keyword-tracker') {
        setApiOutput(JSON.stringify({
          status: 'success',
          endpoint: '/v1/keyword-tracker',
          timestamp: new Date().toISOString(),
          action: 'keywords_added',
          data: {
            domain: 'yourwebsite.com',
            keywords_count: 2,
            added_list: [
              { keyword: 'website seo audit tool', volume: 12400, difficulty: 'Medium', status: 'tracked' },
              { keyword: 'free seo analyzer', volume: 22100, difficulty: 'Hard', status: 'tracked' }
            ]
          }
        }, null, 2));
      } else {
        setApiOutput(JSON.stringify({
          status: 'success',
          endpoint: '/v1/uptime-status',
          timestamp: new Date().toISOString(),
          data: {
            domain: 'yourwebsite.com',
            monitored_since: '2025-01-01',
            current_status: 'UP',
            response_time_ms: 182,
            last_checked: new Date().toISOString(),
            availability_stats: {
              last_24h_percent: 100,
              last_30d_percent: 99.98,
              total_downtimes: 0
            }
          }
        }, null, 2));
      }
      toast.success('REST API request completed successfully!');
    }, 1500);
  };

  const API_CODE_SAMPLES = useMemo(() => {
    const key = 'ws_live_a1b2c3...';
    if (apiMethod === 'GET /v1/audits') {
      return {
        curl: `curl -X GET "https://api.webshark.io/v1/audits?domain=yourwebsite.com" \\\n  -H "Authorization: Bearer ${key}"`,
        js: `fetch("https://api.webshark.io/v1/audits?domain=yourwebsite.com", {\n  headers: {\n    "Authorization": "Bearer ${key}"\n  }\n})\n.then(res => res.json())\n.then(console.log);`
      };
    } else if (apiMethod === 'POST /v1/keyword-tracker') {
      return {
        curl: `curl -X POST "https://api.webshark.io/v1/keyword-tracker" \\\n  -H "Authorization: Bearer ${key}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"domain": "yourwebsite.com", "keywords": ["seo tool", "rank tracker"]}'`,
        js: `fetch("https://api.webshark.io/v1/keyword-tracker", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer ${key}",\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    domain: "yourwebsite.com",\n    keywords: ["seo tool", "rank tracker"]\n  })\n})\n.then(res => res.json())\n.then(console.log);`
      };
    } else {
      return {
        curl: `curl -X GET "https://api.webshark.io/v1/uptime-status?domain=yourwebsite.com" \\\n  -H "Authorization: Bearer ${key}"`,
        js: `fetch("https://api.webshark.io/v1/uptime-status?domain=yourwebsite.com", {\n  headers: {\n    "Authorization": "Bearer ${key}"\n  }\n})\n.then(res => res.json())\n.then(console.log);`
      };
    }
  }, [apiMethod]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Integrations Header Section */}
        <section className={cn('relative border-b border-border overflow-hidden py-16 bg-gradient-to-b', meta.heroGradient)}>
          <div className="container-wide">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <Link to="/features" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Features
                </Link>
                <div className="flex items-center gap-3">
                  <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center border', meta.bg, meta.border)}>
                    {(() => {
                      const Icon = meta.icon;
                      return <Icon className={cn('w-6 h-6', meta.color)} />;
                    })()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{meta.title}</h1>
                      <Badge variant="secondary" className={cn('text-[10px] px-1.5 py-0.5 border-0 font-bold capitalize', meta.bg, meta.color)}>
                        {meta.badge}
                      </Badge>
                      <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0.5 font-bold', connected ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-muted text-muted-foreground')}>
                        {connected ? 'Connected' : 'Not Connected'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{meta.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                  Go to Home
                </Button>
                <Button size="sm" className="bg-gradient-brand hover:opacity-90 text-white shadow-sm" onClick={() => navigate('/dashboard')}>
                  Visit Dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Details Grid */}
        <section className="section-padding bg-background/50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Description and bullet list */}
              <div className="lg:col-span-1 space-y-6">
                <div className="rounded-2xl border border-border bg-background p-6">
                  <h2 className="font-bold text-base mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" /> Overview
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {meta.description}
                  </p>
                  <div className="border-t border-border pt-4 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Capabilities</h3>
                    {meta.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Help box */}
                <div className="rounded-2xl border border-border bg-muted/30 p-5">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-primary" /> Setup Support
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Need help configuring this integration? Visit our documentation or send an email to <a href="mailto:hello@webshark.io" className="text-primary hover:underline">hello@webshark.io</a> to speak with an integrations specialist.
                  </p>
                </div>
              </div>

              {/* Right Column: Highly Interactive Playgrounds */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm">
                  <h2 className="font-bold text-lg mb-1.5 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-primary" /> Connection Playground
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Simulate a connection to customize triggers, view active sync logs, and test webhooks live.
                  </p>

                  <div className="border border-border rounded-xl p-4 sm:p-6 bg-muted/20">
                    {/* ---- GOOGLE ANALYTICS WIDGET ---- */}
                    {currentSlug === 'google-analytics' && (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-sm">GA4 Traffic Sync</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Mock synchronizer simulation feed</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" disabled={gaSyncing} onClick={triggerGaSync} className="gap-1.5 h-8">
                              <RefreshCw className={cn('w-3.5 h-3.5', gaSyncing && 'animate-spin')} />
                              {gaSyncing ? 'Syncing...' : 'Sync Now'}
                            </Button>
                          </div>
                        </div>

                        {/* GA4 Chart */}
                        <div className="bg-background border border-border rounded-xl p-3 h-52">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={gaChartData}>
                              <defs>
                                <linearGradient id="gaColor" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(24,95%,50%)" stopOpacity={0.2} />
                                  <stop offset="95%" stopColor="hsl(24,95%,50%)" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} width={30} />
                              <Tooltip contentStyle={{ fontSize: 11, background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                              <Area type="monotone" dataKey="pageviews" name="Pageviews" stroke="hsl(24,95%,50%)" fill="url(#gaColor)" strokeWidth={2} />
                              <Area type="monotone" dataKey="organic" name="Organic Visitors" stroke="hsl(221,83%,53%)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}

                    {/* ---- GOOGLE SEARCH CONSOLE WIDGET ---- */}
                    {currentSlug === 'google-search-console' && (
                      <div className="space-y-6">
                        {/* Domain verification form */}
                        {!domainVerified ? (
                          <form onSubmit={verifyGscDomain} className="space-y-3">
                            <h3 className="font-bold text-sm">Verify Site Ownership</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Before pulling Search Console query impressions, verify your site ownership via HTML dns tag.
                            </p>
                            <div className="flex gap-2">
                              <Input
                                placeholder="e.g. yourwebsite.com"
                                value={domainToVerify}
                                onChange={(e) => setDomainToVerify(e.target.value)}
                                className="h-9 text-xs"
                                disabled={verifying}
                              />
                              <Button type="submit" size="sm" className="h-9 px-4 text-xs bg-primary text-white" disabled={verifying}>
                                {verifying ? 'Verifying...' : 'Verify Domain'}
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            Site verified! Connected to Search Console data feed for {domainToVerify}.
                            <Button size="sm" variant="ghost" className="h-6 text-[10px] ml-auto text-green-500 border border-green-500/25 px-2 hover:bg-green-500/20" onClick={() => setDomainVerified(false)}>
                              Reset
                            </Button>
                          </div>
                        )}

                        <div className="border-t border-border pt-5 flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-sm">SERP Query Stats</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Click rate simulator tracker</p>
                          </div>
                          <Button size="sm" variant="outline" disabled={gscSyncing} onClick={triggerGscSync} className="gap-1.5 h-8">
                            <RefreshCw className={cn('w-3.5 h-3.5', gscSyncing && 'animate-spin')} />
                            Query Sync
                          </Button>
                        </div>

                        {/* Chart */}
                        <div className="bg-background border border-border rounded-xl p-3 h-52">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={gscChartData}>
                              <defs>
                                <linearGradient id="gscColor" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.15} />
                                  <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} width={30} />
                              <Tooltip contentStyle={{ fontSize: 11, background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                              <Area type="monotone" dataKey="clicks" name="Clicks" stroke="hsl(221,83%,53%)" fill="url(#gscColor)" strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}

                    {/* ---- WORDPRESS WIDGET ---- */}
                    {currentSlug === 'wordpress' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-sm">Download WebShark WordPress Plugin</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                            Upload our plugin inside your WordPress Admin Dashboard under **Plugins - Add New - Upload**.
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="bg-gradient-brand text-white font-semibold text-xs h-9 px-4" onClick={() => toast.success('WebShark WordPress plugin zip downloaded successfully!')}>
                            Download Plugin (v1.2.4)
                          </Button>
                          <Button size="sm" variant="outline" onClick={verifyWpConnection} className="h-9 px-4 text-xs gap-1.5" disabled={wpTesting}>
                            <RefreshCw className={cn('w-3.5 h-3.5', wpTesting && 'animate-spin')} />
                            {wpConnected ? 'Re-test Sync' : 'Verify Plugin Sync'}
                          </Button>
                        </div>

                        <div className="border-t border-border pt-4 space-y-3">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Setup Instructions</h4>
                          <ol className="list-decimal pl-4 text-xs text-muted-foreground space-y-2 leading-relaxed">
                            <li>Activate the WebShark plugin inside your WordPress wp-admin dashboard.</li>
                            <li>Navigate to **WebShark Settings** inside your WordPress sidebar.</li>
                            <li>Copy and paste your secret plugin API Key shown below:</li>
                          </ol>

                          <div className="rounded-lg border border-border bg-background p-3 flex items-center gap-3">
                            <Code className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <code className="text-xs flex-1 truncate text-muted-foreground font-mono">ws_wp_plugin_a9b8c7d6e5f4g3h2i1j0</code>
                            <Button variant="outline" size="sm" className="h-7 text-xs flex-shrink-0 gap-1" onClick={handleCopyKey}>
                              {wpKeyCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                              {wpKeyCopied ? 'Copied' : 'Copy Key'}
                            </Button>
                          </div>
                        </div>

                        {wpConnected && (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold mt-3">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            WordPress Sync Active! On-page Gutenberg score overrides are live.
                          </div>
                        )}
                      </div>
                    )}

                    {/* ---- SHOPIFY WIDGET ---- */}
                    {currentSlug === 'shopify' && (
                      <div className="space-y-6">
                        {!shopifyConnected ? (
                          <form onSubmit={handleShopifyConnect} className="space-y-3">
                            <h3 className="font-bold text-sm">Link Shopify Store</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Enter your `.myshopify.com` store URL to connect products lists schema audits.
                            </p>
                            <div className="flex gap-2">
                              <Input
                                placeholder="your-store-name.myshopify.com"
                                value={storeUrl}
                                onChange={(e) => setStoreUrl(e.target.value)}
                                className="h-9 text-xs font-mono"
                                disabled={shopifyLinking}
                              />
                              <Button type="submit" size="sm" className="h-9 px-4 text-xs bg-primary text-white" disabled={shopifyLinking}>
                                {shopifyLinking ? 'Connecting...' : 'Link Store'}
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold">
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                              Store connected! WebShark SEO liquid injections active for {storeUrl}.
                              <Button size="sm" variant="ghost" className="h-6 text-[10px] ml-auto text-green-500 border border-green-500/25 px-2 hover:bg-green-500/20" onClick={() => setShopifyConnected(false)}>
                                Unlink
                              </Button>
                            </div>

                            <div className="border-t border-border pt-4">
                              <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">Live Feed Status</h4>
                              <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="bg-background rounded-lg border border-border p-3">
                                  <p className="text-muted-foreground">Products Synced</p>
                                  <p className="text-base font-bold mt-1">482 listings</p>
                                </div>
                                <div className="bg-background rounded-lg border border-border p-3">
                                  <p className="text-muted-foreground">JSON-LD Schema</p>
                                  <p className="text-base font-bold text-green-500 mt-1">Active</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ---- HUBSPOT WIDGET ---- */}
                    {currentSlug === 'hubspot' && (
                      <div className="space-y-6">
                        {!hubspotLinked ? (
                          <div className="text-center py-4">
                            <h3 className="font-bold text-sm">HubSpot portal linking</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto mt-1 mb-4">
                              Grant WebShark permission to manage contact mappings and timelines.
                            </p>
                            <Button size="sm" className="bg-primary text-white font-semibold text-xs h-9 px-5 gap-1.5" onClick={handleHubspotLink} disabled={hubspotSyncing}>
                              <Link2 className="w-3.5 h-3.5" />
                              {hubspotSyncing ? 'Linking HubSpot...' : 'Connect CRM Portal'}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-5">
                            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold">
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                              Connected with HubSpot CRM API!
                              <Button size="sm" variant="ghost" className="h-6 text-[10px] ml-auto text-green-500 border border-green-500/25 px-2 hover:bg-green-500/20" onClick={() => setHubspotLinked(false)}>
                                Disconnect
                              </Button>
                            </div>

                            <div className="border-t border-border pt-4 space-y-3">
                              <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Field Mapping Settings</h4>
                              <div className="space-y-2.5 bg-background rounded-xl border border-border p-4">
                                {[
                                  { k: 'name', label: 'Full Name', desc: 'Syncs lead name' },
                                  { k: 'email', label: 'Email Address', desc: 'Syncs primary mail' },
                                  { k: 'company', label: 'Company Domain', desc: 'Syncs company website URL' },
                                  { k: 'seoScore', label: 'WebShark Audit Score', desc: 'Syncs custom score profile metric' },
                                ].map(({ k, label, desc }) => (
                                  <div key={k} className="flex items-center justify-between gap-4 text-xs border-b border-border last:border-0 pb-2 last:pb-0">
                                    <div>
                                      <p className="font-semibold">{label}</p>
                                      <p className="text-[10px] text-muted-foreground">{desc}</p>
                                    </div>
                                    <Switch
                                      checked={hubFields[k as keyof typeof hubFields]}
                                      onCheckedChange={(c) => setHubFields(f => ({ ...f, [k]: !!c }))}
                                    />
                                  </div>
                                ))}
                              </div>
                              <Button size="sm" className="h-8 text-xs font-semibold" onClick={saveHubspotFields}>
                                Save Mappings
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ---- SLACK ALERTS WIDGET ---- */}
                    {currentSlug === 'slack' && (
                      <div className="space-y-5">
                        {!slackConnected ? (
                          <form onSubmit={connectSlack} className="space-y-3">
                            <h3 className="font-bold text-sm">Add Slack Webhook</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Paste an incoming webhook URL to sync notification channels.
                            </p>
                            <div className="flex gap-2">
                              <Input
                                placeholder="https://hooks.slack.com/services/..."
                                value={slackWebhookUrl}
                                onChange={(e) => setSlackWebhookUrl(e.target.value)}
                                className="h-9 text-xs font-mono"
                              />
                              <Button type="submit" size="sm" className="h-9 px-4 text-xs bg-primary text-white">
                                Connect Hook
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold">
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                              Slack Incoming Webhook Active!
                              <Button size="sm" variant="ghost" className="h-6 text-[10px] ml-auto text-green-500 border border-green-500/25 px-2 hover:bg-green-500/20" onClick={() => setSlackConnected(false)}>
                                Disconnect
                              </Button>
                            </div>

                            {/* Alert trigger options */}
                            <div className="border-t border-border pt-4">
                              <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">Notification Events</h4>
                              <div className="space-y-2.5 bg-background rounded-xl border border-border p-4 text-xs">
                                {[
                                  { k: 'downtime', label: 'Downtime Alert', desc: 'Notify instantly when domain goes offline' },
                                  { k: 'criticalAudits', label: 'Crawl Outage Failure', desc: 'Trigger when critical audit errors are found' },
                                  { k: 'rankChanges', label: 'Weekly Ranking Movement', desc: 'Summary of top rank movements' },
                                ].map(({ k, label, desc }) => (
                                  <div key={k} className="flex items-center justify-between gap-4 border-b border-border last:border-0 pb-2.5 last:pb-0">
                                    <div>
                                      <p className="font-semibold">{label}</p>
                                      <p className="text-[10px] text-muted-foreground">{desc}</p>
                                    </div>
                                    <Switch
                                      checked={slackToggles[k as keyof typeof slackToggles]}
                                      onCheckedChange={(c) => setSlackToggles(f => ({ ...f, [k]: !!c }))}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Push test notification */}
                            <div className="border-t border-border pt-4 space-y-3">
                              <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Test Notification Sandbox</h4>
                              <div className="flex gap-2">
                                <Input
                                  value={slackTestText}
                                  onChange={(e) => setSlackTestText(e.target.value)}
                                  className="h-9 text-xs"
                                  disabled={slackTestingAlert}
                                />
                                <Button size="sm" className="h-9 text-xs gap-1" disabled={slackTestingAlert} onClick={sendSlackTestNotification}>
                                  <Send className="w-3 h-3" />
                                  {slackTestingAlert ? 'Pushing...' : 'Test alert'}
                                </Button>
                              </div>
                            </div>

                            {/* Floating Slack Notification Bubble */}
                            {showSlackBubble && (
                              <div className="bg-[#1A1D21] border border-white/10 rounded-xl p-4 text-white shadow-2xl animate-bounce-in max-w-sm mt-3 font-sans">
                                <div className="flex items-start gap-2.5">
                                  <div className="w-7 h-7 bg-[#4A154B] rounded-lg flex items-center justify-center font-bold text-xs text-white flex-shrink-0 mt-0.5">
                                    WS
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-bold text-white leading-none">WebShark Bot</span>
                                      <Badge variant="outline" className="text-[8px] bg-white/10 text-white/70 border-0 px-1 py-0 h-3 leading-none">APP</Badge>
                                      <span className="text-[9px] text-white/50">Just now</span>
                                    </div>
                                    <p className="text-xs text-white/80 leading-relaxed mt-1 font-mono">{slackTestText}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ---- ZAPIER AUTOPILOT WIDGET ---- */}
                    {currentSlug === 'zapier' && (
                      <div className="space-y-6">
                        {!zapierConnected ? (
                          <div className="text-center py-4">
                            <h3 className="font-bold text-sm">Integrate with Zapier</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto mt-1 mb-4">
                              Grant WebShark permission to connect workflows in your Zapier account automatically.
                            </p>
                            <Button size="sm" className="bg-orange-600 text-white font-semibold text-xs h-9 px-5 gap-1.5 hover:bg-orange-600/90" onClick={handleZapierConnect} disabled={connecting}>
                              <Link2 className="w-3.5 h-3.5" />
                              {connecting ? 'Redirecting...' : 'Link Zapier Connect'}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold">
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                              Zapier Integration Configured!
                              <Button size="sm" variant="ghost" className="h-6 text-[10px] ml-auto text-green-500 border border-green-500/25 px-2 hover:bg-green-500/20" onClick={() => setZapierConnected(false)}>
                                Reset
                              </Button>
                            </div>

                            <div className="border-t border-border pt-4">
                              <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">Pre-configured Zap Templates</h4>
                              <div className="space-y-2.5">
                                {[
                                  { k: 'auditFailJira', label: 'Trigger: Technical SEO Crawl Fails', desc: 'Action: Create bug issue inside Jira' },
                                  { k: 'rankChangeSheet', label: 'Trigger: Keyword Rank Shift Detected', desc: 'Action: Log movements inside Google Sheet' },
                                  { k: 'reportDownloadStripe', label: 'Trigger: Branded Report Downloaded', desc: 'Action: Custom invoice draft in Stripe' },
                                ].map(({ k, label, desc }) => (
                                  <div key={k} className="flex items-center justify-between gap-4 p-3 bg-background border border-border rounded-lg text-xs">
                                    <div>
                                      <p className="font-bold">{label}</p>
                                      <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
                                    </div>
                                    <Switch
                                      checked={zapToggles[k as keyof typeof zapToggles]}
                                      onCheckedChange={(c) => setZapToggles(f => ({ ...f, [k]: !!c }))}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ---- REST API SANDBOX ---- */}
                    {currentSlug === 'rest-api' && (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-sm">Developer API Playground</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Interactive Console Endpoint Simulator</p>
                          </div>
                          <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={copyPlaygroundApiKey}>
                            {apiKeyCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                            {apiKeyCopied ? 'Secret Copied' : 'Copy Secret API Key'}
                          </Button>
                        </div>

                        {/* Request configurations */}
                        <div className="space-y-3 border-t border-border pt-4">
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">API Endpoint</label>
                          <div className="flex gap-2">
                            <select
                              value={apiMethod}
                              onChange={(e) => setApiMethod(e.target.value as any)}
                              className="h-9 text-xs rounded-lg border border-border bg-background px-3 focus:outline-none focus:ring-1 focus:ring-primary w-full max-w-[240px]"
                            >
                              <option value="GET /v1/audits">GET /v1/audits</option>
                              <option value="POST /v1/keyword-tracker">POST /v1/keyword-tracker</option>
                              <option value="GET /v1/uptime-status">GET /v1/uptime-status</option>
                            </select>
                            <Button size="sm" className="h-9 px-5 text-xs bg-primary text-white font-semibold flex-shrink-0 gap-1.5" disabled={apiRunning} onClick={runApiRequest}>
                              <Play className="w-3.5 h-3.5" />
                              {apiRunning ? 'Running request...' : 'Send Request'}
                            </Button>
                          </div>
                        </div>

                        {/* Developer panels */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Code snippets */}
                          <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block flex items-center gap-1.5">
                              <Code className="w-4 h-4 text-primary" /> Request Code Sample
                            </span>
                            <div className="rounded-xl bg-[#090D16] border border-[#1A263E] p-3 text-left font-mono text-[10px] text-[#A6C5E8] h-48 overflow-y-auto space-y-3 whitespace-pre">
                              <div>
                                <span className="text-[#6D8BB8]">// Bash / cURL</span>
                                <div className="mt-1">{API_CODE_SAMPLES.curl}</div>
                              </div>
                              <div className="border-t border-[#1A263E] pt-2.5">
                                <span className="text-[#6D8BB8]">// Javascript</span>
                                <div className="mt-1">{API_CODE_SAMPLES.js}</div>
                              </div>
                            </div>
                          </div>

                          {/* Response Payload */}
                          <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block flex items-center gap-1.5">
                              <Terminal className="w-4 h-4 text-primary" /> Response Terminal Payload
                            </span>
                            <pre className="rounded-xl bg-[#090D16] border border-[#1A263E] p-3 text-left font-mono text-[10px] text-[#22C55E] h-48 overflow-y-auto whitespace-pre-wrap">
                              <code>{apiOutput}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
