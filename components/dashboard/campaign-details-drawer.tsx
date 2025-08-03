"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Target, 
  MousePointer, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  BarChart3,
  Users,
  Activity
} from 'lucide-react';
import type { Campaign } from '@/lib/types';

interface CampaignDetailsDrawerProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CampaignDetails extends Campaign {
  description: string;
  startDate: string;
  endDate: string;
  budget: string;
  targetAudience: string;
  platform: string;
  adType: string;
  impressions: number;
  ctr: number;
  cpc: number;
  spend: number;
}

export function CampaignDetailsDrawer({ campaign, isOpen, onClose }: CampaignDetailsDrawerProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  if (!campaign) return null;

  // Generate detailed campaign information
  const campaignDetails: CampaignDetails = {
    ...campaign,
    description: `This campaign focuses on ${campaign.name.toLowerCase()} to drive engagement and conversions. The strategy includes targeted advertising across multiple channels with optimized messaging for maximum ROI.`,
    startDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    budget: `₹${(Math.random() * 50000 + 10000).toFixed(0)}`,
    targetAudience: ['Young Professionals', 'Tech Enthusiasts', 'Small Business Owners'][Math.floor(Math.random() * 3)],
    platform: ['Facebook', 'Google Ads', 'Instagram', 'LinkedIn'][Math.floor(Math.random() * 4)],
    adType: ['Display', 'Video', 'Carousel', 'Story'][Math.floor(Math.random() * 4)],
    impressions: Math.floor(campaign.clicks * (Math.random() * 10 + 5)),
    ctr: parseFloat(((campaign.clicks / (campaign.clicks * (Math.random() * 10 + 5))) * 100).toFixed(2)),
    cpc: parseFloat((Math.random() * 50 + 10).toFixed(2)),
    spend: parseFloat((campaign.clicks * (Math.random() * 50 + 10)).toFixed(0))
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4" />;
      case 'paused':
        return <BarChart3 className="h-4 w-4" />;
      case 'completed':
        return <Target className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="h-[85vh]">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="text-xl font-bold">
                  {campaignDetails.name}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-muted-foreground mt-1">
                  Campaign Details & Performance
                </DrawerDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DrawerHeader>

          <div className="px-4 pb-4 space-y-6 overflow-y-auto max-h-[calc(85vh-120px)]">
            {/* Status and Basic Info */}
            <div className="flex items-center justify-between">
              <Badge className={`${getStatusColor(campaignDetails.status)} flex items-center gap-1`}>
                {getStatusIcon(campaignDetails.status)}
                {campaignDetails.status.charAt(0).toUpperCase() + campaignDetails.status.slice(1)}
              </Badge>
              <div className="text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 inline mr-1" />
                {campaignDetails.startDate} - {campaignDetails.endDate}
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Campaign Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {campaignDetails.description}
                </p>
              </CardContent>
            </Card>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaignDetails.clicks.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Clicks</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Conversions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaignDetails.conversions.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Conversions</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {campaignDetails.roi}%
                  </div>
                  <div className="text-xs text-muted-foreground">Return on Investment</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaignDetails.budget}</div>
                  <div className="text-xs text-muted-foreground">Total Budget</div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Campaign Details</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">Platform</span>
                  <span className="text-sm text-muted-foreground">{campaignDetails.platform}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">Ad Type</span>
                  <span className="text-sm text-muted-foreground">{campaignDetails.adType}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">Target Audience</span>
                  <span className="text-sm text-muted-foreground">{campaignDetails.targetAudience}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">Impressions</span>
                  <span className="text-sm text-muted-foreground">{campaignDetails.impressions.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">CTR</span>
                  <span className="text-sm text-muted-foreground">{campaignDetails.ctr}%</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">CPC</span>
                  <span className="text-sm text-muted-foreground">₹{campaignDetails.cpc}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">Total Spend</span>
                  <span className="text-sm text-muted-foreground">₹{campaignDetails.spend.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="pt-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Close
              </Button>
              <Button className="flex-1">
                Edit Campaign
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 