export enum INPUT_TYPE {
  email = 'email',
  password = 'password',
  name = 'name',
  phone = 'phone',
  date = 'date',
  birthday = 'birthday',
  position = 'position',
}

export enum QUESTIONNAIRE_TYPE {
  individual = 'individual',
  entity = 'entity',
}

export enum OPTIONS_TYPE {
  parking = 'parking',
  handout = 'handout',
  help = 'help',
}

export type OptionsObjectType = {
  parking: boolean
  handout: boolean
  help: boolean
}

type IndividualValuesType = {
  type: QUESTIONNAIRE_TYPE.individual | QUESTIONNAIRE_TYPE.entity
  name: string
  birthday: string
  phone: string
  date: string
  options: OptionsObjectType
}

type EntityValuesType = {
  type: QUESTIONNAIRE_TYPE.individual | QUESTIONNAIRE_TYPE.entity
  name: string
  position: string
  phone: string
  date: string
  options: OptionsObjectType
}

export type InfoType = IndividualValuesType & EntityValuesType
