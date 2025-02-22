// src/components/Loading.jsx
import React from 'react'
import { Loader2 } from 'lucide-react'

export const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
    </div>
  )
}
