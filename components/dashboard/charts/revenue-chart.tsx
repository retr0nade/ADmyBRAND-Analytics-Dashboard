"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

interface RevenueChartProps {
  data: Array<{
    month: string;
    revenue: number;
    previousYear: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const { theme } = useTheme();
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        <Tooltip 
          contentStyle={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
            borderRadius: '8px',
          }}
          formatter={(value: number) => [`₹${(value / 1000)}K`, '']}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#3B82F6" 
          strokeWidth={3}
          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          name="Current Year"
        />
        <Line 
          type="monotone" 
          dataKey="previousYear" 
          stroke="#94A3B8" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#94A3B8', strokeWidth: 2, r: 3 }}
          name="Previous Year"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}