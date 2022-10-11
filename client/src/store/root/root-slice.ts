// Core
import { createSlice } from '@reduxjs/toolkit'
// State
import { initialState } from '@/store/root/root-state'
import * as reducers from '@/store/root/root-action'

const root = createSlice({
  name: 'root',
  initialState,
  reducers,
})

export const { setSocketConnect } = root.actions;

export default root.reducer
