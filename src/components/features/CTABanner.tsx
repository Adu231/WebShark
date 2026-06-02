import { useNavigate } from 'react-router-dom';
import { useIntersection } from '@/hooks/useIntersection';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export default function CTABanner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ref, inView] = useIntersection<HTMLDivElement>();

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div
          ref={ref}
          className={cn(
            'relative rounded-3xl overflow-hidden bg-gradient-brand p-8 sm:p-12 md:p-16 transition-all duration-700',
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
          )}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-white/5" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full bg-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-white/10" />
          </div>

          <div className="relative z-10 text-center text-white">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 mb-6">
              <Zap className="w-7 h-7" strokeWidth={2} />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
              Start growing your organic traffic today
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              Join 47,000+ businesses using WebShark to dominate search rankings.
              Your first audit is completely free.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold gap-2 px-8"
                onClick={() => navigate(user ? '/dashboard' : '/register')}
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white gap-2"
                onClick={() => navigate('/contact')}
              >
                Talk to Sales
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                No credit card needed
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                14-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
