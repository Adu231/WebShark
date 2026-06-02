import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_META, UserRole } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  TrendingUp, TrendingDown, Globe, Activity, AlertCircle,
  CheckCircle, ArrowUpRight, Plus, RefreshCw, Search,
  BarChart3, Target, Shield, Users, Building2, SearchCode, ShieldCheck
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';
import { cn } from '@/lib/utils';

const TRAFFIC_DATA = [
  { date: 'May 3', organic: 3200, direct: 1100, referral: 800 },
  { date: 'May 10', organic: 3800, direct: 1250, referral: 950 },
  { date: 'May 17', organic: 4100, direct: 1400, referral: 1100 },
  { date: 'May 24', organic: 5200, direct: 1600, referral: 1300 },
  { date: 'Jun 1', organic: 6100, direct: 1800, referral: 1500 },
  { date: 'Jun 8', organic: 7400, direct: 2100, referral: 1800 },
];

const KEYWORD_DATA = [
  { kw: 'website seo audit tool', pos: 2, prev: 5, volume: 12400, diff: 'Medium' },
  { kw: 'keyword rank tracker', pos: 4, prev: 8, volume: 8900, diff: 'Hard' },
  { kw: 'free seo analyzer', pos: 1, prev: 3, volume: 22100, diff: 'Hard' },
  { kw: 'competitor analysis seo', pos: 6, prev: 11, volume: 6700, diff: 'Medium' },
  { kw: 'backlink checker online', pos: 9, prev: 15, volume: 9300, diff: 'Hard' },
  { kw: 'website uptime monitor', pos: 3, prev: 7, volume: 4100, diff: 'Easy' },
];

const AUDIT_ISSUES = [
  { type: 'Critical', count: 3, color: '#ef4444', icon: AlertCircle },
  { type: 'Warnings', count: 12, color: '#f59e0b', icon: AlertCircle },
  { type: 'Notices', count: 28, color: '#3b82f6', icon: AlertCircle },
  { type: 'Passed', count: 184, color: '#22c55e', icon: CheckCircle },
];

const SITES = [
  { url: 'yourwebsite.com', score: 92, status: 'up', traffic: '27.8K', change: '+23%', up: true },
  { url: 'blog.yoursite.com', score: 78, status: 'up', traffic: '8.4K', change: '+12%', up: true },
  { url: 'shop.yoursite.com', score: 64, status: 'warning', traffic: '15.2K', change: '-3%', up: false },
];

const ALERTS = [
  { id: 1, type: 'success', msg: 'yourwebsite.com ranking improved: position 3 → 1 for "free seo analyzer"', time: '2h ago' },
  { id: 2, type: 'warning', msg: 'shop.yoursite.com load time increased to 4.2s — investigate server response', time: '5h ago' },
  { id: 3, type: 'info', msg: '15 new backlinks detected from high-authority domains this week', time: '1d ago' },
  { id: 4, type: 'success', msg: 'Weekly SEO report generated and ready for download', time: '2d ago' },
];

