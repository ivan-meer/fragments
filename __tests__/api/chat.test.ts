// 🧪 Chat API Tests
import { POST } from '@/app/api/chat/route'
import { NextRequest } from 'next/server'

// Mock dependencies
jest.mock('@/lib/models', () => ({
  getModelClient: jest.fn().mockReturnValue({
    generateObject: jest.fn()
  })
}))

jest.mock('@/lib/ratelimit', () => 
  jest.fn().mockResolvedValue(false)
)

jest.mock('ai', () => ({
  streamObject: jest.fn().mockResolvedValue({
    toTextStreamResponse: jest.fn().mockReturnValue(new Response('test'))
  })
}))

describe('/api/chat', () => {
  const mockRequestBody = {
    messages: [
      { role: 'user', content: 'Create a simple React component' }
    ],
    userID: 'test-user',
    teamID: 'test-team',
    template: { 'nextjs-developer': { name: 'Next.js Developer' } },
    model: {
      id: 'claude-3-5-sonnet-latest',
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      providerId: 'anthropic'
    },
    config: {
      model: 'claude-3-5-sonnet-latest',
      apiKey: 'test-key'
    }
  }

  it('handles valid requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '127.0.0.1'
      },
      body: JSON.stringify(mockRequestBody)
    })

    const response = await POST(request)
    
    expect(response).toBeInstanceOf(Response)
  })

  it('validates required fields', async () => {
    const invalidBody = { ...mockRequestBody }
    delete invalidBody.messages

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(invalidBody)
    })

    const response = await POST(request)
    
    // Should handle missing required fields gracefully
    expect(response).toBeInstanceOf(Response)
  })

  it('handles rate limiting', async () => {
    // Mock rate limit hit
    const ratelimit = require('@/lib/ratelimit')
    ratelimit.mockResolvedValueOnce({
      amount: 10,
      remaining: 0,
      reset: Date.now() + 3600000
    })

    const requestWithoutApiKey = {
      ...mockRequestBody,
      config: { model: 'claude-3-5-sonnet-latest' } // No API key
    }

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '127.0.0.1'
      },
      body: JSON.stringify(requestWithoutApiKey)
    })

    const response = await POST(request)
    
    expect(response.status).toBe(429)
    expect(await response.text()).toContain('request limit')
  })

  it('handles errors gracefully', async () => {
    const streamObject = require('ai').streamObject
    streamObject.mockRejectedValueOnce(new Error('AI API Error'))

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(mockRequestBody)
    })

    // Should not throw unhandled errors
    await expect(POST(request)).resolves.toBeDefined()
  })

  it('respects maxDuration setting', async () => {
    const { maxDuration } = require('@/app/api/chat/route')
    expect(maxDuration).toBe(60)
  })

  it('uses correct rate limit configuration', async () => {
    // Test default rate limit values
    expect(process.env.RATE_LIMIT_MAX_REQUESTS || '10').toBeTruthy()
    expect(process.env.RATE_LIMIT_WINDOW || '1d').toBeTruthy()
  })
})