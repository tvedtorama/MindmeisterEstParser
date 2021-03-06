// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Node from './containers/Node'
import Filter from './containers/Filter'
import configureStore from './store/configureStore'
import {State} from './state'

let tree = (new State(window.initialReactProps)).generateStateAndApplyParent()
State.generateAutoPropsRecursive(window.initialReactProps, tree)
const store = configureStore(tree)

render(
  <Provider store={store}>
  	<div>
		<Filter />
		<Node item={initialReactProps} />
    </div>
  </Provider>,
  document.getElementById('root')
)
