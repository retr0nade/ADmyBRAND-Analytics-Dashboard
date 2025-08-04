import { faker } from '@faker-js/faker';
import { format, subDays, subMonths, startOfYear, endOfYear, eachDayOfInterval, eachMonthOfInterval, addDays } from 'date-fns';
import type { DashboardData, Campaign, DateRange } from './types';

// Simple linear regression function for AI projection
function calculateProjection(data: Array<{ revenue: number | null }>): number[] {
  if (data.length < 2) return [];
  
  // Filter out null values and use only valid revenue data
  const validData = data.filter(point => point.revenue !== null) as Array<{ revenue: number }>;
  
  if (validData.length < 2) return [];
  
  // Calculate linear regression using last 30 days (or available data)
  const recentData = validData.slice(-Math.min(30, validData.length));
  const n = recentData.length;
  
  // Calculate means
  const xMean = (n - 1) / 2; // x values are 0, 1, 2, ..., n-1
  const yMean = recentData.reduce((sum, point) => sum + point.revenue, 0) / n;
  
  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    const x = i;
    const y = recentData[i].revenue;
    numerator += (x - xMean) * (y - yMean);
    denominator += (x - xMean) * (x - xMean);
  }
  
  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = yMean - slope * xMean;
  
  // Generate 7 days of projection
  const projection = [];
  const lastActualValue = recentData[recentData.length - 1]?.revenue || 0;
  
  for (let i = 0; i < 7; i++) {
    const projectedValue = slope * (n + i) + intercept;
    // Add some realistic variation (±10%) but ensure it starts from the last actual value
    const variation = faker.number.float({ min: 0.9, max: 1.1 });
    const adjustedValue = Math.max(0, projectedValue * variation);
    
    // For the first projection point, blend it with the last actual value for smooth connection
    if (i === 0) {
      const blendFactor = 0.3; // 30% of last actual, 70% of projected
      projection.push(lastActualValue * blendFactor + adjustedValue * (1 - blendFactor));
    } else {
      projection.push(adjustedValue);
    }
  }
  
  return projection;
}

export function generateRevenueData(dateRange: DateRange = 'last6months', customRange?: { from: Date | undefined; to: Date | undefined }) {
  let baseData: Array<{ month: string; revenue: number | null; previousYear: number | null; projection?: number }> = [];
  const currentDate = new Date();
  
  if (customRange && customRange.from && customRange.to) {
    // Generate data for custom date range
    const days = eachDayOfInterval({ start: customRange.from, end: customRange.to });
    baseData = days.map(day => ({
      month: format(day, 'MMM dd'),
      revenue: faker.number.int({ min: 800000, max: 1500000 }),
      previousYear: faker.number.int({ min: 600000, max: 1200000 }),
    }));
    
    // Check if this is a historical range (both dates <= current date)
    const currentDate = new Date();
    if (customRange.from <= currentDate && customRange.to <= currentDate) {
      // For historical date ranges, don't add projection data
      return baseData;
    }
    
         // Check if this is a future range (both dates > current date)
     if (customRange.from > currentDate && customRange.to > currentDate) {
       // For future ranges, generate realistic projection data
       const result = [];
       
       // Generate a realistic starting point for projections
       const baseRevenue = faker.number.int({ min: 800000, max: 1200000 });
       
       for (let i = 0; i < days.length; i++) {
         const day = days[i];
         
         // Create realistic projection with some variation and trend
         const trendFactor = 1 + (i * 0.02); // Slight upward trend
         const variation = faker.number.float({ min: 0.85, max: 1.15 }); // ±15% variation
         const projectedRevenue = Math.max(0, baseRevenue * trendFactor * variation);
         
         result.push({
           month: format(day, 'MMM dd'),
           revenue: null, // No actual revenue for future dates
           previousYear: null, // No previous year data for future dates
           projection: projectedRevenue,
         });
       }
       
       return result;
     }
    
    // For mixed ranges (historical + current), add projection data as before
  } else {
    switch (dateRange) {
      case 'last6months':
        baseData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
          month,
          revenue: faker.number.int({ min: 800000, max: 1500000 }),
          previousYear: faker.number.int({ min: 600000, max: 1200000 }),
        }));
        break;
      case 'thisYear':
        baseData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ({
          month,
          revenue: faker.number.int({ min: 800000, max: 1500000 }),
          previousYear: faker.number.int({ min: 600000, max: 1200000 }),
        }));
        break;
      case 'lastYear':
        baseData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ({
          month,
          revenue: faker.number.int({ min: 600000, max: 1200000 }),
          previousYear: faker.number.int({ min: 500000, max: 1000000 }),
        }));
        break;
      case 'custom':
        baseData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
          month,
          revenue: faker.number.int({ min: 800000, max: 1500000 }),
          previousYear: faker.number.int({ min: 600000, max: 1200000 }),
        }));
        break;
      default:
        baseData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
          month,
          revenue: faker.number.int({ min: 800000, max: 1500000 }),
          previousYear: faker.number.int({ min: 600000, max: 1200000 }),
        }));
    }
  }

  // Calculate projection for the next 7 days
  const projection = calculateProjection(baseData);
  
  // Add projection data for the next 7 days
  const result = [...baseData];
  
  // Add projection data for the next 7 days (only projection, no actual revenue)
  const lastDate = customRange?.to || currentDate;
  
  // Get the last actual revenue value to ensure smooth connection
  const lastActualRevenue = baseData.length > 0 ? baseData[baseData.length - 1].revenue : 0;
  
  for (let i = 0; i < 7; i++) {
    const projectionDate = addDays(lastDate, i + 1);
    const projectedValue = projection[i] || 0;
    
    result.push({
      month: format(projectionDate, 'MMM dd'),
      revenue: null, // No actual revenue for future dates (null instead of 0)
      previousYear: null, // No previous year data for future dates (null instead of 0)
      projection: projectedValue,
    });
  }

  return result;
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