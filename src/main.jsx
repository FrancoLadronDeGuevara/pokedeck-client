import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'
import { routes } from './routes'
import Error404Page from './pages/Error404Page'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout/>}>
      {
        routes.map(({Element, path}) =>(
          <Route key={path} path={path} element={<Element/>}/>
        ))
      }
      <Route path='*' element={<Error404Page/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
