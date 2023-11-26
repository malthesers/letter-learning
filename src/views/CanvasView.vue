<template>
  <main class="select-none">
    <StrokeCursor v-if="showCursor" :cursorCoords="cursorCoords" :strokeColour="strokeColour"
      :strokeWidth="strokeWidth" />
    <div class="grid grid-cols-1 grid-rows-1 [&>*]:grid-area">
      <div :class="isDrawing && 'pointer-events-none'" class="z-10 w-min h-min p-4 flex flex-col">
        <!-- Letter Display -->
        <p :class="[letterStore.isVowel ? 'text-red' : 'text-blue']" class="flex flex-row gap-2 text-9xl font-bold mb-4">
          <span class="uppercase">{{ letterStore.current?.value }}</span>
          <span class="lowercase">{{ letterStore.current?.value }}</span>
        </p>
        <!-- <button @click="tool = 'brush'"
          class="w-16 h-16 text-5xl duration-200 hover:-rotate-12 active:scale-90">🖌️</button> -->
        <!-- <button @click="tool = 'bucket'"
          class="w-16 h-16 text-5xl duration-200 hover:-rotate-12 active:scale-90">🎨</button> -->
        <div>
          <input v-model="strokeWidth" type="range" min="10" max="50" step="10">
        </div>
        <button @click="clearDrawing"
          class="w-14 h-16 grid place-content-center duration-200 hover:-rotate-12 active:scale-90">
          <span class="text-5xl">🗑️</span>
        </button>
        <!-- Colour Selector -->
        <div class="w-min flex flex-col gap-2">
          <label v-for="colour in strokeColours" :key="colour" :for="colour" :style="{ backgroundColor: colour }"
            :class="[colour === '#ffffff' ? 'border-white' : 'border-white']"
            class="w-14 h-14 grid place-content-center shadow-shadow rounded-full cursor-pointer">
            <input v-model="strokeColour" type="radio" :id="colour" :value="colour" class="w-0 h-0 opacity-0 peer">
            <div :class="[colour === '#ffffff' ? 'bg-black' : 'bg-white']"
              class="w-6 aspect-square rounded-full duration-200 transform scale-0 peer-hover:scale-50 peer-checked:!scale-100">
            </div>
          </label>
        </div>
      </div>
      <!-- Canvas -->
      <div class="w-full h-full grid place-content-center overflow-hidden">
        <canvas ref="canvas" width="2600" height="1400" class="bg-white place-self-center cursor-none"
          @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @mouseleave="showCursor = false"></canvas>
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

const tool = ref<'brush' | 'bucket'>('brush')
const imageData = ref<ImageData | null>(null)

const showCursor = ref<boolean>(false)
const cursorCoords = ref<{ x: number, y: number }>({ x: 0, y: 0 })

const strokeWidth = ref<number>(10)
const strokeColour = ref<string>('#000000')
const strokeColours = ref<string[]>([
  '#000000',  // black
  '#ffffff',  // white
  '#4285F6',  // blue
  '#EC4233',  // red
  '#F9BE04',  // yellow
  '#33A955',  // green
  '#AF52DE',  // purple
  '#FF9501'   // orange
])

function startDrawing(e: MouseEvent) {
  if (canvas.value && context.value && tool.value === 'brush') {

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

  if (tool.value === 'bucket') {
    fill(e)
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

function clearDrawing() {
  if (canvas.value && context.value) {
    // Clear canvas
    context.value.fillStyle = 'white';
    context.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
  }
}

function getCoords(e: MouseEvent): number[] {
  // Return destructured coordinates [x, y]
  return canvas.value ? [
    e.clientX - canvas.value.offsetLeft,
    e.clientY - canvas.value.offsetTop
  ] : [0, 0]
}

function fill(e: MouseEvent) {
  if (canvas.value && context.value) {
    // Get imageData, coordinates, clicked pixel colour and fill colour
    imageData.value = context.value.getImageData(0, 0, canvas.value.width, canvas.value.height)
    const [x, y] = getCoords(e)
    const targetColour = getColour(x, y)
    const fillColour = toRGB(strokeColour.value)

    // Start flood fill if clicked pixel is a different colour then chosen one
    if (targetColour !== fillColour) {
      floodFill(x, y, targetColour, fillColour)
    }
  }
}

function floodFill(x: number, y: number, targetColour: string, fillColour: string) {
  if (canvas.value && context.value && imageData.value) {
    // Array of pixels to check and fill
    const stack: [number, number][] = [[x, y]]

    // Fill pixels as long as array isn't empty
    while (stack.length > 0) {
      // Set current coordinates
      const [currentX, currentY] = stack.pop() || [0, 0]

      // Proceed if pixels are within canvas
      if (currentX >= 0 && currentX < canvas.value.width && currentY >= 0 && currentY < canvas.value.height) {
        // Get colour of current pixel
        const currentColour = getColour(currentX, currentY)

        // Proceed if current colour resembles target colour
        if (checkColours(currentColour, targetColour)) {
          // Set colour of current pixel
          setColour(currentX, currentY, fillColour)

          // Add surrounding 4 pixels to array
          stack.push(
            [currentX + 1, currentY], // right
            [currentX - 1, currentY], // left
            [currentX, currentY + 1], // below
            [currentX, currentY - 1], // above
          )
        }
      }
    }

    // Update imageData after all pixels are changed
    context.value.putImageData(imageData.value, 0, 0)
  }
}

function setColour(x: number, y: number, colour: string) {
  if (context.value && imageData.value) {
    // Get placement of pixel
    const index = (y * imageData.value.width + x) * 4;
    const [r, g, b] = (colour.match(/\d+/g) || []).map(Number)

    // Set colour values 
    imageData.value.data[index] = r
    imageData.value.data[index + 1] = g
    imageData.value.data[index + 2] = b
    imageData.value.data[index + 3] = 255
  }
}

function getColour(x: number, y: number): string {
  if (imageData.value) {
    // Get pixel from coordinates and return the rgb values
    const index = (y * imageData.value.width + x) * 4;
    const r = imageData.value.data[index];
    const g = imageData.value.data[index + 1];
    const b = imageData.value.data[index + 2];
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    return ''
  }
}

function checkColours(colour1: string, colour2: string): boolean {
  // Convert each parameterised colours to array of vlaues
  const [r1, g1, b1] = colour1.match(/\d+/g)!.map(Number);
  const [r2, g2, b2] = colour2.match(/\d+/g)!.map(Number);
  const tolerance = 50

  // Check proximity of colours by tolerance level
  const similarity = Math.abs(r1 - r2) <= tolerance && Math.abs(g1 - g2) <= tolerance && Math.abs(b1 - b2) <= tolerance
  // const similarity = Math.abs((r1 + g1 + b1) - (r2 + g2 + b2)) <= tolerance

  return similarity
}

function toRGB(colour: string): string {
  // Convert colour to rgb string
  const { style } = new Option()
  style.color = colour
  return style.color
}

onMounted(() => {
  if (canvas.value) {
    context.value = canvas.value.getContext('2d', { willReadFrequently: true })

    if (context.value) {
      context.value.fillStyle = 'white';
      context.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
    }
  }
})
</script>