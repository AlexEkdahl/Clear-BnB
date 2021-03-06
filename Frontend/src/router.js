import { createRouter, createWebHistory } from 'vue-router'

// import views

import Home from './views/Home.vue'
import Detail from './views/HousingDetail.vue'
import Overview from './views/Overview.vue'
import AddHouse from './views/AddHouse.vue'
import MyPage from './views/MyPage.vue'
import MyBookings from './views/MyBookings.vue'
import MyHouses from './views/MyHouses.vue'
import EditUser from './components/EditUser.vue'

// create routes with views
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: Home,
    },
    {
      path: '/details/:id',
      component: Detail,
    },

    {
      path: '/my-page/add-house',
      component: AddHouse,
    },
    {
      path: '/accommodations',
      component: Overview,
    },
    {
      path: '/my-page',
      component: MyPage,
    },
    {
      path: '/my-page/my-bookings',
      component: MyBookings,
    },
    {
      path: '/my-page/my-houses',
      component: MyHouses,
    },
    {
      path: '/my-page/edit-user',
      component: EditUser,
    }
  ],
})
