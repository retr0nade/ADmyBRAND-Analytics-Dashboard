"use client";

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ManageCampaignsTable } from '@/components/manage-campaigns/manage-campaigns-table';
import { ManageCampaignsFilters } from '@/components/manage-campaigns/manage-campaigns-filters';
import { PageHeader } from '@/components/dashboard/page-header';
import { generateMockCampaigns } from '@/lib/mock-campaigns';

export default function ManageCampaignsPage() {
  const [campaigns, setCampaigns] = useState(generateMockCampaigns());
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Manage Campaigns"
          description="View and manage all your marketing campaigns"
        />
        
        <ManageCampaignsFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          totalCampaigns={campaigns.length}
          filteredCount={filteredCampaigns.length}
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