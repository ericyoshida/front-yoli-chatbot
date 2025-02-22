import { Input } from '@/components/ui/input'

export default function Message() {
  return (
    <div className="flex-1 flex flex-col">
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
  )
}
