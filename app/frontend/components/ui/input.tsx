// app/frontend/components/ui/input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input — Form input component
 * 
 * Design (v4.2):
 * - Surface background (bg-white / bg-slate-950)
 * - Border with focus ring
 * - Consistent sizing with buttons
 * - Proper dark mode focus ring offset
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md px-3 py-2",
          // Background
          "bg-white dark:bg-slate-950",
          // Border
          "border border-slate-300 dark:border-slate-700",
          // Text
          "text-sm text-slate-900 dark:text-slate-100",
          // Placeholder
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          // Focus state with proper ring offset
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          "disabled:bg-slate-100 dark:disabled:bg-slate-900",
          // Read-only state
          "read-only:bg-slate-50 dark:read-only:bg-slate-900",
          // File input specifics
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "file:text-slate-900 dark:file:text-slate-100",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
