/** @type {import('next').NextConfig} */
const nextConfig = {
  // Разрешить кросс-доменные запросы в dev режиме
  allowedDevOrigins: ['http://192.168.120.236'],
  
  // Turbopack конфигурация
  turbopack: {
    resolveAlias: {
      '~': './sandbox-templates'
    }
  },
  
  // Внешние пакеты для серверных компонентов
  serverExternalPackages: ['@anthropic-ai/sdk'],
  
  // Оптимизации сборки
  experimental: {
    optimizeCss: true
  },
  
  // Безопасность
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        }
      ]
    }
  ]
}

export default nextConfig
