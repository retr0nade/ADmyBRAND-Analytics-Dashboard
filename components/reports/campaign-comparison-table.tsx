"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Campaign } from '@/lib/types';

interface CampaignComparisonTableProps {
  campaigns: Campaign[];
  selectedCampaigns: string[];
  isLoading: boolean;
}

interface CampaignWithMetrics extends Campaign {
  ctr: number;
  costPerConversion: number;
  lastMonthClicks: number;
  lastMonthConversions: number;
  lastMonthRoi: number;
  lastMonthCtr: number;
  lastMonthCostPerConversion: number;
}

export function CampaignComparisonTable({
  campaigns,
  selectedCampaigns,
  isLoading
}: CampaignComparisonTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Generate mock data with last month comparison
  const campaignsWithMetrics: CampaignWithMetrics[] = campaigns
    .filter(campaign => selectedCampaigns.length === 0 || selectedCampaigns.includes(campaign.id))
    .map(campaign => {
      const impressions = campaign.clicks * (Math.random() * 10 + 5);
      const ctr = (campaign.clicks / impressions) * 100;
      const costPerConversion = campaign.clicks * (Math.random() * 50 + 10) / campaign.conversions;
      
      // Generate last month data with some variation
      const lastMonthClicks = Math.floor(campaign.clicks * (0.8 + Math.random() * 0.4));
      const lastMonthConversions = Math.floor(campaign.conversions * (0.8 + Math.random() * 0.4));
      const lastMonthRoi = campaign.roi * (0.8 + Math.random() * 0.4);
      const lastMonthImpressions = lastMonthClicks * (Math.random() * 10 + 5);
      const lastMonthCtr = (lastMonthClicks / lastMonthImpressions) * 100;
      const lastMonthCostPerConversion = lastMonthClicks * (Math.random() * 50 + 10) / lastMonthConversions;

      return {
        ...campaign,
        ctr,
        costPerConversion,
        lastMonthClicks,
        lastMonthConversions,
        lastMonthRoi,
        lastMonthCtr,
        lastMonthCostPerConversion
      };
    });

  const getChangeIndicator = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = previous > 0 ? (change / previous) * 100 : 0;
    
    if (Math.abs(percentage) < 1) {
      return { icon: Minus, color: 'text-gray-500', change: '0%' };
    }
    
    if (change > 0) {
      return { 
        icon: TrendingUp, 
        color: 'text-green-600', 
        change: `+${percentage.toFixed(1)}%` 
      };
    } else {
      return { 
        icon: TrendingDown, 
        color: 'text-red-600', 
        change: `${percentage.toFixed(1)}%` 
      };
    }
  };

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

  if (campaignsWithMetrics.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaign Comparison</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select campaigns to compare their performance metrics
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            {selectedCampaigns.length === 0 
              ? 'No campaigns selected. Use the filter bar above to select campaigns for comparison.'
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
        <CardTitle>Campaign Comparison</CardTitle>
        <p className="text-sm text-muted-foreground">
          Detailed performance metrics with month-over-month changes
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>ROI %</TableHead>
                <TableHead>CTR %</TableHead>
                <TableHead>Cost/Conversion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignsWithMetrics.map((campaign, index) => {
                const clicksChange = getChangeIndicator(campaign.clicks, campaign.lastMonthClicks);
                const conversionsChange = getChangeIndicator(campaign.conversions, campaign.lastMonthConversions);
                const roiChange = getChangeIndicator(campaign.roi, campaign.lastMonthRoi);
                const ctrChange = getChangeIndicator(campaign.ctr, campaign.lastMonthCtr);
                const costChange = getChangeIndicator(campaign.costPerConversion, campaign.lastMonthCostPerConversion);

                return (
                  <motion.tr
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{campaign.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {campaign.id.slice(0, 8)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{campaign.clicks.toLocaleString()}</span>
                        <div className={`flex items-center gap-1 text-xs ${clicksChange.color}`}>
                          <clicksChange.icon className="h-3 w-3" />
                          {clicksChange.change}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{campaign.conversions.toLocaleString()}</span>
                        <div className={`flex items-center gap-1 text-xs ${conversionsChange.color}`}>
                          <conversionsChange.icon className="h-3 w-3" />
                          {conversionsChange.change}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${campaign.roi > 200 ? 'text-green-600' : ''}`}>
                          {campaign.roi.toFixed(1)}%
                        </span>
                        <div className={`flex items-center gap-1 text-xs ${roiChange.color}`}>
                          <roiChange.icon className="h-3 w-3" />
                          {roiChange.change}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{campaign.ctr.toFixed(2)}%</span>
                        <div className={`flex items-center gap-1 text-xs ${ctrChange.color}`}>
                          <ctrChange.icon className="h-3 w-3" />
                          {ctrChange.change}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₹{campaign.costPerConversion.toFixed(0)}</span>
                        <div className={`flex items-center gap-1 text-xs ${costChange.color}`}>
                          <costChange.icon className="h-3 w-3" />
                          {costChange.change}
                        </div>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
} 