import { createContext, useContext } from 'react'

import {
  ALERT_TYPES,
  NO_ALERT_STATE,
  handleAxiosError,
  ALERT_TIMEOUT,
  ERROR_ALERT_TIMEOUT,
} from '@/features/alert'

/**
 * The context object for the alert state.
 *
 * @typedef {Object} AlertContextObject
 */
const AlertContext = createContext(NO_ALERT_STATE)
export default AlertContext

/**
 * The reducer function for the alert state.
 *
 * @function alertReducer
 * @param {Object} state - The current state of the alert.
 * @param {Object} action - The action object to apply to the state.
 * @param {string} action.type - The type of the action.
 * @param {Object} action.payload - The payload of the action.
 * @param {string} action.payload.type - The type of the alert (e.g. 'info', 'warning', 'error').
 * @param {string} action.payload.message - The message to display in the alert.
 * @param {string} action.payload.details - Optional details to display in the alert.
 * @param {Error} action.payload.error - Optional error object to include in the alert.
 * @param {number} action.payload.timeoutId - Optional ID of the timeout for the alert.
 * @returns {Object} The new state of the alert.
 */
export const alertReducer = (state, action) => {
  switch (action.type) {
    case 'alert/setAlert':
      return {
        type: action.payload.type,
        message: action.payload.message,
        details: action.payload.details,
        error: action.payload.error,
        timeoutId: action.payload.timeoutId,
      }
    case 'alert/setErrorAlert':
      return {
        type: action.payload.type,
        message: action.payload.message,
        details: action.payload.details,
        error: action.payload.error,
        timeoutId: action.payload.timeoutId,
      }
    case 'alert/removeAlert':
      return NO_ALERT_STATE
    default:
      return state
  }
}

/**
 * A hook that returns the current alert state from the alert context.
 *
 * @function useAlertValue
 * @returns {Object} The current alert state from the alert context.
 * @throws {Error} If used outside of an AlertContextProvider.
 */
export const useAlertValue = () => {
  const context = useContext(AlertContext)

  return context.alert
}

/**
 * A hook that returns the dispatch function from the alert context.
 *
 * @function useAlertDispatch
 * @returns {Function} The dispatch function from the alert context.
 */
export const useAlertDispatch = () => {
  const context = useContext(AlertContext)

  return context.dispatch
}

/**
 * A hook that returns the dispatch function from the alert context.
 *
 * @function useAlertDispatch
 * @returns {Function} The dispatch function from the alert context.
 * @throws {Error} If used outside of an AlertContextProvider.
 */
export const useSetAlert = () => {
  const dispatch = useAlertDispatch()
  const alertValue = useAlertValue()

  const setAlert = ({
    type,
    message,
    details,
    timeoutInSeconds = ALERT_TIMEOUT,
  }) => {
    if (alertValue.timeoutId) {
      clearTimeout(alertValue.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'alert/removeAlert' })
    }, timeoutInSeconds * 1000)

    return {
      type: 'alert/setAlert',
      payload: {
        type,
        message,
        details,
        error: null,
        timeoutId,
      },
    }
  }

  return setAlert
}

/**
 * A hook that returns the setErrorAlert function, which can be used to
 * set an error alert.
 *
 * @function useSetErrorAlert
 * @returns {Function} The setErrorAlert function.
 */
export const useSetErrorAlert = () => {
  const dispatch = useAlertDispatch()
  const alertValue = useAlertValue()

  const setErrorAlert = ({
    error,
    message,
    details,
    timeoutInSeconds = ERROR_ALERT_TIMEOUT,
  }) => {
    if (alertValue.timeoutId) {
      clearTimeout(alertValue.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'alert/removeAlert' })
    }, timeoutInSeconds * 1000)

    const payload = handleAxiosError(error, message, details)

    payload.type = ALERT_TYPES.ERROR
    payload.timeoutId = timeoutId

    return {
      type: 'alert/setAlert',
      payload: payload,
    }
  }

  return setErrorAlert
}

/**
 * Returns an action object to remove the current alert from the alert state.
 *
 * @function removeAlert
 * @returns {Object} An action object to remove the current alert.
 */
export const removeAlert = () => {
  return {
    type: 'alert/removeAlert',
  }
}

/**
 * A hook that returns the `removeAlert` function, which can be used to remove the current alert from the alert state.
 *
 * @function useRemoveAlert
 * @returns {Function} The `removeAlert` function.
 */
export const useRemoveAlert = () => {
  return removeAlert
}
