import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sun, Moon, Menu, X, ChevronDown, BarChart3,
  User, Settings, LogOut, LayoutDashboard, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname === '/profile' || location.pathname === '/settings';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || mobileOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Web<span className="text-gradient">Shark</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="gap-1.5"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted transition-colors">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 mr-2" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" /> Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Sign in
                </Button>
                <Button size="sm" className="bg-gradient-brand hover:opacity-90" onClick={() => navigate('/register')}>
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container-wide py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/dashboard" className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link to="/profile" className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted text-left text-destructive flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Sign in</Link>
                  <Link to="/register">
                    <Button className="w-full bg-gradient-brand hover:opacity-90">Start Free Trial</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
