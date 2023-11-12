export interface ErrorsInterface {
  [key: string]: string
}

export interface LoginInterface {
  email: string
  password: string
}

export enum FormType {
  Individual = 'individual',
  Entity = 'entity',
}

export type OptionsType = {
  parking: boolean
  handout: boolean
  help: boolean
}

export type IndividualValuesType = {
  type: FormType.Individual | FormType.Entity
  name: string
  birthday: string
  phone: string
  date: string
  options: OptionsType
}

export type EntityValuesType = {
  type: FormType.Individual | FormType.Entity
  name: string
  position: string
  phone: string
  date: string
  options: OptionsType
}

export type DataType = IndividualValuesType & EntityValuesType
