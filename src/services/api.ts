import { getCookie, setCookie } from '@/lib/cookies'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://chatbotapi.yolitech.com.br',
})

export const login = async () => {
  try {
    const response = await api.post(
      '/sessions',
      {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    setCookie('access_token', response.data.access_token)
    return
  } catch (error) {
    console.log(error)
  }
}

export const getLogs = async () => {
  let token = getCookie('access_token')
  if (!token) {
    await login()
  }

  token = getCookie('access_token')

  try {
    const response = await api.get(
      'whatsapp-sellers/099489f1-f2f4-40be-9ca1-817e36f83fbe/chat-logs',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getSallerCustomer = async (whatsappSellerId: string) => {
  let token = getCookie('access_token')
  if (!token) {
    await login()
  }
  token = getCookie('access_token')
  try {
    const response = await api.get(
      `whatsapp-sellers/${whatsappSellerId}/customers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}
