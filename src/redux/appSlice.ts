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
    setIsAuth(state, { payload }) {
      state.isAuth = payload
    },
    setIsIndividual(state, { payload }) {
      state.isIndividual = payload
    },
    setData(state, { payload }) {
      state.data = payload
    },
  },
})

export const { setIsAuth, setIsIndividual, setData } = appSlice.actions

export default appSlice.reducer
