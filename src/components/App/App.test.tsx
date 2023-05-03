import React from 'react'
import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import { App } from './'

describe('App component', () => {
  it('Renders component', () => {
    render(<App />)
  })
})
