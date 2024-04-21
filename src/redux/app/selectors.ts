import { RootState } from '../store'

export const selectAppIsAuth = (state: RootState) => state.app.isAuth
export const selectAppQuestionnaireType = (state: RootState) =>
  state.app.questionnaireType
export const selectAppInfo = (state: RootState) => state.app.info
