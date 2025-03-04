"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

interface ResultsChartProps {
  title: string
  data: Array<{
    label: string
    value: number
    color: string
  }>
}

export function ResultsChart({ title, data }: ResultsChartProps) {
  return (
    <div className="rounded-md bg-[#1a1a1a] p-4 h-full">
      <h3 className="text-white text-lg font-medium mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={0} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry, index) => <span style={{ color: "#fff" }}>{data[index].label}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs text-gray-400 uppercase">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

