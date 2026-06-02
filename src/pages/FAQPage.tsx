import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import CTABanner from '@/components/features/CTABanner';
import { FAQ_ITEMS } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'billing', label: 'Billing & Plans' },
  { id: 'technical', label: 'Technical' },
  { id: 'features', label: 'Features' },
];

const EXTENDED_FAQ = [
  ...FAQ_ITEMS,
  { question: 'How do I add multiple team members to my account?', answer: 'Team collaboration is available on Pro (3 seats) and Enterprise (10+ seats) plans. Go to Settings → Team to invite members by email. You can assign roles like Admin, Editor, or Viewer.' },
  { question: 'Can WebShark monitor multiple websites simultaneously?', answer: 'Yes! You can add and monitor multiple websites from a single dashboard. The number of sites depends on your plan — 1 for Starter, 5 for Pro, and unlimited for Enterprise.' },
  { question: 'How frequently are keyword rankings updated?', answer: 'On the Pro and Enterprise plans, keyword rankings are updated daily. Starter plan users receive weekly ranking updates. You can also manually trigger a rank check at any time.' },
];

export default function FAQPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');

  const filtered = EXTENDED_FAQ.filter(f =>
    !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="section-padding bg-gradient-mesh text-center">
          <div className="container-wide">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">FAQ</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked<br /><span className="text-gradient">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Everything you need to know about WebShark. Can't find your answer? Chat with our team.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="pl-9"
              />
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-3xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {FAQ_CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-colors', cat === c.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80')}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-3 mb-12">
              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                  <h3 className="font-bold mb-1">No results found</h3>
                  <p className="text-sm text-muted-foreground">Try different keywords or browse all categories.</p>
                </div>
              ) : (
                filtered.map((item, i) => (
                  <div key={i} className="rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className={cn('w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors', open === i ? 'bg-primary/5' : 'hover:bg-muted/30')}
                    >
                      <span className="text-sm font-medium">{item.question}</span>
                      <ChevronDown className={cn('w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200', open === i && 'rotate-180')} />
                    </button>
                    <div className={cn('overflow-hidden transition-all duration-300', open === i ? 'max-h-96' : 'max-h-0')}>
                      <p className="px-5 pb-4 pt-3 text-sm text-muted-foreground leading-relaxed border-t border-border">{item.answer}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Still have questions */}
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Still have questions?</h3>
              <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
                Our support team is available Monday through Friday, 9am–6pm PST. Average response time is under 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button className="bg-gradient-brand hover:opacity-90 text-white" onClick={() => navigate('/contact')}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => navigate('/contact')}>
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
