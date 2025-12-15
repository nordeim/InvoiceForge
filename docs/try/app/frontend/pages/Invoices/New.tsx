// app/frontend/pages/Invoices/New.tsx
import { useState, useMemo, useCallback } from "react"
import { router, Link } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ClientSelector, 
  DatePicker, 
  LineItemEditor,
  InvoiceSummary 
} from "@/components/invoices"
import { mockClients } from "@/lib/mock-data"
import { calculateInvoiceTotals } from "@/lib/invoice-calculations"
import { generateInvoiceNumber, formatCurrency } from "@/lib/utils"
import { ArrowLeft, Save, Send } from "lucide-react"
import type { LineItem } from "@/lib/types"

/**
 * New Invoice Page — High-speed invoice creation
 * 
 * Layout (v4.2):
 * - Sticky header with back, title, actions
 * - Client selector and date pickers
 * - Line item editor
 * - Summary with totals
 * - Sticky footer on mobile
 */
export default function InvoicesNew() {
  // Form state
  const [clientId, setClientId] = useState<string>('')
  const [issueDate, setIssueDate] = useState<Date>(new Date())
  const [dueDate, setDueDate] = useState<Date>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30) // Default: 30 days from now
    return date
  })
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Generate invoice number
  const invoiceNumber = useMemo(() => {
    const year = new Date().getFullYear()
    const sequence = 3 // In real app, this would come from the backend
    return generateInvoiceNumber(year, sequence)
  }, [])

  // Calculate totals
  const totals = useMemo(() => calculateInvoiceTotals(lineItems), [lineItems])

  // Get selected client
  const selectedClient = mockClients.find(c => c.id === clientId)

  // Validation
  const isValid = clientId && lineItems.length > 0 && lineItems.some(li => li.type === 'item')

  // Handle save as draft
  const handleSaveDraft = useCallback(() => {
    if (!isValid) {
      alert('Please select a client and add at least one item.')
      return
    }

    setIsSaving(true)
    console.log('Save Draft:', {
      clientId,
      issueDate,
      dueDate,
      lineItems,
      notes,
      status: 'draft',
    })
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert('Invoice saved as draft!')
      router.visit('/invoices')
    }, 500)
  }, [clientId, issueDate, dueDate, lineItems, notes, isValid])

  // Handle save and send
  const handleSaveAndSend = useCallback(() => {
    if (!isValid) {
      alert('Please select a client and add at least one item.')
      return
    }

    setIsSaving(true)
    console.log('Save & Send:', {
      clientId,
      issueDate,
      dueDate,
      lineItems,
      notes,
      status: 'pending',
    })
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert(`Invoice sent to ${selectedClient?.email}!`)
      router.visit('/invoices')
    }, 500)
  }, [clientId, issueDate, dueDate, lineItems, notes, isValid, selectedClient])

  return (
    <AppLayout>
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/invoices" aria-label="Back to invoices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-2xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
                New Invoice
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                #{invoiceNumber}
              </p>
            </div>
          </div>

          {/* Right: Actions (hidden on mobile, shown in footer) */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleSaveAndSend} disabled={isSaving}>
              <Send className="h-4 w-4 mr-2" />
              Save & Send
            </Button>
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="max-w-4xl mx-auto space-y-6 pb-24 sm:pb-8">
        {/* Client & Dates Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Client Selector */}
              <div className="md:col-span-1 space-y-2">
                <Label>Client</Label>
                <ClientSelector
                  clients={mockClients}
                  selectedClientId={clientId}
                  onSelect={setClientId}
                  placeholder="Select a client"
                />
              </div>

              {/* Issue Date */}
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <DatePicker
                  date={issueDate}
                  onDateChange={(date) => date && setIssueDate(date)}
                />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker
                  date={dueDate}
                  onDateChange={(date) => date && setDueDate(date)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items Card */}
        <Card>
          <CardContent className="pt-6">
            <LineItemEditor items={lineItems} onChange={setLineItems} />
          </CardContent>
        </Card>

        {/* Notes & Summary */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Notes */}
          <Card>
            <CardContent className="pt-6">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Payment terms, thank you message, etc."
                rows={4}
                className="mt-2"
              />
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">
                Summary
              </h3>
              <InvoiceSummary totals={totals} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
            <p className="font-mono text-xl font-bold text-slate-900 dark:text-slate-50">
              {formatCurrency(totals.total)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              Save Draft
            </Button>
            <Button size="sm" onClick={handleSaveAndSend} disabled={isSaving}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
