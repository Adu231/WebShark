import { useIntersection } from '@/hooks/useIntersection';
import { useCounter } from '@/hooks/useCounter';
import {
  Clock, DollarSign, TrendingUp, Users, Award, Zap,
  CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const BENEFITS = [
  {
    icon: Clock,
    title: 'Save 20+ Hours Per Week',
    description: 'Automate manual SEO checks that used to consume entire workdays. WebShark does in minutes what takes agencies hours.',
    stat: '20h',
    statLabel: 'saved weekly',
    color: 'blue',
  },
  {
    icon: TrendingUp,
    title: 'Increase Organic Traffic',
    description: 'Customers report an average 3.4x increase in organic traffic within 90 days of implementing WebShark recommendations.',
    stat: '3.4x',
    statLabel: 'traffic increase',
    color: 'green',
  },
  {
    icon: DollarSign,
    title: 'Reduce CAC by 60%',
    description: 'Organic SEO traffic costs nothing per click. Fix your rankings once and benefit from compounding growth for years.',
    stat: '60%',
    statLabel: 'lower CAC',
    color: 'cyan',
  },
  {
    icon: Users,
    title: 'Agency-Grade Intelligence',
    description: 'Tools previously only available to Fortune 500 companies and top-tier SEO agencies, now accessible to every business.',
    stat: '10x',
    statLabel: 'more insights',
    color: 'purple',
  },
];

const CHECK_ITEMS = [
  'Instant results — no waiting for reports',
  'Data updated daily for always-fresh insights',
  'White-label reports for agency clients',
  'Team collaboration with role-based access',
  'Google Analytics & Search Console sync',
  'API access for custom integrations',
  'Historical data going back 24 months',
  'Automated scheduled report delivery',
];

function BenefitCard({ benefit, index, inView }: { benefit: typeof BENEFITS[0]; index: number; inView: boolean }) {
  const Icon = benefit.icon;
  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    green: 'bg-green-500/10 text-green-500 border-green-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };

  return (
    <div
      className={cn(
        'flex gap-4 p-5 rounded-2xl border bg-background hover:shadow-md transition-all duration-300',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border', colorMap[benefit.color as keyof typeof colorMap])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-sm">{benefit.title}</h3>
          <div className="text-right flex-shrink-0">
            <div className={cn('text-xl font-black', benefit.color === 'blue' ? 'text-blue-500' : benefit.color === 'green' ? 'text-green-500' : benefit.color === 'cyan' ? 'text-cyan-500' : 'text-purple-500')}>
              {benefit.stat}
            </div>
            <div className="text-[10px] text-muted-foreground">{benefit.statLabel}</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
      </div>
    </div>
  );
}

export default function BenefitsSection() {
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="section-padding bg-muted/20" id="benefits">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Benefits */}
          <div ref={ref}>
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
              Why WebShark
            </Badge>
            <h2 className={cn(
              'text-3xl sm:text-4xl font-bold mb-4 transition-all duration-700',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}>
              Built for results,{' '}
              <span className="text-gradient">not just reports</span>
            </h2>
            <p className={cn(
              'text-muted-foreground mb-8 transition-all duration-700 delay-100',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}>
              Most SEO tools drown you in data. WebShark gives you the intelligence and
              clarity to take action and see measurable results.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map((benefit, i) => (
                <BenefitCard key={benefit.title} benefit={benefit} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Right: Checklist */}
          <div className={cn('transition-all duration-700 delay-300', inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8')}>
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Everything included</h3>
                  <p className="text-sm text-muted-foreground">No hidden features, no paywalls</p>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                {CHECK_ITEMS.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '47K+', label: 'Customers' },
                    { value: '4.9/5', label: 'Rating' },
                    { value: '2.4M+', label: 'Sites Analyzed' },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <div className="text-xl font-bold text-gradient">{value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
