import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import {
  Mail, Phone, MapPin, Clock, MessageSquare,
  CheckCircle, ArrowRight, Twitter, Linkedin, Youtube
} from 'lucide-react';

const CONTACT_OPTIONS = [
  { icon: MessageSquare, title: 'Sales Inquiry', desc: 'Interested in Pro or Enterprise plans? Chat with our sales team.', action: 'Chat with sales', color: 'blue' },
  { icon: Mail, title: 'Support Request', desc: 'Have a technical question or issue? Our support team is here.', action: 'Email support', color: 'cyan' },
  { icon: Phone, title: 'Schedule a Demo', desc: 'Want a live demo? Book a 30-minute call with a product expert.', action: 'Book a call', color: 'purple' },
];

export default function Contact() {
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success('Message sent! We\'ll reply within 24 hours.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="section-padding bg-gradient-mesh text-center">
          <div className="container-wide">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Get in touch</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              We'd love to <span className="text-gradient">hear from you</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Our team responds within 24 hours on business days. We're here to help you grow.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
              {CONTACT_OPTIONS.map(({ icon: Icon, title, desc, action, color }) => (
                <div key={title} className={cn(
                  'rounded-2xl border p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer',
                  color === 'blue' ? 'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40' :
                  color === 'cyan' ? 'border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40' :
                  'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40'
                )} onClick={() => toast.info(`${action} — coming soon!`)}>
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-4',
                    color === 'blue' ? 'bg-blue-500/15' : color === 'cyan' ? 'bg-cyan-500/15' : 'bg-purple-500/15'
                  )}>
                    <Icon className={cn('w-5 h-5', color === 'blue' ? 'text-blue-500' : color === 'cyan' ? 'text-cyan-500' : 'text-purple-500')} />
                  </div>
                  <h3 className="font-bold mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{desc}</p>
                  <span className={cn('text-xs font-medium flex items-center gap-1', color === 'blue' ? 'text-blue-500' : color === 'cyan' ? 'text-cyan-500' : 'text-purple-500')}>
                    {action} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>

            {/* Main Form + Info */}
            <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className={cn('lg:col-span-3 transition-all duration-700', inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8')}>
                <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
                  <h2 className="text-xl font-bold mb-1">Send us a message</h2>
                  <p className="text-sm text-muted-foreground mb-6">We typically respond within 2-4 business hours.</p>

                  {sent ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Message received!</h3>
                      <p className="text-muted-foreground text-sm mb-4">Thanks for reaching out. We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                      <Button variant="outline" onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', subject: '', message: '' }); }}>
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Full name *</Label>
                          <Input value={form.name} onChange={set('name')} placeholder="Alex Morgan" className={cn(errors.name && 'border-destructive')} />
                          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Work email *</Label>
                          <Input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={cn(errors.email && 'border-destructive')} />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Company</Label>
                          <Input value={form.company} onChange={set('company')} placeholder="Your company" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Subject</Label>
                          <select value={form.subject} onChange={set('subject')} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                            <option value="">Select a topic</option>
                            <option>Sales & Pricing</option>
                            <option>Technical Support</option>
                            <option>Enterprise Inquiry</option>
                            <option>Partnership</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Message *</Label>
                        <Textarea value={form.message} onChange={set('message')} placeholder="Tell us how we can help you..." rows={5} className={cn(errors.message && 'border-destructive')} />
                        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                      </div>
                      <Button type="submit" className="w-full bg-gradient-brand hover:opacity-90 text-white gap-2" disabled={loading}>
                        {loading ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</div> : <>Send Message <ArrowRight className="w-4 h-4" /></>}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className={cn('lg:col-span-2 space-y-5 transition-all duration-700 delay-200', inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8')}>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <h3 className="font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Mail, label: 'Email', value: 'hello@webshark.io' },
                      { icon: Phone, label: 'Phone', value: '+1 (415) 555-0192' },
                      { icon: MapPin, label: 'Office', value: '340 Pine St, San Francisco, CA 94104' },
                      { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9am–6pm PST' },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className="text-sm font-medium">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <h3 className="font-bold mb-3">Follow Us</h3>
                  <div className="flex gap-2">
                    {[Twitter, Linkedin, Youtube].map((Icon, i) => (
                      <button key={i} className="w-9 h-9 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <h3 className="font-bold mb-2">Enterprise sales</h3>
                  <p className="text-sm text-muted-foreground mb-3">Need custom contracts, procurement support, or a dedicated account manager?</p>
                  <p className="text-sm font-medium text-primary">enterprise@webshark.io</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
