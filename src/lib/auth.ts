export type UserRole = 'admin' | 'business' | 'agency' | 'seo_specialist';

export const ROLE_META: Record<UserRole, { label: string; description: string; color: string; flow: string[] }> = {
  admin: {
    label: 'Admin',
    description: 'Full platform administration — manage users, subscriptions, and system health.',
    color: 'purple',
    flow: ['Login', 'Manage Users & Subscriptions', 'Monitor Platform', 'Analyze Usage Metrics'],
  },
  business: {
    label: 'Business User',
    description: 'Grow your website — run audits, optimize SEO, and track performance over time.',
    color: 'blue',
    flow: ['Sign Up', 'Add Website', 'Run Audit', 'View Reports', 'Optimize SEO', 'Monitor Performance', 'Track Growth'],
  },
  agency: {
    label: 'Digital Marketing Agency',
    description: 'Manage multiple client websites from a single workspace and share branded reports.',
    color: 'cyan',
    flow: ['Create Workspace', 'Add Client Websites', 'Generate Reports', 'Monitor Rankings', 'Share Insights with Clients'],
  },
  seo_specialist: {
    label: 'SEO Specialist',
    description: 'Deep-dive into keyword tracking, competitor gaps, backlinks, and content scoring.',
    color: 'green',
    flow: ['Add Keywords', 'Track Rankings', 'Analyze Competitors', 'Optimize Content', 'Monitor Backlinks'],
  },
};

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  plan: 'free' | 'pro' | 'enterprise';
  company?: string;
  joinedAt: string;
  websites: number;
  credits: number;
}

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  // Business User
  'demo@webshark.io': {
    password: 'demo1234',
    user: {
      id: 'usr_1',
      name: 'Alex Morgan',
      email: 'demo@webshark.io',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      role: 'business',
      plan: 'pro',
      company: 'TechCorp Inc.',
      joinedAt: '2024-01-15',
      websites: 7,
      credits: 450,
    },
  },
  // Admin
  'admin@webshark.io': {
    password: 'admin1234',
    user: {
      id: 'usr_admin',
      name: 'Sarah Chen',
      email: 'admin@webshark.io',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b76c?w=80&h=80&fit=crop&crop=face',
      role: 'admin',
      plan: 'enterprise',
      company: 'WebShark HQ',
      joinedAt: '2023-06-01',
      websites: 25,
      credits: 9999,
    },
  },
  // Digital Marketing Agency
  'agency@webshark.io': {
    password: 'agency1234',
    user: {
      id: 'usr_agency',
      name: 'Jordan Rivera',
      email: 'agency@webshark.io',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      role: 'agency',
      plan: 'enterprise',
      company: 'Pixel Growth Agency',
      joinedAt: '2023-09-12',
      websites: 42,
      credits: 2800,
    },
  },
  // SEO Specialist
  'seo@webshark.io': {
    password: 'seo1234',
    user: {
      id: 'usr_seo',
      name: 'Maya Patel',
      email: 'seo@webshark.io',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
      role: 'seo_specialist',
      plan: 'pro',
      company: 'Freelance',
      joinedAt: '2024-03-20',
      websites: 18,
      credits: 720,
    },
  },
};

export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const entry = MOCK_USERS[email.toLowerCase()];
      if (entry && entry.password === password) {
        localStorage.setItem('webshark-user', JSON.stringify(entry.user));
        resolve(entry.user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
}

export function register(name: string, email: string, password: string, role: UserRole = 'business'): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: `usr_${Date.now()}`,
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1D4ED8&color=fff`,
        role,
        plan: 'free',
        joinedAt: new Date().toISOString().split('T')[0],
        websites: 0,
        credits: 100,
      };
      localStorage.setItem('webshark-user', JSON.stringify(user));
      resolve(user);
    }, 1200);
  });
}

export function logout(): void {
  localStorage.removeItem('webshark-user');
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem('webshark-user');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function updateUser(updates: Partial<User>): User | null {
  const current = getCurrentUser();
  if (!current) return null;
  const updated = { ...current, ...updates };
  localStorage.setItem('webshark-user', JSON.stringify(updated));
  return updated;
}

export function sendPasswordReset(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_USERS[email.toLowerCase()] || email.includes('@')) {
        resolve();
      } else {
        reject(new Error('Email not found'));
      }
    }, 1000);
  });
}
