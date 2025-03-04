"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TeamScoreRowProps {
  data: {
    name: string
    score?: number
    pts?: number
    w?: number
    d?: number
    l?: number
    color?: string
  }
  index: number
  variant?: "minimal" | "league"
}

export function TeamScoreRow({ data, index, variant = "minimal" }: TeamScoreRowProps) {
  const direction = "ltr" // Could be made dynamic with a context

  // Animation variants
  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={slideUpVariants}>
      <div
        className={cn(
          "h-[25px] grid gap-[2px] rounded overflow-hidden",
          direction,
          index === 0 ? "top" : "",
          variant === "minimal"
            ? "grid-cols-[minmax(0,calc(100%-28px))_28px]"
            : "grid-cols-[minmax(0,calc(100%-28px))_28px]",
        )}
        style={{
          borderLeft: direction === "ltr" && data.color ? `4px solid var(--${data.color})` : undefined,
          borderRight: direction === "rtl" && data.color ? `4px solid var(--${data.color})` : undefined,
        }}
      >
        <div
          className={cn(
            "h-[25px] flex items-center text-white uppercase",
            "info",
            variant,
            index === 0 ? "bg-[#333]" : "bg-[#1a1a1a]",
          )}
        >
          {variant === "league" && (
            <span className="w-[30px] inline-flex justify-center items-center">{index + 1}</span>
          )}
          <span className="flex-1 truncate">{data.name}</span>
          {variant === "league" && (
            <div className="grid grid-cols-3 text-center" style={{ width: "84px" }}>
              <span>{data.w}</span>
              <span>{data.d}</span>
              <span>{data.l}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "h-[25px] flex items-center justify-center text-white",
            "total",
            index === 0 ? "bg-[#333]" : "bg-[#1a1a1a]",
          )}
        >
          {variant === "minimal" ? data.score : data.pts}
        </div>
      </div>
    </motion.div>
  )
}

