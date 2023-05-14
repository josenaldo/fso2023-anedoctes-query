import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Alert from './Alert'
import { AlertContext, ALERT_TYPES } from '@/features/alert'

// Mock the context
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AlertContext.Provider {...providerProps}>{ui}</AlertContext.Provider>,
    renderOptions
  )
}

describe('Alert component', () => {
  it('does not render if there is no alert message', () => {
    const providerProps = {
      value: { alert: { message: null }, dispatch: jest.fn() },
    }
    const { queryByRole } = customRender(<Alert />, { providerProps })
    expect(queryByRole('alert')).toBeNull()
  })

  it('renders the alert message', () => {
    const providerProps = {
      value: { alert: { message: 'Test alert' }, dispatch: jest.fn() },
    }
    const { getByRole } = customRender(<Alert />, { providerProps })
    expect(getByRole('alert')).toHaveTextContent('Test alert')
  })

  it('closes the alert when the close button is clicked', async () => {
    const dispatchMock = jest.fn()
    const providerProps = {
      value: { alert: { message: 'Test alert' }, dispatch: dispatchMock },
    }
    const { getByRole } = customRender(<Alert />, { providerProps })
    await userEvent.click(getByRole('button'))
    expect(dispatchMock).toHaveBeenCalled()
  })

  it('displays the correct alert type', () => {
    const providerProps = {
      value: {
        alert: { message: 'Test alert', type: ALERT_TYPES.ERROR },
        dispatch: jest.fn(),
      },
    }
    const { getByRole } = customRender(<Alert />, { providerProps })
    expect(getByRole('alert')).toHaveClass('alertError')
  })
})
