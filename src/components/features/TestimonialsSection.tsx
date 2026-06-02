import { useState } from 'react';
import { useIntersection } from '@/hooks/useIntersection';
import { TESTIMONIALS } from '@/lib/mockData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function TestimonialsSection() {
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const visibleCount = 3;
  const visible = Array.from({ length: visibleCount }, (_, i) =>
    TESTIMONIALS[(current + i) % TESTIMONIALS.length]
  );

  return (
    <section className="section-padding bg-muted/20" id="testimonials">
      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className={cn('text-center mb-12 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
            Customer stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by{' '}
            <span className="text-gradient">47,000+ businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From solo founders to Fortune 500 agencies — WebShark delivers results
            that speak for themselves.
          </p>
        </div>

        {/* Aggregate Rating */}
        <div className={cn('flex flex-wrap items-center justify-center gap-6 mb-10 transition-all duration-700 delay-200', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-bold text-lg">4.9/5</span>
            <span className="text-muted-foreground text-sm">from 12,400+ reviews</span>
          </div>
          <div className="h-5 w-px bg-border hidden sm:block" />
          {[
            { label: 'G2', rating: '4.9' },
            { label: 'Capterra', rating: '4.8' },
            { label: 'Product Hunt', rating: '#1' },
          ].map(({ label, rating }) => (
            <div key={label} className="flex items-center gap-1.5 text-sm">
              <span className="font-semibold">{label}</span>
              <Badge variant="secondary" className="text-yellow-600 bg-yellow-500/10 border-0 text-xs">{rating}</Badge>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {visible.map((t, i) => (
            <div
              key={t.id}
              className={cn(
                'rounded-2xl border bg-background p-6 hover:shadow-md transition-all duration-500',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-1 mb-4">
                <Quote className="w-6 h-6 text-primary/30 flex-shrink-0 mt-0.5" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex mb-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-green-500">{t.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prev}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                )}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
