<template>
  <main>
    <h1 class="text-5xl text-center uppercase">Sorting {{ letterStore.current }}</h1>
    <div class="h-full grid grid-cols-3 p-4">
      <div>
        <p class="text-5xl">Items</p>
        <draggable v-model="unsortedItems" group="items" item-key="id" class="h-full">
          <template #item="{ element }">
            <p class="text-4xl">{{ element.name }}</p>
          </template>
        </draggable>
      </div>
      <div>
        <p class="text-5xl">Good</p>
        <draggable v-model="goodItems" group="items" item-key="id" class="h-full">
          <template #item="{ element }">
            <p class="text-4xl">{{ element.name }}</p>
          </template>
        </draggable>
      </div>
      <div>
        <p class="text-5xl">Bad</p>
        <draggable v-model="badItems" group="items" item-key="id" class="h-full">
          <template #item="{ element }">
            <p class="text-4xl">{{ element.name }}</p>
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

const unsortedItems = ref<{ name: string }[]>([{ name: 'milk' }, { name: 'cookies' }, { name: 'tea' }, { name: 'cake' }])
const goodItems = ref<{ name: string }[]>([])
const badItems = ref<{ name: string }[]>([])
</script>
