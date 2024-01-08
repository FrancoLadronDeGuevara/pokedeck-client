import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'
import { routes, adminRoutes, protectedRoutes } from './routes'
import Error404Page from './pages/Error404Page'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import AdminRoutes from './AdminRoutes'
import ProtectedRoutes from './ProtectedRoutes'

const persistor = persistStore(store)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {
        routes.map(({ Element, path }) => (
          <Route key={path} path={path} element={<Element />} />
        ))
      }
      <Route path='*' element={<Error404Page />} />
      <Route element={<AdminRoutes/>}>
        {adminRoutes.map(({Element, path}) => (
          <Route key={path} path={path} element={<Element/>}/>
        ))}
      </Route>
      <Route element={<ProtectedRoutes/>}>
        {protectedRoutes.map(({Element, path}) => (
          <Route key={path} path={path} element={<Element/>}/>
        ))}
      </Route>
    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
