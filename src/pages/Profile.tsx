import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  User, Mail, Building, Globe, Calendar, CreditCard,
  Edit3, Save, X, Camera, Star, Zap, Shield, BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    bio: '',
    role: '',
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('/login'); return; }
    setForm({
      name: user.name || '',
      email: user.email || '',
      company: user.company || '',
      website: '',
      bio: 'SEO specialist passionate about data-driven growth strategies.',
      role: user.role || 'user',
    });
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateUser({ name: form.name, company: form.company });
    setSaving(false);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const STATS = [
    { label: 'Websites', value: user?.websites || 0, icon: Globe },
    { label: 'Plan', value: user?.plan?.toUpperCase() || 'FREE', icon: CreditCard },
    { label: 'Credits', value: user?.credits || 0, icon: Zap },
    { label: 'Member since', value: user?.joinedAt?.slice(0, 7) || '—', icon: Calendar },
  ];

  const ACTIVITY = [
    { action: 'Ran SEO audit on yourwebsite.com', time: '2 hours ago', type: 'audit' },
    { action: 'Added keyword "seo tools 2025" to tracker', time: '5 hours ago', type: 'keyword' },
    { action: 'Competitor analysis completed for semrush.com', time: '1 day ago', type: 'competitor' },
    { action: 'Downloaded monthly SEO report PDF', time: '2 days ago', type: 'report' },
    { action: 'Uptime alert acknowledged for shop.yoursite.com', time: '3 days ago', type: 'alert' },
  ];

  return (
    <DashboardLayout title="My Profile">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <div className="rounded-2xl border border-border bg-background overflow-hidden">
          <div className="h-24 bg-gradient-brand relative">
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
          </div>
          <div className="px-5 sm:px-6 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-4">
              <div className="relative w-fit">
                <Avatar className="w-20 h-20 border-4 border-background shadow-md">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {editing && (
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-sm">
                    <Camera className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <Badge variant="secondary" className="w-fit capitalize bg-primary/10 text-primary border-0">
                    {user?.plan} plan
                  </Badge>
                  {user?.role === 'admin' && (
                    <Badge className="w-fit bg-accent text-accent-foreground border-0">Admin</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant={editing ? 'outline' : 'default'}
                size="sm"
                className={cn('flex-shrink-0 gap-1.5', !editing && 'bg-gradient-brand hover:opacity-90 text-white')}
                onClick={() => editing ? setEditing(false) : setEditing(true)}
              >
                {editing ? <><X className="w-3.5 h-3.5" />Cancel</> : <><Edit3 className="w-3.5 h-3.5" />Edit Profile</>}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl bg-muted/40 p-3 text-center">
                  <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-1.5" />
                  <div className="text-sm font-bold">{value}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
          <h3 className="text-base font-semibold mb-5">Profile Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Full Name</Label>
              {editing ? (
                <Input value={form.name} onChange={set('name')} />
              ) : (
                <p className="text-sm py-2">{form.name || '—'}</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Email Address</Label>
              {editing ? (
                <Input type="email" value={form.email} onChange={set('email')} disabled className="opacity-60" />
              ) : (
                <p className="text-sm py-2">{form.email || '—'}</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Company</Label>
              {editing ? (
                <Input value={form.company} onChange={set('company')} placeholder="Your company name" />
              ) : (
                <p className="text-sm py-2">{form.company || '—'}</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Website</Label>
              {editing ? (
                <Input value={form.website} onChange={set('website')} placeholder="https://yourwebsite.com" />
              ) : (
                <p className="text-sm py-2">{form.website || '—'}</p>
              )}
            </div>
            <div className="col-span-full">
              <Label className="text-sm font-medium mb-1.5 block">Bio</Label>
              {editing ? (
                <Textarea value={form.bio} onChange={set('bio')} rows={3} placeholder="Tell us about yourself..." />
              ) : (
                <p className="text-sm py-2 text-muted-foreground">{form.bio || '—'}</p>
              )}
            </div>
          </div>
          {editing && (
            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              <Button className="bg-gradient-brand hover:opacity-90 text-white gap-1.5" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                ) : (
                  <><Save className="w-3.5 h-3.5" />Save Changes</>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-border bg-background overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-border">
            <h3 className="text-base font-semibold">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border">
            {ACTIVITY.map(({ action, time, type }) => (
              <div key={action} className="px-5 sm:px-6 py-3 flex items-start gap-3 hover:bg-muted/20 transition-colors">
                <div className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                  type === 'audit' ? 'bg-blue-500/10' :
                  type === 'keyword' ? 'bg-cyan-500/10' :
                  type === 'competitor' ? 'bg-purple-500/10' :
                  type === 'report' ? 'bg-green-500/10' : 'bg-yellow-500/10'
                )}>
                  <BarChart3 className={cn('w-3.5 h-3.5',
                    type === 'audit' ? 'text-blue-500' :
                    type === 'keyword' ? 'text-cyan-500' :
                    type === 'competitor' ? 'text-purple-500' :
                    type === 'report' ? 'text-green-500' : 'text-yellow-500'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
