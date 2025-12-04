// app/frontend/pages/PublicInvoice/Show.tsx
import { useState, useMemo } from "react"
import { PublicLayout } from "@/layouts/PublicLayout"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/StatusBadge"
import {
  PublicInvoiceHeader,
  PublicInvoiceLineItems,
  PublicInvoiceTotals,
  PaymentModal,
} from "@/components/public-invoice"
import { calculateTotals } from "@/components/invoices/InvoiceSummary"
import { mockInvoices } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, Printer, Download } from "lucide-react"

interface PublicInvoiceShowProps {
  token: string
}

/**
 * Public Invoice Page — Client-facing shareable invoice
 * 
 * Features:
 * - Professional invoice layout
 * - Print-optimized styling
 * - Pay Now button (mock)
 * - Print and download options
 */
export default function PublicInvoiceShow({ token }: PublicInvoiceShowProps) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  // Find invoice by token (in real app, this would come from API)
  const invoice = useMemo(
    () => mockInvoices.find(inv => inv.token === token),
    [token]
  )

  if (!invoice) {
    return (
      <PublicLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Invoice not found</p>
        </div>
      </PublicLayout>
    )
  }

  const { total } = calculateTotals(invoice.lineItems)
  const isPaid = invoice.status === 'paid'
  const canPay = invoice.status === 'pending' || invoice.status === 'overdue'

  const handlePrint = () => {
    window.print()
  }

  return (
    <PublicLayout>
      {/* Action Bar (hidden in print) */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <StatusBadge status={invoice.status} />
        <div className="flex 
