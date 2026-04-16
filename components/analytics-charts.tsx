'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Line, LineChart, XAxis, YAxis, CartesianGrid, Bar, BarChart } from 'recharts';
import { ImpactData } from '@/types';

interface AnalyticsChartsProps {
  impactData: ImpactData[];
}

export function AnalyticsCharts({ impactData }: AnalyticsChartsProps) {
  // Severity distribution
  const severityDistribution = [
    { name: 'Critical', value: impactData.filter(d => d.severity > 80).length, color: '#dc2626' },
    { name: 'High', value: impactData.filter(d => d.severity > 60 && d.severity <= 80).length, color: '#f97316' },
    { name: 'Medium', value: impactData.filter(d => d.severity > 40 && d.severity <= 60).length, color: '#eab308' },
    { name: 'Low', value: impactData.filter(d => d.severity <= 40).length, color: '#22c55e' },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Incidents Trend */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Incident Trends (6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: `1px solid #e2e8f0`,
                  borderRadius: '0.5rem',
                }}
                formatter={(value) => [value, 'Incidents']}
              />
              <Line
                type="monotone"
                dataKey="incidents"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Severity Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {severityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Area and Severity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Area Affected Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: `1px solid #e2e8f0`,
                  borderRadius: '0.5rem',
                }}
                formatter={(value) => [value, 'Hectares']}
              />
              <Bar dataKey="area" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Severity Index Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: `1px solid #e2e8f0`,
                  borderRadius: '0.5rem',
                }}
                formatter={(value) => [value, 'Score']}
              />
              <Bar dataKey="severity" fill="#dc2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}
