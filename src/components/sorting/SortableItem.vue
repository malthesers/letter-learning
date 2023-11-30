<template>
  <div class="!opacity-100">
    <img :src="`/src/assets/sortables/${element}.svg`" :alt="element" class="h-24 duration-200">
  </div>
</template>

<script setup lang="ts">
defineProps<{
  element: string
}>()
</script>