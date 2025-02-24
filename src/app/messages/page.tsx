'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { TableClients } from '@/components/table-clients'
// import { api } from '@/services/api'

const clients: { id: number; name: string; whatsapp: string }[] = [
  { id: 1, name: 'John', whatsapp: '(12) 91919-1222' },
  { id: 2, name: 'Maria', whatsapp: '(12) 91919-1222' },
  { id: 3, name: 'Alisson', whatsapp: '(12) 91919-1222' },
  { id: 4, name: 'Joana', whatsapp: '(12) 91919-1222' },
  { id: 5, name: 'Kleber', whatsapp: '(12) 91919-1222' },
  { id: 6, name: 'Joaquina', whatsapp: '(12) 91919-1222' },
  { id: 7, name: 'Fabíola', whatsapp: '(12) 91919-1222' },
  { id: 8, name: 'Felipe', whatsapp: '(12) 91919-1222' },
  { id: 9, name: 'Camilo', whatsapp: '(12) 91919-1222' },
  { id: 10, name: 'Jefferson', whatsapp: '(12) 91919-1222' },
  { id: 11, name: 'Ban Ban', whatsapp: '(12) 91919-1222' },
  { id: 12, name: 'Pioleto', whatsapp: '(12) 91919-1222' },
  { id: 13, name: 'Pattielo', whatsapp: '(12) 91919-1222' },
  { id: 14, name: 'Lazarendo', whatsapp: '(12) 91919-1222' },
  { id: 15, name: 'Roaquin', whatsapp: '(12) 91919-1222' },
  { id: 16, name: 'Maoel', whatsapp: '(12) 91919-1222' },
  { id: 17, name: 'Babe', whatsapp: '(12) 91919-1222' },
  { id: 18, name: 'John Doe', whatsapp: '(12) 91919-1222' },
]

export default function ClientList() {
  const [selectedClients, setSelectedClients] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const toggleSelect = (id: number) => {
    setSelectedClients((prev) => {
      const newSelected = new Set(prev)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return newSelected
    })
  }

  const listFiltred = clients.filter((client) => {
    return searchTerm
      ? client.name.toLowerCase().includes(searchTerm.toLowerCase())
      : client
  })

  const getClients = async () => {
    // try {
    //   const response = await api.get(
    //     'whatsapp-sellers/099489f1-f2f4-40be-9ca1-817e36f83fbe/chat-logs',
    //   )
    //   const data = response.data
    //   console.log('success =>', data)
    // } catch (error) {
    //   console.log('error =>', error)
    // }
  }

  useEffect(() => {
    getClients()
  })

  return (
    <div className="p-4 w-full mx-auto shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <Input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar Clientes"
            className="pl-10 pr-3 py-2 border rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Enviar Mala Direta
        </button>
      </div>

      <TableClients
        listFiltred={listFiltred}
        toggleSelect={toggleSelect}
        selectedClients={selectedClients}
      />
    </div>
  )
}
