import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  isIndividual: boolean
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isIndividual: true,
  } as IInitialState,
  reducers: {
    setIsIndividual(state, { payload }) {
      state.isIndividual = payload
    },
  },
})

export const { setIsIndividual } = appSlice.actions

export default appSlice.reducer
