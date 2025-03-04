"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"

interface TrainingPaceChartProps {
  title: string
  data: Array<{
    time: string
    value1: number
    value2: number
  }>
}

export function TrainingPaceChart({ title, data }: TrainingPaceChartProps) {
  return (
    <div className="rounded-md bg-[#1a1a1a] p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        <div className="flex space-x-4 text-xs">
          <span className="text-gray-400">8:00</span>
          <span className="text-gray-400">10:00</span>
          <span className="text-gray-400">20:00</span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#04f5ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#04f5ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00a86b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00a86b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide={true} />
            <YAxis hide={true} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Area type="monotone" dataKey="value1" stroke="#04f5ff" fillOpacity={1} fill="url(#colorValue1)" />
            <Area type="monotone" dataKey="value2" stroke="#00a86b" fillOpacity={1} fill="url(#colorValue2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

