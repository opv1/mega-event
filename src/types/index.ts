export interface ErrorsInterface {
  [key: string]: string
}

export interface LoginInterface {
  email: string
  password: string
}

export enum QuestionnaireType {
  Individual = 'individual',
  Entity = 'entity',
}

export enum OptionsType {
  Parking = 'parking',
  Handout = 'handout',
  Help = 'help',
}

export type OptionsObjectType = {
  parking: boolean
  handout: boolean
  help: boolean
}

export type IndividualValuesType = {
  type: QuestionnaireType.Individual | QuestionnaireType.Entity
  name: string
  birthday: string
  phone: string
  date: string
  options: OptionsObjectType
}

export type EntityValuesType = {
  type: QuestionnaireType.Individual | QuestionnaireType.Entity
  name: string
  position: string
  phone: string
  date: string
  options: OptionsObjectType
}

export type DataType = IndividualValuesType & EntityValuesType
