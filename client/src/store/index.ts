import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: { },
  devTools: {
    name: 'tic-tac-toe-game',
  },
})
