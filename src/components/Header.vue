import type { LOCALES } from '@/utils/constants';

<template>
  <header class="px-4 md:border-b md:border md:mb-[50px]">
    <div class="h-[60px] max-w-[900px] w-full m-auto flex items-center justify-between">
      <img src="@/assets/images/svg/logo.svg" alt="texnomart" />
      <div class="bg-[#f8f8f8] rounded-[10px] p-[3px]">
        <button
          v-for="locale in LOCALES"
          :key="locale"
          class="uppercase text-[13px] font-medium py-1 px-[9px]"
          :class="i18n.global.locale.value === locale ? 'active' : ''"
          @click="changeLocale(locale)"
        >
          {{ locale }}
        </button>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { ref, onMounted, type Ref } from 'vue'
import { i18n, changeLocale } from '@/plugins/i18n'
import { LOCALES, STORAGE_NAME } from '@/utils/constants'

</script>
<style scoped>
.active {
    @apply bg-white rounded-lg text-gray-600 shadow
}
</style>