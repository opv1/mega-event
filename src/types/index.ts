export interface IErrors {
  [key: string]: string
}

export interface ILogin {
  email: string
  password: string
}

type IType = 'individual' | 'entity'

export interface IIndividualValues {
  type: IType
  name: string
  birthday: string
  phone: string
  date: string
  options: IOptions
}

export interface IEntityValues {
  type: IType
  name: string
  position: string
  phone: string
  date: string
  options: IOptions
}

export interface IOptions {
  parking: boolean
  handout: boolean
  help: boolean
}

export type DataType = IIndividualValues & IEntityValues
