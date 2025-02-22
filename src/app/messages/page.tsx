'use client'

import { useState } from 'react'
import { Search, CheckSquare, Square } from 'lucide-react'

const clients = [
  { id: 1, name: 'John Doe', whatsapp: '(12) 91919-1222' },
  { id: 2, name: 'John Doe', whatsapp: '(12) 91919-1222' },
  { id: 3, name: 'John Doe', whatsapp: '(12) 91919-1222' },
  { id: 4, name: 'John Doe', whatsapp: '(12) 91919-1222' },
  { id: 5, name: 'John Doe', whatsapp: '(12) 91919-1222' },
  { id: 6, name: 'John Doe', whatsapp: '(12) 91919-1222' },
  { id: 7, name: 'John Doe', whatsapp: '(12) 91919-1222' },
]

export default function ClientList() {
  const [selectedClients, setSelectedClients] = useState(new Set())

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

  return (
    <div className="p-4 w-full max-w-3xl mx-auto bg-white shadow-md">
      {/* Search and Button Row */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Pesquisar Clientes"
            className="pl-10 pr-3 py-2 border rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Enviar Mala Direta
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-center">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="p-3">Nome</th>
              <th className="p-3">Whatsapp</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleSelect(client.id)}
              >
                <td className="p-3 text-center">
                  {selectedClients.has(client.id) ? (
                    <CheckSquare className="text-green-600" size={18} />
                  ) : (
                    <Square size={18} />
                  )}
                </td>
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.whatsapp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
