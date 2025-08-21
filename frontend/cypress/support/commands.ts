/// <reference types="cypress" />

import { MEMBER_VALUES } from '@constants'

Cypress.Commands.add('login', (email, password) => {
  cy.get('form').within(() => {
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)

    cy.get('button').contains('Войти').click()
  })

  cy.url().should('include', '/questionnaire')
})

Cypress.Commands.add(
  'questionnaire',
  (type, name, position, phone, date, options) => {
    cy.get(`#${type}`).click()

    cy.get('form').within(() => {
      cy.get('input[name="name"]').type(name)
      cy.get('input[name="position"]').type(position)
      cy.get('input[name="phone"]').type(phone)

      cy.get('#select').within(() => {
        cy.get('#date').click()
        cy.get('ul li')
          .should('have.length', 4)
          .each(($elem) => {
            if ($elem.text() === date) {
              cy.wrap($elem).click()
              return
            }
          })
        cy.get('#date').should('have.text', date)
      })

      cy.get('div label')
        .should('have.length', 3)
        .each(($elem) => {
          const option = $elem.attr('for')

          if (option && options.includes(option)) {
            cy.wrap($elem).click()
          }
        })

      cy.get('button').contains('Отправить заявку').click()
    })

    cy.url().should('include', '/success')
  },
)

Cypress.Commands.add(
  'success',
  (type, name, position, phone, date, options) => {
    cy.contains('ФИО').next().should('have.text', name)
    cy.contains('Тип участника').next().should('have.text', MEMBER_VALUES[type])
    cy.contains('День мероприятия').next().should('have.text', date)
    cy.contains('Номер телфона').next().should('have.text', phone)
    cy.contains('Должность').next().should('have.text', position)

    cy.get('#options span')
      .should('have.length', Object.keys(options).length)
      .each(($elem) => {
        const option = $elem.attr('id')

        if (option) {
          cy.wrap($elem).should('have.text', options[option])
        }
      })

    cy.get('button').contains('Вернуться на главную').click()

    cy.url().should('include', '/')
  },
)
