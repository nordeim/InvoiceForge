// app/frontend/components/invoices/LineItemEditor.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LineItemRow } from "./LineItemRow"
import { Plus, Type, Tag } from "lucide-react"
import type { LineItem, LineItemType } from "@/lib/types"

interface LineItemEditorProps {
  items: LineItem[]
  onChange: (items: LineItem[]) => void
}

/**
 * LineItemEditor — Complete line items editing interface
 * 
 * Features:
 * - Add items, sections, discounts
 * - Remove items
 * - Reorder items (future: drag and drop)
 */
export function LineItemEditor({ items, onChange }: LineItemEditorProps) {
  // Generate a unique ID
  const generateId = () => `li_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Add a new item
  const addItem = (type: LineItemType) => {
    const newItem: LineItem = {
      id: generateId(),
      invoiceId: '',
      type,
      description: '',
      position: items.length + 1,
      ...(type === 'item' && {
        quantity: 1,
        unitType: 'hours' as const,
        unitPrice: 0,
      }),
      ...(type === 'discount' && {
        quantity: 1,
        unitType: 'fixed' as const,
        unitPrice: 0,
      }),
    }
    onChange([...items, newItem])
  }

  // Update an item
  const updateItem = (index: number, updatedItem: LineItem) => {
    const newItems = [...items]
    newItems[index] = updatedItem
    onChange(newItems)
  }

  // Remove an item
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    onChange(newItems)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-slate-900 dark:text-slate-50">
          Line Items
        </h3>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
            <p className="text-sm">No items yet. Add an item to get started.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <LineItemRow
              key={item.id}
              item={item}
              index={index}
              onChange={(updated) => updateItem(index, updated)}
              onRemove={() => removeItem(index)}
            />
          ))
        )}
      </div>

      {/* Add Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('item')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('section')}
        >
          <Type className="h-4 w-4 mr-2" />
          Add Section
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('discount')}
        >
          <Tag className="h-4 w-4 mr-2" />
          Add Discount
        </Button>
      </div>
    </div>
  )
}
