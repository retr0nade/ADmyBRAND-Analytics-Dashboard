"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  MoreHorizontal,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Campaign } from '@/lib/mock-campaigns';
import { CampaignEditModal } from './campaign-edit-modal';

interface ManageCampaignsTableProps {
  campaigns: Campaign[];
  onToggleStatus: (campaignId: string) => void;
  onDeleteCampaign: (campaignId: string) => void;
  onUpdateCampaign: (campaignId: string, updatedData: Partial<Campaign>) => void;
}

export function ManageCampaignsTable({
  campaigns,
  onToggleStatus,
  onDeleteCampaign,
  onUpdateCampaign,
}: ManageCampaignsTableProps) {
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
  };

  const handleSaveEdit = (updatedData: Partial<Campaign>) => {
    if (editingCampaign) {
      onUpdateCampaign(editingCampaign.id, updatedData);
      setEditingCampaign(null);
    }
  };

  const handleDelete = (campaignId: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      onDeleteCampaign(campaignId);
    }
  };

  const getStatusBadge = (status: Campaign['status']) => {
    const variants = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    
    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (campaigns.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-muted p-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No campaigns found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or create a new campaign.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {campaign.clicks.toLocaleString()} clicks • {campaign.conversions.toLocaleString()} conversions
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(campaign.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(campaign.startDate, 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(campaign.endDate, 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{formatCurrency(campaign.budget)}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(campaign.spent)} spent
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(campaign)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit campaign</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onToggleStatus(campaign.id)}
                          disabled={campaign.status === 'completed'}
                          className={`h-8 w-8 p-0 ${campaign.status === 'completed' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {campaign.status === 'active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {campaign.status === 'active' ? 'Pause' : campaign.status === 'completed' ? 'Completed' : 'Resume'} campaign
                          </span>
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onToggleStatus(campaign.id)}
                              disabled={campaign.status === 'completed'}
                              className={`${campaign.status === 'completed' ? 'text-muted-foreground cursor-not-allowed' : 'text-orange-600'}`}
                            >
                              {campaign.status === 'active' ? (
                                <Pause className="mr-2 h-4 w-4" />
                              ) : campaign.status === 'completed' ? (
                                <Play className="mr-2 h-4 w-4 opacity-50" />
                              ) : (
                                <Play className="mr-2 h-4 w-4" />
                              )}
                              {campaign.status === 'active' ? 'Pause' : campaign.status === 'completed' ? 'Completed' : 'Resume'}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(campaign.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingCampaign && (
        <CampaignEditModal
          campaign={editingCampaign}
          onSave={handleSaveEdit}
          onCancel={() => setEditingCampaign(null)}
        />
      )}
    </>
  );
} 