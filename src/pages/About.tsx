import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import CTABanner from '@/components/features/CTABanner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import {
  Target, Heart, Zap, Globe, Users, Award, TrendingUp,
  MapPin, Mail, Linkedin, Twitter, ArrowRight
} from 'lucide-react';

const TEAM = [
  { name: 'Jordan Lee', role: 'CEO & Co-Founder', bio: 'Ex-Google engineer. 15+ years building data analytics platforms.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face' },
  { name: 'Priya Sharma', role: 'CTO & Co-Founder', bio: 'Built SEO infrastructure at SEMrush. Machine learning specialist.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b76c?w=120&h=120&fit=crop&crop=face' },
  { name: 'Marcus Chen', role: 'Head of Product', bio: 'Former product lead at Ahrefs. Passionate about UX and data visualization.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face' },
  { name: 'Emma Wilson', role: 'Head of SEO Science', bio: 'PhD in Information Retrieval. Published researcher in search algorithms.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face' },
  { name: 'David Kim', role: 'VP of Engineering', bio: '10+ years building scalable web crawlers and data pipelines.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face' },
  { name: 'Sofia Rodriguez', role: 'Head of Customer Success', bio: 'Helped 500+ companies achieve their SEO goals over 8 years.', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=face' },
];

const VALUES = [
  { icon: Target, title: 'Data-Driven', desc: 'Every recommendation we make is backed by real data, not guesswork.' },
  { icon: Heart, title: 'Customer Obsessed', desc: 'Our customers\' success is our success. We obsess over their outcomes.' },
  { icon: Zap, title: 'Move Fast', desc: 'We ship fast, iterate constantly, and never stop improving.' },
  { icon: Globe, title: 'Transparent', desc: 'No black box algorithms. We explain exactly how our scores work.' },
];

const MILESTONES = [
  { year: '2020', event: 'WebShark founded by Jordan Lee and Priya Sharma in San Francisco' },
  { year: '2021', event: 'Launched V1.0 with website audit and keyword tracking features' },
  { year: '2022', event: 'Reached 5,000 customers and raised $4M seed round' },
  { year: '2023', event: 'Launched AI content engine and competitor intelligence module' },
  { year: '2024', event: 'Hit 30,000 customers across 80+ countries, raised $15M Series A' },
  { year: '2025', event: '47,000+ customers, 2.4M websites analyzed, expanding to enterprise' },
];

export default function About() {
  const navigate = useNavigate();
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="section-padding bg-gradient-mesh">
          <div className="container-wide text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Our story</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              We're on a mission to<br />
              <span className="text-gradient">democratize SEO intelligence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Founded in 2020, WebShark was built by SEO engineers tired of the complexity and cost of enterprise tools.
              We believe every business deserves world-class website intelligence — not just the Fortune 500.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { v: '47K+', l: 'Customers' },
                { v: '80+', l: 'Countries' },
                { v: '2.4M+', l: 'Sites analyzed' },
                { v: '$15M', l: 'Series A raised' },
              ].map(({ v, l }) => (
                <div key={l} className="text-center rounded-xl border border-border bg-background p-4">
                  <div className="text-2xl font-black text-gradient mb-1">{v}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-wide">
            <div ref={ref} className={cn('text-center mb-12 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">What we believe in</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide every decision we make at WebShark.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className={cn('rounded-2xl border border-border bg-background p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-muted/20">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet our team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Ex-Google, ex-SEMrush, ex-Ahrefs. The world's best SEO engineers and product thinkers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TEAM.map(({ name, role, bio, avatar }) => (
                <div key={name} className="rounded-2xl border border-border bg-background p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover" loading="lazy" />
                    <div>
                      <h3 className="font-bold text-sm">{name}</h3>
                      <p className="text-xs text-primary font-medium">{role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{bio}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="w-7 h-7 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                      <Linkedin className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                      <Twitter className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our journey</h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-0">
              {MILESTONES.map(({ year, event }, i) => (
                <div key={year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary">{year.slice(2)}</span>
                    </div>
                    {i < MILESTONES.length - 1 && <div className="w-0.5 flex-1 bg-border my-2" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-xs font-bold text-primary mb-1">{year}</p>
                    <p className="text-sm text-muted-foreground">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press */}
        <section className="section-padding bg-muted/20">
          <div className="container-wide text-center">
            <p className="text-sm text-muted-foreground mb-8 uppercase tracking-widest font-medium">As featured in</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {['TechCrunch', 'Forbes', 'Wired', 'The Verge', 'Entrepreneur', 'Inc. Magazine'].map(p => (
                <span key={p} className="text-lg font-black text-foreground/60">{p}</span>
              ))}
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
