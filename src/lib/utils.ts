import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1')
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
