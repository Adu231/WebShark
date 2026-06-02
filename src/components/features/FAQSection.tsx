import { useState } from 'react';
import { useIntersection } from '@/hooks/useIntersection';
import { FAQ_ITEMS } from '@/lib/mockData';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function FAQItem({ item, index, inView }: { item: typeof FAQ_ITEMS[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        'border border-border rounded-xl overflow-hidden transition-all duration-500',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors',
          open ? 'bg-primary/5' : 'hover:bg-muted/50'
        )}
      >
        <span className="text-sm font-medium">{item.question}</span>
        <ChevronDown className={cn('w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', open ? 'max-h-96' : 'max-h-0')}>
        <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="section-padding bg-muted/20" id="faq">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div ref={ref} className={cn('text-center mb-10 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Questions?{' '}
              <span className="text-gradient">We have answers</span>
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about WebShark and how it can transform your SEO strategy.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {FAQ_ITEMS.slice(0, 7).map((item, i) => (
              <FAQItem key={i} item={item} index={i} inView={inView} />
            ))}
          </div>

          {/* Footer Note */}
          <div className={cn('text-center mt-8 transition-all duration-700 delay-500', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <p className="text-sm text-muted-foreground">
              Still have questions?{' '}
              <a href="/contact" className="text-primary hover:underline font-medium">
                Contact our support team →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
