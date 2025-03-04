interface ClubInfoProps {
  id: string
  title?: string
  subtitle?: string
  wrapperClass?: string
  club?: {
    id: string
    name: string
    city: string
    country: string
    logo: string
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
  },
  {
    id: "bvb",
    name: "Borussia Dortmund",
    shortName: "Dortmund",
    city: "Dortmund",
    country: "Germany",
    logo: "/bvb-logo.svg",
  },
]

export function ClubInfo({ id, title, subtitle, wrapperClass, club: propClub }: ClubInfoProps) {
  const club = propClub || CLUBS.find((club) => club.id === id) || CLUBS[0]

  return (
    <div className={`${wrapperClass || ""} info flex items-center gap-5`}>
      <img className="h-12 w-12" src={club.logo || "/placeholder.svg"} alt={club.name} />
      <div className="main flex flex-col">
        <h3 className="text-white font-medium">{title || club.name}</h3>
        <span className="text-gray-400 text-xs">{subtitle || `${club.city}, ${club.country}`}</span>
      </div>
    </div>
  )
}

