"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../dashboard/sidebar';
import { TopNavbar } from '../dashboard/top-navbar';
import { ReportsFilterBar } from './reports-filter-bar';
import { CampaignComparisonTable } from './campaign-comparison-table';
import { CampaignInsights } from './campaign-insights';
import { generateMockData } from '@/lib/mock-data';
import type { Campaign, DateRange } from '@/lib/types';

interface ReportsPageProps {}

export function ReportsPage({}: ReportsPageProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockData = generateMockData('last6months');
        setData(mockData);
        setIsLoading(false);
      }, 1000);
    };
    loadData();
  }, []);

  const handleDownloadReport = (format: 'PDF' | 'CSV') => {
    // Mock download functionality
    console.log(`Downloading ${format} report for campaigns:`, selectedCampaigns);
    // In a real app, this would trigger an API call to generate and download the report
  };

  const handleCampaignSelection = (campaignIds: string[]) => {
    setSelectedCampaigns(campaignIds);
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-72">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="h-16 bg-muted rounded-lg animate-pulse" />
              <div className="h-96 bg-muted rounded-lg animate-pulse" />
              <div className="h-64 bg-muted rounded-lg animate-pulse" />
            </motion.div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Reports</h1>
                <p className="text-muted-foreground mt-2">
                  Detailed analytics and performance insights for your campaigns
                </p>
              </div>
            </div>

            {/* Filter Bar */}
            <ReportsFilterBar
              campaigns={data?.campaigns || []}
              selectedCampaigns={selectedCampaigns}
              dateRange={dateRange}
              onCampaignSelection={handleCampaignSelection}
              onDateRangeChange={handleDateRangeChange}
              onDownloadReport={handleDownloadReport}
            />

            {/* Campaign Comparison Table */}
            <CampaignComparisonTable
              campaigns={data?.campaigns || []}
              selectedCampaigns={selectedCampaigns}
              isLoading={isLoading}
            />

            {/* Campaign Insights */}
            <CampaignInsights
              campaigns={data?.campaigns || []}
              selectedCampaigns={selectedCampaigns}
              isLoading={isLoading}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
} 