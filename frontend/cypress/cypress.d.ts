import { mount } from 'cypress/react'

import { QUESTIONNAIRE_TYPE } from '@types'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      login(email: string, password: string): Chainable<void>
      questionnaire(
        type: QUESTIONNAIRE_TYPE,
        name: string,
        position: string,
        phone: string,
        date: string,
        options: string[],
      ): Chainable<void>
      success(
        type: QUESTIONNAIRE_TYPE,
        name: string,
        position: string,
        phone: string,
        date: string,
        options: { [key: string]: string },
      ): Chainable<void>
    }
  }
}
