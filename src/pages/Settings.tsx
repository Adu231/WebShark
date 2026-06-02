import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useTheme } from '@/lib/theme';
import {
  Bell, Shield, CreditCard, Users, Zap, Globe, Mail,
  Smartphone, Moon, Sun, Monitor, Trash2, Download, Key
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SETTINGS_TABS = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'api', label: 'API & Integrations', icon: Zap },
];

export default function Settings() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('notifications');
  const [saving, setSaving] = useState(false);
  const [notifs, setNotifs] = useState({
    emailRanking: true, emailDowntime: true, emailReport: true,
    emailWeekly: false, pushRanking: true, pushDowntime: true,
    pushSecurity: true,
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) navigate('/login');
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const save = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('Settings saved!');
  };

  const toggleNotif = (k: keyof typeof notifs) => setNotifs(n => ({ ...n, [k]: !n[k] }));

  return (
    <DashboardLayout title="Settings">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your account preferences and configurations</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Nav */}
          <nav className="lg:w-52 flex-shrink-0">
            <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              {SETTINGS_TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                    activeTab === id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 space-y-4">
            {/* Notifications */}
            {activeTab === 'notifications' && (
              <>
                <div className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-semibold mb-1">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">Choose what you receive by email</p>
                  <div className="space-y-4">
                    {[
                      { key: 'emailRanking', label: 'Ranking changes', desc: 'When keywords move up or down significantly' },
                      { key: 'emailDowntime', label: 'Downtime alerts', desc: 'When monitored sites go offline' },
                      { key: 'emailReport', label: 'Monthly reports', desc: 'Full SEO performance summary each month' },
                      { key: 'emailWeekly', label: 'Weekly digest', desc: 'Weekly summary of key metrics' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <Switch
                          checked={notifs[key as keyof typeof notifs]}
                          onCheckedChange={() => toggleNotif(key as keyof typeof notifs)}
                          className="data-[state=checked]:bg-primary flex-shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-semibold mb-1">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">Real-time browser notifications</p>
                  <div className="space-y-4">
                    {[
                      { key: 'pushRanking', label: 'Keyword ranking alerts', desc: 'Instant notification for significant rank changes' },
                      { key: 'pushDowntime', label: 'Site downtime', desc: 'Immediate alert when site goes down' },
                      { key: 'pushSecurity', label: 'Security warnings', desc: 'SSL and security issue alerts' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <Switch
                          checked={notifs[key as keyof typeof notifs]}
                          onCheckedChange={() => toggleNotif(key as keyof typeof notifs)}
                          className="data-[state=checked]:bg-primary flex-shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <>
                <div className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-semibold mb-4">Change Password</h3>
                  <div className="space-y-3 max-w-sm">
                    <div>
                      <Label className="text-sm mb-1.5 block">Current password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">New password</Label>
                      <Input type="password" placeholder="Min. 8 characters" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">Confirm new password</Label>
                      <Input type="password" placeholder="Re-enter new password" />
                    </div>
                    <Button className="bg-gradient-brand hover:opacity-90 text-white" onClick={() => toast.success('Password updated!')}>
                      Update Password
                    </Button>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">Disabled</Badge>
                  </div>
                  <Button variant="outline" className="mt-4" onClick={() => toast.info('2FA setup coming soon!')}>
                    <Shield className="w-4 h-4 mr-2" /> Enable 2FA
                  </Button>
                </div>
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
                  <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <Button variant="destructive" size="sm" onClick={() => toast.error('Account deletion requires email confirmation')}>
                    <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Account
                  </Button>
                </div>
              </>
            )}

            {/* Billing */}
            {activeTab === 'billing' && (
              <>
                <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold capitalize">{user?.plan} Plan</h3>
                        <Badge className="bg-primary/20 text-primary border-0 text-[10px]">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user?.plan === 'free' ? 'Free tier — limited features' :
                         user?.plan === 'pro' ? '$49/month · Renews July 2, 2025' : 'Custom enterprise pricing'}
                      </p>
                    </div>
                    <Button size="sm" className="bg-gradient-brand hover:opacity-90 text-white" onClick={() => navigate('/pricing')}>
                      {user?.plan === 'free' ? 'Upgrade' : 'Manage'}
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Audits used', value: '6/10' },
                      { label: 'Keywords tracked', value: '284/500' },
                      { label: 'Credits remaining', value: `${user?.credits}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-background/60 rounded-lg p-3 text-center">
                        <p className="text-sm font-bold">{value}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-semibold mb-4">Payment Method</h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <div className="w-10 h-7 bg-gradient-brand rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 08/27</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto text-xs" onClick={() => toast.info('Card update coming soon!')}>Update</Button>
                  </div>
                </div>
              </>
            )}

            {/* Team */}
            {activeTab === 'team' && (
              <div className="rounded-xl border border-border bg-background p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-semibold">Team Members</h3>
                    <p className="text-sm text-muted-foreground">Manage workspace access</p>
                  </div>
                  <Button size="sm" className="bg-gradient-brand hover:opacity-90 text-white gap-1.5"
                    onClick={() => toast.info('Team invites available on Enterprise plan')}>
                    <Users className="w-3.5 h-3.5" /> Invite
                  </Button>
                </div>
                {[
                  { name: 'Alex Morgan', email: 'demo@webshark.io', role: 'Owner', you: true },
                  { name: 'Sarah Chen', email: 'sarah@company.com', role: 'Admin', you: false },
                  { name: 'Marcus Kim', email: 'marcus@company.com', role: 'Member', you: false },
                ].map(({ name, email, role, you }) => (
                  <div key={email} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">
                      {name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{name}</p>
                        {you && <Badge variant="secondary" className="text-[10px] px-1.5">You</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{role}</Badge>
                  </div>
                ))}
              </div>
            )}

            {/* API */}
            {activeTab === 'api' && (
              <>
                <div className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-semibold mb-1">API Keys</h3>
                  <p className="text-sm text-muted-foreground mb-4">Use these keys to integrate WebShark with your apps</p>
                  <div className="rounded-lg border border-border p-3 flex items-center gap-3 mb-3">
                    <Key className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <code className="text-xs flex-1 truncate text-muted-foreground">ws_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6</code>
                    <Button variant="outline" size="sm" className="text-xs flex-shrink-0" onClick={() => { navigator.clipboard.writeText('ws_live_a1b2c3...'); toast.success('Copied!'); }}>
                      Copy
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.success('New API key generated!')}>
                    <Key className="w-3.5 h-3.5" /> Generate New Key
                  </Button>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-semibold mb-4">Connected Integrations</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Google Analytics', desc: 'Traffic data sync', connected: true },
                      { name: 'Google Search Console', desc: 'Search performance data', connected: false },
                      { name: 'WordPress Plugin', desc: 'On-site SEO optimization', connected: false },
                    ].map(({ name, desc, connected }) => (
                      <div key={name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <Button
                          variant={connected ? 'secondary' : 'outline'}
                          size="sm"
                          className="text-xs"
                          onClick={() => toast.info(`${connected ? 'Disconnecting' : 'Connecting'} ${name}...`)}
                        >
                          {connected ? 'Connected' : 'Connect'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Save Button */}
            {(activeTab === 'notifications') && (
              <div className="flex justify-end">
                <Button className="bg-gradient-brand hover:opacity-90 text-white" onClick={save} disabled={saving}>
                  {saving ? (
                    <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</div>
                  ) : 'Save Settings'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
