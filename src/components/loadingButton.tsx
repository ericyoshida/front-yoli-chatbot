import { useState } from 'react'

export default function LoadingButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000) // Simula carregamento
  }

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-blue-700 disabled:bg-gray-400"
      disabled={loading}
    >
      {loading ? (
        <>
          <svg
            className="w-5 h-5 mr-2 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3v-4z"
            />
          </svg>
          Carregando...
        </>
      ) : (
        'Clique Aqui'
      )}
    </button>
  )
}
