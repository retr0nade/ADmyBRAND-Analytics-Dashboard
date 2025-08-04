"use client";

import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useNotifications } from '@/lib/notification-context';
import type { Campaign } from '@/lib/types';

interface PageHeaderProps {
  campaigns?: Campaign[];
}

export function PageHeader({ campaigns }: PageHeaderProps) {
  const { addNotification } = useNotifications();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    window.location.reload();
  };

  const handleExport = () => {
    if (!campaigns || campaigns.length === 0) {
      console.warn('No campaign data available for export');
      return;
    }

    // Create CSV header
    const csvHeaders = ['Campaign Name', 'Status', 'Clicks', 'Conversions', 'ROI %'];
    
    // Create CSV data rows from complete campaign dataset
    const csvData = campaigns.map(campaign => [
      campaign.name,
      campaign.status,
      campaign.clicks.toLocaleString(),
      campaign.conversions.toLocaleString(),
      `${campaign.roi}%`
    ]);

    // Combine headers and data
    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admybrand-campaigns-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    // Add notification
    addNotification({
      title: 'CSV Export Completed',
      message: 'Your dashboard campaign data has been exported as CSV. The file has been downloaded to your device.',
      type: 'success',
      action: {
        label: 'View Downloads',
        onClick: () => {
          console.log('Opening downloads folder...');
        },
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Marketing Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your campaigns performance and optimize your marketing strategy
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        
        <Button 
          onClick={handleExport} 
          className="gap-2"
          disabled={!campaigns || campaigns.length === 0}
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}