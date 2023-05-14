import { configureStore } from '@reduxjs/toolkit'

import { alertReducer } from '@/features/alert'

const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
})

export default store
