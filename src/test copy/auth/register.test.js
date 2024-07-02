import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from '@/app/(auth)/register/page'

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
    render(<Page />)
})

describe('Register', () => {
    describe('Render', () => {
        it('should render the header', () => {
            expect(
                screen.getByRole('heading', { name: 'Create An Account' }),
            ).toBeInTheDocument()
        })
        it('should render the log in link', () => {
            expect(
                screen.getByRole('link', { name: 'Log in' }),
            ).toBeInTheDocument()
        })
        it('should render the name input', () => {
            expect(screen.getByLabelText('Name')).toBeInTheDocument()
        })
        it('should render the email input', () => {
            expect(screen.getByLabelText('Email')).toBeInTheDocument()
        })
        it('should render the password input', () => {
            expect(screen.getByLabelText('Password')).toBeInTheDocument()
        })
        it('should render the password confirmation input', () => {
            expect(
                screen.getByLabelText('Confirm Password'),
            ).toBeInTheDocument()
        })
        it('should render the terms of service checkbox', () => {
            expect(screen.getByTestId('agreeToTerms')).toBeInTheDocument()
        })
        it('should render the submit button', () => {
            expect(
                screen.getByRole('button', { name: 'Sign Up' }),
            ).toBeInTheDocument()
        })
    })

    describe('Form Functionality', () => {
        it('Form Inputs should be empty', () => {
            const nameInput = screen.getByLabelText('Name')
            const emailInput = screen.getByLabelText('Email')
            const passwordInput = screen.getByLabelText('Password')
            const passwordConfirmationInput = screen.getByLabelText(
                'Confirm Password',
            )
            const termsCheckbox = screen.getByTestId('agreeToTerms')

            expect(nameInput).toHaveValue('')
            expect(emailInput).toHaveValue('')
            expect(passwordInput).toHaveValue('')
            expect(passwordConfirmationInput).toHaveValue('')
            expect(termsCheckbox).not.toBeChecked()
        })

        it('Form Inputs should accept value', () => {
            const nameInput = screen.getByLabelText('Name')
            const emailInput = screen.getByLabelText('Email')
            const passwordInput = screen.getByLabelText('Password')
            const passwordConfirmationInput = screen.getByLabelText(
                'Confirm Password',
            )

            nameInput.value = 'John Doe'
            emailInput.value = 'example@gmail.com'
            passwordInput.value = 'password'
            passwordConfirmationInput.value = 'password'

            expect(nameInput).toHaveValue('John Doe')
            expect(emailInput).toHaveValue('example@gmail.com')
            expect(passwordInput).toHaveValue('password')
            expect(passwordConfirmationInput).toHaveValue('password')
        })

        it('Form checkbox should be checked', () => {
            const termsCheckbox = screen.getByTestId('agreeToTerms')
            termsCheckbox.checked = true
            expect(termsCheckbox).toBeChecked()
        })

        it('Form should display Agree To Terms Error', async () => {
            const nameInput = screen.getByLabelText('Name')
            const emailInput = screen.getByLabelText('Email')
            const passwordInput = screen.getByLabelText('Password')
            const passwordConfirmationInput = screen.getByLabelText(
                'Confirm Password',
            )

            nameInput.value = 'John Doe'
            emailInput.value = 'example@gmail.com'
            passwordInput.value = 'password'
            passwordConfirmationInput.value = 'password'

            const submitButton = screen.getByRole('button', { name: 'Sign Up' })
            await userEvent.click(submitButton)

            await waitFor(() => {
                expect(
                    screen.getByText('You must agree to the terms of service'),
                ).toBeInTheDocument()
            })
        })
    })
})
