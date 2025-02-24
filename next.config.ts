import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
  },
  /* config options here */
}

export default nextConfig
