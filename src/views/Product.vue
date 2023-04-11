<template>
  <main class="max-w-[900px] m-auto bg-gray-5 pt-1 pb-10 md:bg-white md:pt-0">
    <div
      class="p-4 bg-white pb-4 sticky top-0 md:flex md:justify-between md:py-0 md:mb-8 md:relative main-top"
      :class="{ 'scroll-active': isFixed }"
    >
      <div class="flex md:border-0 md:pb-0 md:mb-0 md:max-w-[544px] nested-block">
        <div
          class="min-w-[72px] h-[72px] rounded-[10px] mr-[14px] flex items-center justify-center relative md:mr-5 product-img"
        >
          <img :src="IMAGE_URL + product.image" :alt="product.name" class="absolute" />
        </div>
        <div class="text-sm pt-1 font-medium md:text-2xl">
          {{ product.name }}
        </div>
      </div>
      <div class="hidden md:block">
        <div class="flex items-center" v-if="product.f_old_price">
          <div class="text-gray-1 text-lg old-cost relative mr-4">
            {{ product.f_old_price }}
          </div>
          <div class="bg-red-1 py-1 px-1.5 text-white text-[10px] rounded hidden">-28%</div>
        </div>
        <div class="text-2xl font-semibold">
          {{ product.f_sale_price }}
        </div>
      </div>
    </div>
    <div class="rounded-b-[24px] bg-white mb-2 p-4 border-t border-gray-2 md:hidden">
      <div class="flex items-center" v-if="product.f_old_price">
        <div class="text-gray-1 text-lg old-cost relative mr-4">
          {{ product.f_old_price }}
        </div>
        <div class="bg-red-1 py-1 px-1.5 text-white text-[10px] rounded hidden">-28%</div>
      </div>
      <div class="text-2xl font-semibold">
        {{ product.f_sale_price }}
      </div>
    </div>
    <div class="p-4 bg-white rounded-3xl mb-2 md:py-7 md:px-8 md:border md:border-gray-2 md:mb-6">
      <div class="mb-[14px] font-medium md:mb-5 md:text-xl">
        {{ $t('installment_options') }}
      </div>
      <div class="flex items-center mb-3 overflow-x-auto">
        <button
          class="py-1 px-[14px] text-sm border-2 border-gray-2 rounded-[10px] text-gray-1 font-medium mr-2 md:px-[18px] whitespace-nowrap"
          :class="active === 'All' ? 'text-white bg-gray-600 border-gray-600' : ''"
          @click="partnerFilter('All')"
        >
          {{ $t('all') }}
        </button>
        <button
          class="py-1 px-[14px] text-sm border-2 border-gray-2 rounded-[10px] text-gray-1 font-medium mr-2 md:px-[18px] whitespace-nowrap"
          v-for="month in partners_months"
          :key="month"
          @click="partnerFilter(month)"
          :class="active === month ? 'text-white bg-gray-600 border-gray-600' : ''"
        >
          {{ month }} {{ $t('month') }}
        </button>
      </div>
      <div class="overflow-x-auto">
        <div class="w-[576px] sm:w-full">
          <div class="flex items-center py-[14px]">
            <div class="text-sm font-medium w-[20%] sm:w-[25.31%]">
              {{ $t('partners') }}
            </div>
            <div class="text-sm font-medium w-[11%] sm:w-[16.74%]">
              {{ $t('term') }}
            </div>
            <div class="text-sm font-medium w-[19%] sm:w-[20.33%]">
              {{ $t('per_month') }}
            </div>
            <div class="text-sm font-medium w-[27%] sm:w-[23.92%]">
              {{ $t('prepayment') }}
            </div>
            <div class="text-sm font-medium w-[18%] sm:w-[13.68%]">
              {{ $t('total') }}
            </div>
          </div>
          <div
            class="flex items-center py-[14px] border-t border-gray-2"
            v-for="(partner, index) in filterPartners"
            :key="index"
          >
            <div class="w-[20%] sm:w-[25.31%]">
              <img :src="IMAGE_URL + partner.logo" alt="partner.name" class="w-[95px] h-[26px]" />
            </div>
            <div class="text-sm w-[11%] sm:w-[16.74%]">
              {{ partner.f_duration }}
            </div>
            <div class="text-sm w-[19%] sm:w-[20.33%]">
              {{ partner.f_monthly_sum }}
              {{ $t('sum') }}
            </div>
            <div class="text-sm w-[27%] sm:w-[23.92%]">
              {{ $t('we_will_clarify_when_buying') }}
            </div>
            <div class="text-sm w-[18%] font-medium sm:w-[13.68%]">
              {{ partner.f_total_loan_price }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 bg-white rounded-3xl md:py-7 md:px-8 md:border md:border-gray-2">
      <div class="text-lg font-medium mb-[14px] md:mb-6 md:text-xl">Характеристики товара</div>
      <div class="mb-6 md:mb-8 last:mb-0" v-for="attribute in attributes" :key="attribute.id">
        <div class="font-medium mb-4 md:mb-5">{{ attribute.title }}</div>
        <div class="text-sm flex flex-wrap justify-between">
          <div
            class="flex items-center mb-4 pb-1.5 border-b border-gray-4 border-dashed w-full md:w-[45%]"
            v-for="item in attribute.attributes"
            :key="item.attribute_id"
          >
            <div class="w-1/2 pr-2 text-gray-1">{{ item.attribute_name }}</div>
            <div class="w-1/2 pl-2">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { useHead } from '@vueuse/head'

import Header from '@/components/Header.vue'
import axios from '@/plugins/axios';
import type { IProduct } from '@/types/Product';
import type { IGetResponse } from '@/types/GetResponse';
import { IMAGE_URL } from '@/utils/constants'

const route = useRoute()
const attributes: Ref<any> = ref([])
const product: Ref<IProduct> = ref({} as IProduct)
const active = ref('All')
const partners_months = ref([])
const partners: Ref<any> = ref([])
const filterPartners: Ref<any> = ref([])

const isFixed: Ref<Boolean> = ref(false)

function partnerFilter(month: any) {
  active.value = month
  if (month === 'All') {
    filterPartners.value = partners.value
  } else {
    filterPartners.value = partners.value.filter((item: any) => item.duration === month)
  }
}

function handleScroll() {
  const scrollTop: number = window.scrollY
  if (scrollTop > 50) {
    requestAnimationFrame(() => {
      isFixed.value = true
    })
  } else {
    requestAnimationFrame(() => {
      isFixed.value = false
    })
  }
}

onMounted(() => {
  if (window.innerWidth < 768) {
    window.addEventListener('scroll', handleScroll)
  }
  axios.get(`api/application/stock/detail-main?product_id=${route.params.id}`).then(res => {
    product.value = res.data.data.product
    useHead({
      title: product.value.name
    })
  })

  axios
    .post(`front-api/loan-info/stock`, {
      guid: route.params.id
    })
    .then((response) => {
      partners_months.value = response.data.data.months
      partners.value = response.data.data.partners.flatMap((item: any) => {
        return item.months.map((month: any) => {
          return {
            name: item.name,
            type: item.type,
            logo: item.logo,
            description: item.description,
            duration: month.duration,
            f_duration: month.f_duration,
            f_monthly: month.f_monthly,
            f_monthly_sum: month.f_monthly_sum,
            f_total_loan_price: month.f_total_loan_price,
            total_loan_price: month.total_loan_price,
            available: month.available,
            promotion: month.promotion
          }
        })
      })
      filterPartners.value = partners.value
    })
  axios
    .get(`api/application/stock/detail-descriptions?product_id=${route.params.id}`)
    .then((response) => {
      console.log('Attributes: ', response)
      attributes.value = response.data.data.attributes
    })
})

// seo start

// seo finish
</script>
<style>
.main-top {
  transition: all 0.1s ease;
}

.scroll-active {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  padding: 8px 16px !important;
  transition: all 0.3s ease;
}
.scroll-active .product-img {
  min-width: 60px;
  height: 60px;
  transition: all 0.1s ease;
}

.old-cost::after {
  content: '';
  position: absolute;
  top: 12px;
  left: 0;
  border: 1px solid #ff4d4d;
  transform: rotate(-5deg);
  width: 100%;
}
.product-img:after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(8, 9, 10, 0.04);
  border-radius: 10px;
  z-index: 1;
}
.product-img img {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  padding: 4px 6px;
  max-width: 100%;
  max-height: 100%;
}
</style>
