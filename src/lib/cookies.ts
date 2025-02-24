import Cookies from 'js-cookie'

export const setCookie = (
  name: string,
  value: string | object,
  options?: Cookies.CookieAttributes,
) => {
  Cookies.set(name, JSON.stringify(value), {
    ...options,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  })
}

export const getCookie = (name: string) =>
  JSON.parse((name && Cookies.get(name)) ?? '{}')

export const removeCookie = (name: string) => name && Cookies.remove(name)
