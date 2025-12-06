// app/frontend/components/invoices/InvoiceList.tsx
import { InvoiceTable } from "./InvoiceTable"
import { InvoiceCard } from "./InvoiceCard"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { FileText, Plus } from "lucide-react"
import type { Invoice } from "@/lib/types"

interface InvoiceListProps {
  invoices: Invoice[]
  /** Whether a filter is active (affects empty state message) */
  isFiltered?: boolean
  onEdit?: (invoice: Invoice) => void
  onView?: (invoice: Invoice) => void
  onSend?: (invoice: Invoice) => void
  onMarkPaid?: (invoice: Invoice) => void
  onDelete?: (invoice: Invoice) => void
  onCopyLink?: (invoice: Invoice) => void
}

/**
 * InvoiceList — Responsive invoice display
 * 
 * Shows:
 * - Table on desktop (hidden on mobile)
 * - Card stack on mobile (hidden on desktop)
 */
export function InvoiceList({
  invoices,
  isFiltered = false,
  onEdit,
  onView,
  onSend,
  onMarkPaid,
  onDelete,
  onCopyLink,
}: InvoiceListProps) {
  // Common action props
  const actionProps = {
    onEdit,
    onView,
    onSend,
    onMarkPaid,
    onDelete,
    onCopyLink,
  }

  if (invoices.length === 0) {
    return <EmptyState isFiltered={isFiltered} />
  }

  return (
    <>
      {/* Desktop: Table */}
      <div className="hidden md:block">
        <InvoiceTable invoices={invoices} {...actionProps} />
      </div>

      {/* Mobile: Card Stack */}
      <div className="md:hidden space-y-3">
        {invoices.map((invoice, index) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            index={index}
            {...actionProps}
          />
        ))}
      </div>
    </>
  )
}

/**
 * EmptyState — Displayed when there are no invoices
 */
interface EmptyStateProps {
  isFiltered: boolean
}

function EmptyState({ isFiltered }: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>
        
        {isFiltered ? (
          <>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
              No invoices match your filter
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Try selecting a different status filter
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
              No invoices yet
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Create your first invoice to start tracking payments
            </p>
            <Button size="sm" className="mt-4" asChild>
              <Link href="/invoices/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
