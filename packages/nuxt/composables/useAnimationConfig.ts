const ANIMATION_TIME = 2000

export function useAnimationConfig(data: any) {
  const showAnimation = ref(false)
  const prevData = ref()

  watchEffect(() => {
    if (prevData.value !== undefined && prevData.value !== data) {
      showAnimation.value = true
      setTimeout(() => {
        showAnimation.value = false
      }, ANIMATION_TIME)
    }
    prevData.value = data
  })

  return {
    showAnimation,
  }
}
