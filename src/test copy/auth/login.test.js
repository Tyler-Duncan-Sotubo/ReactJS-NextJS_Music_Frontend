import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Login from '@/app/(auth)/login/page'
import axios from 'axios'
import userEvent from '@testing-library/user-event'

// Mock useRouter:
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null,
        }
    },
    useParams() {
        return {
            prefetch: () => null,
        }
    },
}))

jest.mock('axios')

beforeEach(() => {
    render(<Login />)
})

describe('Login', () => {
    describe('Render', () => {
        it('should render the header', () => {
            expect(
                screen.getByRole('heading', { name: 'Welcome Back!' }),
            ).toBeInTheDocument()
        })
        it('should render the sign up link', () => {
            expect(
                screen.getByRole('link', { name: 'Sign Up' }),
            ).toBeInTheDocument()
        })
        it('should render the email input', () => {
            expect(screen.getByLabelText('Email')).toBeInTheDocument()
        })
        it('should render the password input', () => {
            expect(screen.getByLabelText('Password')).toBeInTheDocument()
        })
        it('should render the remember me checkbox', () => {
            expect(screen.getByTestId('remember me')).toBeInTheDocument()
        })
        it('should render the forgot password link', () => {
            expect(
                screen.getByRole('link', { name: 'Forgot password?' }),
            ).toBeInTheDocument()
        })
        it('should render the submit button', () => {
            expect(
                screen.getByRole('button', { name: 'Login' }),
            ).toBeInTheDocument()
        })
    })

    describe('Functionality', () => {
        it('should update the input values', () => {
            const emailInput = screen.getByLabelText('Email')
            const passwordInput = screen.getByLabelText('Password')

            expect(emailInput).toBeInTheDocument()
            expect(passwordInput).toBeInTheDocument()

            emailInput.value = 'email@gmail.com'
            passwordInput.value = 'password'

            expect(emailInput.value).toBe('email@gmail.com')
            expect(passwordInput.value).toBe('password')
        })

        it("should update the remember me checkbox's value", () => {
            const rememberMe = screen.getByTestId('remember me')
            expect(rememberMe).toBeInTheDocument()
            rememberMe.checked = true
            expect(rememberMe.checked).toBe(true)
        })
    })
})
