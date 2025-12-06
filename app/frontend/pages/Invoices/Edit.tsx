// app/frontend/pages/Invoices/Edit.tsx
import { AppLayout } from "@/layouts/AppLayout"
import { PageHeader } from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"

interface EditInvoiceProps {
  id: string
}

/**
 * Edit Invoice Page — Placeholder for Day 5
 */
export default function InvoicesEdit({ id }: EditInvoiceProps) {
  return (
    <AppLayout>
      <PageHeader
        title="Edit Invoice"
        subtitle={`Editing invoice ${id}`}
        actions={
          <Button variant="outline" asChild>
            <Link href="/invoices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Link>
          </Button>
        }
      />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          Invoice editor will be implemented on Day 5
        </p>
      </div>
    </AppLayout>
  )
}
