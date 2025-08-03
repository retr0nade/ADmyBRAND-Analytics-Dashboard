"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InsightsBanner } from './dashboard/insights-banner';
import { generateMockData } from '@/lib/mock-data';
import type { DashboardData, Campaign } from '@/lib/types';

export function InsightsBannerDemo() {
  const [currentScenario, setCurrentScenario] = useState<'positive' | 'warning' | 'negative' | 'neutral'>('positive');
  const [data, setData] = useState<DashboardData>(() => generateMockData());

  const scenarios = {
    positive: {
      title: "Positive Performance",
      description: "High revenue growth and excellent ROI",
      data: generateMockData()
    },
    warning: {
      title: "Warning Signs",
      description: "Low conversion rates and declining performance",
      data: {
        ...generateMockData(),
        metrics: {
          revenue: "₹0.8M",
          revenueChange: "-15.2%",
          users: "8500",
          usersChange: "-8.5%",
          conversions: "650",
          conversionsChange: "-12.3%",
          growth: "2.1%",
          growthChange: "-3.2%"
        },
        campaigns: generateMockData().campaigns.map(campaign => ({
          ...campaign,
          roi: Math.random() * 100 + 50, // Lower ROI
          conversions: Math.floor(campaign.conversions * 0.3), // Lower conversions
          status: campaign.status // Keep original status type
        }))
      }
    },
    negative: {
      title: "Critical Issues",
      description: "Significant revenue decline and poor performance",
      data: {
        ...generateMockData(),
        metrics: {
          revenue: "₹0.5M",
          revenueChange: "-45.8%",
          users: "4200",
          usersChange: "-25.3%",
          conversions: "280",
          conversionsChange: "-35.7%",
          growth: "-5.2%",
          growthChange: "-8.9%"
        },
        campaigns: generateMockData().campaigns.map(campaign => ({
          ...campaign,
          status: Math.random() > 0.7 ? 'active' as const : 'paused' as const,
          roi: Math.random() * 80 + 30, // Very low ROI
          conversions: Math.floor(campaign.conversions * 0.2) // Very low conversions
        }))
      }
    },
    neutral: {
      title: "Stable Performance",
      description: "Consistent performance with room for improvement",
      data: {
        ...generateMockData(),
        metrics: {
          revenue: "₹1.1M",
          revenueChange: "2.3%",
          users: "11800",
          usersChange: "1.8%",
          conversions: "980",
          conversionsChange: "3.1%",
          growth: "4.5%",
          growthChange: "0.8%"
        }
      }
    }
  };

  const handleScenarioChange = (scenario: keyof typeof scenarios) => {
    setCurrentScenario(scenario);
    setData(scenarios[scenario].data);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Dynamic Insights Banner Demo</h2>
        <p className="text-muted-foreground">
          See how the insights banner adapts to different performance scenarios
        </p>
      </motion.div>

      {/* Scenario Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <Button
            key={key}
            variant={currentScenario === key ? "default" : "outline"}
            onClick={() => handleScenarioChange(key as keyof typeof scenarios)}
            className="capitalize"
          >
            {scenario.title}
          </Button>
        ))}
      </div>

      {/* Current Scenario Info */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {scenarios[currentScenario].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            {scenarios[currentScenario].description}
          </p>
          
          {/* Insights Banner */}
          <InsightsBanner 
            campaigns={data.campaigns} 
            metrics={data.metrics} 
          />
          
          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>💡 The banner automatically analyzes your data and provides relevant insights</p>
            <p>🎨 Different colors indicate performance levels (green=positive, yellow=warning, red=negative)</p>
            <p>❌ Click the X to dismiss the banner</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 