import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { useAlertValue, AlertContextProvider } from '@/features/alert'

describe('<AlertContextProvider />', () => {
  it('should render its children', () => {
    const ChildComponent = () => <div>Child component</div>

    const container = render(
      <AlertContextProvider>
        <ChildComponent />
      </AlertContextProvider>
    ).container

    expect(container.firstChild).toHaveTextContent('Child component')
  })

  it('should provide the alert context to its children', () => {
    const ChildComponent = () => {
      const alert = useAlertValue()

      return (
        <div>
          Alert type: {alert.type}, Alert message: {alert.message}
        </div>
      )
    }
    const container = render(
      <AlertContextProvider>
        <ChildComponent />
      </AlertContextProvider>
    ).container

    expect(container.firstChild).toHaveTextContent(
      'Alert type: , Alert message:'
    )
  })
})
