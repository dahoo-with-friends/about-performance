import { lazy } from 'react'
 
const CustomMonitor = lazy(() => import('@/pages/Monitor/CustomMonitor'))
const WarningHistory = lazy(() => import('@/pages/Monitor/WarningHistory'))

const Login = lazy(() => import('@/pages/Login'))
const Error = lazy(() => import('@/pages/Error/error'))

const routes = [
  // 监控中心
  { path: '/customMonitor', component: CustomMonitor }, // 自定义监控
  { path: '/warningHistory', component: WarningHistory }, // 预警历史详情页
  // 预警中心
  { path: '/login', component: Login },
]

const settings = [{ path: '/setconfig', component: Error }]

export default [...routes, ...settings]
