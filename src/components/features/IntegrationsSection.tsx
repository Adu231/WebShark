import { useNavigate } from 'react-router-dom';
import { useIntersection } from '@/hooks/useIntersection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Globe, Activity, Code, ShieldCheck, Database, MessageSquare,
  Link2, Cpu, ArrowRight, Zap
} from 'lucide-react';

const INTEGRATIONS_LIST = [
  {
    slug: 'google-analytics',
    name: 'Google Analytics',
    description: 'Sync organic traffic statistics and active visitor engagement profiles directly.',
    badge: 'GA4 Sync',
    icon: Globe,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20 shadow-orange-500/5 hover:border-orange-500/40 hover:shadow-orange-500/10',
  },
  {
    slug: 'google-search-console',
    name: 'Google Search Console',
    description: 'Pull search queries difficulty, average click rates, and site crawler error logs.',
    badge: 'SERP Data',
    icon: Activity,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20 shadow-blue-500/5 hover:border-blue-500/40 hover:shadow-blue-500/10',
  },
  {
    slug: 'wordpress',
    name: 'WordPress Plugin',
    description: 'Optimize on-page post readability and meta tags directly inside Gutenberg editor.',
    badge: 'CMS Plugin',
    icon: Code,
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20 shadow-sky-500/5 hover:border-sky-500/40 hover:shadow-sky-500/10',
  },
  {
    slug: 'shopify',
    name: 'Shopify Store',
    description: 'Auto-inject SEO products schema grids andLiquid theme speed booster hooks.',
    badge: 'E-commerce',
    icon: ShieldCheck,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20 shadow-green-500/5 hover:border-green-500/40 hover:shadow-green-500/10',
  },
  {
    slug: 'hubspot',
    name: 'Hubspot CRM',
    description: 'Log audit contact leads, SEO health profiles, and timelines attributes automatically.',
    badge: 'CRM Sync',
    icon: Database,
    color: 'text-amber-600',
    bg: 'bg-amber-600/10',
    border: 'border-amber-600/20 shadow-amber-600/5 hover:border-amber-600/40 hover:shadow-amber-600/10',
  },
  {
    slug: 'slack',
    name: 'Slack Alerts',
    description: 'Get instant site downtime warnings, rank drop reports, and SSL alerts inside channels.',
    badge: 'Notifications',
    icon: MessageSquare,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20 shadow-purple-500/5 hover:border-purple-500/40 hover:shadow-purple-500/10',
  },
  {
    slug: 'zapier',
    name: 'Zapier Connect',
    description: 'Link keyword positions changes and audits logs reports to 6,000+ app triggers.',
    badge: 'No-Code Connect',
    icon: Link2,
    color: 'text-orange-600',
    bg: 'bg-orange-600/10',
    border: 'border-orange-600/20 shadow-orange-600/5 hover:border-orange-600/40 hover:shadow-orange-600/10',
  },
  {
    slug: 'rest-api',
    name: 'REST API Documentation',
    description: 'Access raw crawls audits, domain metrics history, and uptime statistics programmatically.',
    badge: 'Developer REST',
    icon: Cpu,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20 shadow-teal-500/5 hover:border-teal-500/40 hover:shadow-teal-500/10',
  },
];

export default function IntegrationsSection() {
  const navigate = useNavigate();
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="section-padding bg-background border-t border-border" id="integrations">
      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className={cn('text-center mb-16 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
            App Integrations
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Integrates with your{' '}
            <span className="text-gradient">favorite stack</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect WebShark with the platforms and software you already use to automate SEO audits and streamline reporting workflows.
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {INTEGRATIONS_LIST.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.slug}
                onClick={() => navigate(`/integrations/${item.slug}`)}
                className={cn(
                  'group relative rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between',
                  item.border,
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div>
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105', item.bg)}>
                    <Icon className={cn('w-5 h-5', item.color)} />
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{item.name}</h3>
                    <Badge variant="outline" className={cn('text-[9px] px-1.5 py-0 h-4 border-0 font-bold', item.bg, item.color)}>
                      {item.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className={cn('text-xs font-semibold flex items-center gap-1 mt-2 transition-all group-hover:gap-2', item.color)}>
                  Integrate now <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner summary */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Have custom workflow integrations needs?</p>
              <p className="text-[10px] text-muted-foreground">Access WebShark REST developer endpoint or custom Zap connectors.</p>
            </div>
          </div>
          <Button size="sm" className="bg-gradient-brand hover:opacity-90 text-white gap-1 flex-shrink-0" onClick={() => navigate('/integrations/rest-api')}>
            Developer Sandbox <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
