// app/frontend/components/invoices/InvoiceTable.tsx
import { Link } from "@inertiajs/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { InvoiceRowActions } from "./InvoiceRowActions"
import { formatCurrency, formatDate } from "@/lib/utils"
import { FileText } from "lucide-react"
import type { Invoice } from "@/lib/types"

interface InvoiceTableProps {
  invoices: Invoice[]
  onEdit?: (invoice: Invoice) => void
  onView?: (invoice: Invoice) => void
  onSend?: (invoice: Invoice) => void
  onMarkPaid?: (invoice: Invoice) => void
  onDelete?: (invoice: Invoice) => void
  onCopyLink?: (invoice: Invoice) => void
}

/**
 * InvoiceTable — Desktop table view for invoices
 * 
 * Layout (v4.2):
 * - Invoice # | Client | Amount | Due Date | Status | Actions
 * - Row hover states
 * - Contextual actions per status
 * 
 * Hidden on mobile (md:hidden counterpart shows InvoiceCard)
 */
export function InvoiceTable({
  invoices,
  onEdit,
  onView,
  onSend,
  onMarkPaid,
  onDelete,
  onCopyLink,
}: InvoiceTableProps) {
  if (invoices.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[140px]">Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Due Date</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[50px]">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow
              key={invoice.id}
              className="animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 30}ms` }}
              onClick={() => onEdit?.(invoice)}
            >
              {/* Invoice Number — Monospace, prominent */}
              <TableCell>
                <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
                  {invoice.invoiceNumber}
                </span>
              </TableCell>

              {/* Client */}
              <TableCell>
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-50 truncate">
                    {invoice.client?.name || 'Unknown Client'}
                  </p>
                  {invoice.client?.company && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {invoice.client.company}
                    </p>
                  )}
                </div>
              </TableCell>

              {/* Amount */}
              <TableCell className="text-right">
                <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
                  {formatCurrency(invoice.total || 0)}
                </span>
              </TableCell>

              {/* Due Date */}
              <TableCell className="text-right">
                <span className={`text-sm ${
                  invoice.status === 'overdue' 
                    ? 'text-rose-600 dark:text-rose-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {formatDate(invoice.dueDate)}
                </span>
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusBadge status={invoice.status} />
              </TableCell>

              {/* Actions */}
              <TableCell onClick={(e) => e.stopPropagation()}>
                <InvoiceRowActions
                  invoice={invoice}
                  onEdit={onEdit}
                  onView={onView}
                  onSend={onSend}
                  onMarkPaid={onMarkPaid}
                  onDelete={onDelete}
                  onCopyLink={onCopyLink}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * EmptyState — Displayed when there are no invoices
 */
function EmptyState() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
          No invoices found
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Create your first invoice or adjust your filters
        </p>
      </div>
    </div>
  )
}
