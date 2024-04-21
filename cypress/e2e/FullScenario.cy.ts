import { getDates } from 'helpers/getDates'
import { inputMask } from 'helpers/inputMask'

import { OPTIONS_VALUES } from 'const'
import { OPTIONS_TYPE, QUESTIONNAIRE_TYPE } from 'types'

const email = 'example@mail.com'
const invalidEmail = 'example@mail'
const password = 'password'
const invalidPassword = 'pass'
const type = QUESTIONNAIRE_TYPE.entity
const name = 'Rambler'
const position = 'HR'
const phone = '9951124357'
const phoneMask = inputMask(`+7${phone}`, '+7 (___) ___-__-__')
const date = getDates()[0]
const options = [OPTIONS_TYPE.parking, OPTIONS_TYPE.handout, OPTIONS_TYPE.help]
const optionsValues = Object.fromEntries(
  Object.entries(OPTIONS_VALUES).filter(([option]) =>
    options.includes(option as OPTIONS_TYPE),
  ),
)

describe('Coding Mega Event', () => {
  it('Full script', () => {
    cy.visit('/')

    cy.login(email, password)
    cy.questionnaire(type, name, position, phone, date, options)
    cy.success(type, name, position, phoneMask, date, optionsValues)
  })

  it('Check login', () => {
    cy.visit('/')

    cy.get('button').contains('Войти').should('be.disabled')

    cy.get('input[name="email"]').type(invalidEmail)
    cy.get('input[name="password"]').type(invalidPassword)

    cy.get('button').contains('Войти').click()

    cy.contains('Введите корректный email').should(
      'have.text',
      'Введите корректный email',
    )
    cy.contains('Должно быть от 8 символов').should(
      'have.text',
      'Должно быть от 8 символов',
    )

    cy.get('input[name="email"]').clear()
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').clear()
    cy.get('input[name="password"]').type(password)

    cy.get('button').contains('Войти').click()

    cy.url().should('include', '/questionnaire')
  })
})
