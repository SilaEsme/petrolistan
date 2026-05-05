'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <p className="text-red-600">Bir hata oluştu.</p>
      <button onClick={reset} className="px-4 py-2 bg-[#0C447C] text-white rounded hover:bg-[#042C53]">
        Tekrar Dene
      </button>
    </div>
  )
}
