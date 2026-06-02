import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
