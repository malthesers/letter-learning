<template>
  <div>
    <h1 class="text-5xl text-center uppercase">Canvas {{ letter.value }}</h1>
    <!-- <VueDrawingCanvas ref="VueCanvasDrawing" width="1000" height="1000" /> -->
    <canvas ref="canvas" width="500" height="500" @mousedown="startDrawing" @mousemove="keepDrawing"
      @mouseup="stopDrawing"></canvas>
  </div>
</template>

<script setup lang="ts">
import type { Letter, LetterPath } from '@/interfaces/Home';
import { useLetterStore } from '@/stores/letterStore';
import VueDrawingCanvas from 'vue-drawing-canvas'

const letterStore = useLetterStore()
const router = useRouter()
const route = useRoute()
const letter: Letter = letterStore.getLetterFromPath(route.params.id as LetterPath)

const isDrawing = ref<boolean>(false)
const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)


function startDrawing(e: MouseEvent) {
  if (canvas.value && context.value) {
    isDrawing.value = true
    context.value.beginPath()
    context.value.moveTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
  }
}

function keepDrawing(e: MouseEvent) {
  if (canvas.value && context.value && isDrawing.value) {
    context.value.lineTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
    context.value.stroke()
  }
}

function stopDrawing(e: MouseEvent) {
  isDrawing.value = false
}

onMounted(() => {
  if (canvas.value) context.value = canvas.value?.getContext('2d')
})
</script>

<style scoped>
canvas {
  background-color: white;
}
</style>