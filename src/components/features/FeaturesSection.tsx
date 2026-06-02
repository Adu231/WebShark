import { useNavigate } from 'react-router-dom';
import { useIntersection } from '@/hooks/useIntersection';
import {
  Search, TrendingUp, Target, Activity, Sparkles, BarChart3,
  CheckCircle, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    icon: Search,
    title: 'Website Audit System',
    description: 'Deep technical SEO analysis covering 200+ factors including Core Web Vitals, mobile usability, broken links, and accessibility.',
    color: 'blue',
    gradient: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    badge: '200+ checks',
  },
  {
    icon: TrendingUp,
    title: 'SEO Intelligence',
    description: 'Track keyword rankings, analyze SERP positions, monitor backlinks, and get actionable insights to dominate search results.',
    color: 'cyan',
    gradient: 'from-cyan-500/10 to-cyan-600/5',
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-500',
    badge: 'Daily updates',
  },
  {
    icon: Target,
    title: 'Competitor Analysis',
    description: "Uncover competitors' SEO strategies, traffic estimates, keyword gaps, and backlink sources to find your growth opportunities.",
    color: 'purple',
    gradient: 'from-purple-500/10 to-purple-600/5',
    border: 'border-purple-500/20',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    badge: 'Side-by-side view',
  },
  {
    icon: Activity,
    title: 'Uptime Monitoring',
    description: 'Real-time monitoring with 1-minute check intervals, instant downtime alerts, speed testing, and global performance tracking.',
    color: 'green',
    gradient: 'from-green-500/10 to-green-600/5',
    border: 'border-green-500/20',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    badge: '99.9% SLA',
  },
  {
    icon: Sparkles,
    title: 'AI Content Engine',
    description: 'AI-powered SEO recommendations, meta description generation, content scoring, and blog topic suggestions to outrank competitors.',
    color: 'orange',
    gradient: 'from-orange-500/10 to-orange-600/5',
    border: 'border-orange-500/20',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
    badge: 'GPT-powered',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Beautiful PDF reports with traffic insights, conversion data, and engagement metrics. White-label ready for agencies.',
    color: 'blue',
    gradient: 'from-blue-500/10 to-indigo-600/5',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-500',
    badge: 'White-label',
  },
];

export default function FeaturesSection() {
  const navigate = useNavigate();
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="section-padding bg-muted/20" id="features">
      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className={cn('text-center mb-16 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
            Everything you need
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Powerful tools for{' '}
            <span className="text-gradient">every SEO challenge</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From technical audits to AI-powered recommendations, WebShark gives you
            the complete intelligence suite to dominate search rankings.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  'group relative rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                  `bg-gradient-to-br ${feature.gradient}`,
                  feature.border,
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-4', feature.iconBg)}>
                  <Icon className={cn('w-5 h-5', feature.iconColor)} />
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-base">{feature.title}</h3>
                  <Badge variant="secondary" className="text-[10px] px-1.5 flex-shrink-0">
                    {feature.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                <button
                  onClick={() => navigate('/features')}
                  className={cn('text-xs font-medium flex items-center gap-1 transition-all group-hover:gap-2', feature.iconColor)}
                >
                  Learn more <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            className="bg-gradient-brand hover:opacity-90 text-white gap-2"
            size="lg"
            onClick={() => navigate('/features')}
          >
            Explore All Features <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
