export interface ILogin {
  email: string
  password: string
}

export interface IErrors {
  [key: string]: string
}

export interface IIndividualValues {
  type: 'individual'
  name: string
  birthday: string
  phone: string
  date: string
  options: IOptions
}

export interface IEntityValues {
  type: 'entity'
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

export interface IDate {}
