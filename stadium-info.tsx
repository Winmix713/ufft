interface StadiumInfoProps {
  name: string
  location: string
  temperature: number
}

export function StadiumInfo({ name, location, temperature }: StadiumInfoProps) {
  return (
    <div className="rounded-md bg-[#1a1a1a] h-full">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center opacity-30"></div>
        <div className="relative p-4 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-white text-lg font-medium">{name}</h3>
            <p className="text-gray-400 text-xs">{location}</p>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">{temperature}°C</span>
            <span className="ml-2 text-xs text-gray-400">Sunny</span>
          </div>
        </div>
      </div>
    </div>
  )
}

