'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { TableClients } from '@/components/table-clients'
import { ICLient } from '../interfaces/message'
import { getSallerCustomer, sendMessagesAuto } from '@/services/api'

export default function ClientList() {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [clientData, setClientData] = useState<ICLient[]>([])

  const toggleSelect = (id: string) => {
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

  const toggleSelectAll = async () => {
    clientData.forEach((client) => {
      toggleSelect(client.id)
    })
  }

  const listFiltred = clientData.filter((client) => {
    if (searchTerm) {
      return client.name.toLowerCase().includes(searchTerm.toLowerCase())
    } else {
      return client
    }
  })

  const getClients = async () => {
    const res = await getSallerCustomer()
    if (res?.data?.customers) {
      const resData = res.data.customers.sort((a: ICLient, b: ICLient) =>
        a.name.localeCompare(b.name),
      )

      setClientData(resData)
    }
  }

  const sendMessages = async () => {
    sendMessagesAuto([...selectedClients])
    alert('Mensagens serão enviadas pra números selecionados!')
    selectedClients.forEach((id) => toggleSelect(id))
  }

  useEffect(() => {
    getClients()
  }, [])

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
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={sendMessages}
        >
          Enviar Mensagens Automáticas
        </button>
      </div>

      <TableClients
        listFiltred={listFiltred}
        toggleSelect={toggleSelect}
        selectedClients={selectedClients}
        toggleSelectAll={toggleSelectAll}
      />
    </div>
  )
}
