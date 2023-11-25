import type { Letter, Consonant, Vowel } from '@/interfaces/Letters'
import { allLetters } from '@/data/_index'
import { defineStore } from 'pinia'

export const useLetterStore = defineStore('letterStore', () => {
  const route = useRoute()

  const consonants = ref<Consonant[]>(['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'])
  const vowels = ref<Vowel[]>(['a', 'e', 'i', 'o', 'u', 'y', 'æ', 'ø', 'å'])
  const letters = ref<Letter[]>(allLetters)

  const current = computed<(Letter | undefined)>(() => {
    return letters.value.find(letter => letter.path === route.params.id)
  })
  
  const isVowel = computed<boolean>(() => {
    return vowels.value.includes(current.value?.value as Vowel)
  })


  return { letters, consonants, vowels, current, isVowel }
})
