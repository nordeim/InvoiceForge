// app/frontend/components/clients/ClientCard.tsx
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ClientAvatar } from "./ClientAvatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Pencil, Trash2, FileText, Mail } from "lucide-react"
import type { Client } from "@/lib/types"

interface ClientCardProps {
  client: Client
  /** Animation delay index */
  index?: number
  onEdit?: (client: Client) => void
  onDelete?: (client: Client) => void
  className?: string
}

/**
 * ClientCard — Mobile card view for a single client
 * 
 * Layout (v4.2):
 * - Avatar + Name/Email on left
 * - Actions menu on right
 * - Total billed and last invoice below
 * 
 * Displayed on mobile, hidden on desktop (md:hidden)
 */
export function ClientCard({ 
  client, 
  index = 0,
  onEdit,
  onDelete,
  className 
}: ClientCardProps) {
  return (
    <div
      className={cn(
        // Animation
        "animate-fade-in-up",
        // Surface styling
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "rounded-lg shadow-sm",
        "p-4",
        className
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header Row: Avatar + Info + Actions */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <ClientAvatar name={client.name} size="lg" />

        {/* Client Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-900 dark:text-slate-50 truncate">
            {client.name}
          </p>
          {client.company && (
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {client.company}
            </p>
          )}
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {client.email}
          </p>
        </div>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 flex-shrink-0"
              aria-label={`Actions for ${client.name}`}
            >
              <MoreVertical className="h-4 w-4" />
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
              className="text-rose-600 dark:text-rose-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />

      {/* Stats Row */}
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="text-slate-500 dark:text-slate-400">Total Billed</p>
          <p className="font-mono font-medium text-slate-900 dark:text-slate-50">
            {formatCurrency(client.totalBilled || 0)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 dark:text-slate-400">Last Invoice</p>
          <p className="text-slate-900 dark:text-slate-50">
            {client.lastInvoiceDate 
              ? formatDate(client.lastInvoiceDate, { month: 'short', day: 'numeric' })
              : '—'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
