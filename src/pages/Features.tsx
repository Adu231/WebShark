import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import CTABanner from '@/components/features/CTABanner';
import { FEATURES_LIST } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import {
  CheckCircle2, ArrowRight, Search, TrendingUp, Target,
  Activity, Sparkles, BarChart3, Zap, Globe, Shield
} from 'lucide-react';
import { useState } from 'react';

const ICON_MAP: Record<string, React.ElementType> = {
  Search, TrendingUp, Target, Activity, Sparkles, BarChart3
};

const INTEGRATIONS = [
  { name: 'Google Analytics', slug: 'google-analytics' },
  { name: 'Google Search Console', slug: 'google-search-console' },
  { name: 'WordPress', slug: 'wordpress' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Slack', slug: 'slack' },
  { name: 'Zapier', slug: 'zapier' },
  { name: 'REST API', slug: 'rest-api' }
];

export default function Features() {
  const navigate = useNavigate();
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="section-padding bg-gradient-mesh text-center">
          <div className="container-wide">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Platform features</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Every tool you need to<br />
              <span className="text-gradient">win at SEO</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              WebShark combines website auditing, SEO tracking, competitor intelligence, AI content optimization,
              and performance monitoring into one powerful platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button className="bg-gradient-brand hover:opacity-90 text-white gap-2" onClick={() => navigate('/register')}>
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/pricing')}>View Pricing</Button>
            </div>
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="section-padding">
          <div className="container-wide">
            <div ref={ref} className={cn('text-center mb-14 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Six powerful modules,<br /><span className="text-gradient">one unified platform</span></h2>
            </div>

            {/* Interactive Feature Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-2">
                {FEATURES_LIST.map((f, i) => {
                  const Icon = ICON_MAP[f.icon] || Zap;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFeature(i)}
                      className={cn(
                        'w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200',
                        activeFeature === i
                          ? 'border-primary/40 bg-primary/5 shadow-sm'
                          : 'border-border hover:border-primary/20 hover:bg-muted/30'
                      )}
                    >
                      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                        activeFeature === i ? 'bg-primary/15' : 'bg-muted'
                      )}>
                        <Icon className={cn('w-4 h-4', activeFeature === i ? 'text-primary' : 'text-muted-foreground')} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm font-semibold', activeFeature === i && 'text-primary')}>{f.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{f.stats}</p>
                      </div>
                      {activeFeature === i && <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-3">
                {FEATURES_LIST[activeFeature] && (() => {
                  const f = FEATURES_LIST[activeFeature];
                  const Icon = ICON_MAP[f.icon] || Zap;
                  return (
                    <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 h-full">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{f.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {f.details.map((d) => (
                          <div key={d} className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{d}</span>
                          </div>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full">
                        <Zap className="w-3.5 h-3.5" />
                        {f.stats}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* All Features Grid */}
        <section className="section-padding bg-muted/20">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">200+ features included in every plan</h2>
              <p className="text-muted-foreground">Everything you need to build, analyze, and grow your online presence.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { cat: 'Website Auditing', items: ['Technical SEO crawl', 'Core Web Vitals', 'Page speed analysis', 'Mobile usability', 'Broken link detection', 'Schema markup validation', 'Duplicate content check', 'Image optimization audit'] },
                { cat: 'SEO Intelligence', items: ['Keyword rank tracking', 'SERP feature analysis', 'Google position history', 'Search volume data', 'Keyword difficulty scoring', 'Meta tag analyzer', 'Sitemap validator', 'robots.txt checker'] },
                { cat: 'Competitor Analysis', items: ['Traffic estimation', 'Keyword gap analysis', 'Backlink comparison', 'Content gap discovery', 'Ranking overlap', 'Ad intelligence', 'Social signal tracking', 'Domain authority comparison'] },
                { cat: 'Performance Monitoring', items: ['1-minute uptime checks', 'Global speed testing', 'SSL monitoring', 'DNS monitoring', 'Server response tracking', 'Downtime history', 'Multi-location checks', 'Performance alerts'] },
                { cat: 'AI & Content', items: ['AI SEO recommendations', 'Content scoring', 'Readability analysis', 'Meta description generator', 'Blog topic suggestions', 'Content gap AI detection', 'E-E-A-T scoring', 'Internal linking suggestions'] },
                { cat: 'Reporting & Analytics', items: ['PDF report export', 'White-label reports', 'Scheduled delivery', 'Traffic analytics', 'Conversion tracking', 'Custom date ranges', 'Multi-site dashboards', 'API data access'] },
              ].map(({ cat, items }) => (
                <div key={cat} className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-bold text-sm mb-3 text-primary">{cat}</h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        <span className="text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="section-padding">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold mb-4">Integrates with your stack</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Connect WebShark with the tools you already use for a seamless workflow.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {INTEGRATIONS.map(item => (
                <button
                  key={item.slug}
                  onClick={() => navigate(`/integrations/${item.slug}`)}
                  className="px-5 py-3 rounded-xl border border-border bg-background text-sm font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
