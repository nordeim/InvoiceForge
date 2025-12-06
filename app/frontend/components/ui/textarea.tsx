// app/frontend/components/ui/textarea.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea — Multi-line text input
 * 
 * Design (v4.2):
 * - Matches Input styling
 * - Minimum height with resize
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex min-h-[80px] w-full rounded-md px-3 py-2",
          // Background
          "bg-white dark:bg-slate-950",
          // Border
          "border border-slate-300 dark:border-slate-700",
          // Text
          "text-sm text-slate-900 dark:text-slate-100",
          // Placeholder
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          // Focus state
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
