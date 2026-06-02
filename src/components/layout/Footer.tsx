import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Github, Youtube, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'API Documentation', href: '/features' },
    { label: 'Changelog', href: '/blog' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/about' },
    { label: 'Press Kit', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Documentation', href: '/features' },
    { label: 'SEO Guide', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Status Page', href: '/dashboard' },
    { label: 'Community', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy' },
    { label: 'GDPR', href: '/privacy' },
    { label: 'Security', href: '/about' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-wide py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl">Web<span className="text-gradient">Shark</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              The most powerful website intelligence platform for businesses, agencies, and SEO professionals.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold mb-1">Stay ahead of SEO trends</h4>
              <p className="text-sm text-muted-foreground">Get weekly insights, tips, and platform updates.</p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 w-full sm:w-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-64 px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} WebShark. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <a href="mailto:hello@webshark.io" className="hover:text-foreground transition-colors">
              hello@webshark.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
