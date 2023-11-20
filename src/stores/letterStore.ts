import type { Letter } from '@/interfaces/Home'
import { defineStore } from 'pinia'

export const useLetterStore = defineStore('letterStore', () => {
  const letters = ref<Letter[]>([
    { value: 'a', path: 'a' },
    { value: 'b', path: 'b' },
    { value: 'c', path: 'c' },
    { value: 'd', path: 'd' },
    { value: 'e', path: 'e' },
    { value: 'f', path: 'f' },
    { value: 'g', path: 'g' },
    { value: 'h', path: 'h' },
    { value: 'i', path: 'i' },
    { value: 'j', path: 'j' },
    { value: 'k', path: 'k' },
    { value: 'l', path: 'l' },
    { value: 'm', path: 'm' },
    { value: 'n', path: 'n' },
    { value: 'o', path: 'o' },
    { value: 'p', path: 'p' },
    { value: 'q', path: 'q' },
    { value: 'r', path: 'r' },
    { value: 's', path: 's' },
    { value: 't', path: 't' },
    { value: 'u', path: 'u' },
    { value: 'v', path: 'v' },
    { value: 'w', path: 'w' },
    { value: 'x', path: 'x' },
    { value: 'y', path: 'y' },
    { value: 'z', path: 'z' },
    { value: 'æ', path: 'ae' },
    { value: 'ø', path: 'oe' },
    { value: 'å', path: 'aa' }
  ]
  )

  return { letters }
})