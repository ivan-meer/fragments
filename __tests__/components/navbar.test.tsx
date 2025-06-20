// 🧪 NavBar Component Tests
import { render, screen, fireEvent } from '@testing-library/react'
import { NavBar } from '@/components/navbar'
import { Session } from '@supabase/supabase-js'

// Mock session data
const mockSession: Session = {
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    user_metadata: {
      avatar_url: 'https://example.com/avatar.jpg'
    }
  }
} as Session

describe('NavBar Component', () => {
  const defaultProps = {
    session: null,
    showLogin: jest.fn(),
    signOut: jest.fn(),
    onClear: jest.fn(),
    canClear: false,
    onUndo: jest.fn(),
    canUndo: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the E2B AGENT logo and title', () => {
    render(<NavBar {...defaultProps} />)
    
    expect(screen.getByAltText('E2B Agent')).toBeInTheDocument()
    expect(screen.getByText('E2B AGENT')).toBeInTheDocument()
  })

  it('shows sign in button when no session', () => {
    render(<NavBar {...defaultProps} />)
    
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('shows user avatar when session exists', () => {
    render(<NavBar {...defaultProps} session={mockSession} />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
    // Avatar should be rendered
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument()
  })

  it('calls showLogin when sign in button is clicked', () => {
    render(<NavBar {...defaultProps} />)
    
    fireEvent.click(screen.getByText('Sign in'))
    expect(defaultProps.showLogin).toHaveBeenCalledTimes(1)
  })

  it('disables undo button when canUndo is false', () => {
    render(<NavBar {...defaultProps} />)
    
    const undoButton = screen.getByRole('button', { name: /undo/i })
    expect(undoButton).toBeDisabled()
  })

  it('enables undo button when canUndo is true', () => {
    render(<NavBar {...defaultProps} canUndo={true} />)
    
    const undoButton = screen.getByRole('button', { name: /undo/i })
    expect(undoButton).not.toBeDisabled()
  })

  it('calls onUndo when undo button is clicked', () => {
    render(<NavBar {...defaultProps} canUndo={true} />)
    
    const undoButton = screen.getByRole('button', { name: /undo/i })
    fireEvent.click(undoButton)
    expect(defaultProps.onUndo).toHaveBeenCalledTimes(1)
  })

  it('disables clear button when canClear is false', () => {
    render(<NavBar {...defaultProps} />)
    
    const clearButton = screen.getByRole('button', { name: /clear chat/i })
    expect(clearButton).toBeDisabled()
  })

  it('enables clear button when canClear is true', () => {
    render(<NavBar {...defaultProps} canClear={true} />)
    
    const clearButton = screen.getByRole('button', { name: /clear chat/i })
    expect(clearButton).not.toBeDisabled()
  })

  it('calls onClear when clear button is clicked', () => {
    render(<NavBar {...defaultProps} canClear={true} />)
    
    const clearButton = screen.getByRole('button', { name: /clear chat/i })
    fireEvent.click(clearButton)
    expect(defaultProps.onClear).toHaveBeenCalledTimes(1)
  })

  it('has correct accessibility attributes', () => {
    render(<NavBar {...defaultProps} />)
    
    // Check for proper button roles and labels
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /clear chat/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })
})