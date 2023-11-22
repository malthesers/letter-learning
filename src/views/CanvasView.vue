<template>
  <div>
    <div class="grid grid-cols-1 grid-rows-1">
      <div class="z-10 flex gap-4 p-4">
        <label v-for="colour in strokeColours" :key="colour" :for="colour" :class="`bg-${colour}`"
          class="w-20 h-20 rounded-full">
          <input v-model="strokeColour" type="radio" :id="colour" :value="colour" class="w-0 h-0 opacity-0">
        </label>
      </div>
      <canvas ref="canvas" width="2600" height="1400" class="bg-white place-self-center" @mousedown="startDrawing"
        @mousemove="keepDrawing" @mouseup="stopDrawing"></canvas>
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
const strokeWidth = ref<number>(10)

const strokeColours = ref(['black', 'blue', 'red'])


function startDrawing(e: MouseEvent) {
  if (canvas.value && context.value) {
    isDrawing.value = true
    context.value.beginPath()
    context.value.moveTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
    context.value.strokeStyle = strokeColour.value
    context.value.lineWidth = strokeWidth.value
    context.value.lineCap = 'round'
    context.value.lineJoin = 'round'
  }
}

function keepDrawing(e: MouseEvent) {
  if (canvas.value && context.value && isDrawing.value) {
    context.value.lineTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
    context.value.stroke()
  }
}

function stopDrawing() {
  isDrawing.value = false
}

onMounted(() => {
  if (canvas.value) {
    context.value = canvas.value?.getContext('2d')
  }
})
</script>