import { mount } from 'cypress/react18'

import './commands'

Cypress.Commands.add('mount', (component, options) => mount(component, options))
