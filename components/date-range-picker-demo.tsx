"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from './dashboard/date-range-picker';
import { RevenueChart } from './dashboard/charts/revenue-chart';
import { generateMockData } from '@/lib/mock-data';
import { format } from 'date-fns';

export function DateRangePickerDemo() {
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [pendingRange, setPendingRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [chartData, setChartData] = useState(() => generateMockData('last6months'));

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setPendingRange(range);
  };

  const handleApplyDateRange = () => {
    setCustomDateRange(pendingRange);
    
    // Generate new data based on the selected date range
    if (pendingRange.from && pendingRange.to) {
      const newData = generateMockData('custom', pendingRange);
      setChartData(newData);
    }
  };

  const getDateRangeText = () => {
    if (!customDateRange.from) {
      return "No date range selected";
    }
    
    if (!customDateRange.to) {
      return `From ${format(customDateRange.from, "MMM dd, yyyy")}`;
    }
    
    const days = Math.ceil((customDateRange.to.getTime() - customDateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    return `${format(customDateRange.from, "MMM dd, yyyy")} - ${format(customDateRange.to, "MMM dd, yyyy")} (${days} days)`;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Calendar Date Range Picker Demo</h2>
        <p className="text-muted-foreground">
          Select a custom date range and click Apply to see the Revenue Trend chart update with new data
        </p>
      </motion.div>

      {/* Date Range Picker */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Date Range Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-2">
            <DateRangePicker
              dateRange={pendingRange}
              onDateRangeChange={handleDateRangeChange}
            />
            <button
              onClick={handleApplyDateRange}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Apply
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Applied: <span className="font-medium text-foreground">{getDateRangeText()}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <p className="text-sm text-muted-foreground">
            Chart updates only when Apply button is clicked
          </p>
        </CardHeader>
        <CardContent>
          <RevenueChart data={chartData.charts.revenue} />
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">How it works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium">Click the date range picker</p>
              <p className="text-sm text-muted-foreground">A calendar popup will appear with two months</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium">Select your date range</p>
              <p className="text-sm text-muted-foreground">Click start date, then end date to complete the range</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium">Click Apply button</p>
              <p className="text-sm text-muted-foreground">The chart will update with data for your selected period</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
              4
            </div>
            <div>
              <p className="font-medium">Watch the chart update</p>
              <p className="text-sm text-muted-foreground">The revenue chart will show data for your selected period</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 