"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import type { Campaign } from '@/lib/types';

interface TopCampaignsLeaderboardProps {
  campaigns?: Campaign[];
  isLoading?: boolean;
  animationsEnabled?: boolean;
}

export function TopCampaignsLeaderboard({ campaigns, isLoading, animationsEnabled = true }: TopCampaignsLeaderboardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return null;
  }

  // Sort campaigns by ROI descending and take top 3
  const topCampaigns = [...campaigns]
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 3);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
      case 1:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800';
      case 2:
        return 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800';
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
    }
  };

  const maxROI = Math.max(...topCampaigns.map(c => c.roi));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Performing Campaigns
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Top 3 campaigns by ROI performance
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {topCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={animationsEnabled ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            animate={animationsEnabled ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={animationsEnabled ? { duration: 0.3, delay: index * 0.1 } : { duration: 0 }}
            className={`p-3 rounded-lg border ${getRankColor(index)} transition-colors hover:shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                  {getRankIcon(index)}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{campaign.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {campaign.clicks.toLocaleString()} clicks • {campaign.conversions.toLocaleString()} conversions
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="text-xs font-bold">
                  {campaign.roi}% ROI
                </Badge>
                <div className="mt-1 w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300"
                    style={{ width: `${(campaign.roi / maxROI) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Summary Stats */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Best ROI</p>
              <p className="text-lg font-bold text-green-600">
                {Math.max(...topCampaigns.map(c => c.roi))}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg ROI</p>
              <p className="text-lg font-bold">
                {Math.round(topCampaigns.reduce((sum, c) => sum + c.roi, 0) / topCampaigns.length)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Clicks</p>
              <p className="text-lg font-bold">
                {topCampaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 