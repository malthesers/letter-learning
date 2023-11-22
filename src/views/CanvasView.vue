<template>
  <main>
    <div class="grid grid-cols-1 grid-rows-1 [&>*]:grid-area">
      <div :class="isDrawing && 'pointer-events-none'" class="z-10 w-min h-min p-4 flex flex-row">
        <label v-for="colour in strokeColours" :key="colour" :for="colour" :class="`bg-${colour}`"
          class="w-20 h-20 border-8 border-white grid place-content-center rounded-full cursor-pointer">
          <input v-model="strokeColour" type="radio" :id="colour" :value="colour" class="w-0 h-0 opacity-0 peer">
          <div class="w-8 bg-white aspect-square rounded-full duration-200 transform scale-0 peer-checked:scale-100">
          </div>
        </label>
      </div>
      <div class="w-full h-full grid place-content-center overflow-hidden">
        <canvas ref="canvas" width="2600" height="1400" class="bg-white place-self-center" @mousedown="startDrawing"
          @mousemove="keepDrawing" @mouseup="stopDrawing"></canvas>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Letter, LetterPath } from '@/interfaces/Home';
import { useLetterStore } from '@/stores/letterStore';

interface Colours {
  black: string,
  red: string,
  blue: string
}

const letterStore = useLetterStore()
const router = useRouter()
const route = useRoute()

const isDrawing = ref<boolean>(false)
const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const strokeWidth = ref<number>(10)
const strokeColour = ref<string>('black')
const strokeColours = ref(['black', 'blue', 'red'])
const strokeColoursMap = ref<Colours>({
  black: '#000000',
  red: '#EC4233',
  blue: '#4285F6'
})


function startDrawing(e: MouseEvent) {
  if (canvas.value && context.value) {
    isDrawing.value = true
    context.value.beginPath()
    context.value.moveTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop)
    context.value.strokeStyle = strokeColoursMap.value[strokeColour.value as keyof Colours]
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