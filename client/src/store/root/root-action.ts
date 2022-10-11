// Types
import { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/root/root-state'

export const setSocketConnect = (state: RootState, action: PayloadAction<boolean>) => {
  state.isSocketConnected = action.payload
}
