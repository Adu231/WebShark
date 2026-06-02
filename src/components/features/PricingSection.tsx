import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntersection } from '@/hooks/useIntersection';
import { PRICING_PLANS } from '@/lib/mockData';
import { CheckCircle2, Zap, Shield, Sparkles, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function PricingSection() {
  const navigate = useNavigate();
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });
  const [yearly, setYearly] = useState(false);

  return (
    <section className="section-padding" id="pricing">
      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className={cn('text-center mb-12 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
            Simple pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Invest in your{' '}
            <span className="text-gradient">SEO growth</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={cn('text-sm font-medium', !yearly && 'text-primary')}>Monthly</span>
            <Switch
              checked={yearly}
              onCheckedChange={setYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={cn('text-sm font-medium flex items-center gap-1.5', yearly && 'text-primary')}>
              Yearly
              <Badge className="bg-green-500/15 text-green-600 border-0 text-[10px] px-1.5">Save 20%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1',
                plan.popular
                  ? 'border-primary shadow-lg bg-gradient-to-br from-primary/5 to-accent/5 scale-[1.02]'
                  : 'border-border bg-background hover:shadow-md',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className={cn('text-xs px-3 py-1', plan.popular ? 'bg-gradient-brand text-white border-0' : 'bg-accent text-accent-foreground border-0')}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-muted-foreground text-sm">/mo</span>
                  )}
                </div>
                {yearly && plan.monthlyPrice > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Billed ${plan.yearlyPrice * 12}/year · Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr
                  </p>
                )}
              </div>

              <Button
                className={cn(
                  'w-full mb-6',
                  plan.popular ? 'bg-gradient-brand hover:opacity-90 text-white' : 'variant-outline'
                )}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => navigate(plan.monthlyPrice === 0 ? '/register' : '/register')}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

              <div className="space-y-2.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{f}</span>
                  </div>
                ))}
                {plan.limits.map((l) => (
                  <div key={l} className="flex items-start gap-2.5 opacity-50">
                    <X className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-500" />
            14-day free trial
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent" />
            No credit card required
          </span>
        </div>
      </div>
    </section>
  );
}
