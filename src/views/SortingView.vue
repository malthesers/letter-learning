<template>
  <main
    :style="{ backgroundImage: `url(/src/assets/background/${letterStore.current?.images.background}.svg)` }"
    class="h-full px-20 bg-cover bg-center grid grid-cols-[1fr_2fr] gap-4"
  >
    <img
      :src="`/src/assets/character/${letterStore.current?.images.character}.svg`"
      :alt="letterStore.current?.name"
      class="max-w-[30rem] h-auto mx-auto mt-auto"
    />
    <div class="w-full h-full mx-auto flex flex-col gap-4 p-4">
      <div class="h-60 flex flex-col bg-slate-700 bg-opacity-70 p-4 rounded-3xl col-span-2">
        <p class="text-4xl text-center mb-4">Hvilke ting kan {{ letterStore.current?.name }} lide?</p>
        <draggable
          v-model="unsortedItems"
          group="items"
          item-key="id"
          :forceFallback="true"
          :animation="200"
          class="grow flex flex-wrap place-content-center gap-4"
        >
          <template #item="{ element }">
            <SortableItem :element="element" />
          </template>
        </draggable>
      </div>
      <div class="grow grid grid-cols-2 gap-4">
        <!-- Correct Container -->
        <div class="flex flex-col bg-green bg-opacity-70 p-4 rounded-3xl">
          <p class="text-7xl text-center mb-4">😄</p>
          <draggable
            v-model="goodItems"
            group="items"
            item-key="id"
            :forceFallback="true"
            :animation="200"
            class="grow flex flex-wrap place-content-center gap-4"
          >
            <template #item="{ element }">
              <SortableItem :element="element" />
            </template>
          </draggable>
        </div>
        <!-- Incorrect Container -->
        <div class="flex flex-col bg-red bg-opacity-70 p-4 rounded-3xl">
          <p class="text-7xl text-center mb-4">😟</p>
          <draggable
            v-model="badItems"
            group="items"
            item-key="id"
            :forceFallback="true"
            :animation="200"
            class="grow flex flex-wrap place-content-center gap-4"
          >
            <template #item="{ element }">
              <SortableItem :element="element" />
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore'
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
