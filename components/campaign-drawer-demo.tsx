"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignDetailsDrawer } from './dashboard/campaign-details-drawer';
import { generateMockData } from '@/lib/mock-data';
import type { Campaign } from '@/lib/types';

export function CampaignDrawerDemo() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [demoCampaigns] = useState(() => generateMockData().campaigns.slice(0, 3));

  const handleOpenDrawer = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Campaign Details Drawer Demo</h2>
        <p className="text-muted-foreground">
          Click on any campaign to view detailed information in a slide-in drawer
        </p>
      </motion.div>

      {/* Campaign Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {demoCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ROI: {campaign.roi}%
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Clicks:</span>
                    <span className="font-medium">{campaign.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conversions:</span>
                    <span className="font-medium">{campaign.conversions.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleOpenDrawer(campaign)}
                  className="w-full mt-4"
                  variant="outline"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">How it works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium">Click on any campaign card above</p>
              <p className="text-sm text-muted-foreground">The drawer will slide in from the right</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium">View detailed campaign information</p>
              <p className="text-sm text-muted-foreground">See metrics, performance data, and campaign details</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium">Close the drawer</p>
              <p className="text-sm text-muted-foreground">Click the X button, click outside, or press Escape</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Details Drawer */}
      <CampaignDetailsDrawer
        campaign={selectedCampaign}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
} 