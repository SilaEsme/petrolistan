import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development'

const csp = [
  "default-src 'self'",
  // 'unsafe-eval' required by React dev mode for stack trace reconstruction — never used in production
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com`,
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
].join('; ')

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.petrolistan.com' }],
        destination: 'https://petrolistan.com/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ]
  },
};

export default nextConfig;
