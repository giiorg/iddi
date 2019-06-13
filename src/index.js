import React from 'react'
import ReactDOM from 'react-dom'
/**
 * Note:
 *
 * SnackbarProvider produces warning:
 * SnackbarProvider: prop type `TransitionComponent` is invalid; it must be a function, usually from the `prop-types` package, but received `undefined`.
 *
 * It's a known issue and will be resolved when this pull request will be merged
 * https://github.com/iamhosseindhv/notistack/pull/130
 */
import { SnackbarProvider } from 'notistack'
import App from './components/App'

ReactDOM.render(
  <SnackbarProvider maxSnack={1}>
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
)
