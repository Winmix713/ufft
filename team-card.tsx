import { Facebook, Twitter, Youtube } from "lucide-react"

interface Player {
  name: string
  number: number
}

interface TeamCardProps {
  teamName: string
  location: string
  logo: string
  socialLinks: {
    facebook: string
    twitter: string
    youtube: string
  }
  players: Player[]
}

export function TeamCard({ teamName, location, logo, socialLinks, players }: TeamCardProps) {
  return (
    <div className="rounded-md bg-[#1a1a1a] h-full">
      <div className="p-4 flex items-center">
        <div className="mr-4">
          <img src={logo || "/placeholder.svg?height=48&width=48"} alt={teamName} className="h-12 w-12" />
        </div>
        <div>
          <h3 className="text-white text-lg font-medium">{teamName}</h3>
          <p className="text-gray-400 text-xs">{location}</p>
        </div>
      </div>

      <div className="px-4 pb-2 flex space-x-2">
        <a
          href={socialLinks.facebook}
          className="flex items-center justify-center h-6 px-2 bg-[#3b5998] rounded text-white text-xs"
        >
          <Facebook className="h-3 w-3 mr-1" />
          FACEBOOK
        </a>
        <a
          href={socialLinks.twitter}
          className="flex items-center justify-center h-6 px-2 bg-[#1da1f2] rounded text-white text-xs"
        >
          <Twitter className="h-3 w-3 mr-1" />
          TWITTER
        </a>
        <a
          href={socialLinks.youtube}
          className="flex items-center justify-center h-6 px-2 bg-[#ff0000] rounded text-white text-xs"
        >
          <Youtube className="h-3 w-3 mr-1" />
          YOUTUBE
        </a>
      </div>

      <div className="mt-2 border-t border-[#333]">
        {players.map((player, index) => (
          <div key={index} className="flex items-center px-4 py-2 border-b border-[#333]">
            <div className="h-8 w-8 rounded-full bg-[#222] flex items-center justify-center mr-3">
              <img src={`/placeholder.svg?height=32&width=32`} alt={player.name} className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-white text-xs">{player.name}</p>
            </div>
            <div className="text-gray-400 text-xs">{player.number}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

