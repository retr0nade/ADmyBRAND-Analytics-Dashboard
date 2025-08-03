"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MetricsOverview } from './metrics-overview';
import { ChartsSection } from './charts-section';
import { CampaignsTable } from './campaigns-table';
import { PageHeader } from './page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { generateMockData } from '@/lib/mock-data';
import type { DashboardData, DateRange } from '@/lib/types';

export function DashboardContent() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('last6months');

  useEffect(() => {
    // Initial data load
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setData(generateMockData(dateRange));
        setIsLoading(false);
      }, 1500); // Updated to 1.5 seconds
    };

    loadData();

    // Real-time updates every 10 seconds
    const interval = setInterval(() => {
      setData(generateMockData(dateRange));
    }, 10000);

    return () => clearInterval(interval);
  }, [dateRange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 overflow-visible"
    >
      {isLoading ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      ) : (
        <PageHeader campaigns={data?.campaigns} />
      )}
      
      <MetricsOverview metrics={data?.metrics} isLoading={isLoading} />
      
      <ChartsSection 
        chartData={data?.charts} 
        isLoading={isLoading}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      
      <CampaignsTable campaigns={data?.campaigns} isLoading={isLoading} />
    </motion.div>
  );
}