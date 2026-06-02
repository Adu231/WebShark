import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_META, UserRole } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  LayoutDashboard, Search, TrendingUp, Target, Activity,
  Sparkles, BarChart3, Settings, User, LogOut, Sun, Moon,
  ChevronLeft, ChevronRight, Bell, Zap, Menu, X,
  Globe, Users, ShieldCheck, CreditCard,
  Building2, SearchCode, FileText, Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Nav items per role
const NAV_BY_ROLE: Record<UserRole, { icon: React.ElementType; label: string; href: string; badge?: string }[]> = {
  business: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Search, label: 'Website Audit', href: '/dashboard?tab=audit' },
    { icon: TrendingUp, label: 'SEO Intelligence', href: '/dashboard?tab=seo', badge: 'New' },
    { icon: Target, label: 'Competitor Analysis', href: '/dashboard?tab=competitor' },
    { icon: Activity, label: 'Monitoring', href: '/dashboard?tab=monitor' },
    { icon: Sparkles, label: 'AI Insights', href: '/dashboard?tab=ai', badge: 'AI' },
    { icon: BarChart3, label: 'Reports', href: '/dashboard?tab=reports' },
    { icon: Globe, label: 'My Websites', href: '/dashboard?tab=websites' },
  ],
  agency: [
    { icon: LayoutDashboard, label: 'Agency Overview', href: '/dashboard' },
    { icon: Globe, label: 'Client Websites', href: '/dashboard?tab=websites' },
    { icon: FileText, label: 'Client Reports', href: '/dashboard?tab=reports', badge: 'New' },
    { icon: TrendingUp, label: 'Rankings Monitor', href: '/dashboard?tab=seo' },
    { icon: Target, label: 'Competitor Analysis', href: '/dashboard?tab=competitor' },
    { icon: Sparkles, label: 'AI Insights', href: '/dashboard?tab=ai', badge: 'AI' },
    { icon: Users, label: 'Team Members', href: '/dashboard?tab=team' },
    { icon: Megaphone, label: 'Lead Generation', href: '/dashboard?tab=leads' },
  ],
  seo_specialist: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: TrendingUp, label: 'Keyword Tracker', href: '/dashboard?tab=seo', badge: 'New' },
    { icon: Target, label: 'Competitor Gap', href: '/dashboard?tab=competitor' },
    { icon: Search, label: 'Site Audit', href: '/dashboard?tab=audit' },
    { icon: Activity, label: 'Backlink Monitor', href: '/dashboard?tab=monitor' },
    { icon: Sparkles, label: 'AI Content Tips', href: '/dashboard?tab=ai', badge: 'AI' },
    { icon: BarChart3, label: 'SERP Analytics', href: '/dashboard?tab=reports' },
    { icon: Globe, label: 'Projects', href: '/dashboard?tab=websites' },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Platform Overview', href: '/dashboard' },
    { icon: Users, label: 'User Management', href: '/dashboard?tab=users' },
    { icon: ShieldCheck, label: 'Subscriptions', href: '/dashboard?tab=subscriptions' },
    { icon: BarChart3, label: 'Usage Analytics', href: '/dashboard?tab=reports' },
    { icon: Activity, label: 'System Monitor', href: '/dashboard?tab=monitor' },
    { icon: Globe, label: 'All Workspaces', href: '/dashboard?tab=websites' },
    { icon: Sparkles, label: 'AI Usage', href: '/dashboard?tab=ai', badge: 'AI' },
    { icon: CreditCard, label: 'Billing & Plans', href: '/dashboard?tab=billing' },
  ],
};

