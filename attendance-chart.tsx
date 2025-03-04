"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"

interface AttendanceChartProps {
  title: string
  subtitle: string
  value: string
  subtitle2: string
}

export function AttendanceChart({ title, subtitle, value, subtitle2 }: AttendanceChartProps) {
  // Sample data for the chart
  const data = [
    { name: "Jan", value: 65000 },
    { name: "Feb", value: 72000 },
    { name: "Mar", value: 68000 },
    { name: "Apr", value: 82000 },
    { name: "May", value: 75000 },
    { name: "Jun", value: 85000 },
  ]

  return (
    <div className="rounded-md bg-[#1a1a1a] h-full">
      <div className="p-4">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        <p className="text-gray-400 text-xs">{subtitle}</p>
        <p className="text-white text-2xl font-bold mt-1">{value}</p>
        <p className="text-gray-400 text-xs mt-1">{subtitle2}</p>
      </div>
      <div className="h-24 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#04f5ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#04f5ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide={true} />
            <YAxis hide={true} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
              }}
              itemStyle={{ color: "#04f5ff" }}
            />
            <Area type="monotone" dataKey="value" stroke="#04f5ff" fillOpacity={1} fill="url(#colorAttendance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

