import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_META, UserRole } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  TrendingUp, TrendingDown, Globe, Activity, AlertCircle,
  CheckCircle, ArrowUpRight, Plus, RefreshCw, Search,
  BarChart3, Target, Shield, Users, Building2, SearchCode, ShieldCheck,
  Code, Download, Settings, Trash2, Key, Star, Calendar, Mail, FileText,
  MapPin, Clock, Server, Check, ArrowRight, Play
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
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [auditUrl, setAuditUrl] = useState('');
  const [running, setRunning] = useState(false);

  // Sync tab search parameter
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'overview';

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('/login'); return; }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [user, authLoading]);

  // Tab State Handlers
  // 1. Audit Tab States
  const [auditIssuesList, setAuditIssuesList] = useState(AUDIT_ISSUES);
  const [ranAudit, setRanAudit] = useState(false);

  // 2. SEO Tab States
  const [trackedKws, setTrackedKws] = useState(KEYWORD_DATA);
  const [newKw, setNewKw] = useState('');

  // 3. Competitor Tab States
  const [compUrl, setCompUrl] = useState('');
  const [competitors, setCompetitors] = useState([
    { domain: 'competitorA.com', da: 68, traffic: '12.4K', keywords: 1250, backlinkCount: '8.4K' },
    { domain: 'competitorB.com', da: 82, traffic: '45.1K', keywords: 4890, backlinkCount: '32.1K' }
  ]);

  // 4. Monitoring Tab States
  const [uptimeChecked, setUptimeChecked] = useState(true);
  const [monitorLatency, setMonitorLatency] = useState([
    { time: '12:00', latency: 182 },
    { time: '13:00', latency: 194 },
    { time: '14:00', latency: 178 },
    { time: '15:00', latency: 245 },
    { time: '16:00', latency: 181 },
    { time: '17:00', latency: 190 }
  ]);

  // 5. AI Tab States
  const [aiPrompt, setAiPrompt] = useState('Write meta descriptions for my organic tracking platform.');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState('');

  // 6. Websites Tab States
  const [allSites, setAllSites] = useState(SITES);
  const [newSiteUrl, setNewSiteUrl] = useState('');

  // 7. Users Admin Tab States
  const [adminUsers, setAdminUsers] = useState([
    { id: 'usr_1', name: 'Alex Morgan', email: 'demo@webshark.io', role: 'Business User', plan: 'Pro', status: 'Active' },
    { id: 'usr_2', name: 'Sarah Chen', email: 'admin@webshark.io', role: 'Admin', plan: 'Enterprise', status: 'Active' },
    { id: 'usr_3', name: 'Jordan Rivera', email: 'agency@webshark.io', role: 'Agency', plan: 'Enterprise', status: 'Active' },
    { id: 'usr_4', name: 'Marcus Kim', email: 'marcus@company.com', role: 'Business User', plan: 'Free', status: 'Suspended' }
  ]);

  // 8. Lead Generation Agency Tab
  const [agencyLeads, setAgencyLeads] = useState([
    { email: 'client1@domain.com', site: 'clientwebsite.com', date: '2026-06-01', trafficEst: '2.4K', status: 'Contacted' },
    { email: 'sales@shop.com', site: 'myshopstore.com', date: '2026-05-30', trafficEst: '12.8K', status: 'New' }
  ]);

  // 9. Team members Tab
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Jordan Rivera', email: 'agency@webshark.io', role: 'Owner', active: true },
    { name: 'Elena Rostova', email: 'elena@pixelgrowth.com', role: 'Admin', active: true },
    { name: 'Sam Jenkins', email: 'sam@pixelgrowth.com', role: 'Editor', active: false }
  ]);

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

  // Audit triggers
  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl.trim()) { toast.error('Please enter a website URL'); return; }
    setRunning(true);
    toast.info(`Analyzing ${auditUrl}...`);
    setTimeout(() => {
      setRunning(false);
      setRanAudit(true);
      setAuditIssuesList([
        { type: 'Critical', count: Math.floor(Math.random() * 5) + 1, color: '#ef4444', icon: AlertCircle },
        { type: 'Warnings', count: Math.floor(Math.random() * 15) + 5, color: '#f59e0b', icon: AlertCircle },
        { type: 'Notices', count: Math.floor(Math.random() * 30) + 10, color: '#3b82f6', icon: AlertCircle },
        { type: 'Passed', count: 172, color: '#22c55e', icon: CheckCircle }
      ]);
      toast.success('Audit complete! Found performance and meta optimization logs.');
    }, 2000);
  };

  // SEO keyword additions
  const addKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKw.trim()) return;
    setTrackedKws([
      ...trackedKws,
      { kw: newKw, pos: Math.floor(Math.random() * 20) + 1, prev: Math.floor(Math.random() * 30) + 5, volume: Math.floor(Math.random() * 15000) + 1000, diff: 'Easy' }
    ]);
    toast.success(`Keyword "${newKw}" added to tracker!`);
    setNewKw('');
  };

  // Competitor additions
  const addCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compUrl.trim()) return;
    setCompetitors([
      ...competitors,
      { domain: compUrl, da: Math.floor(Math.random() * 30) + 40, traffic: '5.2K', keywords: 480, backlinkCount: '1.2K' }
    ]);
    toast.success(`Competitor "${compUrl}" added to gap matrix!`);
    setCompUrl('');
  };

  // AI Content Generator
  const generateAiMeta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      setAiOutput(`[Recommended Title Tag]\nWebShark - #1 Organic SEO Rank Tracker and Audits System\n\n[Recommended Meta Description]\nGrow your traffic by ${Math.floor(Math.random() * 40) + 20}% with WebShark. Automated crawls, deep queries index monitors, and instant alerts. Sign up for 14-days Pro trial today.`);
      toast.success('AI recommendations populated!');
    }, 1800);
  };

  // Website management
  const addNewSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteUrl.trim()) return;
    setAllSites([
      ...allSites,
      { url: newSiteUrl, score: Math.floor(Math.random() * 30) + 65, status: 'up', traffic: '1.2K', change: '+4%', up: true }
    ]);
    toast.success(`Domain "${newSiteUrl}" added to dashboard monitoring!`);
    setNewSiteUrl('');
  };

  // Admin user suspension
  const toggleUserStatus = (id: string) => {
    setAdminUsers(adminUsers.map(u => {
      if (u.id === id) {
        const next = u.status === 'Active' ? 'Suspended' : 'Active';
        toast.success(`User ${u.name} status set to ${next}`);
        return { ...u, status: next };
      }
      return u;
    }));
  };

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
              <p className="text-sm text-muted-foreground mt-0.5">
                Here's your {meta.label} dashboard - <span className="capitalize font-bold text-primary">{activeTab} View</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.info('Refreshing dashboard datasets...')}>
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </Button>
              <Button size="sm" className="bg-gradient-brand hover:opacity-90 text-white gap-1.5" onClick={() => navigate('/settings')}>
                <Settings className="w-3.5 h-3.5" /> settings
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

        {/* ──── TAB CONTENTS ──── */}

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
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
                {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}
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
                <Button variant="ghost" size="sm" className="text-xs gap-1 text-primary" onClick={() => navigate('/dashboard?tab=seo')}>
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
          </div>
        )}

        {/* 2. AUDIT TAB */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-bold text-base mb-2">Technical SEO Auditor</h3>
              <p className="text-xs text-muted-foreground mb-4">Run manual URL crawlers to analyze structural scores, duplicate metadata, and page speed index limits.</p>
              <form onSubmit={runAudit} className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com/page"
                  value={auditUrl}
                  onChange={(e) => setAuditUrl(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button type="submit" size="sm" className="bg-gradient-brand text-white" disabled={running}>
                  {running ? 'Crawling...' : 'Start Audit'}
                </Button>
              </form>
            </div>

            {/* Audit Results Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 rounded-xl border border-border bg-background p-5 text-center">
                <h4 className="text-sm font-semibold mb-4">Audited Health Score</h4>
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(221,83%,53%)" strokeWidth="8"
                      strokeDasharray={`${ranAudit ? 84 * 2.51 : 92 * 2.51} 251`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">{ranAudit ? 84 : 92}</span>
                    <span className="text-[10px] text-muted-foreground">/ 100</span>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-0 text-[10px]">Good Standing</Badge>
              </div>

              <div className="md:col-span-2 rounded-xl border border-border bg-background p-5">
                <h4 className="text-sm font-semibold mb-3">Audit Breakdown Metrics</h4>
                <div className="space-y-3">
                  {auditIssuesList.map(({ type, count, color }) => (
                    <div key={type} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs font-semibold">{type} issues</span>
                      </div>
                      <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded">{count} found</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SEO TAB (SEO Intelligence) */}
        {activeTab === 'seo' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-bold text-base mb-2">Keyword Rankings Monitor</h3>
              <p className="text-xs text-muted-foreground mb-4">Add and track keywords search positions and search volume metrics live.</p>
              <form onSubmit={addKeyword} className="flex gap-2 w-full max-w-md">
                <Input
                  placeholder="e.g. website seo audit tool"
                  value={newKw}
                  onChange={(e) => setNewKw(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button type="submit" size="sm" className="bg-primary text-white font-semibold">
                  Track Keyword
                </Button>
              </form>
            </div>

            {/* Keyword listings */}
            <div className="rounded-xl border border-border bg-background overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                      <th className="px-5 py-3">Keyword</th>
                      <th className="px-5 py-3">Search Volume</th>
                      <th className="px-5 py-3">Difficulty</th>
                      <th className="px-5 py-3">Rank Position</th>
                      <th className="px-5 py-3">Rank Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackedKws.map((k) => (
                      <tr key={k.kw} className="border-b border-border last:border-0 hover:bg-muted/10">
                        <td className="px-5 py-3 font-semibold">{k.kw}</td>
                        <td className="px-5 py-3 text-muted-foreground">{k.volume.toLocaleString()}</td>
                        <td className="px-5 py-3">
                          <Badge variant="outline" className={cn('text-[9px] px-1.5 py-0 border-0 bg-primary/10 text-primary')}>
                            {k.diff}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 font-bold text-primary">#{k.pos}</td>
                        <td className="px-5 py-3">
                          <span className={cn('flex items-center gap-1 font-bold', k.pos < k.prev ? 'text-green-500' : 'text-red-500')}>
                            {k.pos < k.prev ? `+${k.prev - k.pos}` : k.prev - k.pos}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. COMPETITOR TAB */}
        {activeTab === 'competitor' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-bold text-base mb-1">Competitor Intelligence Gap</h3>
              <p className="text-xs text-muted-foreground mb-4">Add competitor website domains to trace search gaps and traffic overlaps.</p>
              <form onSubmit={addCompetitor} className="flex gap-2 w-full max-w-md">
                <Input
                  placeholder="e.g. competitor.com"
                  value={compUrl}
                  onChange={(e) => setCompUrl(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button type="submit" size="sm" className="bg-primary text-white font-semibold">
                  Add Competitor
                </Button>
              </form>
            </div>

            {/* Competitors List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitors.map((c) => (
                <div key={c.domain} className="rounded-xl border border-border bg-background p-5 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                    <span className="font-bold text-sm text-primary">{c.domain}</span>
                    <Badge variant="outline" className="text-[10px]">DA: {c.da}</Badge>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Organic Traffic:</span>
                      <span className="font-bold">{c.traffic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ranked Keywords:</span>
                      <span className="font-bold">{c.keywords}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Backlinks Count:</span>
                      <span className="font-bold">{c.backlinkCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. MONITOR TAB */}
        {activeTab === 'monitor' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Uptime Card */}
              <div className="rounded-xl border border-border bg-background p-5 text-center">
                <Server className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <h4 className="font-bold text-sm mb-1">Server Availability</h4>
                <p className="text-xs text-muted-foreground mb-4">Checked 1 minute ago from 5 global locations</p>
                <div className="text-2xl font-black text-green-500">99.98%</div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-0 text-[10px] mt-2 font-bold">ALL SYSTEMS UP</Badge>
              </div>

              {/* Latency History Chart */}
              <div className="md:col-span-2 rounded-xl border border-border bg-background p-5">
                <h4 className="font-bold text-sm mb-1">Response Time (Latency)</h4>
                <p className="text-xs text-muted-foreground mb-4">Last checked response times history in ms</p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monitorLatency}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} width={25} />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                      <Line type="monotone" dataKey="latency" name="Latency (ms)" stroke="hsl(221,83%,53%)" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. AI TAB (AI Insights) */}
        {activeTab === 'ai' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-bold text-base mb-1">AI Metadata Generator</h3>
              <p className="text-xs text-muted-foreground mb-4">Let our GPT-driven AI engines generate perfect high-CTR search titles and descriptions tags.</p>
              <form onSubmit={generateAiMeta} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold text-muted-foreground mb-1.5 block">Describe your target keywords or content topic</Label>
                  <Input
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="h-10 text-xs"
                    placeholder="Enter keywords context..."
                  />
                </div>
                <Button type="submit" size="sm" className="bg-gradient-brand text-white font-semibold flex gap-1.5" disabled={aiGenerating}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {aiGenerating ? 'Generating recommendations...' : 'Generate Recommendations'}
                </Button>
              </form>
            </div>

            {aiOutput && (
              <div className="rounded-xl bg-[#090D16] border border-[#1A263E] p-4 text-left font-mono text-xs text-[#22C55E] whitespace-pre-wrap leading-relaxed">
                <code>{aiOutput}</code>
              </div>
            )}
          </div>
        )}

        {/* 7. REPORTS TAB */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <h3 className="font-bold text-base">Downloadable PDF Audits Reports</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Monthly SEO Health Audit Report', date: 'June 2026', size: '2.4 MB' },
                { name: 'Keyword Rankings Position Log', date: 'May 2026', size: '1.8 MB' },
                { name: 'Competitors Traffic Gap Comparison', date: 'April 2026', size: '3.1 MB' }
              ].map((r) => (
                <div key={r.name} className="rounded-xl border border-border bg-background p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-xs">{r.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{r.date} · {r.size}</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={() => toast.success(`Downloaded ${r.name} PDF`)}>
                    <Download className="w-3 h-3" /> Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. WEBSITES TAB (My Websites) */}
        {activeTab === 'websites' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-bold text-base mb-1">Add Website to Track</h3>
              <p className="text-xs text-muted-foreground mb-4">Link new active domains or blog subdirectories to WebShark.</p>
              <form onSubmit={addNewSite} className="flex gap-2 w-full max-w-md">
                <Input
                  type="url"
                  placeholder="https://yournewsite.com"
                  value={newSiteUrl}
                  onChange={(e) => setNewSiteUrl(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button type="submit" size="sm" className="bg-primary text-white font-semibold">
                  Track Website
                </Button>
              </form>
            </div>

            {/* Websites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allSites.map((s) => (
                <div key={s.url} className="rounded-xl border border-border bg-background p-5 flex flex-col justify-between h-40 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-primary truncate max-w-[150px]">{s.url}</span>
                    <Badge variant="outline" className={cn('text-[9px] border-0 px-2 py-0.5 font-bold', s.status === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-600')}>
                      {s.status === 'up' ? 'UP' : 'WARNING'}
                    </Badge>
                  </div>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black">{s.score}</span>
                    <span className="text-[10px] text-muted-foreground">SEO Health</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <span>Traffic: <strong className="text-foreground">{s.traffic}</strong></span>
                    <span className={cn('font-semibold', s.up ? 'text-green-500' : 'text-red-500')}>{s.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. USER MANAGEMENT TAB (ADMIN) */}
        {activeTab === 'users' && role === 'admin' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-bold text-base">Platform User Administration</h3>
            <div className="rounded-xl border border-border bg-background overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">User Role</th>
                    <th className="px-5 py-3">Active Plan</th>
                    <th className="px-5 py-3">Account Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((u) => (
                    <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/10">
                      <td className="px-5 py-3 font-semibold">{u.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                      <td className="px-5 py-3">{u.role}</td>
                      <td className="px-5 py-3 font-bold text-primary">{u.plan}</td>
                      <td className="px-5 py-3">
                        <Badge variant="outline" className={cn('text-[9px] border-0 px-2 font-bold', u.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500')}>
                          {u.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Button size="sm" variant="ghost" className="h-7 text-[10px] text-destructive hover:bg-destructive/10" onClick={() => toggleUserStatus(u.id)}>
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 10. ACTIVE SUBSCRIPTIONS TAB (ADMIN) */}
        {activeTab === 'subscriptions' && role === 'admin' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <h3 className="font-bold text-base">Platform active subscriptions summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'Starter Free Trial', count: '14,248 active', mrr: '$0' },
                { title: 'Pro Plan Subscription', count: '8,412 active', mrr: '$412,188' },
                { title: 'Enterprise custom packages', count: '240 active', mrr: '$120,000' }
              ].map((subPlan) => (
                <div key={subPlan.title} className="rounded-xl border border-border bg-background p-5 hover:border-primary/30 transition-all">
                  <h4 className="font-bold text-sm text-primary mb-1">{subPlan.title}</h4>
                  <p className="text-xs text-muted-foreground">{subPlan.count}</p>
                  <div className="mt-4 pt-3 border-t border-border flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">Monthly MRR:</span>
                    <span className="text-lg font-black text-green-500">{subPlan.mrr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. LEAD GENERATION TAB (AGENCY) */}
        {activeTab === 'leads' && role === 'agency' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-bold text-base">Embedded SEO form leads capture list</h3>
            <div className="rounded-xl border border-border bg-background overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                    <th className="px-5 py-3">Lead Email</th>
                    <th className="px-5 py-3">Audited Site Domain</th>
                    <th className="px-5 py-3">Est. Traffic Value</th>
                    <th className="px-5 py-3">Capture Date</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {agencyLeads.map((l) => (
                    <tr key={l.email} className="border-b border-border last:border-0 hover:bg-muted/10">
                      <td className="px-5 py-3 font-semibold">{l.email}</td>
                      <td className="px-5 py-3 text-primary font-bold">{l.site}</td>
                      <td className="px-5 py-3">{l.trafficEst}</td>
                      <td className="px-5 py-3 text-muted-foreground">{l.date}</td>
                      <td className="px-5 py-3">
                        <Badge variant="outline" className={cn('text-[9px] border-0 px-2 py-0.5 font-bold', l.status === 'New' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500')}>
                          {l.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 12. TEAM MEMBERS TAB (AGENCY) */}
        {activeTab === 'team' && role === 'agency' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <h3 className="font-bold text-base">Agency Workspace Team seats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.email} className="rounded-xl border border-border bg-background p-5 hover:border-primary/30 transition-all flex flex-col justify-between h-36">
                  <div>
                    <h4 className="font-bold text-sm">{member.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{member.email}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-border pt-3">
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 border-0 font-bold capitalize">{member.role}</Badge>
                    <Badge variant="outline" className={cn('text-[9px] border-0 px-1.5 py-0 h-4 font-bold', member.active ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground')}>
                      {member.active ? 'Active' : 'Pending Invite'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 13. BILLING PLANS TAB (ADMIN) */}
        {activeTab === 'billing' && role === 'admin' && (
          <div className="space-y-6 animate-fade-in max-w-3xl">
            <h3 className="font-bold text-base">Platform billing metrics & logs</h3>
            <div className="rounded-xl border border-border bg-background p-5">
              <h4 className="font-bold text-sm mb-4">Total platform earnings distribution</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-muted/40 rounded-lg">
                  <p className="text-muted-foreground">Annual recurring revenues (ARR)</p>
                  <p className="text-lg font-black text-primary mt-1">$3,408,000</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg">
                  <p className="text-muted-foreground">Processing invoices count</p>
                  <p className="text-lg font-black mt-1">428 processed today</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
