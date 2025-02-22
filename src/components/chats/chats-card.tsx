import { MessageCircle } from 'lucide-react'
import { Card } from '../ui/card'

interface ChatsCardProps {
  item: { id: number; name: string; lastMessage: string }
  limit?: boolean
  setMessageSelected: (id: number) => void
  messageSelectecd: number
}

export const ChatsCard = ({
  item,
  limit = false,
  setMessageSelected,
  messageSelectecd,
}: ChatsCardProps) => {
  console.log('🚀 ~ messageSelectecd:', messageSelectecd)
  const cardSelected = item.id === messageSelectecd ? 'bg-[#39B54A26]' : ''
  return (
    <Card
      className={`p-2 snap-center flex items-center gap-2 cursor-pointer hover:bg-gray-200 scroll-m-0 ${cardSelected}`}
      onClick={() => setMessageSelected(item.id)}
    >
      <div className="w-10 h-10 bg-gray-300 rounded-full" />
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-500">
          {limit ? `${item.lastMessage.slice(0, 30)}...` : item.lastMessage}
        </p>
      </div>
      <MessageCircle className="ml-auto text-green-500" size={20} />
    </Card>
  )
}
