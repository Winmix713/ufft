import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface PlayerInfoProps {
  avatar?: string
  number: number
  title: string
  subtitle: string
  wrapperClass?: string
  style?: React.CSSProperties
}

export function PlayerInfo({ avatar, number, title, subtitle, wrapperClass, style = {} }: PlayerInfoProps) {
  return (
    <div className={cn(wrapperClass, { "flex justify-between items-center": avatar })} style={style}>
      <div className="flex items-center gap-3">
        {avatar ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={title} />
            <AvatarFallback className="bg-[#222] text-white">{title.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <span className="player-number flex items-center justify-center h-8 w-8 rounded-full border border-[#333] text-white font-bold">
            {number}
          </span>
        )}
        <div className="flex flex-col">
          <h3 className="text-white text-sm font-medium">{title}</h3>
          <span className="text-gray-400 text-xs">{subtitle}</span>
        </div>
      </div>
      {avatar && (
        <span className="player-number flex items-center justify-center h-8 w-8 rounded-full border border-[#333] text-white font-bold">
          {number}
        </span>
      )}
    </div>
  )
}

