import { faker } from '@faker-js/faker';
import { format, subDays, subMonths, startOfYear, endOfYear, eachDayOfInterval, eachMonthOfInterval } from 'date-fns';
import type { DashboardData, Campaign, DateRange } from './types';

export function generateRevenueData(dateRange: DateRange = 'last6months', customRange?: { from: Date | undefined; to: Date | undefined }) {
  if (customRange && customRange.from && customRange.to) {
    // Generate data for custom date range
    const days = eachDayOfInterval({ start: customRange.from, end: customRange.to });
    return days.map(day => ({
      month: format(day, 'MMM dd'),
      revenue: faker.number.int({ min: 800000, max: 1500000 }),
      previousYear: faker.number.int({ min: 600000, max: 1200000 }),
    }));
  }

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
      // This will be handled by the customRange parameter
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
        month,
        revenue: faker.number.int({ min: 800000, max: 1500000 }),
        previousYear: faker.number.int({ min: 600000, max: 1200000 }),
      }));
    default:
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
        month,
        revenue: faker.number.int({ min: 800000, max: 1500000 }),
        previousYear: faker.number.int({ min: 600000, max: 1200000 }),
      }));
  }
}

export function generateConversionsData(dateRange: DateRange = 'last6months', customRange?: { from: Date | undefined; to: Date | undefined }) {
  if (customRange && customRange.from && customRange.to) {
    // Generate data for custom date range - use campaign names instead of months
    const campaignNames = ['Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok'];
    return campaignNames.map(campaign => ({
      campaign,
      conversions: faker.number.int({ min: 50, max: 200 }),
      clicks: faker.number.int({ min: 500, max: 2000 }),
    }));
  }

  switch (dateRange) {
    case 'last6months':
      return ['Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok'].map(campaign => ({
        campaign,
        conversions: faker.number.int({ min: 50, max: 200 }),
        clicks: faker.number.int({ min: 500, max: 2000 }),
      }));
    case 'thisYear':
      return ['Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok', 'YouTube', 'Pinterest'].map(campaign => ({
        campaign,
        conversions: faker.number.int({ min: 50, max: 200 }),
        clicks: faker.number.int({ min: 500, max: 2000 }),
      }));
    case 'lastYear':
      return ['Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok', 'YouTube', 'Pinterest'].map(campaign => ({
        campaign,
        conversions: faker.number.int({ min: 40, max: 180 }),
        clicks: faker.number.int({ min: 400, max: 1800 }),
      }));
    case 'custom':
      return ['Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok'].map(campaign => ({
        campaign,
        conversions: faker.number.int({ min: 50, max: 200 }),
        clicks: faker.number.int({ min: 500, max: 2000 }),
      }));
    default:
      return ['Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok'].map(campaign => ({
        campaign,
        conversions: faker.number.int({ min: 50, max: 200 }),
        clicks: faker.number.int({ min: 500, max: 2000 }),
      }));
  }
}

export function generateUserDistributionData() {
  return [
    { name: 'Mobile', value: faker.number.int({ min: 45, max: 65 }), color: '#3B82F6' },
    { name: 'Desktop', value: faker.number.int({ min: 25, max: 40 }), color: '#10B981' },
    { name: 'Tablet', value: faker.number.int({ min: 5, max: 15 }), color: '#F97316' },
  ];
}

export function generateMockData(dateRange: DateRange = 'last6months', customRange?: { from: Date | undefined; to: Date | undefined }): DashboardData {
  const metrics = {
    revenue: `₹${(faker.number.int({ min: 800000, max: 1500000 }) / 1000000).toFixed(1)}M`,
    revenueChange: `${faker.number.int({ min: -20, max: 30 })}.${faker.number.int({ min: 0, max: 9 })}%`,
    users: faker.number.int({ min: 8000, max: 15000 }).toLocaleString(),
    usersChange: `${faker.number.int({ min: -15, max: 25 })}.${faker.number.int({ min: 0, max: 9 })}%`,
    conversions: faker.number.int({ min: 800, max: 1500 }).toLocaleString(),
    conversionsChange: `${faker.number.int({ min: -20, max: 30 })}.${faker.number.int({ min: 0, max: 9 })}%`,
    growth: `${faker.number.int({ min: 2, max: 8 })}.${faker.number.int({ min: 0, max: 9 })}%`,
    growthChange: `${faker.number.int({ min: -5, max: 10 })}.${faker.number.int({ min: 0, max: 9 })}%`,
  };

  const campaigns: Campaign[] = Array.from({ length: 10 }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.company.catchPhrase(),
    status: faker.helpers.arrayElement(['active', 'paused', 'completed']),
    clicks: faker.number.int({ min: 1000, max: 50000 }),
    conversions: faker.number.int({ min: 50, max: 2000 }),
    roi: faker.number.int({ min: 50, max: 400 }),
  }));

  const revenueData = generateRevenueData(dateRange, customRange);
  const conversionsData = generateConversionsData(dateRange, customRange);
  const userDistribution = generateUserDistributionData();

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