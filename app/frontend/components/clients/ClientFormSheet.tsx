// app/frontend/components/clients/ClientFormSheet.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ClientForm } from "./ClientForm"
import type { Client } from "@/lib/types"

interface ClientFormSheetProps {
  /** Whether the sheet is open */
  open: boolean
  /** Called when the sheet should close */
  onOpenChange: (open: boolean) => void
  /** Client data for edit mode (undefined for create) */
  client?: Client
  /** Called when form is submitted successfully */
  onSubmit: (data: any) => void
}

/**
 * ClientFormSheet — Sheet wrapper for client form
 * 
 * Features:
 * - Slides in from right
 * - Handles both create and edit modes
 * - Closes on successful submission
 */
export function ClientFormSheet({
  open,
  onOpenChange,
  client,
  onSubmit,
}: ClientFormSheetProps) {
  const isEditing = !!client

  const handleSubmit = (data: any) => {
    onSubmit(data)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>
            {isEditing ? 'Edit Client' : 'New Client'}
          </SheetTitle>
          <SheetDescription>
            {isEditing 
              ? 'Update the client information below.'
              : 'Add a new client to your directory.'
            }
          </SheetDescription>
        </SheetHeader>

        <ClientForm
          initialData={client}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </SheetContent>
    </Sheet>
  )
}
