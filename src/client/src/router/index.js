import PostNow from '../page/PostNow'
import Login from '../page/Login'
import Register from '../page/Register'
import Layout from '../page/Layout'
import Home from "../page/Home";
import About from '../page/About'
import NotFound from '../page/NotFound'

import { createBrowserRouter, createHashRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 设置为默认二级路由 一级路由访问的时候，它也能得到渲染
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: '/postNow',
        element: <PostNow />
      },
      {
        path: '/postNow/:id/:name',
        element: <PostNow />
      },
      {
        path: '/register',
        element: <Register />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

console.log(router)

export default router