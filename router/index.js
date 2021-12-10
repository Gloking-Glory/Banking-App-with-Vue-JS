import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/BankReg';
import Login from '../views/BankLogin';
import Home from '../views/BankHome';
import Profile from '../components/BankProfile'
const routes = [
  {
    path: '/',
    component: Register,
    name: 'register'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/home',
    component: Home,
    name: "home"

  },
  {
    path: '/profile',
    component: Profile,
    name: "profile"
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
