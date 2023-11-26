<template>
  <main :style="{ backgroundImage: `url(/src/assets/background/${letterStore.current?.images.background}.svg)` }"
    class="bg-cover bg-center">
    <h1 class="text-5xl text-center uppercase">Sorting {{ letterStore.current?.value }}</h1>
    <div class="max-w-6xl h-full mx-auto grid grid-cols-3 p-4">
      <div>
        <p class="text-4xl">Items</p>
        <draggable v-model="unsortedItems" group="items" item-key="id" class="h-full">
          <template #item="{ element }">
            <p class="text-2xl">{{ element }}</p>
          </template>
        </draggable>
      </div>
      <div>
        <p class="text-4xl">Good</p>
        <draggable v-model="goodItems" group="items" item-key="id" class="h-full">
          <template #item="{ element }">
            <p class="text-2xl">{{ element }}</p>
          </template>
        </draggable>
      </div>
      <div>
        <p class="text-4xl">Bad</p>
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
