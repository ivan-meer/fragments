// 📊 Система логирования для E2B Fragments
// Безопасное логирование с различными уровнями для dev/prod

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  meta?: any
  userId?: string
  sessionId?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isClient = typeof window !== 'undefined'

  private formatTimestamp(): string {
    return new Date().toISOString()
  }

  private shouldLog(level: LogLevel): boolean {
    // В продакшене логируем только warnings и errors
    if (!this.isDevelopment) {
      return level === 'warn' || level === 'error'
    }
    // В разработке логируем все
    return true
  }

  private sanitizeMeta(meta: any): any {
    if (!meta) return meta
    
    // Удаляем чувствительную информацию
    const sensitiveKeys = [
      'password', 'token', 'apiKey', 'api_key', 'secret', 
      'authorization', 'cookie', 'session', 'private_key'
    ]
    
    if (typeof meta === 'object') {
      const sanitized = { ...meta }
      sensitiveKeys.forEach(key => {
        if (key in sanitized) {
          sanitized[key] = '[REDACTED]'
        }
      })
      return sanitized
    }
    
    return meta
  }

  private log(level: LogLevel, message: string, meta?: any, userId?: string): void {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      message,
      meta: this.sanitizeMeta(meta),
      userId,
      sessionId: this.isClient ? sessionStorage?.getItem('sessionId') || undefined : undefined
    }

    // В разработке выводим в консоль с цветами
    if (this.isDevelopment) {
      const colors = {
        debug: '\x1b[36m', // cyan
        info: '\x1b[32m',  // green
        warn: '\x1b[33m',  // yellow
        error: '\x1b[31m', // red
      }
      const reset = '\x1b[0m'
      
      console.log(
        `${colors[level]}[${level.toUpperCase()}]${reset} ${entry.timestamp} - ${message}`,
        meta ? entry.meta : ''
      )
    } else {
      // В продакшене структурированное JSON логирование
      console.log(JSON.stringify(entry))
    }

    // В продакшене отправляем критичные ошибки в external service
    if (!this.isDevelopment && level === 'error') {
      this.sendToExternalLogger(entry)
    }
  }

  private async sendToExternalLogger(entry: LogEntry): Promise<void> {
    try {
      // Здесь можно интегрировать с Sentry, LogRocket, или другими сервисами
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY && this.isClient) {
        // Отправляем в PostHog как событие
        window.posthog?.capture('error_logged', {
          level: entry.level,
          message: entry.message,
          meta: entry.meta
        })
      }
    } catch (err) {
      // Игнорируем ошибки логирования чтобы не создавать бесконечные циклы
    }
  }

  debug(message: string, meta?: any, userId?: string): void {
    this.log('debug', message, meta, userId)
  }

  info(message: string, meta?: any, userId?: string): void {
    this.log('info', message, meta, userId)
  }

  warn(message: string, meta?: any, userId?: string): void {
    this.log('warn', message, meta, userId)
  }

  error(message: string, error?: Error | any, userId?: string): void {
    const meta = error instanceof Error 
      ? { 
          name: error.name, 
          message: error.message, 
          stack: this.isDevelopment ? error.stack : undefined 
        }
      : error
    
    this.log('error', message, meta, userId)
  }

  // Специальный метод для логирования безопасности
  security(message: string, meta?: any, userId?: string): void {
    this.log('warn', `[SECURITY] ${message}`, meta, userId)
    
    // В продакшене всегда отправляем security events
    if (!this.isDevelopment && this.isClient && window.posthog) {
      window.posthog.capture('security_event', {
        message,
        meta: this.sanitizeMeta(meta),
        userId
      })
    }
  }

  // Метод для логирования API запросов
  apiRequest(method: string, url: string, status: number, duration: number, userId?: string): void {
    const level = status >= 400 ? 'warn' : 'info'
    this.log(level, `API ${method} ${url}`, {
      status,
      duration: `${duration}ms`,
      url
    }, userId)
  }
}

// Singleton экземпляр логгера
export const logger = new Logger()

// Utility функции для быстрого использования
export const logError = (message: string, error?: Error | any, userId?: string) => 
  logger.error(message, error, userId)

export const logInfo = (message: string, meta?: any, userId?: string) => 
  logger.info(message, meta, userId)

export const logWarning = (message: string, meta?: any, userId?: string) => 
  logger.warn(message, meta, userId)

export const logSecurity = (message: string, meta?: any, userId?: string) => 
  logger.security(message, meta, userId)

export const logApiRequest = (method: string, url: string, status: number, duration: number, userId?: string) => 
  logger.apiRequest(method, url, status, duration, userId)

export default logger