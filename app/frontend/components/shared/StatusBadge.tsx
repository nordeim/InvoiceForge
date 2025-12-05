// app/frontend/components/shared/StatusBadge.tsx
import { cn } from "@/lib/utils"
import type { InvoiceStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: InvoiceStatus
  className?: string
}

/**
 * StatusBadge — Invoice status indicator
 * 
 * Design (v4.2):
 * - Draft: Dashed border, slate colors
 * - Pending: Solid border, amber colors
 * - Paid: Solid border, emerald colors
 * - Overdue: Solid border, rose colors
 * - All: rounded-full, text-xs, font-medium
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        // Base styles
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        // Status-specific styles
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
      {/* Screen reader enhancement */}
      <span className="sr-only">
        {statusAriaLabels[status]}
      </span>
    </span>
  )
}

// Status display labels
const statusLabels: Record<InvoiceStatus, string> = {
  draft: "Draft",
  pending: "Pending",
  paid: "Paid",
  overdue: "Overdue",
}

// Screen reader descriptions
const statusAriaLabels: Record<InvoiceStatus, string> = {
  draft: "Invoice is in draft status and has not been sent",
  pending: "Invoice has been sent and is awaiting payment",
  paid: "Invoice has been paid",
  overdue: "Invoice payment is past due date",
}

// Tailwind classes for each status (v4.2 specification)
const statusStyles: Record<InvoiceStatus, string> = {
  draft: cn(
    // Light mode
    "bg-slate-100 text-slate-600 border-slate-300 border-dashed",
    // Dark mode
    "dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600"
  ),
  pending: cn(
    // Light mode
    "bg-amber-50 text-amber-700 border-amber-300",
    // Dark mode
    "dark:bg-amber-950 dark:text-amber-400 dark:border-amber-700"
  ),
  paid: cn(
    // Light mode
    "bg-emerald-50 text-emerald-700 border-emerald-300",
    // Dark mode
    "dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-700"
  ),
  overdue: cn(
    // Light mode
    "bg-rose-50 text-rose-700 border-rose-300",
    // Dark mode
    "dark:bg-rose-950 dark:text-rose-400 dark:border-rose-700"
  ),
}

// Export styles for use in other components if needed
export { statusStyles, statusLabels }
