import { getCookie, setCookie } from '@/lib/cookies'
import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: 'https://chatbotapi.yolitech.com.br',
})

export const login = async () => {
  try {
    const data = {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    }
    const response = await api.post('/sessions', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setCookie('access_token', response.data.access_token)
    return
  } catch (error) {
    console.log('🚀 ~ login ~ error:', error)
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        await login()
      }
      return null
    }
    console.log(error)
  }
}

export const getLogs = async () => {
  let token = getCookie('access_token')
  if (!token) {
    await login()
    token = getCookie('access_token')
  }

  try {
    return await api.get(
      'whatsapp-sellers/099489f1-f2f4-40be-9ca1-817e36f83fbe/chat-logs',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        await login()
      }
      return null
    }
    return null
  }
}

export const getSallerCustomer = async () => {
  let token = getCookie('access_token')
  if (!token) {
    await login()
    token = getCookie('access_token')
  }

  try {
    return await api.get(
      `companies-seller/6c675faa-1e7a-4005-8c01-2250c1b83b79/customers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } catch (error) {
    console.log(error)
    return null
  }
}

export const sendMessagesAuto = async (customersIds: string[]) => {
  let token = getCookie('access_token')
  if (!token) {
    await login()
    token = getCookie('access_token')
  }

  try {
    return await api.post(
      `whatsapp-sellers/099489f1-f2f4-40be-9ca1-817e36f83fbe/whatsapp-message-templates/8744cf19-f5ef-443f-ba60-598d31cd4807/send-message-template`,
      {
        customersIds: customersIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } catch (error) {
    console.log(error)
    return null
  }
}
