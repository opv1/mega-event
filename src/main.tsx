import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { App } from 'components/App'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { store } from 'state/store'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
