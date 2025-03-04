"use client"

import { useRef } from "react"

interface TeamStatsCardProps {
  id: string
  value: number
  club?: {
    id: string
    name: string
    shortName?: string
    city: string
    country: string
    logo: string
    color: string
  }
}

// Mock data for clubs
const CLUBS = [
  {
    id: "bayern",
    name: "Bayern Munich",
    shortName: "Bayern",
    city: "Munich",
    country: "Germany",
    logo: "/bayern-logo.svg",
    color: "red",
  },
  {
    id: "bvb",
    name: "Borussia Dortmund",
    shortName: "Dortmund",
    city: "Dortmund",
    country: "Germany",
    logo: "/bvb-logo.svg",
    color: "yellow",
  },
]

export function TeamStatsCard({ id, value, club: propClub }: TeamStatsCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const club = propClub || CLUBS.find((club) => club.id === id) || CLUBS[0]

  return (
    <div
      className="flex flex-col rounded-md overflow-hidden bg-[#1a1a1a]"
      style={{ borderBottom: `4px solid var(--${club.color})` }}
    >
      <div className="flex flex-col items-start flex-1 gap-3 p-6 pb-4" ref={ref}>
        <img className="h-12 w-12" src={club.logo || "/placeholder.svg"} alt={club.name} />
        <h3 className="text-white font-medium truncate w-full">{club.shortName || club.name}</h3>
      </div>
      <div className="p-2 bg-[#222]">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">GOALS</span>
          <span className="text-white font-bold">{value}</span>
        </div>
      </div>
    </div>
  )
}

