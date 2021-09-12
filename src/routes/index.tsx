import { lazy } from 'react'
 
const Login = lazy(() => import('@/pages/Login'))
const Memory = lazy(() => import('@/pages/Memory'))
const Context = lazy(() => import('@/pages/Context'))
const Error = lazy(() => import('@/pages/Error/error'))

const routes = [
  { path: '/memory', component: Memory },
  { path: '/login', component: Login },
  { path: '/context', component: Context },
]

const settings = [{ path: '/setconfig', component: Error }]

export default [...routes, ...settings]
