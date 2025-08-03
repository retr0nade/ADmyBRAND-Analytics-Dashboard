"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

interface ConversionsChartProps {
  data: Array<{
    campaign: string;
    conversions: number;
    clicks: number;
  }>;
}

export function ConversionsChart({ data }: ConversionsChartProps) {
  const { theme } = useTheme();

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="campaign" 
            fontSize={12}
            className="text-muted-foreground"
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            fontSize={12}
            className="text-muted-foreground"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar 
            dataKey="conversions" 
            fill="#10B981" 
            radius={[4, 4, 0, 0]}
            name="Conversions"
          />
          <Bar 
            dataKey="clicks" 
            fill="#F97316" 
            radius={[4, 4, 0, 0]}
            name="Clicks"
            opacity={0.7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}