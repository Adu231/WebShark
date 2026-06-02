import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import { PRICING_PLANS } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import {
  CheckCircle2, X, ArrowRight, Zap, Shield, Sparkles,
  HelpCircle, Star, Building, ChevronDown
} from 'lucide-react';
import { useState as useLocalState } from 'react';

const COMPARE_FEATURES = [
  { feature: 'Website audits/month', starter: '1', pro: '10', enterprise: 'Unlimited' },
  { feature: 'Keywords tracked', starter: '5', pro: '500', enterprise: 'Unlimited' },
  { feature: 'Competitor analysis', starter: false, pro: '5 competitors', enterprise: 'Unlimited' },
  { feature: 'AI content suggestions', starter: false, pro: true, enterprise: true },
  { feature: 'Uptime monitoring', starter: '1 site', pro: '5 sites', enterprise: 'Unlimited' },
  { feature: 'PDF report export', starter: false, pro: true, enterprise: true },
  { feature: 'White-label reports', starter: false, pro: false, enterprise: true },
  { feature: 'API access', starter: false, pro: '10K calls/mo', enterprise: 'Unlimited' },
  { feature: 'Team seats', starter: '1', pro: '3', enterprise: '10+' },
  { feature: 'Google Analytics sync', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated support', starter: false, pro: false, enterprise: true },
  { feature: 'SLA guarantee', starter: false, pro: '99.5%', enterprise: '99.9%' },
];

function FeatureCell({ value }: { value: string | boolean }) {
  if (value === true) return <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs font-medium">{value}</span>;
}

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const FAQS = [
    { q: 'Do I need a credit card for the free trial?', a: 'No. Start your 14-day Pro trial with just an email address. We only ask for payment info when you decide to continue.' },
    { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades at the next billing cycle.' },
    { q: 'What happens when my trial ends?', a: "You'll automatically move to the Starter (free) plan. Your data is preserved for 30 days to give you time to upgrade." },
    { q: 'Is there a discount for nonprofits or startups?', a: "Yes! We offer 50% discounts for registered nonprofits and early-stage startups. Contact us at hello@webshark.io with proof of eligibility." },
    { q: 'Do you offer custom enterprise pricing?', a: 'For teams over 10 seats or specific volume needs, contact our sales team for a custom quote with tailored features and SLAs.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="section-padding text-center bg-gradient-mesh">
          <div className="container-wide">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Pricing</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Simple, transparent<br /><span className="text-gradient">pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              No hidden fees. No surprise bills. Start free and scale as you grow.
            </p>
            <div className="flex items-center justify-center gap-3 mb-12">
              <span className={cn('text-sm font-medium', !yearly && 'text-primary')}>Monthly</span>
              <Switch checked={yearly} onCheckedChange={setYearly} className="data-[state=checked]:bg-primary" />
              <span className={cn('text-sm font-medium flex items-center gap-1.5', yearly && 'text-primary')}>
                Yearly
                <Badge className="bg-green-500/15 text-green-600 border-0 text-[10px] px-1.5">Save 20%</Badge>
              </span>
            </div>

            {/* Plans */}
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {PRICING_PLANS.map((plan, i) => (
                <div key={plan.id} className={cn(
                  'relative rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1',
                  plan.popular ? 'border-primary shadow-xl bg-gradient-to-br from-primary/5 to-accent/5 scale-[1.02]' : 'border-border bg-background hover:shadow-lg',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )} style={{ transitionDelay: `${i * 100}ms` }}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className={cn('text-xs px-3 py-1 border-0', plan.popular ? 'bg-gradient-brand text-white' : 'bg-accent text-accent-foreground')}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <div className="mb-5">
                    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black">${yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                      {plan.monthlyPrice > 0 && <span className="text-muted-foreground text-sm">/month</span>}
                    </div>
                    {yearly && plan.monthlyPrice > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Billed annually · Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr
                      </p>
                    )}
                  </div>
                  <Button
                    className={cn('w-full mb-5 gap-1', plan.popular ? 'bg-gradient-brand hover:opacity-90 text-white' : '')}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate(plan.id === 'enterprise' ? '/contact' : user ? `/payment?plan=${plan.id}&yearly=${yearly}` : '/register')}
                  >
                    {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                  <div className="space-y-2.5">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-green-500" />14-day free trial</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" />Cancel anytime</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-accent" />No credit card required</span>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Compare plans</h2>
              <p className="text-muted-foreground">See exactly what's included in each plan</p>
            </div>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-5 py-4 text-left font-semibold">Feature</th>
                      {PRICING_PLANS.map(p => (
                        <th key={p.id} className="px-5 py-4 text-center font-semibold min-w-[120px]">
                          <div>{p.name}</div>
                          <div className="text-primary font-black">${yearly ? p.yearlyPrice : p.monthlyPrice}<span className="text-muted-foreground font-normal text-xs">/mo</span></div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_FEATURES.map(({ feature, starter, pro, enterprise }) => (
                      <tr key={feature} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3 text-sm">{feature}</td>
                        <td className="px-5 py-3 text-center"><FeatureCell value={starter} /></td>
                        <td className="px-5 py-3 text-center"><FeatureCell value={pro} /></td>
                        <td className="px-5 py-3 text-center"><FeatureCell value={enterprise} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="section-padding bg-muted/20">
          <div className="container-wide">
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-12 text-center max-w-3xl mx-auto">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need a custom enterprise plan?</h2>
              <p className="text-muted-foreground mb-6">Large team? Unique requirements? We'll build a custom plan that fits exactly what you need — including custom SLAs, dedicated infrastructure, and white-glove onboarding.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button className="bg-gradient-brand hover:opacity-90 text-white gap-2 w-full sm:w-auto" onClick={() => navigate('/contact')}>
                  Talk to Sales <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/contact')}>Schedule a demo</Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="container-wide max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Billing FAQ</h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <div key={i} className="rounded-xl border border-border overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors">
                    <span className="text-sm font-medium">{f.q}</span>
                    <ChevronDown className={cn('w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform', openFaq === i && 'rotate-180')} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-border pt-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
