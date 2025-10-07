/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-sa-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vimeo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'player.vimeo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd3j7yty2q0prpk.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nintendo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mos.cms.futurecdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images2.thanhnien.vn',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        // Añade otros patrones que puedan estar causando problemas
      ],
    },
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.cache = false
    return config
  },
}

module.exports = nextConfig
