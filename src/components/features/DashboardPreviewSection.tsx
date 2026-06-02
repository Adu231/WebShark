import { useIntersection } from '@/hooks/useIntersection';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp, TrendingDown, Activity, Globe, Search,
  BarChart2, AlertCircle, CheckCircle, Zap, ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';

const TRAFFIC_DATA = [
  { month: 'Jan', organic: 12400, paid: 3200 },
  { month: 'Feb', organic: 14800, paid: 2900 },
  { month: 'Mar', organic: 16200, paid: 3400 },
  { month: 'Apr', organic: 19100, paid: 4100 },
  { month: 'May', organic: 22600, paid: 3800 },
  { month: 'Jun', organic: 27800, paid: 4500 },
];

const KEYWORD_DATA = [
  { kw: 'SEO tools', pos: 3, prev: 7 },
  { kw: 'Website audit', pos: 1, prev: 2 },
  { kw: 'Rank tracker', pos: 5, prev: 9 },
  { kw: 'Backlink checker', pos: 8, prev: 12 },
  { kw: 'Site speed test', pos: 2, prev: 4 },
];

const SCORE_ITEMS = [
  { label: 'SEO Score', score: 92, color: '#22c55e' },
  { label: 'Performance', score: 87, color: '#3b82f6' },
  { label: 'Accessibility', score: 95, color: '#06b6d4' },
  { label: 'Best Practices', score: 78, color: '#f59e0b' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPreviewSection() {
  const [ref, inView] = useIntersection<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="section-padding" id="dashboard-preview">
      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className={cn('text-center mb-12 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <Badge variant="outline" className="mb-4 border-accent/30 bg-accent/5 text-accent">
            Live Dashboard
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Intelligence at a{' '}
            <span className="text-gradient">glance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A real-time command center for your entire digital presence.
            Every metric you need, beautifully visualized.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className={cn('rounded-2xl border border-border bg-background shadow-2xl overflow-hidden transition-all duration-1000', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12')}>
          {/* Window Chrome */}
          <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-background rounded px-4 py-1 text-xs text-muted-foreground flex items-center gap-2">
                <Zap className="w-3 h-3 text-primary" />
                app.webshark.io/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4 sm:p-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {[
                { label: 'Organic Traffic', value: '27.8K', change: '+23%', up: true, icon: Globe },
                { label: 'Keywords Ranked', value: '2,847', change: '+156', up: true, icon: Search },
                { label: 'Avg. Position', value: '4.2', change: '-0.8', up: true, icon: TrendingUp },
                { label: 'Site Health', value: '92/100', change: '+5', up: true, icon: Activity },
              ].map(({ label, value, change, up, icon: Icon }) => (
                <div key={label} className="rounded-xl border border-border bg-muted/30 p-3 sm:p-4 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-lg sm:text-xl font-bold mb-1">{value}</p>
                  <span className={cn('text-xs flex items-center gap-0.5 font-medium', up ? 'text-green-500' : 'text-red-500')}>
                    {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {change} this month
                  </span>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              {/* Traffic Chart */}
              <div className="lg:col-span-2 rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold">Organic Traffic Growth</h3>
                    <p className="text-xs text-muted-foreground">Last 6 months</p>
                  </div>
                  <Badge variant="secondary" className="text-green-500 bg-green-500/10 border-0 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" /> +124%
                  </Badge>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={TRAFFIC_DATA}>
                    <defs>
                      <linearGradient id="organicGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="paidGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(191,91%,43%)" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="hsl(191,91%,43%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="organic" name="Organic" stroke="hsl(221,83%,53%)" fill="url(#organicGrad)" strokeWidth={2} dot={false} />
                    <Area type="monotone" dataKey="paid" name="Paid" stroke="hsl(191,91%,43%)" fill="url(#paidGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Score Cards */}
              <div className="rounded-xl border border-border p-4">
                <h3 className="text-sm font-semibold mb-4">Audit Scores</h3>
                <div className="space-y-3">
                  {SCORE_ITEMS.map(({ label, score, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs">{label}</span>
                        <span className="text-xs font-bold" style={{ color }}>{score}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: inView ? `${score}%` : '0%', backgroundColor: color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Keywords Table */}
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold">Top Keyword Rankings</h3>
                <button className="text-xs text-primary flex items-center gap-0.5 hover:underline">
                  View all <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <div className="divide-y divide-border">
                {KEYWORD_DATA.map(({ kw, pos, prev }) => {
                  const improved = pos < prev;
                  const diff = Math.abs(pos - prev);
                  return (
                    <div key={kw} className="px-4 py-2.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <span className="text-xs font-medium truncate">{kw}</span>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-muted-foreground w-16 text-right">prev: #{prev}</span>
                        <span className={cn(
                          'flex items-center gap-1 text-xs font-bold w-16 justify-end',
                          improved ? 'text-green-500' : 'text-red-500'
                        )}>
                          {improved ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          #{pos} ({improved ? '+' : '-'}{diff})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
