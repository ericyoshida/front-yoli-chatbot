'use client'

import { CheckSquare, Square } from 'lucide-react'
import { useState } from 'react'

interface Client {
  id: number
  name: string
  whatsapp: string
}

interface TableClientsProps {
  listFiltred: Client[]
  toggleSelect: (id: number) => void
  selectedClients: Set<number>
}

export const TableClients = ({
  listFiltred,
  toggleSelect,
  selectedClients,
}: TableClientsProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Calcula o total de páginas
  const totalPages = listFiltred
    ? Math.ceil(listFiltred.length / itemsPerPage)
    : 1

  // Obtém os itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = listFiltred.slice(indexOfFirstItem, indexOfLastItem)

  // Funções para mudar de página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <div className="grid grid-cols-3 border-b-2 border-gray-700 font-bold">
          <div className="p-3 flex justify-center items-center">
            <input type="checkbox" disabled className="w-4 h-4" />
          </div>
          <div className="p-3">Nome</div>
          <div className="p-3">Whatsapp</div>
        </div>

        <div>
          {currentItems.map((client) => (
            <div
              key={client.id}
              className="grid grid-cols-3 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => toggleSelect(client.id)}
            >
              <div className="p-3 flex justify-center items-center">
                {selectedClients.has(client.id) ? (
                  <CheckSquare className="text-green-600" size={18} />
                ) : (
                  <Square size={18} />
                )}
              </div>
              <div className="p-3">{client.name}</div>
              <div className="p-3">{client.whatsapp}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
