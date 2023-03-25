import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import ProductList from "../views/products/List.vue"
import ProductForm from "../views/products/Form.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'product-list',
    component: ProductList,
    // children: [
    //   {
    //     path:'',

    //   },
    //   {
    //     path: '/create',
    //     name: 'product-create',
    //     component: ProductForm,
    //   },
    // ]
  },
  {
    path: '/products/create',
    name: 'product-create',
    component: ProductForm,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
