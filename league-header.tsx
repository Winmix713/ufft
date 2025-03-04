import type React from "react"
import { cn } from "@/lib/utils"

interface LeagueHeaderProps {
  img: string
  title: React.ReactNode
  subtitle?: string
  variant?: "compact" | "full"
}

export function LeagueHeader({ img, title, subtitle, variant = "full" }: LeagueHeaderProps) {
  const TitleComponent = variant === "full" ? "h2" : "h3"
  const titleClass = variant === "full" ? "text-xl" : ""

  return (
    <div className="flex items-center gap-5">
      <div className={cn("hidden md:flex", variant === "full" ? "w-20 h-20" : "w-10 h-10")}>
        <img src={img || "/placeholder.svg"} alt="League logo" className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col gap-1">
        <TitleComponent className={cn("text-white font-medium", titleClass)}>{title}</TitleComponent>
        {subtitle && variant === "full" && <span className="text-gray-400 text-xs">{subtitle}</span>}
      </div>
    </div>
  )
}

