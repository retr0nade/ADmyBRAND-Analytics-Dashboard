export interface Metrics {
  revenue: string;
  revenueChange: string;
  users: string;
  usersChange: string;
  conversions: string;
  conversionsChange: string;
  growth: string;
  growthChange: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
  clicks: number;
  conversions: number;
  roi: number;
}

export interface ChartData {
  revenue: Array<{
    month: string;
    revenue: number;
    previousYear: number;
  }>;
  conversions: Array<{
    campaign: string;
    conversions: number;
    clicks: number;
  }>;
  userDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export interface DashboardData {
  metrics: Metrics;
  campaigns: Campaign[];
  charts: ChartData;
}

export type DateRange = 'last6months' | 'thisYear' | 'lastYear' | 'custom';