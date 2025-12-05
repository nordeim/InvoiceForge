// app/frontend/components/dashboard/RecentInvoices.tsx
// Update the map to pass index

import { Link } from "@inertiajs/react"
import { RecentInvoiceCard } from "./RecentInvoiceCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowRight } from "lucide-react"
import type { Invoice } from "@/lib/types"

interface RecentInvoicesProps {
  invoices: Invoice[]
  limit?: number
}

export function RecentInvoices({ invoices, limit = 5 }: RecentInvoicesProps) {
  const displayedInvoices = invoices.slice(0, limit)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-400" />
          Recent Invoices
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/invoices" className="gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {displayedInvoices.length > 0 ? (
          displayedInvoices.map((invoice, index) => (
            <RecentInvoiceCard
              key={invoice.id}
              invoice={invoice}
              index={index}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
        No invoices yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Create your first invoice to get started
      </p>
      <Button size="sm" className="mt-4" asChild>
        <Link href="/invoices/new">Create Invoice</Link>
      </Button>
    </div>
  )
}
