import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import store from '@/main-store'

import { QueryClient, QueryClientProvider } from 'react-query'

import IndexPage from '@/pages'
import '@/styles/main.css'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <IndexPage />
    </Provider>
  </QueryClientProvider>
)
