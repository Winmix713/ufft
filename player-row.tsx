"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlayerRowProps {
  player: {
    name: string
    number: number
    avatar: string
    isCaptain?: boolean
    substitutes?: boolean
  }
  index: number
}

export function PlayerRow({ player, index }: PlayerRowProps) {
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
          "h-[25px] grid grid-cols-[28px_minmax(0,calc(100%-28px))] gap-[2px] rounded overflow-hidden",
          direction,
        )}
      >
        <div className="h-[25px] bg-[#1a1a1a]">
          <Avatar className="h-[25px] w-[25px] rounded-none">
            <AvatarImage
              src={player.avatar}
              alt={player.name}
              className={cn(
                direction === "ltr" ? "border-l-4" : "border-r-4",
                player.isCaptain ? "border-[#04f5ff]" : "border-[#ff0000]",
              )}
            />
            <AvatarFallback className="bg-[#222] text-white rounded-none">{player.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="h-[25px] bg-transparent border border-[#333] flex items-center justify-between px-2 text-white text-xs">
          <span>
            {player.name} ({player.number})
          </span>
          {player.substitutes && <RefreshCw className="h-3 w-3 text-[#04f5ff] animate-spin" />}
        </div>
      </div>
    </motion.div>
  )
}

