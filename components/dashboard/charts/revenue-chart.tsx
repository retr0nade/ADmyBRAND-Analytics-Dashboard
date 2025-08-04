"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

interface RevenueChartProps {
  data: Array<{
    month: string;
    revenue: number | null;
    previousYear: number | null;
    projection?: number;
  }>;
  showProjection?: boolean;
  showCurrentYear?: boolean;
  showPreviousYear?: boolean;
}

export function RevenueChart({ data, showProjection = true, showCurrentYear = true, showPreviousYear = true }: RevenueChartProps) {
  const { theme } = useTheme();
  
  // Custom tooltip for projection
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => {
            // Skip null values in tooltip
            if (entry.value === null || entry.value === undefined) return null;
            
            return (
              <p key={index} className="text-sm text-muted-foreground">
                <span style={{ color: entry.color }}>●</span> {entry.name}: ₹{(entry.value / 1000).toFixed(1)}K
                {entry.dataKey === 'projection' && (
                  <span className="text-xs text-muted-foreground ml-2">
                    (AI Projection)
                  </span>
                )}
              </p>
            );
          })}
          {payload.some((entry: any) => entry.dataKey === 'projection') && (
            <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
              Projection generated using past 30 days of campaign data.
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        {/* Add filter for projection line glow effect */}
        <defs>
          <filter id="projectionGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="month" 
          fontSize={12}
          className="text-muted-foreground"
        />
        <YAxis 
          fontSize={12}
          className="text-muted-foreground"
          tickFormatter={(value) => `₹${(value / 1000)}K`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {showCurrentYear && (
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            name="Current Year"
            // Only connect points where revenue is not null
            connectNulls={false}
          />
        )}
        {showPreviousYear && (
          <Line 
            type="monotone" 
            dataKey="previousYear" 
            stroke="#94A3B8" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#94A3B8', strokeWidth: 2, r: 3 }}
            name="Previous Year"
            // Only connect points where previousYear is not null
            connectNulls={false}
          />
        )}
        {/* AI Projection Line */}
        {showProjection && (
          <Line 
            type="monotone" 
            dataKey="projection" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            strokeDasharray="8 4"
            dot={{ fill: '#8B5CF6', strokeWidth: 1, r: 2 }}
            name="AI Projection"
            strokeOpacity={0.8}
            strokeLinecap="round"
            animationDuration={2000}
            animationEasing="ease-out"
            // Add subtle glow effect for forecast appearance
            filter="url(#projectionGlow)"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}