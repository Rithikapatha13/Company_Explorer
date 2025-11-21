import React from 'react'
import "./style/app.css"
import { Provider } from 'react-redux'
import { store } from './components/store/Store'
import { RouterProvider } from 'react-router-dom'
import routes from './components/pages/routes/routes'

const App = () => {
  return (
 <Provider store={store}>
    <RouterProvider router={routes}></RouterProvider>
 </Provider>
  )
}

export default App