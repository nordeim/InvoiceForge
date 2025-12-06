// app/frontend/lib/types.ts

// ═══════════════════════════════════════════════════════════════════════════
// ENUMS & TYPE ALIASES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Invoice status - all possible states
 */
export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'

/**
 * Line item type
 */
export type LineItemType = 'item' | 'section' | 'discount'

/**
 * Unit type for billing
 */
export type UnitType = 'hours' | 'days' | 'items' | 'units' | 'fixed'

/**
 * Activity type - all possible activity events
 */
export type ActivityType = 
  | 'invoice_created' 
  | 'invoice_sent' 
  | 'invoice_paid' 
  | 'invoice_overdue'
  | 'client_created'

// ═══════════════════════════════════════════════════════════════════════════
// ENTITY INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Client entity
 */
export interface Client {
  id: string
  name: string
  email: string
  company?: string
  address?: string
  phone?: string
  notes?: string
  createdAt: string
  updatedAt: string
  // Computed fields (for list views)
  totalBilled?: number
  lastInvoiceDate?: string
}

/**
 * Line item entity
 */
export interface LineItem {
  id: string
  invoiceId: string
  type: LineItemType
  description: string
  quantity?: number        // null for section headers
  unitType?: UnitType      // null for section headers
  unitPrice?: number       // Negative for discounts
  position: number
  // Computed
  lineTotal?: number
}

/**
 * Invoice entity
 */
export interface Invoice {
  id: string
  invoiceNumber: string    // Format: "2025-0001"
  clientId: string
  client?: Client          // Expanded relation
  status: InvoiceStatus
  issueDate: string        // ISO date string
  dueDate: string          // ISO date string
  notes?: string
  lineItems: LineItem[]
  token: string            // For public URL
  createdAt: string
  updatedAt: string
  // Computed
  subtotal?: number
  totalDiscount?: number
  total?: number
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Dashboard statistics
 */
export interface DashboardMetrics {
  totalOutstanding: number
  totalPaidThisMonth: number
  totalPaidYTD: number
  overdueAmount: number
  overdueCount: number
}

/**
 * Recent activity item
 */
export interface RecentActivity {
  id: string
  type: ActivityType
  description: string
  timestamp: string
  relatedId?: string
  relatedType?: 'invoice' | 'client'
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Invoice totals calculation result
 */
export interface InvoiceTotals {
  subtotal: number
  totalDiscount: number
  total: number
}

/**
 * Filter option for dropdowns/tabs
 */
export interface FilterOption<T = string> {
  value: T
  label: string
  count?: number
}

/**
 * Navigation item
 */
export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT PROP TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Common page props from Inertia
 */
export interface PageProps {
  flash?: {
    success?: string
    error?: string
  }
  errors?: Record<string, string[]>
}

/**
 * Dashboard page props
 */
export interface DashboardPageProps extends PageProps {
  metrics?: DashboardMetrics
  invoices?: Invoice[]
  activities?: RecentActivity[]
}

/**
 * Clients page props
 */
export interface ClientsPageProps extends PageProps {
  clients: Client[]
}

/**
 * Invoices page props
 */
export interface InvoicesPageProps extends PageProps {
  invoices: Invoice[]
}

/**
 * Invoice editor page props
 */
export interface InvoiceEditorPageProps extends PageProps {
  invoice?: Invoice
  clients: Client[]
  nextInvoiceNumber: string
}

/**
 * Public invoice page props
 */
export interface PublicInvoicePageProps {
  invoice: Invoice
}