const ROLE_COLOR: Record<UserRole, string> = {
  business: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  agency: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  seo_specialist: 'bg-green-500/10 text-green-500 border-green-500/20',
  admin: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'yourwebsite.com ranking improved: position 3 → 1 for "free seo analyzer"', time: '2h ago', unread: true, type: 'success' },
    { id: 2, text: 'shop.yoursite.com load time increased to 4.2s — investigate server response', time: '5h ago', unread: true, type: 'warning' },
    { id: 3, text: '15 new backlinks detected from high-authority domains this week', time: '1d ago', unread: false, type: 'info' }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const role: UserRole = (user?.role as UserRole) ?? 'business';
  const navItems = NAV_BY_ROLE[role] ?? NAV_BY_ROLE.business;
  const roleMeta = ROLE_META[role];
  const roleColorClass = ROLE_COLOR[role];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return location.pathname === '/dashboard' && !location.search;
    return location.pathname + location.search === href;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:relative z-50 flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300',
          collapsed ? 'w-16' : 'w-64',
          mobileOpen ? 'left-0' : '-left-64 lg:left-0'
        )}
      >
        {/* Sidebar Header */}
        <div className={cn('flex items-center h-16 px-4 border-b border-sidebar-border', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-brand rounded-md flex items-center justify-center flex-shrink-0">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-base">Web<span className="text-gradient">Shark</span></span>
            </Link>
          )}
          {collapsed && (
            <div className="w-7 h-7 bg-gradient-brand rounded-md flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-6 h-6 items-center justify-center rounded hover:bg-sidebar-accent transition-colors text-sidebar-foreground/60"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Role Badge */}
        {!collapsed && user && (
          <div className="px-3 pt-3 pb-1">
            <div className={cn('flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium', roleColorClass)}>
              {role === 'business' && <Building2 className="w-3 h-3 flex-shrink-0" />}
              {role === 'agency' && <Users className="w-3 h-3 flex-shrink-0" />}
              {role === 'seo_specialist' && <SearchCode className="w-3 h-3 flex-shrink-0" />}
              {role === 'admin' && <ShieldCheck className="w-3 h-3 flex-shrink-0" />}
              <span className="truncate">{roleMeta.label}</span>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <div className="space-y-0.5">
            {navItems.map(({ icon: Icon, label, href, badge }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                  isActive(href)
                    ? 'bg-primary/15 text-primary'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                <Icon className={cn('w-4 h-4 flex-shrink-0', isActive(href) ? 'text-primary' : '')} />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{label}</span>
                    {badge && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-[10px] px-1.5 py-0 h-4',
                          badge === 'AI' ? 'bg-accent/20 text-accent border-0' : 'bg-primary/20 text-primary border-0'
                        )}
                      >
                        {badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-2 space-y-0.5">
          <Link
            to="/profile"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              location.pathname === '/profile'
                ? 'bg-primary/15 text-primary'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
            )}
          >
            <User className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="truncate">Profile</span>}
          </Link>
          <Link
            to="/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              location.pathname === '/settings'
                ? 'bg-primary/15 text-primary'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
            )}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="truncate">Settings</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex-shrink-0 h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {title && <h1 className="text-base sm:text-lg font-semibold truncate">{title}</h1>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent text-[9px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Custom Notifications Dropdown Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden font-sans">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <span className="font-bold text-xs">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => {
                          setNotifications(notifications.map(n => ({ ...n, unread: false })));
                          toast.success('All notifications marked as read');
                        }}
                        className="text-[10px] text-primary hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-border/60">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-muted-foreground">
                        <Bell className="w-8 h-8 mx-auto mb-2 text-muted-foreground/45" />
                        No new notifications
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setNotifications(notifications.map(item => item.id === n.id ? { ...item, unread: false } : item));
                          }}
                          className={cn(
                            'p-3.5 text-left text-[11px] leading-relaxed cursor-pointer transition-colors hover:bg-muted/30',
                            n.unread ? 'bg-primary/5 font-semibold text-foreground' : 'text-muted-foreground'
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <span className={cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                              n.unread ? 'bg-primary' : 'bg-transparent'
                            )} />
                            <div className="flex-1">
                              <p>{n.text}</p>
                              <span className="text-[9px] text-muted-foreground mt-1 block">{n.time}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setNotifications(notifications.filter(item => item.id !== n.id));
                              }}
                              className="text-muted-foreground/45 hover:text-destructive text-[10px] ml-1"
                              title="Delete notification"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 bg-muted/30 border-t border-border text-center">
                      <button
                        onClick={() => {
                          setNotifications([]);
                          toast.success('Notifications cleared');
                        }}
                        className="text-[10px] text-destructive hover:underline font-medium"
                      >
                        Clear all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {user && (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 pl-1 hover:opacity-80 transition-all text-left"
              >
                <Avatar className="w-7 h-7 border border-border/80 shadow-sm">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold leading-none">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
                    {roleMeta.label}
                  </p>
                </div>
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
