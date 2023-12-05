<template>
  <main :style="{ backgroundImage: `url(/src/assets/background/${letterStore.current?.images.background}.svg)` }"
    class="h-full px-20 bg-cover bg-center grid grid-cols-[1fr_3fr] gap-4">
    <StrokeCursor v-if="showCursor" :cursorCoords="cursorCoords" :strokeColour="strokeColour"
      :strokeWidth="strokeWidth" />
    <img :src="`/src/assets/character/${letterStore.current?.images.character}.svg`" :alt="letterStore.current?.name"
      class="max-w-[30rem] h-auto mx-auto mt-auto">
    <div class="h-full flex flex-col mx-auto p-4 bg-slate-300 bg-opacity-70 rounded-3xl">
      <h1 class="text-5xl text-black text-center">Hjælp {{ letterStore.current?.name }} med at skrive
        <span class="uppercase">{{ letterStore.current?.value }}!</span>
      </h1>
      <div class="max-h-[60dvh] grid grid-rows-1 grid-cols-1 [&>*]:grid-center my-auto overflow-hidden">
        <canvas ref="canvas" width="1000" height="700" class="place-self-center cursor-none overflow-hidden"
          @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @mouseleave="showCursor = false"></canvas>
        <div class="grid gap-8 content-center pointer-events-none">
          <img class="w-full" src="@/src/assets/handwriting-house.svg" alt="bogstavhuse for store bogstaver">
          <img class="w-full" src="@/src/assets/handwriting-house.svg" alt="bogstavhuse for små bogstaver">
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <button @click="clearDrawing" class="grid place-content-center duration-200 hover:-rotate-12 active:scale-90">
          <span class="text-5xl">🗑️</span>
        </button>
        <label v-for="colour in strokeColours" :key="colour" :for="colour" :style="{ backgroundColor: colour }"
          class="w-14 h-14 grid place-content-center shadow-colour rounded-full cursor-pointer">
          <input v-model="strokeColour" type="radio" :id="colour" :value="colour" class="w-0 h-0 opacity-0 peer">
          <div
            class="w-6 aspect-square bg-white rounded-full duration-200 transform scale-0 peer-hover:scale-50 peer-checked:!scale-100">
          </div>
        </label>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { StrokeColour } from '@/interfaces/Canvas';
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()

const isDrawing = ref<boolean>(false)
const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)

const showCursor = ref<boolean>(false)
const cursorCoords = ref<{ x: number, y: number }>({ x: 0, y: 0 })

const strokeWidth = ref<number>(10)
const strokeColour = ref<StrokeColour>('#000000')
const strokeColours = ref<StrokeColour[]>([
  '#000000',  // black
  '#4285F6',  // blue
  '#EC4233',  // red
])


function startDrawing(e: MouseEvent) {
  if (canvas.value && context.value) {

    // Set drawing boolean to true
    isDrawing.value = true

    // Apply drawing styling
    context.value.strokeStyle = strokeColour.value
    context.value.lineWidth = strokeWidth.value
    context.value.lineJoin = 'round'
    context.value.lineCap = 'round'

    // Start drawing from cursor coordinates
    const [x, y] = getCoords(e)
    context.value.moveTo(x, y)
    draw(e)
  }
}

function draw(e: MouseEvent) {
  showCursor.value = true
  cursorCoords.value.x = e.clientX
  cursorCoords.value.y = e.clientY

  if (canvas.value && context.value && isDrawing.value) {
    const [x, y] = getCoords(e)

    // Continue drawing line to new coordinates
    context.value.lineTo(x, y)
    context.value.stroke()
    context.value.beginPath()
    context.value.moveTo(x, y)
  }
}

function stopDrawing() {
  if (canvas.value && context.value && isDrawing.value) {
    // Set drawing boolean to false
    isDrawing.value = false
  }
}

function getCoords(e: MouseEvent): number[] {
  // Return destructured coordinates [x, y]
  return canvas.value ? [
    e.clientX - canvas.value.offsetLeft,
    e.clientY - canvas.value.offsetTop
  ] : [0, 0]
}

function clearDrawing() {
  if (canvas.value && context.value) {
    // Clear canvas
    context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
}

onMounted(() => {
  if (canvas.value) {
    context.value = canvas.value.getContext('2d', { willReadFrequently: true })

    if (context.value) {
      context.value.fillStyle = 'transparent';
      context.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
    }
  }
})
</script>
