'use client'

import { Filter, MessageCircle } from 'lucide-react'
import { messages } from '../constants'
import { Input } from '@/components/ui/input'
import { ChatsCard } from '@/components/chats/chats-card'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

const chats: { id: number; name: string; lastMessage: string }[] = [
  {
    id: 1,
    name: 'João',
    lastMessage: 'Lorem ipsum dolorasdfasdfasdf sit amet',
  },
  {
    id: 2,
    name: 'Maria',
    lastMessage: 'Lorem ipsum dolor sasdfsfasdfasdfit amet',
  },
  {
    id: 3,
    name: 'Pedro',
    lastMessage: 'Lorem ipsum dolor sasdfasdfasdfit amet',
  },
  {
    id: 4,
    name: 'Ana',
    lastMessage: 'Lorem ipsum dolor sit asdfasdfasfamet',
  },
  {
    id: 5,
    name: 'Carlos',
    lastMessage: 'Lorem ipsum dolorasdfsafasfasdf sit amet',
  },
  {
    id: 6,
    name: 'Laura',
    lastMessage: 'Lorem ipsum dolor sasdfasfasfasfit amet',
  },
  {
    id: 7,
    name: 'João',
    lastMessage: 'Lorem ipsum dolor siasdfasdfasdfast amet',
  },
  {
    id: 8,
    name: 'Maria',
    lastMessage: 'Lorem ipsum dft ',
  },
  {
    id: 9,
    name: 'Pedro',
    lastMessage: 'Lorem ipsum dolor siasdfsadfasdfastgeqrgart qar t amet...',
  },
]

export default function Chat() {
  const [messageSelected, setMessageSelected] = useState<number>(1)

  const setIdMessageSelected = (id: number) => {
    console.log('🚀 ~ setIdMessageSelected ~ id:', id)
    setMessageSelected(id)
  }

  const limitText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + '...'
    } else {
      return text
    }
  }
  useEffect(() => {
    setMessageSelected(1)
  }, [])
  return (
    <div className="flex flex-col max-h-[600px]">
      <div className="flex ">
        <div className="w-1/3 bg-white py-4 border-r space-y-4 ">
          <div className="relative m-2">
            <Input placeholder="Buscar conversa" className="pl-10" />
            <Filter
              className="absolute left-2 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <div className="space-y-2 snap-y h-screen overflow-y-scroll scroll-auto">
            {chats.map((item) => {
              const cardSelected =
                item.id === messageSelected ? 'bg-[#39B54A26]' : ''
              console.log(
                '🚀 ~ {chats.map ~ cardSelected:',
                item.id,
                messageSelected,
                item.id === messageSelected,
              )

              return (
                <Card
                  className={`p-2 snap-center flex items-center gap-2 cursor-pointer hover:bg-gray-200 scroll-m-0 ${cardSelected}`}
                  onClick={() => setIdMessageSelected(item.id)}
                  key={item.id}
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {limitText(item.lastMessage, 30)}
                    </p>
                  </div>
                  <MessageCircle className="ml-auto text-green-500" size={20} />
                </Card>
              )
            })}
          </div>
        </div>
        <div className="flex-1">
          <div className="p-2 flex items-center gap-2 bg-gray-200 scroll-m-0 rounded-md">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div>
              <p className="font-semibold">{chats[messageSelected].name}</p>
              <p className="text-sm text-gray-500">
                {limitText(chats[messageSelected].lastMessage, 30)}
              </p>
            </div>
          </div>
          <div className="space-y-2 snap-y h-screen overflow-y-scroll scroll-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="max-w-xs bg-gray-200 p-2 rounded-md text-sm">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
