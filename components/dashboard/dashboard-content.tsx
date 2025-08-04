"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MetricsOverview } from './metrics-overview';
import { ChartsSection } from './charts-section';
import { CampaignsTable } from './campaigns-table';
import { TopCampaignsLeaderboard } from './top-campaigns-leaderboard';
import { PageHeader } from './page-header';
import { InsightsBanner } from './insights-banner';
import { SettingsPanel, useDashboardSettings } from './settings-panel';
import { Skeleton } from '@/components/ui/skeleton';
import { generateMockData } from '@/lib/mock-data';
import type { DashboardData, DateRange } from '@/lib/types';

export function DashboardContent() {
  const { settings, updateSettings } = useDashboardSettings();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>(settings.defaultDateRange);
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  // Update date range when settings change
  useEffect(() => {
    setDateRange(settings.defaultDateRange);
  }, [settings.defaultDateRange]);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const customRange = customDateRange.from && customDateRange.to ? customDateRange : undefined;
        setData(generateMockData(dateRange, customRange));
        setIsLoading(false);
      }, 1500);
    };
    loadData();

    // Real-time updates every 10 seconds (only when auto-refresh is enabled and not using custom date range)
    if (settings.autoRefreshEnabled) {
      const interval = setInterval(() => {
        if (!customDateRange.from || !customDateRange.to) {
          const customRange = customDateRange.from && customDateRange.to ? customDateRange : undefined;
          setData(generateMockData(dateRange, customRange));
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [dateRange, customDateRange, settings.autoRefreshEnabled]);

  const handleCustomDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setCustomDateRange(range);
    if (range.from && range.to) {
      setDateRange('custom');
    }
  };

  const handleSettingsChange = (newSettings: any) => {
    updateSettings(newSettings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: settings.animationsEnabled ? 0.5 : 0 }}
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

      {/* Settings Panel */}
      <div className="flex justify-end">
        <SettingsPanel
          onSettingsChange={handleSettingsChange}
          currentSettings={settings}
        />
      </div>

      {/* Dynamic Insights Banner */}
      <InsightsBanner
        campaigns={data?.campaigns}
        metrics={data?.metrics}
        isLoading={isLoading}
        animationsEnabled={settings.animationsEnabled}
      />

      <MetricsOverview metrics={data?.metrics} isLoading={isLoading} />

      <ChartsSection
        chartData={data?.charts}
        isLoading={isLoading}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        customDateRange={customDateRange}
        onCustomDateRangeChange={handleCustomDateRangeChange}
      />

      <TopCampaignsLeaderboard campaigns={data?.campaigns} isLoading={isLoading} animationsEnabled={settings.animationsEnabled} />

      <CampaignsTable campaigns={data?.campaigns} isLoading={isLoading} />
    </motion.div>
  );
}