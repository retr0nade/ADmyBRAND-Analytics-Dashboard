import { faker } from '@faker-js/faker';
import type { DashboardData, Campaign } from './types';

export type DateRange = 'last6months' | 'thisYear' | 'lastYear' | 'custom';

export function generateRevenueData(dateRange: DateRange = 'last6months') {
  switch (dateRange) {
    case 'last6months':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
        month,
        revenue: faker.number.int({ min: 800000, max: 1500000 }),
        previousYear: faker.number.int({ min: 600000, max: 1200000 }),
      }));
    
    case 'thisYear':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ({
        month,
        revenue: faker.number.int({ min: 800000, max: 1500000 }),
        previousYear: faker.number.int({ min: 600000, max: 1200000 }),
      }));
    
    case 'lastYear':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ({
        month,
        revenue: faker.number.int({ min: 600000, max: 1200000 }),
        previousYear: faker.number.int({ min: 500000, max: 1000000 }),
      }));
    
    case 'custom':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(month => ({
        month,
        revenue: faker.number.int({ min: 700000, max: 1400000 }),
        previousYear: faker.number.int({ min: 550000, max: 1100000 }),
      }));
    
    default:
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
        month,
        revenue: faker.number.int({ min: 800000, max: 1500000 }),
        previousYear: faker.number.int({ min: 600000, max: 1200000 }),
      }));
  }
}

export function generateMockData(dateRange: DateRange = 'last6months'): DashboardData {
  // Generate realistic metrics with some variation
  const baseRevenue = 1200000;
  const revenueVariation = (Math.random() - 0.5) * 100000;
  const currentRevenue = baseRevenue + revenueVariation;
  
  const baseUsers = 12500;
  const usersVariation = Math.floor((Math.random() - 0.5) * 1000);
  const currentUsers = baseUsers + usersVariation;
  
  const baseConversions = 1020;
  const conversionsVariation = Math.floor((Math.random() - 0.5) * 100);
  const currentConversions = baseConversions + conversionsVariation;
  
  const baseGrowth = 8.2;
  const growthVariation = (Math.random() - 0.5) * 2;
  const currentGrowth = baseGrowth + growthVariation;

  const metrics = {
    revenue: `₹${(currentRevenue / 1000000).toFixed(1)}M`,
    revenueChange: `+${((revenueVariation / baseRevenue) * 100).toFixed(1)}%`,
    users: currentUsers.toLocaleString(),
    usersChange: `${usersVariation > 0 ? '+' : ''}${((usersVariation / baseUsers) * 100).toFixed(1)}%`,
    conversions: currentConversions.toLocaleString(),
    conversionsChange: `${conversionsVariation > 0 ? '+' : ''}${((conversionsVariation / baseConversions) * 100).toFixed(1)}%`,
    growth: `${currentGrowth.toFixed(1)}%`,
    growthChange: `${growthVariation > 0 ? '+' : ''}${growthVariation.toFixed(1)}%`,
  };

  // Generate campaign data
  const campaigns: Campaign[] = Array.from({ length: 10 }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName() + ' Campaign',
    status: Math.random() > 0.3 ? 'active' : 'paused',
    clicks: faker.number.int({ min: 1000, max: 50000 }),
    conversions: faker.number.int({ min: 50, max: 2000 }),
    roi: faker.number.int({ min: 120, max: 350 }),
  }));

  // Generate chart data with date range support
  const revenueData = generateRevenueData(dateRange);

  const conversionsData = campaigns.slice(0, 6).map(campaign => ({
    campaign: campaign.name.split(' ')[0],
    conversions: campaign.conversions,
    clicks: campaign.clicks,
  }));

  const userDistribution = [
    { name: 'Paid Search', value: 45, color: '#3B82F6' },
    { name: 'Organic', value: 30, color: '#10B981' },
    { name: 'Social Media', value: 15, color: '#F97316' },
    { name: 'Referral', value: 10, color: '#8B5CF6' },
  ];

  return {
    metrics,
    campaigns,
    charts: {
      revenue: revenueData,
      conversions: conversionsData,
      userDistribution,
    },
  };
}