"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
  const [showProjection, setShowProjection] = useState(true);
  const [showCurrentYear, setShowCurrentYear] = useState(true);
  const [showPreviousYear, setShowPreviousYear] = useState(true);

  // Determine if projections should be shown based on date range
  const shouldShowProjection = () => {
    const currentDate = new Date();
    const effectiveRange = localCustomRange.from && localCustomRange.to ? localCustomRange : null;
    
    if (effectiveRange) {
      // If custom date range is set, check if it extends to current date or future
      const rangeEnd = effectiveRange.to;
      if (rangeEnd && rangeEnd < currentDate) {
        // Historical range - don't show projections
        return false;
      }
    }
    
    return showProjection;
  };

  // Check if projections are disabled due to historical date range
  const isProjectionDisabledByDateRange = () => {
    const currentDate = new Date();
    const effectiveRange = localCustomRange.from && localCustomRange.to ? localCustomRange : null;
    
    if (effectiveRange) {
      const rangeEnd = effectiveRange.to;
      return rangeEnd && rangeEnd < currentDate;
    }
    
    return false;
  };

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
          <CardContent className="space-y-4">
            <RevenueChart 
              data={chartData.revenue} 
              showProjection={shouldShowProjection()} 
              showCurrentYear={showCurrentYear}
              showPreviousYear={showPreviousYear}
            />
            
            {/* Chart Controls */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="current-year"
                    checked={showCurrentYear}
                    onCheckedChange={setShowCurrentYear}
                  />
                  <Label htmlFor="current-year" className="text-sm font-medium flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Current Year
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="previous-year"
                    checked={showPreviousYear}
                    onCheckedChange={setShowPreviousYear}
                  />
                  <Label htmlFor="previous-year" className="text-sm font-medium flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    Previous Year
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-projection"
                    checked={showProjection && !isProjectionDisabledByDateRange()}
                    onCheckedChange={setShowProjection}
                    disabled={isProjectionDisabledByDateRange()}
                  />
                  <Label 
                    htmlFor="ai-projection" 
                    className={`text-sm font-medium flex items-center gap-2 ${isProjectionDisabledByDateRange() ? 'text-muted-foreground' : ''}`}
                  >
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    AI Projections
                    {isProjectionDisabledByDateRange() && (
                      <span className="text-xs text-muted-foreground ml-1">
                        (Historical view)
                      </span>
                    )}
                  </Label>
                </div>
              </div>
            </div>
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