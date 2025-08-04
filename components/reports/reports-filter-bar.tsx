"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '../dashboard/date-range-picker';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Download, 
  FileText, 
  Filter,
  X,
  Calendar,
  BarChart3
} from 'lucide-react';
import type { Campaign } from '@/lib/types';

interface ReportsFilterBarProps {
  campaigns: Campaign[];
  selectedCampaigns: string[];
  dateRange: { from: Date | undefined; to: Date | undefined };
  onCampaignSelection: (campaignIds: string[]) => void;
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  onDownloadReport: (format: 'PDF' | 'CSV') => void;
}

export function ReportsFilterBar({
  campaigns,
  selectedCampaigns,
  dateRange,
  onCampaignSelection,
  onDateRangeChange,
  onDownloadReport
}: ReportsFilterBarProps) {
  const [isCampaignDropdownOpen, setIsCampaignDropdownOpen] = useState(false);

  const handleCampaignToggle = (campaignId: string) => {
    const newSelection = selectedCampaigns.includes(campaignId)
      ? selectedCampaigns.filter(id => id !== campaignId)
      : [...selectedCampaigns, campaignId];
    onCampaignSelection(newSelection);
  };

  const handleSelectAll = () => {
    onCampaignSelection(campaigns.map(c => c.id));
  };

  const handleClearAll = () => {
    onCampaignSelection([]);
  };

  const selectedCampaignsData = campaigns.filter(c => selectedCampaigns.includes(c.id));

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Left side - Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Date Range Picker */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
              />
            </div>

            {/* Campaign Multi-Select */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsCampaignDropdownOpen(!isCampaignDropdownOpen)}
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Campaigns ({selectedCampaigns.length})
                <Filter className="h-4 w-4" />
              </Button>

              {isCampaignDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-80 bg-background border rounded-lg shadow-lg z-50 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Select Campaigns</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSelectAll}
                        className="text-xs"
                      >
                        Select All
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearAll}
                        className="text-xs"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-center space-x-2 p-2 rounded hover:bg-accent"
                      >
                        <Checkbox
                          id={campaign.id}
                          checked={selectedCampaigns.includes(campaign.id)}
                          onCheckedChange={() => handleCampaignToggle(campaign.id)}
                        />
                        <label
                          htmlFor={campaign.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                        >
                          {campaign.name}
                        </label>
                        <Badge variant="outline" className="text-xs">
                          {campaign.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right side - Download buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onDownloadReport('CSV')}
              className="gap-2"
              disabled={selectedCampaigns.length === 0}
            >
              <FileText className="h-4 w-4" />
              Download CSV
            </Button>
            <Button
              onClick={() => onDownloadReport('PDF')}
              className="gap-2"
              disabled={selectedCampaigns.length === 0}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Selected campaigns display */}
        {selectedCampaigns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Selected Campaigns:</span>
              <Badge variant="secondary">{selectedCampaigns.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCampaignsData.map((campaign) => (
                <Badge
                  key={campaign.id}
                  variant="outline"
                  className="gap-1"
                >
                  {campaign.name}
                  <button
                    onClick={() => handleCampaignToggle(campaign.id)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
} 