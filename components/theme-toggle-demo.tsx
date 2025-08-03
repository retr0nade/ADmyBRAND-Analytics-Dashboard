"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { ThemeToggle } from "./theme-toggle"

export function ThemeToggleDemo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-lg border bg-card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold mb-2">Theme Toggle Demo</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click the toggle to see smooth animations
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4"
      >
        <ThemeToggle />
        <motion.div
          animate={{
            backgroundColor: isDark ? "hsl(var(--muted))" : "hsl(var(--accent))",
            color: isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--accent-foreground))"
          }}
          transition={{ duration: 0.3 }}
          className="px-3 py-1 rounded-full text-xs font-medium"
        >
          {isDark ? "Dark Mode" : "Light Mode"}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xs text-muted-foreground text-center max-w-sm"
      >
        The toggle features smooth sliding animations, ripple effects, and synchronized 
        color transitions across the entire interface.
      </motion.div>
    </div>
  )
} 