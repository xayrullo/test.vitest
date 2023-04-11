import { createRouter, createWebHistory } from 'vue-router'

import AppVue from '@/App.vue'
import HomeVue from '@/views/Home.vue'
import { mount } from '@vue/test-utils'

describe('App', () => {
  it('renders component via routing', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          component: HomeVue
        }
      ]
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(AppVue, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.findComponent(HomeVue).exists()).toBe(true)
  })
})
