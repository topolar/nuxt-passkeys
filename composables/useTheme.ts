import { ref, onMounted } from 'vue'

// Create a global state for theme
const isDark = ref(false)

// Initialize on client side
if (process.client) {
  isDark.value = document.documentElement.classList.contains('dark')
}

export const useTheme = () => {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  const updateTheme = () => {
    // Update DOM
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  // Watch for system theme changes
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.theme) { // Only update if user hasn't manually set theme
        isDark.value = e.matches
        updateTheme()
      }
    })
  })

  return {
    isDark,
    toggleTheme
  }
}
