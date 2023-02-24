import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './components/App'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

// TODO styles
// TODO mixins typography and animations
// TODO font family
// TODO date fns
// TODO useMemo
// TODO click outside select
// TODO auth and protected routes
// TODO without any
// TODO eslint
// TODO phone mask
