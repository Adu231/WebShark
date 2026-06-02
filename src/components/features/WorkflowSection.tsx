import { useIntersection } from '@/hooks/useIntersection';
import { Globe, Brain, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    step: 1,
    icon: Globe,
    title: 'Add Your Website',
    description: "Enter any domain URL and WebShark's intelligent crawler immediately begins a deep analysis of your entire web presence.",
    color: 'blue',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-500/30',
    detail: 'Crawls 10,000+ pages in minutes',
  },
  {
    step: 2,
    icon: Brain,
    title: 'Deep Intelligence Analysis',
    description: 'Receive a comprehensive audit covering 200+ SEO factors, performance benchmarks, competitor comparisons, and security checks.',
    color: 'cyan',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-500',
    borderColor: 'border-cyan-500/30',
    detail: '200+ ranking factors analyzed',
  },
  {
    step: 3,
    icon: Sparkles,
    title: 'AI-Powered Roadmap',
    description: "Our AI engine prioritizes your action items by potential impact, building a clear optimization roadmap ranked by ROI.",
    color: 'purple',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-500/30',
    detail: 'Impact-ranked recommendations',
  },
  {
    step: 4,
    icon: TrendingUp,
    title: 'Track & Scale Growth',
    description: 'Monitor daily ranking changes, get automated alerts, and track growth metrics that prove the value of your SEO investment.',
    color: 'green',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    borderColor: 'border-green-500/30',
    detail: 'Daily automated reporting',
  },
];

export default function WorkflowSection() {
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="section-padding" id="workflow">
      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className={cn('text-center mb-16 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <Badge variant="outline" className="mb-4 border-accent/30 bg-accent/5 text-accent">
            How it works
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            From audit to{' '}
            <span className="text-gradient">page one rankings</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps that transform your website from buried in search results to
            dominating your industry keywords.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-[calc(100%-4rem)] bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 1;
              return (
                <div
                  key={step.step}
                  className={cn(
                    'flex gap-5 items-start transition-all duration-700',
                    isRight ? 'lg:flex-row' : 'lg:flex-row-reverse',
                    inView ? 'opacity-100 translate-x-0' : isRight ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Card */}
                  <div className={cn('flex-1 rounded-2xl border p-6 bg-background hover:shadow-md transition-shadow', step.borderColor)}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', step.iconBg)}>
                        <Icon className={cn('w-5 h-5', step.iconColor)} />
                      </div>
                      <span className={cn(
                        'text-4xl font-black opacity-10',
                        step.color === 'blue' ? 'text-blue-500' :
                        step.color === 'cyan' ? 'text-cyan-500' :
                        step.color === 'purple' ? 'text-purple-500' : 'text-green-500'
                      )}>
                        {String(step.step).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full',
                      step.iconBg, step.iconColor
                    )}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
