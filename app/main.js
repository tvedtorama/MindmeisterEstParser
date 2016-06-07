// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Node from './containers/Node'
import configureStore from './store/configureStore'
import {State} from './state'

let tree = (new State(window.initialReactProps)).generateStateAndApplyParent()
State.generateAutoPropsRecursive(window.initialReactProps, tree)
const store = configureStore(tree)

render(
  <Provider store={store}>
    <Node item={initialReactProps} />
  </Provider>,
  document.getElementById('root')
)
