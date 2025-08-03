"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DateRangePicker } from './date-range-picker';
import { RevenueChart } from './charts/revenue-chart';
import { ConversionsChart } from './charts/conversions-chart';
import { UserDistributionChart } from './charts/user-distribution-chart';
import type { ChartData, DateRange } from '@/lib/types';

interface ChartsSectionProps {
  chartData?: ChartData;
  isLoading: boolean;
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  customDateRange?: { from: Date | undefined; to: Date | undefined };
  onCustomDateRangeChange?: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

export function ChartsSection({ 
  chartData, 
  isLoading, 
  dateRange, 
  onDateRangeChange,
  customDateRange,
  onCustomDateRangeChange
}: ChartsSectionProps) {
  const [localCustomRange, setLocalCustomRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [pendingRange, setPendingRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  const handleCustomDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setPendingRange(range);
  };

  const handleApplyDateRange = () => {
    setLocalCustomRange(pendingRange);
    if (onCustomDateRangeChange) {
      onCustomDateRangeChange(pendingRange);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28 mb-2" />
              <Skeleton className="h-4 w-36" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Analytics Overview</h2>
        <div className="text-center py-8 text-muted-foreground">
          No chart data available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Analytics Overview</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Trend</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Revenue performance over time
                </p>
              </div>
              <div className="flex gap-2">
                <DateRangePicker
                  dateRange={pendingRange}
                  onDateRangeChange={handleCustomDateRangeChange}
                />
                <button
                  onClick={handleApplyDateRange}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart data={chartData.revenue} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Traffic sources breakdown
            </p>
          </CardHeader>
          <CardContent>
            <UserDistributionChart data={chartData.userDistribution} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Monthly Conversions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Conversion metrics across different campaigns
            </p>
          </CardHeader>
          <CardContent>
            <ConversionsChart data={chartData.conversions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}