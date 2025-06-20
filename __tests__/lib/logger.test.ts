// 🧪 Logger Tests
import { logger, logError, logInfo, logWarning, logSecurity } from '@/lib/logger'

// Mock console methods
const originalConsoleLog = console.log
const mockConsoleLog = jest.fn()

describe('Logger', () => {
  beforeEach(() => {
    console.log = mockConsoleLog
    mockConsoleLog.mockClear()
    
    // Mock development environment
    process.env.NODE_ENV = 'development'
  })

  afterAll(() => {
    console.log = originalConsoleLog
  })

  describe('Development Environment', () => {
    it('logs debug messages in development', () => {
      logger.debug('Test debug message', { test: 'data' })
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[DEBUG]'),
        expect.objectContaining({ test: 'data' })
      )
    })

    it('logs info messages in development', () => {
      logInfo('Test info message', { info: 'data' })
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[INFO]'),
        expect.objectContaining({ info: 'data' })
      )
    })

    it('logs warnings in development', () => {
      logWarning('Test warning message', { warn: 'data' })
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[WARN]'),
        expect.objectContaining({ warn: 'data' })
      )
    })

    it('logs errors in development', () => {
      const testError = new Error('Test error')
      logError('Test error message', testError)
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR]'),
        expect.objectContaining({
          name: 'Error',
          message: 'Test error',
          stack: expect.any(String)
        })
      )
    })
  })

  describe('Production Environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production'
      mockConsoleLog.mockClear()
    })

    it('does not log debug messages in production', () => {
      logger.debug('Test debug message')
      
      expect(mockConsoleLog).not.toHaveBeenCalled()
    })

    it('does not log info messages in production', () => {
      logger.info('Test info message')
      
      expect(mockConsoleLog).not.toHaveBeenCalled()
    })

    it('logs warnings in production', () => {
      logger.warn('Test warning message')
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('\"level\":\"warn\"')
      )
    })

    it('logs errors in production', () => {
      logger.error('Test error message')
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('\"level\":\"error\"')
      )
    })

    it('logs structured JSON in production', () => {
      logger.error('Test error', new Error('Test'))
      
      const logCall = mockConsoleLog.mock.calls[0][0]
      expect(() => JSON.parse(logCall)).not.toThrow()
      
      const parsedLog = JSON.parse(logCall)
      expect(parsedLog).toMatchObject({
        timestamp: expect.any(String),
        level: 'error',
        message: 'Test error',
        meta: expect.any(Object)
      })
    })
  })

  describe('Data Sanitization', () => {
    it('sanitizes sensitive information', () => {
      const sensitiveData = {
        username: 'john',
        password: 'secret123',
        apiKey: 'sk-1234567890',
        token: 'bearer-token',
        normal_field: 'safe-data'
      }

      logger.info('Test with sensitive data', sensitiveData)
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          username: 'john',
          password: '[REDACTED]',
          apiKey: '[REDACTED]',
          token: '[REDACTED]',
          normal_field: 'safe-data'
        })
      )
    })

    it('handles non-object meta data', () => {
      logger.info('Test with string meta', 'just a string')
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.any(String),
        'just a string'
      )
    })
  })

  describe('Security Logging', () => {
    it('logs security events with special prefix', () => {
      logSecurity('Suspicious activity detected', { ip: '1.2.3.4' })
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[SECURITY]'),
        expect.objectContaining({ ip: '1.2.3.4' })
      )
    })
  })

  describe('Error Handling', () => {
    it('handles Error objects correctly', () => {
      const testError = new Error('Test error message')
      testError.stack = 'Error stack trace'
      
      logger.error('An error occurred', testError)
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          name: 'Error',
          message: 'Test error message',
          stack: 'Error stack trace'
        })
      )
    })

    it('handles non-Error objects', () => {
      const errorData = { code: 500, message: 'Server error' }
      
      logger.error('Server error occurred', errorData)
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.any(String),
        errorData
      )
    })
  })

  describe('User Context', () => {
    it('includes user ID in log entries', () => {
      logger.info('User action', { action: 'login' }, 'user123')
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ action: 'login' })
      )
    })
  })
})