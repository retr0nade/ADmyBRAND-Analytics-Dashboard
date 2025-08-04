"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, RotateCcw, Palette, BarChart3, Zap } from 'lucide-react';
import type { DateRange } from '@/lib/types';

interface DashboardSettings {
  animationsEnabled: boolean;
  defaultDateRange: DateRange;
  autoRefreshEnabled: boolean;
  themePreference: 'system' | 'light' | 'dark';
}

interface SettingsPanelProps {
  onSettingsChange: (settings: DashboardSettings) => void;
  currentSettings: DashboardSettings;
}

const DEFAULT_SETTINGS: DashboardSettings = {
  animationsEnabled: true,
  defaultDateRange: 'last6months',
  autoRefreshEnabled: true,
  themePreference: 'system',
};

export function SettingsPanel({ onSettingsChange, currentSettings }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<DashboardSettings>(currentSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(currentSettings));
  }, [settings, currentSettings]);

  const handleSettingChange = (key: keyof DashboardSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSettingsChange(settings);
    localStorage.setItem('dashboard-settings', JSON.stringify(settings));
    setIsOpen(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setHasChanges(true);
  };

  const handleCancel = () => {
    setSettings(currentSettings);
    setHasChanges(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Dashboard Settings
          </DialogTitle>
          <DialogDescription>
            Configure your dashboard preferences and appearance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Animations Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Animations & Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Enable Animations</Label>
                  <p className="text-xs text-muted-foreground">
                    Smooth transitions and motion effects
                  </p>
                </div>
                <Switch
                  id="animations"
                  checked={settings.animationsEnabled}
                  onCheckedChange={(checked) => handleSettingChange('animationsEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Chart Preferences Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Chart Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-date-range">Default Date Range</Label>
                <Select
                  value={settings.defaultDateRange}
                  onValueChange={(value: DateRange) => handleSettingChange('defaultDateRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select default date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last6months">Last 6 Months</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-refresh">Auto Refresh</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically update data every 10 seconds
                  </p>
                </div>
                <Switch
                  id="auto-refresh"
                  checked={settings.autoRefreshEnabled}
                  onCheckedChange={(checked) => handleSettingChange('autoRefreshEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme-preference">Theme Preference</Label>
                <Select
                  value={settings.themePreference}
                  onValueChange={(value: 'system' | 'light' | 'dark') => handleSettingChange('themePreference', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System Default</SelectItem>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Default
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Hook to manage settings
export function useDashboardSettings() {
  const [settings, setSettings] = useState<DashboardSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboard-settings');
      if (saved) {
        try {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
        } catch {
          return DEFAULT_SETTINGS;
        }
      }
    }
    return DEFAULT_SETTINGS;
  });

  const updateSettings = (newSettings: DashboardSettings) => {
    setSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard-settings', JSON.stringify(newSettings));
    }
  };

  return { settings, updateSettings };
} 