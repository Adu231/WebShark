import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntersection } from '@/hooks/useIntersection';
import { useCounter } from '@/hooks/useCounter';
import heroBg from '@/assets/hero-bg.jpg';
import heroDb from '@/assets/hero-dashboard.jpg';
import { ArrowRight, Play, Star, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function StatCard({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(value, 2200, start);
  const display = count >= 1000000
    ? `${(count / 1000000).toFixed(1)}M`
    : count >= 1000
    ? `${(count / 1000).toFixed(0)}K`
    : count.toString();

  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
        {display}{suffix}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  const [ref, inView] = useIntersection<HTMLDivElement>();
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      navigate('/register');
    }, 1500);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06] dark:opacity-[0.12]"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="container-wide relative z-10 py-16 sm:py-24">
        <div ref={ref} className={cn('transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1.5 text-xs font-medium border-primary/30 bg-primary/5 text-primary"
            >
              <Star className="w-3 h-3 fill-current" />
              Trusted by 47,000+ businesses worldwide
              <ArrowRight className="w-3 h-3" />
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight mb-6 max-w-5xl mx-auto">
            The Ultimate{' '}
            <span className="text-gradient">Website Intelligence</span>
            {' '}Platform
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Analyze websites, track SEO rankings, monitor competitors, and grow your online visibility
            — all powered by advanced AI insights.
          </p>

          {/* URL Input */}
          <form onSubmit={handleAnalyze} className="max-w-xl mx-auto mb-6">
            <div className="flex gap-2 p-1.5 bg-background border border-border rounded-xl shadow-lg">
              <div className="flex items-center gap-2 flex-1 pl-3">
                <Zap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter any website URL..."
                  className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground/60"
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-brand hover:opacity-90 text-white font-semibold px-5 rounded-lg flex-shrink-0"
                disabled={analyzing}
              >
                {analyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing
                  </div>
                ) : (
                  <>Analyze Free</>
                )}
              </Button>
            </div>
          </form>

          {/* Trust Pills */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-14 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" />
              Results in 60 seconds
            </span>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mb-14">
            {[
              { value: 2400000, suffix: '+', label: 'Websites Analyzed' },
              { value: 85, suffix: 'M+', label: 'Keywords Tracked' },
              { value: 47, suffix: 'K+', label: 'Happy Customers' },
              { value: 99, suffix: '.9%', label: 'Uptime SLA' },
            ].map((stat) => (
              <StatCard key={stat.label} {...stat} start={inView} />
            ))}
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
              <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground text-center max-w-xs mx-auto">
                  app.webshark.io/dashboard
                </div>
              </div>
              <img
                src={heroDb}
                alt="WebShark Dashboard"
                className="w-full object-cover"
                loading="eager"
              />
            </div>
            {/* Floating Badges */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 hidden sm:block">
              <div className="glass dark:glass-dark rounded-xl px-3 py-2 shadow-lg border border-border animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-green-500/15 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">SEO Score</p>
                    <p className="text-xs text-green-500 font-bold">92/100 ↑</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 hidden sm:block">
              <div className="glass dark:glass-dark rounded-xl px-3 py-2 shadow-lg border border-border" style={{ animationDelay: '3s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary/15 rounded-lg flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">AI Analysis</p>
                    <p className="text-xs text-muted-foreground">47 issues found</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
