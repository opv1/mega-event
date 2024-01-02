import { getDates } from 'helpers/getDates'
import { inputMask } from 'helpers/inputMask'
import { OPTIONS_VALUES, OptionsType } from 'pages/Success/components/Options'

const email = 'example@mail.com'
const password = 'password'
const type = 'Юр. лицо'
const name = 'Rambler'
const position = 'Frontend'
const phone = '9951124357'
const phoneMask = inputMask(`+7${phone}`, '+7 (___) ___-__-__')
const date = getDates()[0]
const options = [OptionsType.Parking, OptionsType.Handout, OptionsType.Help]
const optionsValues = Object.fromEntries(
  Object.entries(OPTIONS_VALUES).filter(([key]) =>
    options.includes(key as OptionsType),
  ),
)

describe('Coding Mega Event', () => {
  it('Full script', () => {
    cy.visit('/')

    cy.login(email, password)
    cy.questionnaire(type, name, position, phone, date, options)
    cy.success(type, name, position, phoneMask, date, optionsValues)
  })
})
