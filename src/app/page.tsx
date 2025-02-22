'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { MessageCircle, Filter } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState([
    { id: 1, text: 'Lorem ipsum dolor sit amet', sender: 'user' },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor',
      sender: 'user',
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      sender: 'bot',
    },
  ])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white p-4 border-r flex flex-col">
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-full text-left p-2 rounded-md mb-2 ${
            activeTab === 'chat' ? 'bg-red-200' : ''
          }`}
        >
          Chat e Conversas
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`w-full text-left p-2 rounded-md ${
            activeTab === 'messages' ? 'bg-red-200' : ''
          }`}
        >
          Envio de Mensagens
        </button>
      </div>
      {/* Main Content */}
      {activeTab === 'chat' ? (
        <div className="flex-1 flex flex-col">
          <div className="bg-black text-white p-4 text-center font-semibold">
            Chat e Conversas
          </div>
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-1/3 bg-white p-4 border-r">
              <div className="relative mb-2">
                <Input placeholder="Buscar conversa" className="pl-10" />
                <Filter
                  className="absolute left-2 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <Card
                    key={i}
                    className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-200"
                  >
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <div>
                      <p className="font-semibold">Lorem ipsum</p>
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit
                      </p>
                    </div>
                    <MessageCircle
                      className="ml-auto text-green-500"
                      size={20}
                    />
                  </Card>
                ))}
              </div>
            </div>
            {/* Chat Window */}
            <div className="flex-1 p-4 space-y-4 overflow-auto">
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
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="bg-black text-white p-4 text-center font-semibold">
            Envio de Mensagens
          </div>
          <div className="p-4">
            <Input placeholder="Pesquisar Clientes" className="mb-2" />
            <div className="space-y-2">
              <table className="w-full bg-white border">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Nome</th>
                    <th className="p-2 text-left">Whatsapp</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">John Doe</td>
                      <td className="p-2">(12) 91919-1222</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
                Enviar Mala Direta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
