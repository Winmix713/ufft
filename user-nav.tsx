import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserNav() {
  return (
    <div className="flex items-center">
      <div className="mr-4 text-right">
        <p className="text-sm font-medium text-white">Lottie Poole</p>
        <p className="text-xs text-gray-400">Munich, Germany</p>
      </div>
      <Avatar className="h-10 w-10 border border-[#222]">
        <AvatarImage src="/avatar.jpg" alt="Lottie Poole" />
        <AvatarFallback className="bg-[#222] text-white">LP</AvatarFallback>
      </Avatar>
    </div>
  )
}

