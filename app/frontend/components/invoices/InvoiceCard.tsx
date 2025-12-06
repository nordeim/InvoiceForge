// app/frontend/components/invoices/InvoiceCard.tsx
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { InvoiceRowActions } from "./InvoiceRowActions"
import type { Invoice } from "@/lib/types"

interface InvoiceCardProps {
  invoice: Invoice
  /** Animation delay index */
  index?: number
  onEdit?: (invoice: Invoice) => void
  onView?: (invoice: Invoice) => void
  onSend?: (invoice: Invoice) => void
  onMarkPaid?: (invoice: Invoice) => void
  onDelete?: (invoice: Invoice) => void
  onCopyLink?: (invoice: Invoice) => void
  className?: string
}

/**
 * InvoiceCard — Mobile card view for a single invoice
 * 
 * Layout (v4.2):
 * - Invoice number prominent at top
 * - Client name and amount
 * - Due date and status badge
 * - Actions menu in corner
 * 
 * Displayed on mobile, hidden on desktop (md:hidden)
 */
export function InvoiceCard({
  invoice,
  index = 0,
  onEdit,
  onView,
  onSend,
  onMarkPaid,
  onDelete,
  onCopyLink,
  className,
}: InvoiceCardProps) {
  return (
    <div
      className={cn(
        // Animation
        "animate-fade-in-up",
        // Surface styling
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "rounded-lg shadow-sm",
        "p-4",
        // Clickable
        "cursor-pointer",
        "transition-colors hover:border-slate-300 dark:hover:border-slate-700",
        className
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onEdit?.(invoice)}
    >
      {/* Header Row: Invoice # + Actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          {/* Invoice Number — Prominent, monospace */}
          <p className="font-mono text-lg font-medium text-slate-900 dark:text-slate-50">
            #{invoice.invoiceNumber}
          </p>
          {/* Client Name */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            {invoice.client?.name || 'Unknown Client'}
          </p>
        </div>

        {/* Actions Menu */}
        <div onClick={(e) => e.stopPropagation()}>
          <InvoiceRowActions
            invoice={invoice}
            onEdit={onEdit}
            onView={onView}
            onSend={onSend}
            onMarkPaid={onMarkPaid}
            onDelete={onDelete}
            onCopyLink={onCopyLink}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />

      {/* Bottom Row: Amount, Due Date, Status */}
      <div className="flex items-center justify-between gap-3">
        {/* Amount */}
        <p className="font-mono text-lg font-medium text-slate-900 dark:text-slate-50">
          {formatCurrency(invoice.total || 0)}
        </p>

        {/* Right side: Due Date + Status */}
        <div className="flex items-center gap-3">
          {/* Due Date */}
          <span className={`text-sm ${
            invoice.status === 'overdue'
              ? 'text-rose-600 dark:text-rose-400 font-medium'
              : 'text-slate-500 dark:text-slate-400'
          }`}>
            {invoice.status === 'overdue' ? 'Overdue: ' : 'Due: '}
            {formatDate(invoice.dueDate, { month: 'short', day: 'numeric' })}
          </span>

          {/* Status Badge */}
          <StatusBadge status={invoice.status} />
        </div>
      </div>
    </div>
  )
}
