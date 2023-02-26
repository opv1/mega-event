import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  isAuth: boolean
  isIndividual: boolean
  data: any
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isAuth: false,
    isIndividual: true,
    data: {},
  } as IInitialState,
  reducers: {
    setIsIndividual(state, { payload }) {
      state.isIndividual = payload
    },
    setData(state, { payload }) {
      state.data = payload
    },
  },
})

export const { setIsIndividual, setData } = appSlice.actions

export default appSlice.reducer
