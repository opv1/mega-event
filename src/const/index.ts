import { OptionsType, QuestionnaireType } from '../types'

export const fontsForLoad = [
  '500 50px Halvar Breit',
  '400 28px Halvar Breit',
  '400 18px PT Root UI',
  '400 14px PT Root UI',
]

export const regexpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/

export const regexpBirthday =
  /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/

export const regexpPhone = /^((\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{10}$/

export const MEMBER_VALUES = {
  [QuestionnaireType.Individual]: 'Физ. лицо',
  [QuestionnaireType.Entity]: 'Юр. лицо',
}

export const OPTIONS_VALUES = {
  [OptionsType.Parking]: 'Нужна парковка',
  [OptionsType.Handout]: 'Хочу получить раздаточный материал',
  [OptionsType.Help]: 'Нужна помощь сопровождающего',
}