function MetricCard({ label, value, change, up, icon: Icon, sub }: any) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 hover:border-primary/30 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="text-xl font-bold mb-1">{value}</div>
      {change && (
        <span className={cn('text-xs flex items-center gap-1 font-medium', up ? 'text-green-500' : 'text-red-500')}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change} {sub || 'vs last month'}
        </span>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-medium mb-1.5">{label}</p>
        {payload.map((e: any) => (
          <p key={e.name} style={{ color: e.color }} className="capitalize">
            {e.name}: {e.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [auditUrl, setAuditUrl] = useState('');
  const [running, setRunning] = useState(false);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('/login'); return; }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const role = (user?.role as UserRole) ?? 'business';
  const meta = ROLE_META[role];

  // Role-specific metric sets
  const ROLE_METRICS: Record<UserRole, { label: string; value: string; change: string; up: boolean; icon: React.ElementType }[]> = {
    business: [
      { label: 'Organic Traffic', value: '27.8K', change: '+23%', up: true, icon: Globe },
      { label: 'Keywords Ranked', value: '2,847', change: '+156', up: true, icon: TrendingUp },
      { label: 'Avg. Position', value: '#4.2', change: '-0.8 pts', up: true, icon: BarChart3 },
      { label: 'Site Health Score', value: '92/100', change: '+5 pts', up: true, icon: Shield },
    ],
    agency: [
      { label: 'Client Websites', value: '42', change: '+3 this month', up: true, icon: Globe },
      { label: 'Reports Generated', value: '186', change: '+24 this week', up: true, icon: BarChart3 },
      { label: 'Avg. Client Score', value: '78/100', change: '+6 pts', up: true, icon: Target },
      { label: 'Team Members', value: '12', change: '+2 new', up: true, icon: Users },
    ],
    seo_specialist: [
      { label: 'Tracked Keywords', value: '3,412', change: '+89 new', up: true, icon: SearchCode },
      { label: 'Top-10 Rankings', value: '647', change: '+42 this week', up: true, icon: TrendingUp },
      { label: 'Backlinks Monitored', value: '18.4K', change: '+1.2K', up: true, icon: Activity },
      { label: 'Competitor Domains', value: '28', change: '+5 added', up: true, icon: Target },
    ],
    admin: [
      { label: 'Total Users', value: '47,238', change: '+1,204 this week', up: true, icon: Users },
      { label: 'Active Subscriptions', value: '12,890', change: '+340', up: true, icon: Shield },
      { label: 'Platform Uptime', value: '99.98%', change: 'Last 30d', up: true, icon: Activity },
      { label: 'MRR', value: '$284K', change: '+8.3%', up: true, icon: BarChart3 },
    ],
  };

  const metrics = ROLE_METRICS[role];

  // Role icon component
  const RoleIcon = role === 'business' ? Building2 : role === 'agency' ? Users : role === 'seo_specialist' ? SearchCode : ShieldCheck;
  const roleColorClass = role === 'business' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    : role === 'agency' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
    : role === 'seo_specialist' ? 'bg-green-500/10 text-green-500 border-green-500/20'
    : 'bg-purple-500/10 text-purple-500 border-purple-500/20';

  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl.trim()) { toast.error('Please enter a website URL'); return; }
    setRunning(true);
    toast.info(`Analyzing ${auditUrl}...`);
    setTimeout(() => {
      setRunning(false);
      toast.success('Audit complete! 47 issues found.');
    }, 3000);
  };

  const TABS = ['overview', 'seo', 'audit', 'competitor', 'monitor'];

  return (
    <DashboardLayout title="Dashboard">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Welcome + Role Banner */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">
                {loading ? (
                  <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                ) : (
                  <>Good morning, {user?.name?.split(' ')[0]} 👋</>
                )}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">Here's your {meta.label} dashboard at a glance</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.info('Refreshing data...')}>
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </Button>
              <Button size="sm" className="bg-gradient-brand hover:opacity-90 text-white gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                {role === 'agency' ? 'Add Client' : role === 'admin' ? 'Invite User' : 'Add Website'}
              </Button>
            </div>
          </div>

          {/* Role Info Strip */}
          {!loading && (
            <div className={`flex flex-wrap items-center gap-3 p-3 rounded-xl border text-sm ${roleColorClass}`}>
              <RoleIcon className="w-4 h-4 flex-shrink-0" />
              <span className="font-semibold">{meta.label}</span>
              <span className="text-muted-foreground text-xs hidden sm:inline">|</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">{meta.description}</span>
              <div className="ml-auto flex flex-wrap gap-1">
                {meta.flow.map((step, i) => (
                  <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${roleColorClass}`}>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Audit Bar */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <form onSubmit={runAudit} className="flex gap-2">
            <div className="flex items-center gap-2 flex-1 bg-background rounded-lg border border-border px-3">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="url"
                placeholder="Enter URL to audit (e.g. https://yoursite.com)"
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
                className="flex-1 py-2 text-sm bg-transparent focus:outline-none"
              />
            </div>
            <Button type="submit" className="bg-gradient-brand hover:opacity-90 text-white flex-shrink-0" disabled={running}>
              {running ? <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Running...</div> : 'Run Audit'}
            </Button>
          </form>
        </div>

        {/* Metrics */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {metrics.map(({ label, value, change, up, icon }) => (
              <MetricCard key={label} label={label} value={value} change={change} up={up} icon={icon} />
            ))}
          </div>
        )}

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Traffic Chart */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-background p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold">Traffic Overview</h3>
                <p className="text-xs text-muted-foreground">Last 6 weeks</p>
              </div>
              <Badge variant="secondary" className="text-green-500 bg-green-500/10 border-0 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />+131%
              </Badge>
            </div>
            {loading ? (
              <div className="h-44 bg-muted rounded-lg animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={TRAFFIC_DATA}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(191,91%,43%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(191,91%,43%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={45} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="organic" name="Organic" stroke="hsl(221,83%,53%)" fill="url(#g1)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="direct" name="Direct" stroke="hsl(191,91%,43%)" fill="url(#g2)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Audit Score */}
          <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
            <h3 className="text-sm font-semibold mb-1">Audit Health</h3>
            <p className="text-xs text-muted-foreground mb-4">yourwebsite.com</p>
            {loading ? (
              <div className="h-44 bg-muted rounded-lg animate-pulse" />
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-28 h-28">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(221,83%,53%)" strokeWidth="10"
                        strokeDasharray={`${92 * 2.51} 251`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black">92</span>
                      <span className="text-[10px] text-muted-foreground">/ 100</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {AUDIT_ISSUES.map(({ type, count, color }) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-xs text-muted-foreground">{type}</span>
                      </div>
                      <span className="text-xs font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Keywords Table */}
        <div className="rounded-xl border border-border bg-background overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">Keyword Rankings</h3>
            <Button variant="ghost" size="sm" className="text-xs gap-1 text-primary" onClick={() => toast.info('Full rankings view coming!')}>
              View all <ArrowUpRight className="w-3 h-3" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Keyword</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground hidden sm:table-cell">Volume</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground hidden md:table-cell">Difficulty</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Position</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {KEYWORD_DATA.map(({ kw, pos, prev, volume, diff }) => {
                  const improved = pos < prev;
                  return (
                    <tr key={kw} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium max-w-[200px] truncate">{kw}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{volume.toLocaleString()}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge variant="outline" className={cn('text-[10px] px-1.5',
                          diff === 'Easy' ? 'border-green-500/30 text-green-500' :
                          diff === 'Medium' ? 'border-yellow-500/30 text-yellow-600' : 'border-red-500/30 text-red-500'
                        )}>
                          {diff}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-bold">#{pos}</td>
                      <td className="px-4 py-3">
                        <span className={cn('flex items-center gap-1 font-semibold', improved ? 'text-green-500' : 'text-red-500')}>
                          {improved ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {improved ? '+' : ''}{prev - pos}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Monitored Sites */}
          <div className="rounded-xl border border-border bg-background overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold">Monitored Sites</h3>
              <Button variant="ghost" size="sm" className="text-xs gap-1 text-primary">
                <Plus className="w-3 h-3" /> Add site
              </Button>
            </div>
            <div className="divide-y divide-border">
              {SITES.map(({ url, score, status, traffic, change, up }) => (
                <div key={url} className="px-4 sm:px-5 py-3 flex items-center gap-3 hover:bg-muted/20 transition-colors">
                  <div className={cn('w-2 h-2 rounded-full flex-shrink-0', status === 'up' ? 'bg-green-500' : 'bg-yellow-500')} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{url}</p>
                    <p className="text-[10px] text-muted-foreground">Score: {score}/100</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold">{traffic}</p>
                    <p className={cn('text-[10px] font-medium', up ? 'text-green-500' : 'text-red-500')}>{change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="rounded-xl border border-border bg-background overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-border">
              <h3 className="text-sm font-semibold">Recent Alerts</h3>
            </div>
            <div className="divide-y divide-border">
              {ALERTS.map(({ id, type, msg, time }) => (
                <div key={id} className="px-4 sm:px-5 py-3 flex gap-3 hover:bg-muted/20 transition-colors">
                  <div className={cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                    type === 'success' ? 'bg-green-500' :
                    type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-relaxed">{msg}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
