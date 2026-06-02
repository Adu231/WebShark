import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Zap } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Homepage', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16 px-4">
        <div className="text-center max-w-lg mx-auto py-16">
          {/* Visual */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="text-[120px] sm:text-[160px] font-black leading-none bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent opacity-20 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-brand rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Page not found</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page at <code className="text-primary bg-primary/10 px-2 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist.
            It may have been moved, deleted, or you may have typed the URL incorrectly.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Button className="bg-gradient-brand hover:opacity-90 text-white gap-2 w-full sm:w-auto" onClick={() => navigate('/')}>
              <Home className="w-4 h-4" /> Go to Homepage
            </Button>
            <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">Or jump to a specific page:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => navigate(href)}
                  className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
