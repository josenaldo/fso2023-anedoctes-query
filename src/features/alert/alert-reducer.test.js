import { renderHook } from '@testing-library/react-hooks'
import {
  NO_ALERT_STATE,
  AlertContext,
  useAlertValue,
  useAlertDispatch,
  alertReducer,
} from '@/features/alert'

// Test for useAlertValue hook
describe('useAlertValue hook', () => {
  it('does not throw error when wrapped in AlertContextProvider', () => {
    const wrapper = ({ children }) => (
      <AlertContext.Provider value={{ alert: 'test' }}>
        {children}
      </AlertContext.Provider>
    )
    const { result } = renderHook(() => useAlertValue(), { wrapper })
    expect(result.error).toBeUndefined()
  })
})

// Test for useAlertDispatch hook
describe('useAlertDispatch hook', () => {
  it('does not throw error when wrapped in AlertContextProvider', () => {
    const wrapper = ({ children }) => (
      <AlertContext.Provider value={{ dispatch: jest.fn() }}>
        {children}
      </AlertContext.Provider>
    )
    const { result } = renderHook(() => useAlertDispatch(), { wrapper })
    expect(result.error).toBeUndefined()
  })
})

// Test for alertReducer
describe('alertReducer', () => {
  it('returns correct state for alert/setAlert action', () => {
    const state = {}
    const action = {
      type: 'alert/setAlert',
      payload: {
        type: 'info',
        message: 'message',
        details: 'details',
        error: 'error',
        timeoutId: 1,
      },
    }
    const expectedState = action.payload
    expect(alertReducer(state, action)).toEqual(expectedState)
  })

  it('returns correct state for alert/removeAlert action', () => {
    const state = {}
    const action = {
      type: 'alert/removeAlert',
    }
    const expectedState = NO_ALERT_STATE
    expect(alertReducer(state, action)).toEqual(expectedState)
  })

  it('returns current state for unknown action', () => {
    const state = {}
    const action = {
      type: 'unknown',
    }
    expect(alertReducer(state, action)).toBe(state)
  })
})
