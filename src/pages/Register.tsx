import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole, ROLE_META } from '@/lib/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Zap, Eye, EyeOff, ArrowRight, ArrowLeft,
  CheckCircle2, Chrome, Github,
  Building2, Users, SearchCode, ShieldCheck
} from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROLE_CARDS: { role: UserRole; icon: React.ElementType; color: string; bg: string; border: string }[] = [
  {
    role: 'business',
    icon: Building2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500',
  },
  {
    role: 'agency',
    icon: Users,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500',
  },
  {
    role: 'seo_specialist',
    icon: SearchCode,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500',
  },
  {
    role: 'admin',
    icon: ShieldCheck,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500',
  },
];

const STEP_LABELS = ['Choose Role', 'Your Details', 'Set Password'];

export default function Register() {
  const navigate = useNavigate();
  const { user, register, loading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading]);

  const [step, setStep] = useState(1); // 1 = role, 2 = details, 3 = password
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'At least 8 characters required';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (!agreed) errs.agreed = 'Please accept terms to continue';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    setErrors({});
    if (step === 1) {
      if (!selectedRole) { setErrors({ role: 'Please select your role' }); return; }
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, selectedRole!);
      toast.success('Account created! Welcome to WebShark 🎉');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const strength = (() => {
    const p = form.password;
    if (p.length === 0) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const roleInfo = selectedRole ? ROLE_META[selectedRole] : null;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 bg-gradient-to-br from-primary/90 to-accent flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)' }} />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl text-white">WebShark</span>
          </Link>
        </div>

        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-bold mb-3">One platform, every role.</h2>
          <p className="text-white/80 mb-8 text-sm leading-relaxed">
            Whether you're a business owner, agency, SEO specialist, or platform admin — WebShark
            adapts to how you work.
          </p>

          <div className="space-y-3">
            {ROLE_CARDS.map(({ role }) => {
              const meta = ROLE_META[role];
              return (
                <div key={role} className={cn(
                  'flex items-start gap-3 p-3 rounded-xl transition-all duration-200',
                  selectedRole === role ? 'bg-white/20' : 'bg-white/5'
                )}>
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-white flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">{meta.label}</p>
                    <p className="text-xs text-white/70 leading-snug">{meta.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="relative z-10 text-white/50 text-xs">© 2025 WebShark. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 bg-gradient-brand rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold">WebShark</span>
          </Link>
          <div className="lg:ml-auto flex items-center gap-3">
            <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <span className="text-sm text-muted-foreground hidden sm:inline">Already have an account?</span>
            <Link to="/login"><Button variant="outline" size="sm">Sign in</Button></Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-lg">
            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-8">
              {STEP_LABELS.map((label, i) => {
                const num = i + 1;
                const done = step > num;
                const active = step === num;
                return (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div className={cn(
                      'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                      done ? 'bg-green-500 text-white' :
                      active ? 'bg-primary text-white' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : num}
                    </div>
                    <span className={cn('text-xs font-medium hidden sm:inline', active ? 'text-foreground' : 'text-muted-foreground')}>
                      {label}
                    </span>
                    {i < STEP_LABELS.length - 1 && (
                      <div className={cn('flex-1 h-px mx-1', step > num ? 'bg-green-500' : 'bg-border')} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ---- STEP 1: Role Selection ---- */}
            {step === 1 && (
              <div>
                <h1 className="text-2xl font-bold mb-1">What best describes you?</h1>
                <p className="text-muted-foreground text-sm mb-6">
                  Select your role so we can tailor your WebShark experience.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {ROLE_CARDS.map(({ role, icon: Icon, color, bg, border }) => {
                    const meta = ROLE_META[role];
                    const active = selectedRole === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => { setSelectedRole(role); setErrors({}); }}
                        className={cn(
                          'text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-sm',
                          active ? `${border} ${bg}` : 'border-border hover:border-primary/40'
                        )}
                      >
                        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-3', bg)}>
                          <Icon className={cn('w-5 h-5', color)} />
                        </div>
                        <p className="font-semibold text-sm mb-0.5">{meta.label}</p>
                        <p className="text-xs text-muted-foreground leading-snug">{meta.description}</p>
                        {active && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <p className="text-xs text-muted-foreground font-medium mb-1.5">Your workflow:</p>
                            <div className="flex flex-wrap gap-1">
                              {meta.flow.slice(0, 3).map((step, i) => (
                                <span key={i} className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium', bg, color)}>
                                  {step}
                                </span>
                              ))}
                              {meta.flow.length > 3 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                  +{meta.flow.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {errors.role && <p className="text-xs text-destructive mb-3">{errors.role}</p>}

                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-brand hover:opacity-90 text-white gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="relative flex items-center my-5">
                  <div className="flex-1 border-t border-border" />
                  <span className="px-3 text-xs text-muted-foreground">or sign up with</span>
                  <div className="flex-1 border-t border-border" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2" onClick={() => toast.info('Google signup coming soon!')}>
                    <Chrome className="w-4 h-4" /> Google
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => toast.info('GitHub signup coming soon!')}>
                    <Github className="w-4 h-4" /> GitHub
                  </Button>
                </div>
              </div>
            )}

            {/* ---- STEP 2: Details ---- */}
            {step === 2 && (
              <div>
                {roleInfo && (
                  <div className={cn('flex items-center gap-3 p-3 rounded-xl mb-6 border',
                    selectedRole === 'business' ? 'bg-blue-500/5 border-blue-500/20' :
                    selectedRole === 'agency' ? 'bg-cyan-500/5 border-cyan-500/20' :
                    selectedRole === 'seo_specialist' ? 'bg-green-500/5 border-green-500/20' :
                    'bg-purple-500/5 border-purple-500/20'
                  )}>
                    {(() => {
                      const card = ROLE_CARDS.find(c => c.role === selectedRole)!;
                      const Icon = card.icon;
                      return <Icon className={cn('w-5 h-5 flex-shrink-0', card.color)} />;
                    })()}
                    <div>
                      <p className="text-sm font-semibold">{roleInfo.label}</p>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        Change role
                      </button>
                    </div>
                  </div>
                )}

                <h1 className="text-2xl font-bold mb-1">Tell us about yourself</h1>
                <p className="text-muted-foreground text-sm mb-6">Your name and email to get started.</p>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Full name</Label>
                    <Input
                      placeholder="Alex Morgan"
                      value={form.name}
                      onChange={set('name')}
                      className={cn(errors.name && 'border-destructive')}
                      autoComplete="name"
                      autoFocus
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Work email</Label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={set('email')}
                      className={cn(errors.email && 'border-destructive')}
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button onClick={handleNext} className="flex-1 bg-gradient-brand hover:opacity-90 text-white gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ---- STEP 3: Password ---- */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-1">Secure your account</h1>
                <p className="text-muted-foreground text-sm mb-6">Create a strong password for your WebShark account.</p>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPass ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={form.password}
                        onChange={set('password')}
                        className={cn('pr-10', errors.password && 'border-destructive')}
                        autoComplete="new-password"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="flex gap-1 mt-2 items-center">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              'h-1 flex-1 rounded-full transition-colors',
                              i <= strength
                                ? ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][strength - 1]
                                : 'bg-muted'
                            )}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">
                          {['', 'Weak', 'Fair', 'Good', 'Strong'][strength]}
                        </span>
                      </div>
                    )}
                    {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Confirm password</Label>
                    <Input
                      type="password"
                      placeholder="Re-enter password"
                      value={form.confirm}
                      onChange={set('confirm')}
                      className={cn(errors.confirm && 'border-destructive')}
                      autoComplete="new-password"
                    />
                    {errors.confirm && <p className="text-xs text-destructive mt-1">{errors.confirm}</p>}
                  </div>

                  <div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={agreed}
                        onCheckedChange={(c) => setAgreed(!!c)}
                        className="mt-0.5"
                      />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                    {errors.agreed && <p className="text-xs text-destructive mt-1">{errors.agreed}</p>}
                  </div>
                </div>

                {/* Summary */}
                <div className="my-5 p-3 rounded-xl bg-muted/50 border border-border text-xs space-y-1.5">
                  <p className="font-semibold text-foreground">Account summary</p>
                  <p className="text-muted-foreground">Name: <span className="text-foreground font-medium">{form.name}</span></p>
                  <p className="text-muted-foreground">Email: <span className="text-foreground font-medium">{form.email}</span></p>
                  <p className="text-muted-foreground">Role: <span className="text-foreground font-medium">{roleInfo?.label}</span></p>
                  <p className="text-muted-foreground">Plan: <span className="text-foreground font-medium">Free (14-day Pro trial)</span></p>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-brand hover:opacity-90 text-white gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </div>
                    ) : (
                      <>Create account <ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
