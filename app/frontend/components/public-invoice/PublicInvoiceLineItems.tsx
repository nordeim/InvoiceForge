// app/frontend/components/public-invoice/PublicInvoiceLineItems.tsx
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceLineItemsProps {
  lineItems: LineItem[]
}

/**
 * PublicInvoiceLineItems — Line items table for public invoice
 * 
 * Layout:
 * - Section headers span full width
 * - Items show description, quantity, rate, amount
 * - Discounts shown in red
 */
export function PublicInvoiceLineItems({ lineItems }: PublicInvoiceLineItemsProps) {
  return (
    <div className="mb-8">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 border-b-2 border-slate-900 dark:border-slate-100 text-sm font-medium text-slate-900 dark:text-slate-100">
        <div className="col-span-6">Description</div>
        <div className="col-span-2 text-right">Quantity</div>
        <div className="col-span-2 text-right">Rate</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      {/* Line Items */}
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {lineItems.map((item) => (
          <LineItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

/**
 * LineItemRow — Single line item display
 */
function LineItemRow({ item }: { item: LineItem }) {
  // Section Header
  if (item.type === 'section') {
    return (
      <div className="py-4 bg-slate-50 dark:bg-slate-800/50 -mx-4 px-4 md:mx-0 md:px-0">
        <p className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide text-sm">
          {item.description}
        </p>
      </div>
    )
  }

  // Discount Row
  if (item.type === 'discount') {
    const amount = Math.abs(item.unitPrice || 0)
    return (
      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
        <div className="md:col-span-6">
          <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
        </div>
        <div className="md:col-span-2" />
        <div className="md:col-span-2" />
        <div className="md:col-span-2 text-right">
          <span className="font-mono text-rose-600 dark:text-rose-400">
            -{formatCurrency(amount)}
          </span>
        </div>
      </div>
    )
  }

  // Regular Item Row
  const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
  const unitLabel = item.unitType === 'fixed' ? '' : ` ${item.unitType}`

  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
      {/* Description */}
      <div className="md:col-span-6">
        <p className="text-slate-900 dark:text-slate-100">{item.description}</p>
      </div>

      {/* Quantity */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Qty: </span>
        <span className="text-slate-600 dark:text-slate-400">
          {item.quantity}{unitLabel}
        </span>
      </div>

      {/* Rate */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Rate: </span>
        <span className="font-mono text-slate-600 dark:text-slate-400">
          {formatCurrency(item.unitPrice || 0)}
        </span>
      </div>

      {/* Amount */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Amount: </span>
        <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
          {formatCurrency(lineTotal)}
        </span>
      </div>
    </div>
  )
}
