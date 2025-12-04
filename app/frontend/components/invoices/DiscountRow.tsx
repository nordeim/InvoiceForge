// app/frontend/components/invoices/DiscountRow.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface DiscountRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onDelete: () => void
  disabled?: boolean
}

/**
 * DiscountRow — Editable row for discount line items
 * 
 * Layout:
 * - Drag handle | Description | Amount (always negative display) | Delete
 */
export function DiscountRow({
  item,
  onChange,
  onDelete,
  disabled = false,
}: DiscountRowProps) {
  const discountAmount = Math.abs(item.unitPrice ?? 0)

  const handleDescriptionChange = (description: string) => {
    onChange({ ...item, description })
  }

  const handleAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0
    // Store as negative value
    onChange({ ...item, unitPrice: -Math.abs(amount) })
  }

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-rose-50 dark:bg-rose-950/30",
      "border border-rose-200 dark:border-rose-800"
    )}>
      {/* Drag Handle */}
      <div className="flex-shrink-0 cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Discount Label */}
      <span className="text-xs font-medium uppercase tracking-wide text-rose-600 dark:text-rose-400 flex-shrink-0">
        Discount:
      </span>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <Input
          value={item.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Discount description"
          disabled={disabled}
          className="bg-white dark:bg-slate-900"
        />
      </div>

      {/* Amount Input */}
      <div className="w-28 flex-shrink-0">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={discountAmount || ''}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder="Amount"
          disabled={disabled}
          className="bg-white dark:bg-slate-900 text-right"
        />
      </div>

      {/* Discount Display (negative) */}
      <div className="w-28 flex-shrink-0 text-right">
        <span className="font-mono text-sm font-medium text-rose-600 dark:text-rose-400">
          -{formatCurrency(discountAmount)}
        </span>
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className="flex-shrink-0 h-8 w-8 text-slate-400 hover:text-rose-500"
        aria-label="Remove discount"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
