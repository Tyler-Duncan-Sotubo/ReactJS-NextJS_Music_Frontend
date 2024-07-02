import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from '@/app/(auth)/forgot-password/page'

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

describe('Forgot Password', () => {
    describe('Render', () => {
        it('should render the email input', () => {
            expect(screen.getByLabelText('Email')).toBeInTheDocument()
        })
        it('should render the submit button', () => {
            expect(
                screen.getByRole('button', { name: 'Email Password Reset' }),
            ).toBeInTheDocument()
        })
    })

    describe('Functionality', () => {
        it('should accept an email address input', () => {
            const emailInput = screen.getByLabelText('Email')
            emailInput.value = 'example@gmail.com'
            expect(emailInput).toHaveValue('example@gmail.com')
        })
    })
})
