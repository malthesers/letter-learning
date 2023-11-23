<template>
  <main class="select-none">
    <div class="grid grid-cols-1 grid-rows-1 [&>*]:grid-area">
      <div :class="isDrawing && 'pointer-events-none'" class="z-10 w-min h-min p-4 flex flex-col">
        <p :class="[letterStore.isVowel ? 'text-red' : 'text-blue']" class="flex flex-row gap-2 text-6xl font-bold mb-4">
          <span class="uppercase">{{ letterStore.current?.value }}</span>
          <span class="lowercase">{{ letterStore.current?.value }}</span>
        </p>
        <button @click="clearDrawing"
          class="w-16 h-16 text-5xl duration-200 hover:-rotate-12 active:scale-90">🗑️</button>
        <label v-for="colour in strokeColours" :key="colour" :for="colour" :style="{ backgroundColor: colour }"
          class="w-16 h-16 border-8 border-white grid place-content-center rounded-full cursor-pointer">
          <input v-model="strokeColour" type="radio" :id="colour" :value="colour" class="w-0 h-0 opacity-0 peer">
          <div class="w-6 bg-white aspect-square rounded-full duration-200 transform scale-0 peer-checked:scale-100">
          </div>
        </label>
      </div>
      <div class="w-full h-full grid place-content-center overflow-hidden">
        <canvas ref="canvas" width="2600" height="1400" class="bg-white place-self-center" @mousedown="startDrawing"
          @mousemove="draw" @mouseup="stopDrawing"></canvas>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()

const isDrawing = ref<boolean>(false)
const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const drawingData = ref<any[]>([])

const strokeWidth = ref<number>(10)
const strokeColour = ref<string>('#000000')
const strokeColours = ref<string[]>(['#000000', '#4285F6', '#EC4233', '#F9BE04', '#33A955', '#AF52DE', '#FF9501'])


function startDrawing(e: MouseEvent) {
  if (canvas.value && context.value) {
    isDrawing.value = true
    context.value.moveTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
    context.value.strokeStyle = strokeColour.value
    context.value.lineWidth = strokeWidth.value
    context.value.lineJoin = 'round'
    context.value.lineCap = 'round'
    draw(e)
  }
}

function draw(e: MouseEvent) {
  if (canvas.value && context.value && isDrawing.value) {
    context.value.lineTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
    context.value.stroke()
    context.value.beginPath()
    context.value.moveTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
  }
}

function stopDrawing() {
  isDrawing.value = false
}

function clearDrawing() {
  if (canvas.value && context.value) {
    context.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }
}

onMounted(() => {
  if (canvas.value) {
    context.value = canvas.value?.getContext('2d')
  }
})
</script>