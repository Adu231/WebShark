import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_META, UserRole } from '@/lib/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Zap, Eye, EyeOff, ArrowRight, Github, Chrome,
  Building2, Users, SearchCode, ShieldCheck,
  Sun, Moon, CheckCircle2, ChevronDown, ChevronUp
} from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

// Demo accounts for all 4 roles
const DEMO_ACCOUNTS: {
  role: UserRole;
  email: string;
  password: string;
  name: string;
  company: string;
  plan: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  borderActive: string;
  description: string;
}[] = [
  {
    role: 'business',
    email: 'demo@webshark.io',
    password: 'demo1234',
    name: 'Alex Morgan',
    company: 'TechCorp Inc.',
    plan: 'Pro',
    icon: Building2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-900/40',
    borderActive: 'border-blue-500 ring-2 ring-blue-500/20',
    description: 'Website audits, SEO tracking, growth monitoring',
  },
  {
    role: 'agency',
    email: 'agency@webshark.io',
    password: 'agency1234',
    name: 'Jordan Rivera',
    company: 'Pixel Growth Agency',
    plan: 'Enterprise',
    icon: Users,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-200 dark:border-cyan-900/40',
    borderActive: 'border-cyan-500 ring-2 ring-cyan-500/20',
    description: 'Multi-client workspace, reports & team management',
  },
  {
    role: 'seo_specialist',
    email: 'seo@webshark.io',
    password: 'seo1234',
    name: 'Maya Patel',
    company: 'Freelance',
    plan: 'Pro',
    icon: SearchCode,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-200 dark:border-green-900/40',
    borderActive: 'border-green-500 ring-2 ring-green-500/20',
    description: 'Keywords, backlinks, competitor gaps & SERP analysis',
  },
  {
    role: 'admin',
    email: 'admin@webshark.io',
    password: 'admin1234',
    name: 'Sarah Chen',
    company: 'WebShark HQ',
    plan: 'Enterprise',
    icon: ShieldCheck,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-200 dark:border-purple-900/40',
    borderActive: 'border-purple-500 ring-2 ring-purple-500/20',
    description: 'Full platform admin — users, billing, system health',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { user, login, loading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDemos, setShowDemos] = useState(true);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
    if (!password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! Redirecting to your dashboard…');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials. Use a demo account below.');
      setErrors({ password: err.message || 'Incorrect email or password' });
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (acct: typeof DEMO_ACCOUNTS[number]) => {
    setEmail(acct.email);
    setPassword(acct.password);
    setActiveDemo(acct.email);
    setErrors({});
    toast.success(`Demo filled: ${acct.name} · ${ROLE_META[acct.role].label}`);
  };

  const handleQuickLogin = async (acct: typeof DEMO_ACCOUNTS[number]) => {
    setActiveDemo(acct.email);
    setEmail(acct.email);
    setPassword(acct.password);
    setErrors({});
    setLoading(true);
    try {
      await login(acct.email, acct.password);
      toast.success(`Logged in as ${acct.name} · ${ROLE_META[acct.role].label}`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
      setActiveDemo(null);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-2/5 bg-gradient-to-br from-[#1D4ED8] via-[#1e40af] to-[#06B6D4] flex-col justify-between p-10 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 55%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.08) 0%, transparent 45%)',
          }}
        />
        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">WebShark</span>
          </Link>
        </div>

        {/* Copy */}
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-bold mb-3 leading-tight">
            The SEO intelligence platform that actually moves the needle.
          </h2>
          <p className="text-white/75 mb-8 leading-relaxed">
            Join 47,000+ businesses growing their organic traffic with WebShark's AI-driven insights.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: '3.4×', l: 'Avg. traffic increase' },
              { v: '60%', l: 'Reduction in CAC' },
              { v: '20h+', l: 'Saved per week' },
              { v: '99.9%', l: 'Platform uptime' },
            ].map(({ v, l }) => (
              <div key={l} className="bg-white/10 hover:bg-white/15 rounded-xl p-4 transition-colors">
                <div className="text-2xl font-black mb-0.5">{v}</div>
                <div className="text-xs text-white/65">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/40 text-xs">© 2025 WebShark. All rights reserved.</p>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 bg-gradient-brand rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold">WebShark</span>
          </Link>
          <div className="lg:ml-auto flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <span className="text-sm text-muted-foreground hidden sm:inline">No account?</span>
            <Link to="/register">
              <Button variant="outline" size="sm">Sign up free</Button>
            </Link>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-start justify-center px-4 sm:px-6 py-8">
          <div className="w-full max-w-md">
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Welcome back</h1>
              <p className="text-muted-foreground text-sm">Sign in to your WebShark account to continue.</p>
            </div>

            {/* ── Demo Accounts Section ── */}
            <div className="mb-6 rounded-2xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setShowDemos(!showDemos)}
                className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[Building2, Users, SearchCode, ShieldCheck].map((Icon, i) => (
                      <div
                        key={i}
                        className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center border border-background',
                          i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-cyan-500' : i === 2 ? 'bg-green-500' : 'bg-purple-500'
                        )}
                      >
                        <Icon className="w-2.5 h-2.5 text-white" />
                      </div>
                    ))}
                  </div>
                  <span className="font-semibold">Try a demo account</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-0">
                    4 roles
                  </Badge>
                </div>
                {showDemos ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              {showDemos && (
                <div className="p-3 space-y-2 bg-background">
                  <p className="text-xs text-muted-foreground px-1 mb-3">
                    Click any role to instantly sign in and explore that dashboard experience.
                  </p>
                  {DEMO_ACCOUNTS.map((acct) => {
                    const Icon = acct.icon;
                    const isActive = activeDemo === acct.email;
                    const isSelected = email === acct.email;
                    return (
                      <div
                        key={acct.email}
                        className={cn(
                          'group relative rounded-xl border p-3 transition-all duration-200 cursor-pointer',
                          isSelected ? acct.borderActive : acct.border,
                          'hover:shadow-sm'
                        )}
                        onClick={() => fillDemo(acct)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', acct.bg)}>
                            <Icon className={cn('w-4 h-4', acct.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold">{acct.name}</span>
                              <Badge
                                variant="outline"
                                className={cn('text-[10px] px-1.5 py-0 h-4 border-0', acct.bg, acct.color)}
                              >
                                {ROLE_META[acct.role].label}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 text-muted-foreground">
                                {acct.plan}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{acct.description}</p>
                            <p className="text-[10px] text-muted-foreground/70 mt-1 font-mono">{acct.email}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            {isSelected && (
                              <CheckCircle2 className={cn('w-4 h-4', acct.color)} />
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className={cn(
                                'h-7 text-[11px] px-2.5 font-semibold transition-all opacity-0 group-hover:opacity-100',
                                acct.color,
                                acct.bg
                              )}
                              disabled={isActive && loading}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickLogin(acct);
                              }}
                            >
                              {isActive && loading ? (
                                <div className="flex items-center gap-1">
                                  <div className="w-3 h-3 border border-current/30 border-t-current rounded-full animate-spin" />
                                  Logging in
                                </div>
                              ) : (
                                <>Login <ArrowRight className="w-3 h-3 ml-1" /></>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <Button variant="outline" className="gap-2 h-10" onClick={() => toast.info('Google login coming soon!')}>
                <Chrome className="w-4 h-4" /> Google
              </Button>
              <Button variant="outline" className="gap-2 h-10" onClick={() => toast.info('GitHub login coming soon!')}>
                <Github className="w-4 h-4" /> GitHub
              </Button>
            </div>

            <div className="relative flex items-center mb-5">
              <div className="flex-1 border-t border-border" />
              <span className="px-3 text-xs text-muted-foreground">or continue with email</span>
              <div className="flex-1 border-t border-border" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setActiveDemo(null);
                    setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={cn(
                    'h-10 transition-colors',
                    errors.email ? 'border-destructive' : email ? 'border-primary/50' : ''
                  )}
                  autoComplete="email"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    className={cn(
                      'pr-10 h-10 transition-colors',
                      errors.password ? 'border-destructive' : password ? 'border-primary/50' : ''
                    )}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(c) => setRemember(!!c)}
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-brand hover:opacity-90 text-white gap-2 font-semibold text-sm shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </div>
                ) : (
                  <>
                    Sign in <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up free →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
