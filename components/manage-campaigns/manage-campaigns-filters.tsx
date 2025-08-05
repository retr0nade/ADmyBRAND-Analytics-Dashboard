"use client";

import { Search, Filter, Download, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ManageCampaignsFiltersProps {
  statusFilter: 'all' | 'active' | 'paused' | 'completed';
  onStatusFilterChange: (status: 'all' | 'active' | 'paused' | 'completed') => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  totalCampaigns: number;
  filteredCount: number;
  onExportCSV: () => void;
  onExportPDF: () => void;
}

export function ManageCampaignsFilters({
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
  totalCampaigns,
  filteredCount,
  onExportCSV,
  onExportPDF,
}: ManageCampaignsFiltersProps) {
  return (
    <Card>
      <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Left side - Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={(value) => onStatusFilterChange(value as 'all' | 'active' | 'paused' | 'completed')}>
              <SelectTrigger className="w-full sm:w-48">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right side - Export buttons and campaign count */}
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              {filteredCount} of {totalCampaigns} campaigns
            </Badge>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onExportCSV}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Download CSV
              </Button>
              <Button
                onClick={onExportPDF}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 