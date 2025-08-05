"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Pause, 
  Target,
  MousePointer,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';
import type { Campaign } from '@/lib/types';

interface CampaignInsightsProps {
  campaigns: Campaign[];
  selectedCampaigns: string[];
  isLoading: boolean;
}

interface CampaignWithChartData extends Campaign {
  chartData: Array<{
    month: string;
    clicks: number;
    conversions: number;
    roi: number;
  }>;
  impressions: number;
  ctr: number;
  costPerConversion: number;
  avgOrderValue: number;
}

export function CampaignInsights({
  campaigns,
  selectedCampaigns,
  isLoading
}: CampaignInsightsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                  <div className="space-y-2 mt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Generate mock chart data and additional metrics
  const campaignsWithInsights: CampaignWithChartData[] = campaigns
    .filter(campaign => selectedCampaigns.length === 0 || selectedCampaigns.includes(campaign.id))
    .map(campaign => {
      const impressions = campaign.clicks * (Math.random() * 10 + 5);
      const ctr = (campaign.clicks / impressions) * 100;
      const costPerConversion = campaign.clicks * (Math.random() * 50 + 10) / campaign.conversions;
      const avgOrderValue = Math.random() * 500 + 100;

      // Generate 6 months of chart data
      const chartData = Array.from({ length: 6 }, (_, i) => {
        const month = new Date();
        month.setMonth(month.getMonth() - (5 - i));
        return {
          month: month.toLocaleDateString('en-US', { month: 'short' }),
          clicks: Math.floor(campaign.clicks * (0.7 + Math.random() * 0.6)),
          conversions: Math.floor(campaign.conversions * (0.7 + Math.random() * 0.6)),
          roi: campaign.roi * (0.8 + Math.random() * 0.4)
        };
      });

      return {
        ...campaign,
        chartData,
        impressions,
        ctr,
        costPerConversion,
        avgOrderValue
      };
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4" />;
      case 'paused':
        return <Pause className="h-4 w-4" />;
      case 'completed':
        return <Target className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };



  if (campaignsWithInsights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaign Insights</CardTitle>
          <p className="text-sm text-muted-foreground">
            Detailed insights and performance trends for each campaign
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            {selectedCampaigns.length === 0 
              ? 'No campaigns selected. Use the filter bar above to select campaigns for detailed insights.'
              : 'No campaigns match the current selection.'
            }
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Insights</CardTitle>
        <p className="text-sm text-muted-foreground">
          Detailed insights and performance trends for each campaign
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaignsWithInsights.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-medium truncate">
                        {campaign.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(campaign.status)}
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mini Chart */}
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={campaign.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                        <XAxis 
                          dataKey="month" 
                          fontSize={10}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis 
                          fontSize={10}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="roi" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MousePointer className="h-3 w-3" />
                        Clicks
                      </div>
                      <div className="text-sm font-semibold">
                        {campaign.clicks.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        Conversions
                      </div>
                      <div className="text-sm font-semibold">
                        {campaign.conversions.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Target className="h-3 w-3" />
                        ROI
                      </div>
                      <div className={`text-sm font-semibold ${campaign.roi > 200 ? 'text-green-600' : ''}`}>
                        {campaign.roi.toFixed(1)}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        CTR
                      </div>
                      <div className="text-sm font-semibold">
                        {campaign.ctr.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="pt-2 border-t">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Cost/Conv:</span>
                        <span className="ml-1 font-medium">₹{campaign.costPerConversion.toFixed(0)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Order:</span>
                        <span className="ml-1 font-medium">₹{campaign.avgOrderValue.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 