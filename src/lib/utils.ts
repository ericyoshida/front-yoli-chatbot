import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import fire from '../assets/fire.svg'
import cloud from '../assets/cloud.svg'
import cloudSnow from '../assets/cloud-with-snow.svg'
import snowFlake from '../assets/snowflake.svg'
import exclamation from '../assets/exclamation.svg'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^55(\d{2})(\d{5})(\d{4})$/, '+55 ($1) $2-$3')
}

export const formatDate = (dateString: string) => {
  const dateObject = new Date(dateString)

  const day = String(dateObject.getDate()).padStart(2, '0')
  const month = String(dateObject.getMonth() + 1).padStart(2, '0') // Months start at 0
  const year = String(dateObject.getFullYear()).slice(-2)
  const hours = String(dateObject.getHours()).padStart(2, '0')
  const minutes = String(dateObject.getMinutes()).padStart(2, '0')

  return { date: `${day}/${month}/${year}`, hour: `${hours}:${minutes}` }
}

export const limitText = (text: string, limit: number) => {
  if (text && text.length > limit) {
    return text.slice(0, limit) + '...'
  } else {
    return text
  }
}

export const getEngagementIcon = (leadEngagement: string) => {
  const currentLeadEngagement = Number(leadEngagement)
  if (currentLeadEngagement >= 4) {
    return fire
  } else if (currentLeadEngagement === 3) {
    return cloud
  } else if (currentLeadEngagement === 2) {
    return cloudSnow
  } else if (currentLeadEngagement <= 1) {
    return snowFlake
  } else {
    return exclamation
  }
}

export const timePassed = (date: string) => {
  const now = new Date()
  const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000) // diferença em segundos

  if (diff < 60) return `${diff} seg`
  if (diff < 3600) return `${Math.floor(diff / 60)} min`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h`
  return `${Math.floor(diff / 86400)} d`
}
