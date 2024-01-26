import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {blogStore} from "./redux/store/blog.js"

console.log(blogStore.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={blogStore}>
    <App />
  </Provider>
)
