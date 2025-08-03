"use client";

import { motion } from 'framer-motion';
import { MetricCard } from './metric-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Metrics } from '@/lib/types';

interface MetricsOverviewProps {
  metrics?: Metrics;
  isLoading: boolean;
}

export function MetricsOverview({ metrics, isLoading }: MetricsOverviewProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 overflow-visible">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-20" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const metricsArray = [
    {
      title: "Total Revenue",
      value: metrics.revenue,
      change: metrics.revenueChange,
      icon: "revenue",
      description: "Includes revenue from all campaigns and sales activities this quarter."
    },
    {
      title: "Total Users",
      value: metrics.users,
      change: metrics.usersChange,
      icon: "users",
      description: "Total number of active users and visitors across all platforms and campaigns."
    },
    {
      title: "Conversions",
      value: metrics.conversions,
      change: metrics.conversionsChange,
      icon: "conversions",
      description: "Number of successful conversions including purchases, sign-ups, and other goal completions."
    },
    {
      title: "Growth Rate",
      value: metrics.growth,
      change: metrics.growthChange,
      icon: "growth",
      description: "Overall business growth percentage compared to the previous period."
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 overflow-visible">
      {metricsArray.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="overflow-visible"
        >
          <MetricCard {...metric} />
        </motion.div>
      ))}
    </div>
  );
}