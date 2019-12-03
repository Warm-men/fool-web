import { lazy } from 'react'

export const routes = [
  {
    path: '/',
    component: lazy(() => import('src/containers/home'))
  },
  {
    path: '/index',
    component: lazy(() => import('src/containers/home'))
  }
]
