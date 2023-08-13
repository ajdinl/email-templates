import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react'
import { loginUser, registerUser } from '../api'
import { useRouter } from 'next/navigation'
import LoginForm from '../components/LoginForm'
import UserForm from '../components/UserForm'

jest.mock('../api')
jest.mock('next/navigation')

describe('UserForm', () => {
  beforeEach(() => {
    render(<UserForm />)
  })

  it('renders the form with the correct fields', () => {
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create Account' })
    ).toBeInTheDocument()
  })

  it('calls registerUser with the correct arguments on form submit', async () => {
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Create Account' })

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    expect(registerUser).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('displays an error message if registerUser throws an error', async () => {
    const errorMessage = 'An error occurred'
    registerUser.mockRejectedValueOnce(new Error(errorMessage))

    const submitButton = screen.getByRole('button', { name: 'Create Account' })
    fireEvent.click(submitButton)

    const errorElement = await screen.findByText(
      errorMessage,
      {},
      { timeout: 3000 }
    )

    expect(errorElement).toBeInTheDocument()
  })
})

describe('<LoginForm />', () => {
  it('renders', () => {
    render(<LoginForm />)
    expect(screen.getByText('Please Login')).toBeInTheDocument()
  })

  it('calls loginUser and redirects to home page on form submit', async () => {
    const mockLoginUser = jest.fn()
    loginUser.mockImplementation(mockLoginUser)
    useRouter.mockReturnValue({ push: jest.fn() })

    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    expect(mockLoginUser).toHaveBeenCalledWith({
      email: 'john.doe@example.com',
      password: 'password123',
    })
    expect(useRouter().push).toHaveBeenCalledWith('/')
  })

  it('shows error message if loginUser throws an error', async () => {
    const errorMessage = 'Invalid email or password'
    loginUser.mockRejectedValue(new Error(errorMessage))

    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    expect(await screen.findByText(errorMessage)).toBeInTheDocument()
  })
})
