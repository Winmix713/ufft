"use client"

import { motion } from "framer-motion"
import { ClubFullInfo } from "@/components/soccer/club-full-info"

interface ClubCardProps {
  country: string
  club: {
    name: string
    shortName?: string
    city: string
    country: string
    logo: string
  }
  index: number
}

export function ClubCard({ country, club, index }: ClubCardProps) {
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

  // Determine if compact based on screen size
  const isCompact = false // This would be determined by a hook in a real implementation

  return (
    <motion.div initial="hidden" animate="visible" variants={slideUpVariants}>
      <div className="bg-[#1a1a1a] relative h-[220px] p-4 shadow-md overflow-hidden flex flex-col justify-center">
        <ClubFullInfo club={club} country={country} isCompact={isCompact} />
        <span className="absolute text-[227px] font-black right-[-10px] top-1/2 transform -translate-y-1/2 z-[1] text-[#111312] opacity-[0.12]">
          {index + 1}
        </span>
      </div>
    </motion.div>
  )
}

