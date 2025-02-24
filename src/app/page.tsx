'use client'

import { Loading } from '@/components/loading'
import { getCookie } from '@/lib/cookies'
import { login } from '@/services/api'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    const token = getCookie('access_token')
    if (!token) {
      login()
    }

    if (pathName === '/') {
      router.replace('/chats')
    }
  }, [])

  return <Loading />
}
