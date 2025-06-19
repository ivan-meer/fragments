# Project Rules - E2B Fragments

## Coding Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Prefer functional components with hooks over class components
- Use proper type definitions, avoid `any` types
- Follow Next.js 14 app router conventions
- Use async/await instead of Promises chains
- Implement proper error handling with try-catch blocks

### React Patterns
- Use React hooks (useState, useEffect, useCallback, useMemo)
- Implement proper component composition
- Use React.memo for performance optimization when needed
- Follow the lifting state up principle
- Use context for global state management

### Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Use CSS modules or styled-components for complex styling
- Maintain consistent spacing and color schemes
- Use design tokens for consistent theming

### File Organization
- Group related files in logical directories
- Use barrel exports (index.ts) for clean imports
- Separate concerns: components, hooks, utils, types
- Keep API routes in the `app/api` directory
- Store types in dedicated `.types.ts` files

## E2B Sandbox Specific Rules

### Port Management
- Always use `sandbox.getHost(port)` to get the correct URL for sandbox services
- Check sandbox status with `sandbox.isRunning()` before attempting connections
- Implement proper error handling for connection refused errors
- Use appropriate wait times for sandbox initialization
- Handle sandbox lifecycle properly (create, connect, cleanup)

### Sandbox Best Practices
- Always check if sandbox is running before operations
- Use proper cleanup in useEffect hooks
- Implement retry logic for failed connections
- Handle sandbox timeouts gracefully
- Use appropriate sandbox templates for different use cases

### Error Handling
- Implement specific error handling for "Connection refused" errors
- Provide user-friendly error messages
- Log detailed error information for debugging
- Implement fallback mechanisms for failed sandbox connections
- Use proper error boundaries in React components

## API Design

### Endpoint Structure
- Use RESTful conventions for API endpoints
- Implement proper HTTP status codes
- Use consistent error response formats
- Add proper CORS headers when needed
- Implement rate limiting for API endpoints

### Data Validation
- Validate all incoming data
- Use proper schema validation (Zod or similar)
- Sanitize user inputs
- Implement proper authentication checks
- Handle edge cases gracefully

## Security Guidelines

### Authentication
- Use Supabase Auth for user authentication
- Implement proper session management
- Validate tokens on server-side
- Use secure cookie settings
- Implement proper logout functionality

### Data Protection
- Sanitize all user inputs
- Use environment variables for sensitive data
- Implement proper CSRF protection
- Use HTTPS in production
- Follow OWASP security guidelines

## Performance Optimization

### Frontend
- Use Next.js Image component for optimized images
- Implement proper loading states
- Use React.memo and useMemo for expensive operations
- Implement proper code splitting
- Optimize bundle size

### Backend
- Implement proper caching strategies
- Use database indexes appropriately
- Optimize API response times
- Implement proper pagination
- Use connection pooling for database connections

## Testing Guidelines

### Unit Testing
- Write tests for complex business logic
- Test error scenarios and edge cases
- Use proper mocking for external dependencies
- Maintain good test coverage
- Use descriptive test names

### Integration Testing
- Test API endpoints thoroughly
- Test sandbox integration scenarios
- Test authentication flows
- Test error handling paths
- Test performance under load

## Deployment Rules

### Environment Management
- Use proper environment variables
- Implement staging and production environments
- Use proper CI/CD pipelines
- Implement proper monitoring and logging
- Use proper backup strategies

### Version Control
- Use meaningful commit messages
- Create feature branches for new development
- Use pull requests for code reviews
- Tag releases properly
- Maintain clean commit history

## Documentation Standards

### Code Documentation
- Document complex functions and classes
- Use JSDoc for TypeScript/JavaScript
- Keep README files updated
- Document API endpoints
- Maintain changelog

### Architecture Documentation
- Document system architecture decisions
- Keep database schema documented
- Document integration patterns
- Maintain deployment guides
- Document troubleshooting procedures

## Troubleshooting Patterns

### Common Issues
- Port connection issues: Always check sandbox status first
- Authentication failures: Verify token validity
- Performance issues: Check for unnecessary re-renders
- Build failures: Verify TypeScript types
- Deployment issues: Check environment variables

### Debugging Strategies
- Use proper logging levels
- Implement error tracking
- Use browser dev tools effectively
- Monitor network requests
- Check console for errors

## User Experience Guidelines

### Interface Design
- Implement proper loading states
- Provide clear error messages
- Use consistent navigation patterns
- Implement proper accessibility features
- Follow responsive design principles

### Performance Expectations
- Page load times under 3 seconds
- Sandbox initialization within 5 seconds
- Smooth animations and transitions
- Proper error recovery mechanisms
- Responsive user interface