"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get theme preference from localStorage
  const getThemePreference = () => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dashboard-settings')
        if (saved) {
          const settings = JSON.parse(saved)
          return settings.themePreference || 'system'
        }
      } catch {
        return 'system'
      }
    }
    return 'system'
  }

  if (!mounted) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <NextThemesProvider
      {...props}
      defaultTheme={getThemePreference()}
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </NextThemesProvider>
  )
}