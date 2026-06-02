import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import CTABanner from '@/components/features/CTABanner';
import { BLOG_POSTS } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import { Search, Clock, ArrowRight, Tag } from 'lucide-react';

const CATEGORIES = ['All', 'SEO Tips', 'Strategy', 'Performance', 'Link Building', 'AI & SEO', 'Local SEO'];

export default function Blog() {
  const navigate = useNavigate();
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [email, setEmail] = useState('');

  const filtered = BLOG_POSTS.filter(p => {
    const matchCat = cat === 'All' || p.category === cat;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = BLOG_POSTS.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || cat !== 'All' || search);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="section-padding bg-gradient-mesh text-center">
          <div className="container-wide">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Blog & Resources</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              SEO insights &<br /><span className="text-gradient">growth strategies</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Expert guides, case studies, and actionable tips to dominate search rankings.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="pl-9"
              />
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                    cat === c ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Featured Post */}
            {featured && cat === 'All' && !search && (
              <div
                className="rounded-2xl overflow-hidden border border-border bg-background mb-10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/blog/${featured.slug}`)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img src={featured.image} alt={featured.title} className="w-full h-full min-h-[240px] object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground border-0">Featured</Badge>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-3 text-xs">{featured.category}</Badge>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 hover:text-primary transition-colors">{featured.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={featured.authorAvatar} alt={featured.author} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-xs font-medium">{featured.author}</span>
                        <span className="text-xs text-muted-foreground">{featured.publishedAt}</span>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {(search || cat !== 'All' ? filtered : rest).map((post, i) => (
                <article
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className={cn(
                    'group rounded-2xl border border-border bg-background overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer',
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  )}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-[10px] px-2">{post.category}</Badge>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs font-medium">{post.author}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
                <h3 className="font-bold mb-2">No articles found</h3>
                <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
              </div>
            )}

            {/* Newsletter */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 p-8 text-center max-w-xl mx-auto">
              <h3 className="text-xl font-bold mb-2">Get SEO insights in your inbox</h3>
              <p className="text-sm text-muted-foreground mb-5">Join 12,000+ marketers getting weekly SEO tips, strategies, and platform updates.</p>
              <form onSubmit={(e) => { e.preventDefault(); if(email) { toast.success('Subscribed! Check your inbox for a welcome email.'); setEmail(''); }}} className="flex gap-2 max-w-sm mx-auto">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="flex-1" />
                <Button type="submit" className="bg-gradient-brand hover:opacity-90 text-white flex-shrink-0">Subscribe</Button>
              </form>
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
