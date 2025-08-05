"use client";

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ManageCampaignsTable } from '@/components/manage-campaigns/manage-campaigns-table';
import { ManageCampaignsFilters } from '@/components/manage-campaigns/manage-campaigns-filters';
import { generateMockCampaigns } from '@/lib/mock-campaigns';
import { Campaign } from '@/lib/mock-campaigns';

export default function ManageCampaignsPage() {
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
  };

  const handleExportPDF = () => {
    generatePDFContent(filteredCampaigns);
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

  const generatePDFContent = (campaigns: Campaign[]) => {
    // Create a simple HTML table for PDF generation
    const tableHTML = `
      <html>
        <head>
          <title>Campaigns Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Campaigns Report</h1>
          <p>Generated on: ${format(new Date(), 'MMM dd, yyyy HH:mm')}</p>
          <table>
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Clicks</th>
                <th>Conversions</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
              ${campaigns.map(campaign => `
                <tr>
                  <td>${campaign.name}</td>
                  <td>${campaign.status}</td>
                  <td>${format(campaign.startDate, 'MMM dd, yyyy')}</td>
                  <td>${format(campaign.endDate, 'MMM dd, yyyy')}</td>
                  <td>$${campaign.budget.toLocaleString()}</td>
                  <td>$${campaign.spent.toLocaleString()}</td>
                  <td>${campaign.clicks.toLocaleString()}</td>
                  <td>${campaign.conversions.toLocaleString()}</td>
                  <td>${campaign.roi}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Open in new window for printing/saving as PDF
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(tableHTML);
      newWindow.document.close();
      newWindow.print();
    }
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