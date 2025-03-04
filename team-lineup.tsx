import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Player {
  name: string
  position: string
  x: number
  y: number
}

interface TeamLineupProps {
  title: string
  players: Player[]
}

export function TeamLineup({ title, players }: TeamLineupProps) {
  return (
    <div className="rounded-md bg-[#1a1a1a] p-4 h-full">
      <h3 className="text-white text-lg font-medium mb-4">{title}</h3>
      <div className="relative h-[400px] bg-[#222] rounded-md overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center opacity-50"></div>
        <div className="relative h-full">
          {players.map((player, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${player.x}%`,
                top: `${player.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                <AvatarFallback className="bg-[#333] text-white">{player.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center mt-1">
                <span className="text-white text-xs">{player.name}</span>
                <span className="block text-gray-400 text-[10px]">{player.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

