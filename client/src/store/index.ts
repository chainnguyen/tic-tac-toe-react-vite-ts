// Core
import { configureStore } from '@reduxjs/toolkit'
// Modules
import root from '@/store/root/root-slice'

export const store = configureStore({
  reducer: { root },
  devTools: { name: 'tic-tac-toe-game' },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
