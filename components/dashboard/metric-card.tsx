"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp,
  ArrowUpIcon,
  ArrowDownIcon,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  description?: string;
}

const iconMap = {
  revenue: DollarSign,
  users: Users,
  conversions: Target,
  growth: TrendingUp,
};

const colorMap = {
  revenue: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  users: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  conversions: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  growth: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
};

export function MetricCard({ title, value, change, icon, description }: MetricCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap];
  const isPositive = change.startsWith('+');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!description) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left,
      y: rect.top - 10
    });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  
  return (
    <>
      <Card className="relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            {description && (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="cursor-help"
              >
                <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
              </div>
            )}
          </div>
          <div className={cn("rounded-lg p-2", colorMap[icon as keyof typeof colorMap])}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="flex items-center gap-1 mt-1">
            {isPositive ? (
              <ArrowUpIcon className="h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDownIcon className="h-3 w-3 text-red-500" />
            )}
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs",
                isPositive ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "text-red-600 bg-red-50 dark:bg-red-950"
              )}
            >
              {change}
            </Badge>
            <span className="text-xs text-muted-foreground ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
      
      {showTooltip && description && (
        <div
          className="fixed z-[9999] bg-popover text-popover-foreground px-3 py-1.5 text-sm rounded-md border shadow-md max-w-xs"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateY(-100%)'
          }}
        >
          {description}
        </div>
      )}
    </>
  );
}