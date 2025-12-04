// app/frontend/components/invoices/LineItemsEditor.tsx
import { Button } from "@/components/ui/button"
import { LineItemRow } from "./LineItemRow"
import { SectionHeaderRow } from "./SectionHeaderRow"
import { DiscountRow } from "./DiscountRow"
import { Plus, FolderPlus, Percent } from "lucide-react"
import { 
  createBlankItem, 
  createSectionHeader, 
  createDiscountLine 
} from "@/lib/invoice-utils"
import type { LineItem } from "@/lib/types"

interface LineItemsEditorProps {
  lineItems: LineItem[]
  onChange: (lineItems: LineItem[]) => void
  invoiceId?: string
  disabled?: boolean
}

/**
 * LineItemsEditor — Full editor for invoice line items
 * 
 * Features:
 * - Renders correct component for each item type
 * - Add buttons for items, sections, discounts
 * - Handles all CRUD operations
 * - Maintains position ordering
 */
export function LineItemsEditor({
  lineItems,
  onChange,
  invoiceId = '',
  disabled = false,
}: LineItemsEditorProps) {
  // Sort by position
  const sortedItems = [...lineItems].sort((a, b) => a.position - b.position)

  // Get next position number
  const getNextPosition = () => {
    if (lineItems.length === 0) return 1
    return Math.max(...lineItems.map(item => item.position)) + 1
  }

  // Handle adding a new item
  const handleAddItem = () => {
    const newItem = createBlankItem(getNextPosition(), invoiceId)
    onChange([...lineItems, newItem])
  }

  // Handle adding a new section
  const handleAddSection = () => {
    const newSection = createSectionHeader('', getNextPosition(), invoiceId)
    onChange([...lineItems, newSection])
  }

  // Handle adding a new discount
  const handleAddDiscount = () => {
    const newDiscount = createDiscountLine('', 0, getNextPosition(), invoiceId)
    onChange([...lineItems, newDiscount])
  }

  // Handle updating an item
  const handleUpdateItem = (updatedItem: LineItem) => {
    onChange(lineItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ))
  }

  // Handle deleting an item
  const handleDeleteItem = (itemId: string) => {
    onChange(lineItems.filter(item => item.id !== itemId))
  }

  // Render the appropriate component for each item type
  const renderLineItem = (item: LineItem) => {
    const commonProps = {
      key: item.id,
      item,
      onChange: handleUpdateItem,
      onDelete: () => handleDeleteItem(item.id),
      disabled,
    }

    switch (item.type) {
      case 'section':
        return <SectionHeaderRow {...commonProps} />
      case 'discount':
        return <DiscountRow {...commonProps} />
      case 'item':
      default:
        return <LineItemRow {...commonProps} />
    }
  }

  return (
    <div className="space-y-4">
      {/* Line Items Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-slate-900 dark:text-slate-50">
          Line Items
        </h3>
      </div>

      {/* Line Items List */}
      <div className="space-y-2">
        {sortedItems.length === 0 ? (
          <EmptyState onAddItem={handleAddItem} />
        ) : (
          sortedItems.map(renderLineItem)
        )}
      </div>

      {/* Add Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddItem}
          disabled={disabled}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddSection}
          disabled={disabled}
        >
          <FolderPlus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddDiscount}
          disabled={disabled}
        >
          <Percent className="h-4 w-4 mr-2" />
          Add Discount
        </Button>
      </div>
    </div>
  )
}

/**
 * EmptyState — Displayed when there are no line items
 */
function EmptyState({ onAddItem }: { onAddItem: () => void }) {
  return (
    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        No line items yet. Add your first item to get started.
      </p>
      <Button variant="outline" onClick={onAddItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add First Item
      </Button>
    </div>
  )
}
