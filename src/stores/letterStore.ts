import type { Letter, Consonant, Vowel } from '@/interfaces/Letters'
import { allLetters } from '@/data/_index'
import { defineStore } from 'pinia'

export const useLetterStore = defineStore('letterStore', () => {
  const route = useRoute()

  const consonants: Ref<Consonant[]> = ref(['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'])
  const vowels: Ref<Vowel[]> = ref(['a', 'e', 'i', 'o', 'u', 'y', 'æ', 'ø', 'å'])
  const letters: Ref<Letter[]> = ref(allLetters)

  const current: ComputedRef<Letter | undefined> = computed(() => {
    return letters.value.find((letter) => letter.path === route.params.id)
  })

  const isVowel: ComputedRef<boolean> = computed(() => {
    return vowels.value.includes(current.value?.value as Vowel)
  })

  return { letters, consonants, vowels, current, isVowel }
})
