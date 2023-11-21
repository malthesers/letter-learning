<template>
  <div>
    <h1 class="text-5xl text-center uppercase">Canvas {{ letter.value }}</h1>
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
const strokeWidth: number = 5


function startDrawing(e: MouseEvent) {
  if (canvas.value && context.value) {
    isDrawing.value = true
    context.value.beginPath()
    context.value.moveTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
    context.value.lineWidth = strokeWidth
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
  if (canvas.value) {
    context.value = canvas.value?.getContext('2d')
  }
})
</script>