<template>
  <div
    :style="{
      backgroundColor: strokeColour,
      width: strokeWidth + 'px',
      left: cursorCoords.x + 'px',
      top: cursorCoords.y + 'px'
    }"
    :class="[strokeColour === '#000000' ? 'outline-white' : 'outline-black']"
    class="absolute z-20 aspect-square outline-2 outline-dashed rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none cursor-none"
  ></div>
</template>

<script setup lang="ts">
import type { CursorCoords } from '@/interfaces/Canvas'

defineProps<{
  cursorCoords: CursorCoords
  strokeColour: string
  strokeWidth: number
}>()
</script>
