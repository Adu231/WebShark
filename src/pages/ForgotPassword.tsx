import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordReset } from '@/lib/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ForgotPassword() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Invalid email address'); return; }
    setError('');
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
      toast.success('Reset email sent!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-brand rounded-lg flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold">WebShark</span>
        </Link>
        <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {!sent ? (
            <>
              <div className="mb-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Enter your email address and we'll send you a secure link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Email address</Label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(error && 'border-destructive')}
                    autoComplete="email"
                    autoFocus
                  />
                  {error && <p className="text-xs text-destructive mt-1">{error}</p>}
                </div>
                <Button type="submit" className="w-full bg-gradient-brand hover:opacity-90 text-white" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending reset link...
                    </div>
                  ) : 'Send reset link'}
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                <Link to="/login" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                </Link>
                <Link to="/register" className="text-primary hover:underline">
                  Create new account
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold mb-3">Check your email</h2>
              <p className="text-muted-foreground text-sm mb-2">
                We've sent a password reset link to:
              </p>
              <p className="font-medium text-primary mb-6">{email}</p>
              <p className="text-sm text-muted-foreground mb-8">
                The link will expire in 1 hour. Didn't receive it? Check your spam folder or try again.
              </p>
              <Button
                variant="outline"
                className="w-full mb-3"
                onClick={() => setSent(false)}
              >
                Try a different email
              </Button>
              <Link to="/login">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to sign in
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
