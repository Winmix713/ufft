interface Team {
  position: number
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  points: number
}

interface LeagueTableProps {
  title: string
  teams: Team[]
}

export function LeagueTable({ title, teams }: LeagueTableProps) {
  return (
    <div className="rounded-md bg-[#1a1a1a] p-4 h-full">
      <div className="flex items-center mb-4">
        <div className="h-6 w-6 rounded-sm bg-[#04f5ff] flex items-center justify-center mr-2">
          <span className="text-xs font-bold text-black">E</span>
        </div>
        <div>
          <h3 className="text-white text-lg font-medium">{title}</h3>
          <p className="text-gray-400 text-xs">Premier League</p>
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-xs border-b border-[#333]">
              <th className="text-left py-2 font-normal">CLUB</th>
              <th className="text-center py-2 font-normal">W</th>
              <th className="text-center py-2 font-normal">D</th>
              <th className="text-center py-2 font-normal">L</th>
              <th className="text-center py-2 font-normal">PTS</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.position} className="text-white text-xs border-b border-[#333]">
                <td className="py-2 flex items-center">
                  <span className="mr-2 text-gray-400">{team.position}</span>
                  <span>{team.name}</span>
                </td>
                <td className="text-center py-2">{team.won}</td>
                <td className="text-center py-2">{team.drawn}</td>
                <td className="text-center py-2">{team.lost}</td>
                <td className="text-center py-2 text-[#04f5ff] font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

