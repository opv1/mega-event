import React from 'react'

import { Input } from 'components/UI/Input'

describe('Input', () => {
  it('Input email', () => {
    cy.mount(
      <Input
        type='email'
        name='email'
        placeholder='E-mail'
        validationRules='required|email'
      />,
    )

    cy.get('input').invoke('attr', 'type').should('eq', 'email')
    cy.get('input').invoke('attr', 'name').should('eq', 'email')
    cy.get('input').invoke('attr', 'placeholder').should('eq', 'E-mail')

    cy.get('input').type('example@mail.com')
    cy.get('input').should('be.focused')
    cy.get('input').should('have.css', 'border', '2px inset rgb(118, 118, 118)')
    cy.get('input').should('have.value', 'example@mail.com')
  })
})
