import { useReducer } from 'react'
import { AlertContext, alertReducer, NO_ALERT_STATE } from '@/features/alert'

/**
 * A provider component that wraps its children with an alert context.
 *
 * @function AlertContextProvider
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The child elements to wrap with the alert context.
 * @returns {JSX.Element} The alert context provider component.
 */
export const AlertContextProvider = ({ children }) => {
  const [alert, dispatch] = useReducer(alertReducer, NO_ALERT_STATE)

  return (
    <AlertContext.Provider value={{ alert, dispatch }}>
      {children}
    </AlertContext.Provider>
  )
}
