import { createSlice } from '@reduxjs/toolkit'

import { InfoType, QUESTIONNAIRE_TYPE } from 'types'

type InitialStateType = {
  isAuth: boolean
  questionnaireType: QUESTIONNAIRE_TYPE
  info: InfoType
}

const initialState: InitialStateType = {
  isAuth: false,
  questionnaireType: QUESTIONNAIRE_TYPE.individual,
  info: {} as InfoType,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppIsAuth(state, { payload }) {
      state.isAuth = payload
    },
    setQuestionnaireType(state, { payload }) {
      state.questionnaireType = payload
    },
    setAppInfo(state, { payload }) {
      state.info = payload
    },
  },
})

export const { setAppIsAuth, setQuestionnaireType, setAppInfo } =
  appSlice.actions

export default appSlice.reducer
