import { faker } from '@faker-js/faker';
import { format, addDays, subDays } from 'date-fns';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  clicks: number;
  conversions: number;
  roi: number;
  description?: string;
}

export function generateMockCampaigns(): Campaign[] {
  const campaignNames = [
    'Summer Sale Campaign',
    'Back to School Promotion',
    'Holiday Season Special',
    'New Product Launch',
    'Brand Awareness Campaign',
    'Customer Retention Drive',
    'Social Media Boost',
    'Email Marketing Series',
    'Influencer Partnership',
    'Retargeting Campaign',
    'Seasonal Promotion',
    'Flash Sale Event',
    'Loyalty Program Launch',
    'Competitive Response',
    'Market Expansion'
  ];

  return Array.from({ length: 15 }, (_, i) => {
    const startDate = faker.date.between({ 
      from: subDays(new Date(), 60), 
      to: addDays(new Date(), 30) 
    });
    const endDate = addDays(startDate, faker.number.int({ min: 7, max: 90 }));
    const budget = faker.number.int({ min: 5000, max: 100000 });
    const spent = faker.number.int({ min: budget * 0.1, max: budget * 0.9 });
    const clicks = faker.number.int({ min: 1000, max: 50000 });
    const conversions = faker.number.int({ min: 50, max: 2000 });
    const roi = faker.number.int({ min: 50, max: 400 });

    return {
      id: faker.string.uuid(),
      name: campaignNames[i] || faker.company.catchPhrase(),
      status: faker.helpers.arrayElement(['active', 'paused', 'completed']),
      startDate,
      endDate,
      budget,
      spent,
      clicks,
      conversions,
      roi,
      description: faker.lorem.sentence(),
    };
  });
} 