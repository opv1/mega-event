export enum INPUT_TYPE {
  Email = 'email',
  Password = 'password',
  Name = 'name',
  Phone = 'phone',
  Date = 'date',
  Birthday = 'birthday',
  Position = 'position',
}

export enum QUESTIONNAIRE_TYPE {
  Individual = 'individual',
  Entity = 'entity',
}

export enum OPTIONS_TYPE {
  Parking = 'parking',
  Handout = 'handout',
  Help = 'help',
}

export type OptionsObjectType = {
  parking: boolean
  handout: boolean
  help: boolean
}

type IndividualValuesType = {
  type: QUESTIONNAIRE_TYPE.Individual | QUESTIONNAIRE_TYPE.Entity
  name: string
  birthday: string
  phone: string
  date: string
  options: OptionsObjectType
}

type EntityValuesType = {
  type: QUESTIONNAIRE_TYPE.Individual | QUESTIONNAIRE_TYPE.Entity
  name: string
  position: string
  phone: string
  date: string
  options: OptionsObjectType
}

export type InfoType = IndividualValuesType & EntityValuesType
