'use client'

import { Filter } from 'lucide-react'
import { messages } from '../constants'
import { Input } from '@/components/ui/input'
import { ChatsCard } from '@/components/chats/chats-card'
import { useEffect, useState } from 'react'

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
  const [messageSelectecd, setMessageSelectecd] = useState<number>(1)

  useEffect(() => {
    setIdMessageSelectecd(1)
  }, [])

  const setIdMessageSelectecd = (id: number) => {
    console.log('🚀 ~ setIdMessageSelectecd ~ id:', id)
    setMessageSelectecd(id)
  }

  const limitText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + '...'
    } else {
      return text
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex ">
        <div className="w-1/3 bg-white p-4 border-r space-y-4 ">
          <div className="relative mb-2">
            <Input placeholder="Buscar conversa" className="pl-10" />
            <Filter
              className="absolute left-2 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <div className="space-y-2 snap-y h-screen overflow-y-scroll scroll-auto">
            {chats.map((item, i) => (
              <ChatsCard
                item={item}
                limit={true}
                key={i}
                setMessageSelected={setIdMessageSelectecd}
                messageSelectecd={messageSelectecd}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 py-4 space-y-4 ">
          <div className="p-2 flex items-center gap-2 bg-gray-200 scroll-m-0 ">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div>
              <p className="font-semibold">
                {messages[messageSelectecd].sender}
              </p>
              <p className="text-sm text-gray-500">
                {limitText(messages[messageSelectecd].text, 30)}
              </p>
            </div>
          </div>
          <div className="overflow-y-scroll scroll-auto p-4">
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
