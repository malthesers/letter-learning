<template>
  <div :style="{
    backgroundColor: strokeColour, width: strokeWidth + 'px',
    left: cursorCoords.x + 'px', top: cursorCoords.y + 'px'
  }"
    class="absolute z-20 aspect-square rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none cursor-none">
  </div>
</template>

<script setup lang="ts">
interface CursorCoords {
  x: number,
  y: number
}

defineProps<{
  cursorCoords: CursorCoords
  strokeColour: string,
  strokeWidth: number
}>()
</script>