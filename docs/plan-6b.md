DAY 6: Public Invoice View
Day 6 Execution Plan — Phased Breakdown

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 6: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► Public Layout                                                  │
│              └── Minimal layout without navigation                          │
│                                                                             │
│  PHASE 2 ──► Invoice Header Component                                       │
│              └── Logo, invoice number, business details                     │
│                                                                             │
│  PHASE 3 ──► Invoice Line Items Display                                     │
│              └── Read-only line items with totals                           │
│                                                                             │
│  PHASE 4 ──► Payment Modal                                                  │
│              └── Mock Stripe payment form                                   │
│                                                                             │
│  PHASE 5 ──► Public Invoice Page                                            │
│              └── Complete public-facing invoice                             │
│                                                                             │
│  PHASE 6 ──► Print Optimization                                             │
│              └── Print-specific styles                                      │
│                                                                             │
│  PHASE 7 ──► Validation & QA                                                │
│              └── Print preview, responsive, accessibility                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

Phase 1: Public Layout
1.1 Implementation
Step 1.1.1: Create Public Layout

```tsx
// app/frontend/layouts/PublicLayout.tsx
import { TooltipProvider } from "@/components/ui/tooltip"

interface PublicLayoutProps {
  children: React.ReactNode
}

/**
 * PublicLayout — Minimal layout for public-facing pages
 * 
 * Features:
 * - No navigation sidebar
 * - Centered content
 * - Print-optimized
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 print:bg-white">
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 print:py-0 print:px-0">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>

        {/* Minimal Footer (hidden in print) */}
        <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400 no-print">
          <p>Powered by InvoiceForge</p>
        </footer>
      </div>
    </TooltipProvider>
  )
}
```

---

Phase 2: Invoice Header Component
2.1 Implementation
Step 2.1.1: Create PublicInvoiceHeader Component

```
// app/frontend/components/public-invoice/PublicInvoiceHeader.tsx
import { Logo } from "@/components/layout/Logo"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { formatDate } from "@/lib/utils"
import type { Invoice, Client } from "@/lib/types"

interface PublicInvoiceHeaderProps {
  invoice: Invoice
  client: Client
}

/**
 * PublicInvoiceHeader — Header section of public invoice
 * 
 * Layout:
 * - Left: Business logo and details
 * - Right: INVOICE title and number
 */
export function PublicInvoiceHeader({ invoice, client }: PublicInvoiceHeaderProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-8 mb-8 print:border-slate-300">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
        {/* Left: Business Info */}
        <div>
          <Logo />
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
            <p className="font-medium text-slate-900 dark:text-slate-50 print:text-black">
              Your Business Name
            </p>
            <p>123 Business Street</p>
            <p>Singapore 123456</p>
            <p>contact@yourbusiness.com</p>
          </div>
        </div>

        {/* Right: Invoice Info */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-3 mb-2">
            <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-50 print:text-black">
              INVOICE
            </h1>
            <StatusBadge status={invoice.status} className="no-print" />
          </div>
          
          {/* Invoice Number — The Hero Element */}
          <p className="font-mono text-4xl sm:text-5xl tracking-tighter font-medium text-slate-900 dark:text-slate-50 print:text-black">
            #{invoice.invoiceNumber}
          </p>

          {/* Dates */}
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 print:text-slate-700 space-y-1">
            <p>
              <span className="text-slate-500 dark:text-slate-500">Issue Date: </span>
              <span className="font-medium">{formatDate(invoice.issueDate)}</span>
            </p>
            <p>
              <span className="text-slate-500 dark:text-slate-500">Due Date: </span>
              <span className="font-medium">{formatDate(invoice.dueDate)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 print:border-slate-300">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Bill To
        </p>
        <div className="text-sm text-slate-900 dark:text-slate-50 print:text-black">
          <p className="font-semibold">{client.name}</p>
          {client.company && <p>{client.company}</p>}
          {client.address && <p className="text-slate-600 dark:text-slate-400 print:text-slate-700">{client.address}</p>}
          <p className="text-slate-600 dark:text-slate-400 print:text-slate-700">{client.email}</p>
        </div>
      </div>
    </div>
  )
}
```

---

