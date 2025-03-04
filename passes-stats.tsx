"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"

interface PassesStatsProps {
  title: string
  data: {
    passes: number
    crosses: number
    corners: number
    shots: number
  }
}

export function PassesStats({ title, data }: PassesStatsProps) {
  const chartData = [
    { subject: "PASSES", value: data.passes },
    { subject: "CROSSES", value: data.crosses },
    { subject: "CORNERS", value: data.corners },
    { subject: "SHOTS", value: data.shots },
  ]

  return (
    <div className="rounded-md bg-[#1a1a1a] p-4 h-full">
      <h3 className="text-white text-lg font-medium mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#fff", fontSize: 12 }} />
            <Radar name="Stats" dataKey="value" stroke="#ff0000" fill="#ff0000" fillOpacity={0.2} />
            <Radar name="Stats" dataKey="value" stroke="#f7a300" fill="#f7a300" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

