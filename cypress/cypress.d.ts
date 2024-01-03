import { mount } from 'cypress/react'

import { QuestionnaireType } from 'types'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      login(email: string, password: string): Chainable<void>
      questionnaire(
        type: QuestionnaireType,
        name: string,
        position: string,
        phone: string,
        date: string,
        options: string[],
      ): Chainable<void>
      success(
        type: QuestionnaireType,
        name: string,
        position: string,
        phone: string,
        date: string,
        options: { [key: string]: string },
      ): Chainable<void>
    }
  }
}
