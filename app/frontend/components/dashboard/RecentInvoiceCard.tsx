// app/frontend/components/dashboard/RecentInvoiceCard.tsx
// Update the component to include the animation class

import { Link } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/StatusBadge"
import type { Invoice } from "@/lib/types"
import { ChevronRight } from "lucide-react"

interface RecentInvoiceCardProps {
  invoice: Invoice
  /** Animation delay index (multiplied by 50ms) */
  index?: number
  className?: string
}

/**
 * RecentInvoiceCard — Compact invoice display for dashboard
 * Updated with staggered animation support
 */
export function RecentInvoiceCard({
  invoice,
  index = 0,
  className,
}: RecentInvoiceCardProps) {
  return (
    <Link
      href={`/invoices/${invoice.id}/edit`}
      className={cn(
        // Animation
        "animate-fade-in-up",
        // Surface styling
        "block bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "rounded-lg p-4",
        // Hover state — border color change (v4.2: no movement)
        "transition-colors duration-150",
        "hover:border-slate-300 dark:hover:border-slate-700",
        // Focus state
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "dark:focus:ring-offset-slate-950",
        // Group for hover effects
        "group",
        className
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Invoice details */}
        <div className="min-w-0 flex-1">
          {/* Invoice Number — Prominent, monospace */}
          <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
            #{invoice.invoiceNumber}
          </p>
          
          {/* Client Name */}
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate mt-0.5">
            {invoice.client?.name || 'Unknown Client'}
          </p>
        </div>

        {/* Right: Amount, Status, Chevron */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Amount */}
          <div className="text-right hidden sm:block">
            <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
              {formatCurrency(invoice.total || 0)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Due {formatDate(invoice.dueDate, { month: 'short', day: 'numeric' })}
            </p>
          </div>

          {/* Mobile: Just show amount */}
          <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50 sm:hidden">
            {formatCurrency(invoice.total || 0)}
          </p>

          {/* Status Badge */}
          <StatusBadge status={invoice.status} />

          {/* Chevron — Appears on hover */}
          <ChevronRight 
            className={cn(
              "h-4 w-4 text-slate-400",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-150",
              "hidden sm:block"
            )} 
          />
        </div>
      </div>
    </Link>
  )
}
