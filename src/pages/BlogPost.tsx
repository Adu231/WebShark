import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import { BLOG_POSTS } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-3">Article not found</h2>
            <p className="text-muted-foreground mb-5">This article may have been moved or deleted.</p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const CONTENT_SECTIONS = [
    { heading: 'Why This Matters in 2025', body: `The SEO landscape is evolving faster than ever. With Google's continuous algorithm updates and the rise of AI-generated content, understanding and implementing the right strategies has become critical for businesses of all sizes. ${post.excerpt}` },
    { heading: 'Key Strategies to Implement', body: "Starting with a solid technical foundation is non-negotiable. Search engines need to be able to crawl and index your content efficiently. This means ensuring your site architecture is clean, your page load times are optimized, and your mobile experience is flawless. Next, focus on content quality over quantity. Google's Helpful Content Update has made it clear that content written for humans — not algorithms — will outperform keyword-stuffed articles every time." },
    { heading: 'Measuring Your Progress', body: "Tracking the right metrics is essential for understanding whether your SEO efforts are paying off. Focus on organic traffic growth, keyword ranking improvements, and most importantly, the business outcomes those rankings drive. Set up proper tracking with tools like WebShark to monitor changes week-over-week and identify opportunities before competitors do." },
    { heading: 'Actionable Next Steps', body: "The best SEO strategy is one you actually implement. Start with a comprehensive audit of your current website to identify the highest-impact issues. Prioritize fixes that will move the needle most for your specific goals — whether that's traffic growth, lead generation, or e-commerce conversions." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Header */}
        <div className="bg-muted/30 border-b border-border py-4">
          <div className="container-wide">
            <Button variant="ghost" size="sm" onClick={() => navigate('/blog')} className="gap-1.5 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Button>
          </div>
        </div>

        <article className="container-wide py-10 sm:py-14">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant="outline" className="text-xs">{post.category}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{post.publishedAt}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-muted-foreground">Senior SEO Writer at WebShark</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Share:</span>
                <button onClick={() => toast.success('Link copied!')} className="w-8 h-8 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                  <Twitter className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => toast.success('Link copied!')} className="w-8 h-8 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                  <Linkedin className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} className="w-8 h-8 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-10 border border-border">
              <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />
            </div>

            {/* Content */}
            <div className="prose prose-sm max-w-none space-y-8">
              {CONTENT_SECTIONS.map(({ heading, body }) => (
                <div key={heading}>
                  <h2 className="text-xl font-bold mb-3">{heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
              <span className="text-sm font-medium">Tags:</span>
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 p-6 text-center">
              <h3 className="font-bold mb-2">Ready to implement these strategies?</h3>
              <p className="text-sm text-muted-foreground mb-4">Start your free WebShark audit and get personalized recommendations for your website.</p>
              <Button className="bg-gradient-brand hover:opacity-90 text-white" onClick={() => navigate(user ? '/dashboard' : '/register')}>
                Start Free Audit
              </Button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="bg-muted/20 border-t border-border py-12">
          <div className="container-wide">
            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="group rounded-xl border border-border bg-background overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <img src={p.image} alt={p.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-4">
                    <Badge variant="outline" className="text-[10px] mb-2">{p.category}</Badge>
                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">{p.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</p>
                  </div>
                </Link>
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
