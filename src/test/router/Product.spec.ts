import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

import AppVue from '@/App.vue'
import ProductVue from '@/views/Product.vue'
import { mount, config } from '@vue/test-utils'

config.global.mocks = {
  $t: (tKey: string) => tKey
}

describe('App', () => {
  it('renders a component via routing', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/product/:id',
          name: 'product',
          component: ProductVue
        }
      ]
    })
    router.push('/product/1')
    await router.isReady()
    const wrapper = mount(AppVue, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.findComponent(ProductVue).exists()).toBe(true)
  })
})
