<template>
  <div>
    <h1 class="text-5xl text-center uppercase">Canvas {{ letter.value }}</h1>
    <div class="flex gap-4 p-4">
      <input v-model="strokeColour" type="color">
      <input v-model="strokeWidth" type="number">
    </div>
    <div class="grid place-content-center">
      <canvas ref="canvas" width="2600" height="1400" class="bg-white" @mousedown="startDrawing" @mousemove="keepDrawing"
        @mouseup="stopDrawing"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Letter, LetterPath } from '@/interfaces/Home';
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
const router = useRouter()
const route = useRoute()
const letter: Letter = letterStore.getLetterFromPath(route.params.id as LetterPath)

const isDrawing = ref<boolean>(false)
const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const strokeColour = ref<string>('black')
const strokeWidth = ref<number>(5)


function startDrawing(e: MouseEvent) {
  if (canvas.value && context.value) {
    isDrawing.value = true
    drawDot(e)
  }
}

function keepDrawing(e: MouseEvent) {
  if (canvas.value && context.value && isDrawing.value) {
    drawDot(e)
  }
}

function stopDrawing() {
  isDrawing.value = false
}

function drawDot(e: MouseEvent) {
  if (canvas.value && context.value) {
    const x = e.clientX - canvas.value?.offsetLeft
    const y = e.clientY - canvas.value?.offsetTop

    context.value.beginPath()
    context.value.arc(x, y, strokeWidth.value, 0, 2 * Math.PI)
    context.value.fillStyle = strokeColour.value
    context.value.fill()
  }
}

onMounted(() => {
  if (canvas.value) {
    context.value = canvas.value?.getContext('2d')
  }
})
</script>