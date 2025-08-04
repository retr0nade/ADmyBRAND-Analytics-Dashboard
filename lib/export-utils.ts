import type { Campaign } from './types';

interface ExportData {
  campaigns: Campaign[];
  dateRange?: { from: Date | undefined; to: Date | undefined };
  selectedCampaigns: string[];
}

// Type for notification callback
export type NotificationCallback = (notification: {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
}) => void;

// CSV Export Function
export function exportToCSV(data: ExportData, onNotification?: NotificationCallback): void {
  const { campaigns, selectedCampaigns, dateRange } = data;
  
  // If no campaigns are selected, export all campaigns
  const campaignsToExport = selectedCampaigns.length > 0 
    ? campaigns.filter(c => selectedCampaigns.includes(c.id))
    : campaigns;

  // Don't export if no campaigns available
  if (campaignsToExport.length === 0) {
    console.warn('No campaigns available for export');
    return;
  }

  // Generate CSV content
  const headers = [
    'Campaign Name',
    'Status',
    'Clicks',
    'Conversions',
    'ROI (%)',
    'CTR (%)',
    'Cost per Conversion (₹)',
    'Impressions',
    'Conversion Rate (%)'
  ];

  const rows = campaignsToExport.map(campaign => {
    const impressions = campaign.clicks * (Math.random() * 10 + 5);
    const ctr = (campaign.clicks / impressions) * 100;
    const costPerConversion = campaign.clicks * (Math.random() * 50 + 10) / campaign.conversions;
    const conversionRate = (campaign.conversions / campaign.clicks) * 100;

    return [
      campaign.name,
      campaign.status,
      campaign.clicks.toLocaleString(),
      campaign.conversions.toLocaleString(),
      campaign.roi.toFixed(1),
      ctr.toFixed(2),
      costPerConversion.toFixed(0),
      impressions.toLocaleString(),
      conversionRate.toFixed(2)
    ];
  });

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  const dateRangeText = dateRange?.from && dateRange?.to 
    ? `_${dateRange.from.toISOString().split('T')[0]}_to_${dateRange.to.toISOString().split('T')[0]}`
    : '';
  
  link.setAttribute('href', url);
  link.setAttribute('download', `campaign_reports${dateRangeText}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Add notification if callback provided
  if (onNotification) {
    onNotification({
      title: 'CSV Export Completed',
      message: `Your campaign data has been exported as CSV. The file has been downloaded to your device.`,
      type: 'success',
      action: {
        label: 'View Downloads',
        onClick: () => {
          console.log('Opening downloads folder...');
        },
      },
    });
  }
}

// PDF Export Function
export function exportToPDF(data: ExportData, onNotification?: NotificationCallback): void {
  const { campaigns, selectedCampaigns, dateRange } = data;
  
  // If no campaigns are selected, export all campaigns
  const campaignsToExport = selectedCampaigns.length > 0 
    ? campaigns.filter(c => selectedCampaigns.includes(c.id))
    : campaigns;

  // Don't export if no campaigns available
  if (campaignsToExport.length === 0) {
    console.warn('No campaigns available for export');
    return;
  }

  // Create PDF content using jsPDF
  import('jspdf').then(({ default: jsPDF }) => {
    import('jspdf-autotable').then(({ default: autoTable }) => {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Campaign Performance Report', 14, 22);
      
      // Add date range if specified
      if (dateRange?.from && dateRange?.to) {
        doc.setFontSize(12);
        doc.text(`Date Range: ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`, 14, 32);
      }
      
      // Add generation date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 42);
      
      // Prepare table data
      const tableData = campaignsToExport.map(campaign => {
        const impressions = campaign.clicks * (Math.random() * 10 + 5);
        const ctr = (campaign.clicks / impressions) * 100;
        const costPerConversion = campaign.clicks * (Math.random() * 50 + 10) / campaign.conversions;
        const conversionRate = (campaign.conversions / campaign.clicks) * 100;

        return [
          campaign.name,
          campaign.status,
          campaign.clicks.toLocaleString(),
          campaign.conversions.toLocaleString(),
          `${campaign.roi.toFixed(1)}%`,
          `${ctr.toFixed(2)}%`,
          `₹${costPerConversion.toFixed(0)}`,
          impressions.toLocaleString(),
          `${conversionRate.toFixed(2)}%`
        ];
      });

      // Add table
      autoTable(doc, {
        head: [['Campaign', 'Status', 'Clicks', 'Conversions', 'ROI', 'CTR', 'Cost/Conv', 'Impressions', 'Conv Rate']],
        body: tableData,
        startY: 50,
        styles: {
          fontSize: 8,
          cellPadding: 2
        },
        headStyles: {
          fillColor: [66, 139, 202],
          textColor: 255
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      });

      // Add summary
      const totalClicks = campaignsToExport.reduce((sum, c) => sum + c.clicks, 0);
      const totalConversions = campaignsToExport.reduce((sum, c) => sum + c.conversions, 0);
      const avgROI = campaignsToExport.reduce((sum, c) => sum + c.roi, 0) / campaignsToExport.length;

      const summaryY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text('Summary:', 14, summaryY);
      doc.setFontSize(10);
      doc.text(`Total Campaigns: ${campaignsToExport.length}`, 14, summaryY + 8);
      doc.text(`Total Clicks: ${totalClicks.toLocaleString()}`, 14, summaryY + 16);
      doc.text(`Total Conversions: ${totalConversions.toLocaleString()}`, 14, summaryY + 24);
      doc.text(`Average ROI: ${avgROI.toFixed(1)}%`, 14, summaryY + 32);

      // Save PDF
      const dateRangeText = dateRange?.from && dateRange?.to 
        ? `_${dateRange.from.toISOString().split('T')[0]}_to_${dateRange.to.toISOString().split('T')[0]}`
        : '';
      
      doc.save(`campaign_reports${dateRangeText}.pdf`);
      
      // Add notification if callback provided
      if (onNotification) {
        onNotification({
          title: 'PDF Export Completed',
          message: `Your campaign data has been exported as PDF. The file has been downloaded to your device.`,
          type: 'success',
          action: {
            label: 'View Downloads',
            onClick: () => {
              console.log('Opening downloads folder...');
            },
          },
        });
      }
    });
  });
}

// Helper function to format date for filenames
export function formatDateForFilename(date: Date): string {
  return date.toISOString().split('T')[0];
} 