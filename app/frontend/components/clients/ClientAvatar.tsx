// app/frontend/components/clients/ClientAvatar.tsx
import { cn } from "@/lib/utils"

interface ClientAvatarProps {
  /** Client name for initials and color generation */
  name: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional class names */
  className?: string
}

/**
 * ClientAvatar — Colored avatar with client initials
 * 
 * Features:
 * - Extracts initials from name (up to 2 characters)
 * - Deterministic color based on name hash
 * - Multiple size variants
 */
export function ClientAvatar({ 
  name, 
  size = 'md',
  className 
}: ClientAvatarProps) {
  const initials = getInitials(name)
  const colorClass = getAvatarColor(name)

  return (
    <div
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-full font-medium text-white",
        // Size variants
        sizeClasses[size],
        // Deterministic color
        colorClass,
        className
      )}
      role="img"
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  )
}

/**
 * Extract initials from a name
 * - Single word: First two letters
 * - Multiple words: First letter of first two words
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  
  if (words.length === 1) {
    // Single word: take first two characters
    return words[0].substring(0, 2).toUpperCase()
  }
  
  // Multiple words: take first letter of first two words
  return (words[0][0] + words[1][0]).toUpperCase()
}

/**
 * Get a deterministic color class based on the name
 * Uses a simple hash to ensure consistent colors per client
 */
function getAvatarColor(name: string): string {
  // Simple hash function
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash // Convert to 32bit integer
  }
  
  // Get positive index
  const index = Math.abs(hash) % avatarColors.length
  return avatarColors[index]
}

/**
 * Available avatar colors (v4.2 specification)
 * Vibrant colors that work well with white text
 */
const avatarColors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-purple-500',
  'bg-cyan-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-orange-500',
]

/**
 * Size class mappings
 */
const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

// Export utilities for potential reuse
export { getInitials, getAvatarColor }