Phase 3: Invoice Line Items Display
3.1 Implementation
Step 3.1.1: Create PublicInvoiceLineItems Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceLineItems.tsx
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceLineItemsProps {
  lineItems: LineItem[]
}

/**
 * PublicInvoiceLineItems — Line items table for public invoice
 */
export function PublicInvoiceLineItems({ lineItems }: PublicInvoiceLineItemsProps) {
  return (
    <div className="mb-8">
      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-100 dark:bg-slate-800 print:bg-slate-100 rounded-t-lg text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 print:text-slate-700">
        <div className="col-span-6">Description</div>
        <div className="col-span-2 text-right">Qty</div>
        <div className="col-span-2 text-right">Rate</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      {/* Line Items */}
      <div className="border border-slate-200 dark:border-slate-700 print:border-slate-300 rounded-lg sm:rounded-t-none overflow-hidden divide-y divide-slate-200 dark:divide-slate-700 print:divide-slate-300">
        {lineItems.map((item, index) => (
          <LineItemRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

/**
 * Individual line item row
 */
function LineItemRow({ item, index }: { item: LineItem; index: number }) {
  // Section header
  if (item.type === 'section') {
    return (
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 print:bg-slate-50">
        <p className="font-semibold text-sm text-slate-900 dark:text-slate-50 print:text-black uppercase tracking-wide">
          {item.description}
        </p>
      </div>
    )
  }

  const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
  const isDiscount = item.type === 'discount'

  return (
    <div className={cn(
      "px-4 py-4",
      isDiscount && "bg-rose-50 dark:bg-rose-950/20 print:bg-rose-50"
    )}>
      {/* Mobile Layout */}
      <div className="sm:hidden space-y-2">
        <p className={cn(
          "font-medium text-sm",
          isDiscount 
            ? "text-rose-700 dark:text-rose-400 print:text-rose-700"
            : "text-slate-900 dark:text-slate-50 print:text-black"
        )}>
          {item.description}
        </p>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400 print:text-slate-600">
            {item.quantity} {item.unitType} × {formatCurrency(Math.abs(item.unitPrice || 0))}
          </span>
          <span className={cn(
            "font-mono font-medium",
            isDiscount 
              ? "text-rose-600 dark:text-rose-400 print:text-rose-700"
              : "text-slate-900 dark:text-slate-50 print:text-black"
          )}>
            {formatCurrency(lineTotal)}
          </span>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6">
          <p className={cn(
            "text-sm",
            isDiscount 
              ? "text-rose-700 dark:text-rose-400 print:text-rose-700"
              : "text-slate-900 dark:text-slate-50 print:text-black"
          )}>
            {item.description}
          </p>
        </div>
        <div className="col-span-2 text-right text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
          {item.quantity} {item.unitType}
        </div>
        <div className="col-span-2 text-right font-mono text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
          {formatCurrency(Math.abs(item.unitPrice || 0))}
        </div>
        <div className={cn(
          "col-span-2 text-right font-mono text-sm font-medium",
          isDiscount 
            ? "text-rose-600 dark:text-rose-400 print:text-rose-700"
            : "text-slate-900 dark:text-slate-50 print:text-black"
        )}>
          {formatCurrency(lineTotal)}
        </div>
      </div>
    </div>
  )
}
```

Step 3.1.2: Create PublicInvoiceTotals Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceTotals.tsx
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { InvoiceTotals } from "@/lib/invoice-calculations"

interface PublicInvoiceTotalsProps {
  totals: InvoiceTotals
}

/**
 * PublicInvoiceTotals — Summary section for public invoice
 */
export function PublicInvoiceTotals({ totals }: PublicInvoiceTotalsProps) {
  return (
    <div className="flex justify-end mb-8">
      <div className="w-full sm:w-80 space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between text-sm py-2">
          <span className="text-slate-600 dark:text-slate-400 print:text-slate-700">
            Subtotal
          </span>
          <span className="font-mono font-medium text-slate-900 dark:text-slate-50 print:text-black">
            {formatCurrency(totals.subtotal)}
          </span>
        </div>

        {/* Discount */}
        {totals.totalDiscount > 0 && (
          <div className="flex justify-between text-sm py-2">
            <span className="text-slate-600 dark:text-slate-400 print:text-slate-700">
              Discount
            </span>
            <span className="font-mono font-medium text-rose-600 dark:text-rose-400 print:text-rose-700">
              -{formatCurrency(totals.totalDiscount)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-slate-200 dark:bg-slate-700 print:bg-slate-300 my-2" />

        {/* Total */}
        <div className="flex justify-between items-center py-3 px-4 bg-slate-900 dark:bg-slate-50 print:bg-slate-900 rounded-lg">
          <span className="font-semibold text-white dark:text-slate-900 print:text-white">
            Total Due
          </span>
          <span className="font-mono text-2xl font-bold text-white dark:text-slate-900 print:text-white">
            {formatCurrency(totals.total)}
          </span>
        </div>
      </div>
    </div>
  )
}
```

---

Phase 4: Payment Modal
4.1 Implementation
Step 4.1.1: Create PaymentModal Component

```tsx
// app/frontend/components/public-invoice/PaymentModal.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, Lock } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
  invoiceNumber: string
}

/**
 * PaymentModal — Mock Stripe payment form
 * 
 * Features:
 * - Card number, expiry, CVC fields
 * - Mock "Secured by Stripe" branding
 * - Full screen on mobile
 */
export function PaymentModal({
  open,
  onOpenChange,
  amount,
  invoiceNumber,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert('Payment successful! (This is a mock payment)')
      onOpenChange(false)
    }, 2000)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(' ').slice(0, 19) : ''
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pay Invoice #{invoiceNumber}
          </DialogTitle>
          <DialogDescription>
            Enter your card details to complete the payment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Display */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">Amount Due</p>
            <p className="font-mono text-3xl font-bold text-slate-900 dark:text-slate-50">
              {formatCurrency(amount)}
            </p>
          </div>

          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              disabled={isProcessing}
            />
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
                type="password"
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Lock className="h-3 w-3" />
            <span>Secured by Stripe (Mock)</span>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isProcessing}
              className="w-full sm:w-auto"
            >
              {isProcessing ? 'Processing...' : `Pay ${formatCurrency(amount)}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

---

Phase 5: Public Invoice Page
5.1 Implementation
Step 5.1.1: Create Public Invoice Components Index

```ts
// app/frontend/components/public-invoice/index.ts
export { PublicInvoiceHeader } from './PublicInvoiceHeader'
export { PublicInvoiceLineItems } from './PublicInvoiceLineItems'
export { PublicInvoiceTotals } from './PublicInvoiceTotals'
export { PaymentModal } from './PaymentModal'
```

Step 5.1.2: Create Public Invoice Page

```tsx
// app/frontend/pages/PublicInvoice/Show.tsx
import { useState } from "react"
import { PublicLayout } from "@/layouts/PublicLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  PublicInvoiceHeader,
  PublicInvoiceLineItems,
  PublicInvoiceTotals,
  PaymentModal,
} from "@/components/public-invoice"
import { mockInvoices, mockClients } from "@/lib/mock-data"
import { calculateInvoiceTotals } from "@/lib/invoice-calculations"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, Download, Printer } from "lucide-react"

interface PublicInvoiceShowProps {
  token: string
}

/**
 * Public Invoice Page — Client-facing shareable invoice
 * 
 * Features:
 * - Professional invoice presentation
 * - Pay Now button (mock)
 * - Print button
 * - Download button (future)
 * - Print-optimized layout
 */
export default function PublicInvoiceShow({ token }: PublicInvoiceShowProps) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  // Find invoice by token
  const invoice = mockInvoices.find(inv => inv.token === token)
  
  if (!invoice) {
    return (
      <PublicLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Invoice Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            This invoice may have been deleted or the link is invalid.
          </p>
        </div>
      </PublicLayout>
    )
  }

  const client = mockClients.find(c => c.id === invoice.clientId)!
  const totals = calculateInvoiceTotals(invoice.lineItems)
  
  const isPaid = invoice.status === 'paid'
  const canPay = invoice.status === 'pending' || invoice.status === 'overdue'

  const handlePrint = () => {
    window.print()
  }

  return (
    <PublicLayout>
      {/* Action Buttons (hidden in print) */}
      <div className="flex justify-end gap-2 mb-4 no-print">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button variant="outline" size="sm" disabled>
          <Download className="h-4 w-4 mr-2" />
          Download 
```
