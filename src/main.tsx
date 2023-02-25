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

// TODO select mixins
// TODO other font family
// TODO date fns
// TODO components reused
// TODO useMemo and useCallback
// TODO auth and protected routes
// TODO without any
// TODO eslint
// TODO phone mask
// TODO custom datepicker
// TODO adaptive
