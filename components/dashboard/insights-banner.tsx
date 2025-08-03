"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, TrendingDown, Target, Award, AlertCircle } from 'lucide-react';
import type { Campaign, Metrics } from '@/lib/types';

interface InsightsBannerProps {
  campaigns?: Campaign[];
  metrics?: Metrics;
  isLoading?: boolean;
}

interface Insight {
  message: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function InsightsBanner({ campaigns, metrics, isLoading }: InsightsBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const insight = useMemo(() => {
    if (!campaigns || campaigns.length === 0 || !metrics) {
      return null;
    }

    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const highROICampaigns = campaigns.filter(c => c.roi > 200).length;
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const avgROI = campaigns.reduce((sum, c) => sum + c.roi, 0) / totalCampaigns;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    // Parse revenue change percentage
    const revenueChange = parseFloat(metrics.revenueChange.replace(/[+%]/g, '')) || 0;

    // Generate insights based on data
    const insights: Insight[] = [];

    // Revenue insights
    if (revenueChange > 10) {
      insights.push({
        message: `Revenue has increased by ${Math.abs(revenueChange).toFixed(1)}% over the past period, with ${highROICampaigns} campaigns exceeding 200% ROI.`,
        type: 'positive',
        icon: TrendingUp,
        color: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
      });
    } else if (revenueChange < -5) {
      insights.push({
        message: `Revenue has decreased by ${Math.abs(revenueChange).toFixed(1)}%. Consider optimizing ${activeCampaigns} active campaigns to improve performance.`,
        type: 'negative',
        icon: TrendingDown,
        color: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300'
      });
    }

    // ROI insights
    if (avgROI > 250) {
      insights.push({
        message: `Excellent performance! Average ROI is ${avgROI.toFixed(0)}% with ${highROICampaigns} campaigns achieving over 200% ROI.`,
        type: 'positive',
        icon: Award,
        color: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
      });
    } else if (avgROI < 150) {
      insights.push({
        message: `Average ROI is ${avgROI.toFixed(0)}%. Focus on optimizing ${activeCampaigns} active campaigns to improve returns.`,
        type: 'warning',
        icon: Target,
        color: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
      });
    }

    // Conversion insights
    if (conversionRate > 5) {
      insights.push({
        message: `Strong conversion rate of ${conversionRate.toFixed(1)}% across ${totalCampaigns} campaigns. Keep up the great work!`,
        type: 'positive',
        icon: TrendingUp,
        color: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
      });
    } else if (conversionRate < 2) {
      insights.push({
        message: `Conversion rate is ${conversionRate.toFixed(1)}%. Consider reviewing targeting and messaging for ${activeCampaigns} active campaigns.`,
        type: 'warning',
        icon: AlertCircle,
        color: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
      });
    }

    // Campaign status insights
    if (activeCampaigns === 0) {
      insights.push({
        message: 'No active campaigns detected. Consider launching new campaigns to drive growth.',
        type: 'neutral',
        icon: AlertCircle,
        color: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
      });
    } else if (activeCampaigns < totalCampaigns * 0.5) {
      insights.push({
        message: `Only ${activeCampaigns} of ${totalCampaigns} campaigns are active. Consider reactivating paused campaigns.`,
        type: 'warning',
        icon: Target,
        color: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
      });
    }

    // Return the most relevant insight (prioritize positive, then warning, then neutral)
    const priorityOrder = ['positive', 'warning', 'negative', 'neutral'];
    const sortedInsights = insights.sort((a, b) => 
      priorityOrder.indexOf(a.type) - priorityOrder.indexOf(b.type)
    );

    return sortedInsights[0] || {
      message: `Managing ${totalCampaigns} campaigns with ${activeCampaigns} currently active.`,
      type: 'neutral' as const,
      icon: Target,
      color: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
    };
  }, [campaigns, metrics]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Alert className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-muted" />
              <div className="h-4 w-32 bg-muted rounded" />
            </div>
            <div className="h-4 w-4 bg-muted rounded" />
          </div>
        </Alert>
      </motion.div>
    );
  }

  if (!insight || isDismissed) {
    return null;
  }

  const Icon = insight.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Alert className={`${insight.color} border-2`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <AlertDescription className="text-sm font-medium">
                {insight.message}
              </AlertDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDismissed(true)}
              className="h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
} 