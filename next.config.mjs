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
  
  // 🚀 Оптимизации сборки
  experimental: {
    optimizeCss: true,
    // Оптимизация JavaScript
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'simple-icons'
    ],
    // Улучшенный tree shaking
    serverComponentsExternalPackages: [
      '@anthropic-ai/sdk',
      '@e2b/code-interpreter'
    ]
  },

  // 📦 Оптимизация зависимостей
  webpack: (config, { isServer }) => {
    // Исключаем ненужные модули из bundle
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    }

    // Оптимизация для клиентской стороны
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Замещаем тяжелые зависимости легкими аналогами для клиента
        'node:crypto': false,
        'node:fs': false,
        'node:path': false,
      }
    }

    // Chunk splitting для лучшего кэширования
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunks
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // UI библиотеки отдельно
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 20,
          },
          // AI SDK отдельно
          ai: {
            test: /[\\/]node_modules[\\/](@ai-sdk|ai)[\\/]/,
            name: 'ai',
            chunks: 'all',
            priority: 20,
          },
        },
      },
    }

    return config
  },
  
  // 🛡️ Заголовки безопасности
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        // DNS prefetch оптимизация
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        // Защита от XSS атак
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        // Предотвращение MIME sniffing
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        // Защита от clickjacking
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        // Строгая транспортная безопасность (HSTS)
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        },
        // Referrer Policy
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        // Content Security Policy
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.posthog.com https://cdn.jsdelivr.net",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: blob: https: http:",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://api.openai.com https://api.anthropic.com https://api.groq.com https://generativelanguage.googleapis.com https://api.mistral.ai https://api.x.ai https://app.posthog.com wss:",
            "frame-src 'self' https:",
            "media-src 'self' data: blob:",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "upgrade-insecure-requests"
          ].join('; ')
        },
        // Permissions Policy
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
        }
      ]
    }
  ]
}

export default nextConfig
