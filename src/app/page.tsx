'use client'

import { Loading } from '@/components/loading'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    if (pathName === '/') {
      router.replace('/chats')
    }
  }, [])

  return <Loading />
}
