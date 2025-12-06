// app/frontend/components/clients/ClientTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ClientAvatar } from "./ClientAvatar"
import { formatCurrency, formatDate } from "@/lib/utils"
import { MoreHorizontal, Pencil, Trash2, FileText, Mail } from "lucide-react"
import type { Client } from "@/lib/types"

interface ClientTableProps {
  clients: Client[]
  onEdit?: (client: Client) => void
  onDelete?: (client: Client) => void
}

/**
 * ClientTable — Desktop table view for clients
 * 
 * Layout (v4.2):
 * - Avatar | Name/Company/Email | Total Billed | Last Invoice | Actions
 * - Row hover states
 * - Dropdown actions menu
 * 
 * Hidden on mobile (md:hidden counterpart shows ClientCard)
 */
export function ClientTable({ clients, onEdit, onDelete }: ClientTableProps) {
  if (clients.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">Client</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Total Billed</TableHead>
            <TableHead className="text-right">Last Invoice</TableHead>
            <TableHead className="w-[50px]">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow 
              key={client.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Client Info */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <ClientAvatar name={client.name} size="md" />
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-50 truncate">
                      {client.name}
                    </p>
                    {client.company && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {client.company}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Email */}
              <TableCell>
                <span className="text-slate-600 dark:text-slate-400">
                  {client.email}
                </span>
              </TableCell>

              {/* Total Billed */}
              <TableCell className="text-right">
                <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
                  {formatCurrency(client.totalBilled || 0)}
                </span>
              </TableCell>

              {/* Last Invoice */}
              <TableCell className="text-right">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {client.lastInvoiceDate 
                    ? formatDate(client.lastInvoiceDate)
                    : '—'
                  }
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      aria-label={`Actions for ${client.name}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(client)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      View Invoices
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(client)}
                      className="text-rose-600 dark:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * EmptyState — Displayed when there are no clients
 */
function EmptyState() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
          No clients yet
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Add your first client to get started
        </p>
      </div>
    </div>
  )
}
