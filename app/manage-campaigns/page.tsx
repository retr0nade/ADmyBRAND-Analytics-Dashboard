"use client";

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ManageCampaignsTable } from '@/components/manage-campaigns/manage-campaigns-table';
import { ManageCampaignsFilters } from '@/components/manage-campaigns/manage-campaigns-filters';
import { generateMockCampaigns } from '@/lib/mock-campaigns';
import { Campaign } from '@/lib/mock-campaigns';
import { useNotifications } from '@/lib/notification-context';
import { exportToPDF } from '@/lib/export-utils';

export default function ManageCampaignsPage() {
  const { addNotification } = useNotifications();
  const [campaigns, setCampaigns] = useState(generateMockCampaigns());
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter campaigns based on status and search query
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [campaigns, statusFilter, searchQuery]);

  // Handle campaign actions
  const handleToggleStatus = (campaignId: string) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
          : campaign
      )
    );
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
  };

  const handleUpdateCampaign = (campaignId: string, updatedData: Partial<Campaign>) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, ...updatedData }
          : campaign
      )
    );
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = generateCSVContent(filteredCampaigns);
    downloadFile(csvContent, 'campaigns.csv', 'text/csv');
    
    // Add notification
    addNotification({
      title: 'CSV Export Completed',
      message: 'Your campaign data has been exported as CSV. The file has been downloaded to your device.',
      type: 'success',
      action: {
        label: 'View Downloads',
        onClick: () => {
          console.log('Opening downloads folder...');
        },
      },
    });
  };

  const handleExportPDF = () => {
    // Use the same PDF export utility as the Reports page
    const exportData = {
      campaigns: filteredCampaigns,
      selectedCampaigns: [],
      dateRange: undefined
    };
    
    exportToPDF(exportData, addNotification);
  };

  const generateCSVContent = (campaigns: Campaign[]) => {
    const headers = ['Campaign Name', 'Status', 'Start Date', 'End Date', 'Budget', 'Spent', 'Clicks', 'Conversions', 'ROI'];
    const rows = campaigns.map(campaign => [
      campaign.name,
      campaign.status,
      format(campaign.startDate, 'MMM dd, yyyy'),
      format(campaign.endDate, 'MMM dd, yyyy'),
      `$${campaign.budget.toLocaleString()}`,
      `$${campaign.spent.toLocaleString()}`,
      campaign.clicks.toLocaleString(),
      campaign.conversions.toLocaleString(),
      `${campaign.roi}%`
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };



  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };



  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Campaigns</h1>
            <p className="text-muted-foreground mt-2">
              View and manage all your marketing campaigns
            </p>
          </div>
        </div>
        
        <ManageCampaignsFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          totalCampaigns={campaigns.length}
          filteredCount={filteredCampaigns.length}
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
        />
        
        <ManageCampaignsTable
          campaigns={filteredCampaigns}
          onToggleStatus={handleToggleStatus}
          onDeleteCampaign={handleDeleteCampaign}
          onUpdateCampaign={handleUpdateCampaign}
        />
      </div>
    </DashboardLayout>
  );
} 