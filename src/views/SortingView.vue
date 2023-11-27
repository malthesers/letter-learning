<template>
  <main :style="{ backgroundImage: `url(/src/assets/background/${letterStore.current?.images.background}.svg)` }"
    class="h-full px-20 bg-cover bg-center grid grid-cols-[1fr_2fr]">
    <img :src="`/src/assets/character/${letterStore.current?.images.character}.svg`" :alt="letterStore.current?.name"
      class="max-w-[30rem] h-auto mx-auto mt-auto">
    <div class="w-full h-full mx-auto grid grid-cols-2 grid-rows-3 gap-4 p-4">
      <div class="bg-slate-700 bg-opacity-70 p-4 rounded-3xl col-span-2">
        <p class="text-4xl text-center mb-4">Ting</p>
        <draggable v-model="unsortedItems" group="items" item-key="id" class="flex flex-wrap gap-4">
          <template #item="{ element }">
            <span class="text-2xl">{{ element }}</span>
          </template>
        </draggable>
      </div>
      <!-- Correct Container -->
      <div class="bg-green bg-opacity-70 p-4 row-span-2 rounded-3xl">
        <p class="text-4xl text-center mb-4">Gode</p>
        <draggable v-model="goodItems" group="items" item-key="id" class="h-full">
          <template #item="{ element }">
            <p class="text-2xl">{{ element }}</p>
          </template>
        </draggable>
      </div>
      <!-- Incorrect Container -->
      <div class="bg-red bg-opacity-70 p-4 row-span-2 rounded-3xl">
        <p class="text-4xl text-center mb-4">Dårlige</p>
        <draggable v-model="badItems" group="items" item-key="id" class="h-full">
          <template #item="{ element }">
            <p class="text-2xl">{{ element }}</p>
          </template>
        </draggable>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';
import draggable from 'vuedraggable'

const letterStore = useLetterStore()

const unsortedItems = ref<string[]>()
const goodItems = ref<{ name: string }[]>([])
const badItems = ref<{ name: string }[]>([])

onMounted(() => {
  if (letterStore) {
    unsortedItems.value = letterStore.current?.sortables
  }
})
</script>
