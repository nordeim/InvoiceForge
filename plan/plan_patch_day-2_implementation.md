# Deep Analysis: Day 2 Implementation Plan

## Executive Summary

I have completed a meticulous review of your Day 2 execution plan. The plan is **well-structured and comprehensive**, demonstrating strong alignment with PRD v4.2's Neo-Editorial design system. Your self-analysis at the end correctly identifies most critical gaps.

Below I provide my complete analysis, consolidating your findings with additional observations, and delivering production-ready patches.

---

## 1. Strengths Analysis

| Aspect | Assessment | Evidence |
|--------|------------|----------|
| **Phase Structure** | ✅ Excellent | 7 logical phases with clear dependencies |
| **PRD v4.2 Alignment** | ✅ Strong | Typography, colors, spacing follow spec |
| **Code Documentation** | ✅ Excellent | JSDoc comments explain design decisions |
| **Accessibility** | ✅ Good | SR-only text, focus rings, reduced motion |
| **Responsive Design** | ✅ Correct | Mobile-first grid patterns |
| **Validation Process** | ✅ Comprehensive | Detailed QA checklists |

### Typography Alignment Verification

| Element | PRD v4.2 Spec | Day 2 Implementation | Status |
|---------|---------------|---------------------|--------|
| Page Title | `font-display text-4xl tracking-tight` | `font-display text-4xl tracking-tight leading-none` | ✅ |
| Metric Value | `font-mono text-3xl` | `font-mono text-3xl font-medium` | ✅ |
| Metric Label | `text-xs uppercase tracking-wide` | `text-xs font-medium uppercase tracking-wide` | ✅ |
| Card Title | `font-sans text-lg font-semibold` | `font-sans text-lg font-semibold leading-none tracking-tight` | ✅ |
| Body Text | `text-sm font-sans` | `text-sm text-slate-600` | ✅ |

### Surface Token Alignment

| Token | PRD v4.2 Spec | Day 2 Implementation | Status |
|-------|---------------|---------------------|--------|
| Canvas | `bg-slate-50` / `bg-slate-950` | Applied in AppLayout | ✅ |
| Surface (Card) | `bg-white` / `bg-slate-900` | All Card components | ✅ |
| Border | `border-slate-200` / `border-slate-800` | All Card components | ✅ |
| Shadow | `shadow-sm` | All Card components | ✅ |

---

## 2. Complete Gap Analysis

### 2.1 Critical Gaps (Must Fix Before Implementation)

| # | Gap | Location | Impact | Your Analysis | My Additional Notes |
|---|-----|----------|--------|---------------|---------------------|
| 1 | Missing `getRelativeTime` | `utils.ts` | Runtime error in ActivityItem | ✅ Identified | Correct implementation provided |
| 2 | Missing `ActivityType` export | `types.ts` | TypeScript error | ✅ Identified | Need standalone export |
| 3 | Props interface inconsistency | `RecentInvoiceCard` | Confusing API | ✅ Identified | Use `index` as final |

### 2.2 High Priority Gaps

| # | Gap | Location | Impact | Your Analysis | My Additional Notes |
|---|-----|----------|--------|---------------|---------------------|
| 4 | Missing `cancelled` status | `StatusBadge` | Day 5-7 incompatibility | ✅ Identified | Forward compatibility |
| 5 | `formatDate` signature | `utils.ts` | Incorrect date formatting | ✅ Identified | Options replace defaults |
| 6 | Missing Separator component | `ui/separator.tsx` | Missing UI element | ✅ Identified | Needs Radix dependency |

### 2.3 Additional Gaps I Identified

| # | Gap | Location | Impact | Solution |
|---|-----|----------|--------|----------|
| 7 | **Card component duplication** | `ui/card.tsx` | ShadCN conflict | See Section 3.1 |
| 8 | **Missing tooltip dependency** | Day 1 install | Runtime error | Add to install list |
| 9 | **Animation keyframes location** | `application.css` | CSS layer issue | Move keyframes outside layer |
| 10 | **Missing `invoice_overdue` activity type** | `ActivityItem.tsx` | Incomplete mapping | Add to config |
| 11 | **Trend indicator accessibility** | `MetricCard.tsx` | Screen reader context | Add aria-label |
| 12 | **Link focus offset color** | `RecentInvoiceCard.tsx` | Dark mode focus ring | Add offset color |

---

## 3. Detailed Gap Analysis & Fixes

### 3.1 Gap 7: Card Component Duplication

**Issue**: Day 2 creates a custom `card.tsx`, but ShadCN's `npx shadcn@latest add card` was run in Day 1. Potential conflict.

**Resolution**: Your custom Card implementation is actually **better aligned** with PRD v4.2 because:
- It explicitly uses the Surface token colors
- It has the correct `shadow-sm` (not ShadCN's default)
- Typography follows v4.2 spec

**Recommendation**: Use your custom Card, but rename ShadCN's if it was installed:

```bash
# If ShadCN card exists, back it up
mv app/frontend/components/ui/card.tsx app/frontend/components/ui/card.shadcn.tsx

# Then create your custom card
```

### 3.2 Gap 9: Animation Keyframes Location

**Issue**: Your CSS has keyframes inside `@layer utilities`, which can cause specificity issues.

**Current (Problematic)**:
```css
@layer utilities {
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
    opacity: 0;
  }

  @keyframes fadeInUp { /* ... */ }
}
```

**Fixed**:
```css
/* Keyframes OUTSIDE layer (global scope) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@layer utilities {
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
}
```

### 3.3 Gap 10: Missing `invoice_overdue` Activity Type

**Issue**: The PRD defines `invoice_overdue` as an activity type, but `ActivityItem.tsx` doesn't handle it.

**Fixed ActivityItem config**:
```tsx
const activityConfig: Record<ActivityType, { 
  icon: React.ComponentType<{ className?: string }>
  color: string 
}> = {
  invoice_created: {
    icon: FileText,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  },
  invoice_sent: {
    icon: Send,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
  },
  invoice_paid: {
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400",
  },
  invoice_overdue: {  // ADD THIS
    icon: AlertCircle,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-400",
  },
  client_created: {
    icon: UserPlus,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  },
}
```

### 3.4 Gap 11: MetricCard Trend Accessibility

**Issue**: Trend indicators lack screen reader context.

**Fixed**:
```tsx
{/* Trend Indicator */}
{trend && (
  <div
    className={cn(
      "flex items-center gap-1 text-sm font-medium",
      trend.positive
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-rose-600 dark:text-rose-400"
    )}
    role="status"
    aria-label={`Trend: ${trend.direction === 'up' ? 'up' : 'down'} ${trend.value}, ${trend.positive ? 'positive' : 'negative'} change`}
  >
    {trend.direction === 'up' ? (
      <TrendingUp className="h-4 w-4" aria-hidden="true" />
    ) : (
      <TrendingDown className="h-4 w-4" aria-hidden="true" />
    )}
    <span>{trend.value}</span>
  </div>
)}
```

### 3.5 Gap 12: Focus Ring Offset Color

**Issue**: Dark mode focus ring offset uses wrong color.

**Current**:
```tsx
"focus:ring-offset-2"
"dark:focus:ring-offset-slate-950"
```

**This is correct**, but ensure `ring-offset-2` is present (you have it). The issue is that `focus:ring-offset-2` should also have a light mode offset color:

**Complete fix**:
```tsx
"focus:outline-none focus:ring-2 focus:ring-blue-500",
"focus:ring-offset-2 focus:ring-offset-white",  // Add light mode offset
"dark:focus:ring-offset-slate-950"
```

---

## 4. Complete Corrected Files

### 4.1 Complete `utils.ts`

```typescript
// app/frontend/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Class name merger (standard shadcn utility)
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Currency formatter for SGD
 * Format: S$1,234.56
 * 
 * @param amount - Numeric amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date for display
 * 
 * @param dateStr - ISO date string
 * @param options - Intl.DateTimeFormat options (replaces defaults if provided)
 * @returns Formatted date string
 * 
 * @example
 * formatDate('2025-01-15') // "15 Jan 2025"
 * formatDate('2025-01-15', { month: 'short', day: 'numeric' }) // "15 Jan"
 */
export function formatDate(
  dateStr: string, 
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  
  const finalOptions = options || defaultOptions
  
  return new Intl.DateTimeFormat('en-SG', finalOptions)
    .format(new Date(dateStr))
}

/**
 * Get relative time string from a date
 * 
 * @param dateStr - ISO date string
 * @returns Human-readable relative time
 * 
 * @example
 * getRelativeTime('2025-01-20T09:00:00Z') // "2 hours ago"
 */
export function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  // Handle future dates
  if (diffInSeconds < 0) {
    return 'Just now'
  }
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return 'Just now'
  }
  
  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
  }
  
  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
  }
  
  // Less than a week
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
  }
  
  // Less than a month
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`
  }
  
  // Less than a year
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`
  }
  
  // More than a year
  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`
}

/**
 * Generate invoice number
 * Format: YYYY-XXXX
 * 
 * @param year - Year for invoice
 * @param sequence - Sequence number
 * @returns Formatted invoice number
 */
export function generateInvoiceNumber(year: number, sequence: number): string {
  return `${year}-${String(sequence).padStart(4, '0')}`
}

/**
 * Calculate invoice status based on dates and payment state
 */
export function calculateInvoiceStatus(invoice: {
  paidAt?: string | null
  sentAt?: string | null
  dueDate: string
}): 'draft' | 'pending' | 'paid' | 'overdue' {
  if (invoice.paidAt) return 'paid'
  if (new Date(invoice.dueDate) < new Date()) return 'overdue'
  if (invoice.sentAt) return 'pending'
  return 'draft'
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Generate a unique ID (for temporary client-side use)
 */
export function generateTempId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
```

### 4.2 Complete `types.ts`

```typescript
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
```

### 4.3 Complete `StatusBadge.tsx` (with `cancelled`)

```tsx
// app/frontend/components/shared/StatusBadge.tsx
import { cn } from "@/lib/utils"
import type { InvoiceStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: InvoiceStatus
  className?: string
  /** Size variant */
  size?: 'sm' | 'md'
}

/**
 * StatusBadge — Invoice status indicator
 * 
 * Design (v4.2):
 * - Draft: Dashed border, slate colors
 * - Pending: Solid border, amber colors
 * - Paid: Solid border, emerald colors
 * - Overdue: Solid border, rose colors
 * - Cancelled: Solid border, muted slate colors
 * 
 * All badges: rounded-full, font-medium
 */
export function StatusBadge({ status, className, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft
  
  return (
    <span
      role="status"
      className={cn(
        // Base styles
        "inline-flex items-center font-medium rounded-full border",
        // Size variants
        size === 'sm' && "px-2.5 py-0.5 text-xs",
        size === 'md' && "px-3 py-1 text-sm",
        // Status-specific styles
        config.className,
        className
      )}
    >
      {config.label}
      <span className="sr-only">, {config.srText}</span>
    </span>
  )
}

/**
 * Status configuration
 * Includes styling, labels, and accessibility text
 */
const statusConfig: Record<InvoiceStatus, {
  label: string
  srText: string
  className: string
}> = {
  draft: {
    label: 'Draft',
    srText: 'Invoice is in draft status and has not been sent',
    className: cn(
      // Light mode
      "bg-slate-100 text-slate-600 border-slate-300 border-dashed",
      // Dark mode
      "dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600"
    ),
  },
  pending: {
    label: 'Pending',
    srText: 'Invoice has been sent and is awaiting payment',
    className: cn(
      // Light mode
      "bg-amber-50 text-amber-700 border-amber-300",
      // Dark mode
      "dark:bg-amber-950 dark:text-amber-400 dark:border-amber-700"
    ),
  },
  paid: {
    label: 'Paid',
    srText: 'Invoice has been paid in full',
    className: cn(
      // Light mode
      "bg-emerald-50 text-emerald-700 border-emerald-300",
      // Dark mode
      "dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-700"
    ),
  },
  overdue: {
    label: 'Overdue',
    srText: 'Invoice payment is past due date',
    className: cn(
      // Light mode
      "bg-rose-50 text-rose-700 border-rose-300",
      // Dark mode
      "dark:bg-rose-950 dark:text-rose-400 dark:border-rose-700"
    ),
  },
  cancelled: {
    label: 'Cancelled',
    srText: 'Invoice has been cancelled and is no longer active',
    className: cn(
      // Light mode
      "bg-slate-100 text-slate-500 border-slate-300",
      // Dark mode
      "dark:bg-slate-800 dark:text-slate-500 dark:border-slate-600"
    ),
  },
}

// Export for use in other components (e.g., filters)
export { statusConfig }

// Export status labels for filter tabs
export const statusLabels: Record<InvoiceStatus, string> = {
  draft: 'Draft',
  pending: 'Pending',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
}
```

### 4.4 Complete `ActivityItem.tsx` (with all types)

```tsx
// app/frontend/components/dashboard/ActivityItem.tsx
import { cn } from "@/lib/utils"
import { getRelativeTime } from "@/lib/utils"
import type { RecentActivity, ActivityType } from "@/lib/types"
import { 
  FileText, 
  Send, 
  CheckCircle, 
  UserPlus,
  AlertCircle
} from "lucide-react"

interface ActivityItemProps {
  activity: RecentActivity
  /** Is this the last item? (affects timeline styling) */
  isLast?: boolean
  /** Animation index for staggered entrance */
  index?: number
}

/**
 * ActivityItem — Single activity entry in the feed
 * 
 * Layout:
 * - Left: Icon with colored background
 * - Center: Description text
 * - Bottom: Relative timestamp
 * - Vertical line connecting items (timeline)
 */
export function ActivityItem({ 
  activity, 
  isLast = false,
  index = 0
}: ActivityItemProps) {
  const config = activityConfig[activity.type] || activityConfig.invoice_created

  return (
    <div 
      className={cn(
        "relative flex gap-4",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Timeline connector line */}
      {!isLast && (
        <div 
          className={cn(
            "absolute left-[15px] top-8 w-px h-[calc(100%+8px)]",
            "bg-slate-200 dark:bg-slate-700"
          )} 
          aria-hidden="true"
        />
      )}

      {/* Icon Container */}
      <div
        className={cn(
          "relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          config.color
        )}
        aria-hidden="true"
      >
        <config.icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-0.5">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {activity.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          <time dateTime={activity.timestamp}>
            {getRelativeTime(activity.timestamp)}
          </time>
        </p>
      </div>
    </div>
  )
}

/**
 * Activity type configuration
 * Maps activity types to icons and colors
 */
const activityConfig: Record<ActivityType, { 
  icon: React.ComponentType<{ className?: string }>
  color: string 
}> = {
  invoice_created: {
    icon: FileText,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  },
  invoice_sent: {
    icon: Send,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
  },
  invoice_paid: {
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400",
  },
  invoice_overdue: {
    icon: AlertCircle,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-400",
  },
  client_created: {
    icon: UserPlus,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  },
}
```

### 4.5 Complete `application.css` (Animations Fixed)

```css
/* app/assets/stylesheets/application.css */

/* ═══════════════════════════════════════════════════════════════════════════
   INVOICEFORGE DESIGN SYSTEM — v4.2 Neo-Editorial Precision
   ═══════════════════════════════════════════════════════════════════════════ */

@import "tailwindcss";

/* ═══════════════════════════════════════════════════════════════════════════
   THEME TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

@theme {
  /* Typography */
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  /* Primary Action Colors */
  --color-accent: var(--color-blue-500);
  --color-accent-hover: var(--color-blue-600);
  --color-accent-subtle: var(--color-blue-50);

  /* Status Colors */
  --color-status-draft: var(--color-slate-400);
  --color-status-pending: var(--color-amber-500);
  --color-status-paid: var(--color-emerald-500);
  --color-status-overdue: var(--color-rose-500);

  /* Brutalist Shadows */
  --shadow-brutal: 4px 4px 0px 0px var(--color-slate-900);
  --shadow-brutal-sm: 2px 2px 0px 0px var(--color-slate-900);
}

/* Dark Mode Shadow Overrides */
.dark {
  --shadow-brutal: 4px 4px 0px 0px var(--color-slate-100);
  --shadow-brutal-sm: 2px 2px 0px 0px var(--color-slate-100);
}

/* ═══════════════════════════════════════════════════════════════════════════
   BASE STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

@layer base {
  html {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Smooth color transitions for theme switching */
  * {
    @apply transition-colors duration-200;
  }

  /* Disable transitions during theme switch to prevent flash */
  html.no-transitions * {
    transition: none !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   KEYFRAME DEFINITIONS (Outside @layer for global scope)
   ═══════════════════════════════════════════════════════════════════════════ */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATION UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

@layer utilities {
  /* Staggered list entrance */
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
    opacity: 0;
  }

  /* Simple fade in */
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out forwards;
    opacity: 0;
  }

  /* Sheet/Drawer animations */
  .animate-slide-in-right {
    animation: slideInFromRight 0.3s ease-out forwards;
  }

  .animate-slide-in-bottom {
    animation: slideInFromBottom 0.3s ease-out forwards;
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up,
    .animate-fade-in,
    .animate-slide-in-right,
    .animate-slide-in-bottom {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRINT STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

@media print {
  .no-print,
  nav,
  footer,
  button,
  .sidebar {
    display: none !important;
  }

  body {
    background: white !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .invoice-container {
    box-shadow: none !important;
    border: 1px solid #e2e8f0 !important;
    width: 100% !important;
    page-break-inside: avoid;
  }
}
```

### 4.6 Complete `separator.tsx`

```tsx
// app/frontend/components/ui/separator.tsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-slate-200 dark:bg-slate-800",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

---

## 5. Pre-Implementation Dependency Installation

Add these to Day 2 before Phase 1:

```bash
# Day 2 Pre-Implementation Setup
# ─────────────────────────────────

# Install missing dependencies (if not already installed)
npm install @radix-ui/react-separator

# Verify all dependencies are present
npm ls @radix-ui/react-separator
npm ls clsx
npm ls tailwind-merge
npm ls lucide-react
```

---

## 6. Updated File Structure (Day 2 Complete)

```
app/frontend/
├── components/
│   ├── dashboard/
│   │   ├── index.ts                  ✅ Created
│   │   ├── MetricCard.tsx            ✅ Created
│   │   ├── RecentInvoiceCard.tsx     ✅ Created (use index prop)
│   │   ├── RecentInvoices.tsx        ✅ Created
│   │   ├── ActivityItem.tsx          ✅ Created (with all activity types)
│   │   └── ActivityFeed.tsx          ✅ Created
│   │
│   ├── layout/
│   │   ├── index.ts                  (from Day 1)
│   │   ├── Logo.tsx                  (from Day 1)
│   │   ├── ThemeToggle.tsx           (from Day 1)
│   │   ├── NavItem.tsx               (from Day 1)
│   │   ├── Sidebar.tsx               (from Day 1)
│   │   └── MobileNav.tsx             (from Day 1)
│   │
│   ├── shared/
│   │   ├── index.ts                  ✅ Created
│   │   ├── PageHeader.tsx            ✅ Created
│   │   └── StatusBadge.tsx           ✅ Created (with cancelled)
│   │
│   └── ui/
│       ├── index.ts                  ✅ Updated
│       ├── button.tsx                (from Day 1)
│       ├── card.tsx                  ✅ Created (custom v4.2)
│       ├── separator.tsx             ✅ Created
│       ├── sheet.tsx                 (from Day 1)
│       └── tooltip.tsx               (from Day 1)
│
├── hooks/
│   └── useTheme.ts                   (from Day 1)
│
├── layouts/
│   └── AppLayout.tsx                 (from Day 1)
│
├── lib/
│   ├── utils.ts                      ✅ Updated (with getRelativeTime)
│   ├── types.ts                      ✅ Updated (with ActivityType export)
│   └── mock-data.ts                  (from PRD)
│
├── pages/
│   ├── Dashboard.tsx                 ✅ Complete
│   ├── Clients/
│   │   └── Index.tsx                 (placeholder from Day 1)
│   └── Invoices/
│       └── Index.tsx                 (placeholder from Day 1)
│
└── entrypoints/
    ├── inertia.tsx                   (from Day 1)
    └── application.css               ✅ Updated (animations fixed)
```

---

## 7. Consolidated Validation Checklist

```markdown
## Day 2 Complete Validation Checklist

### Pre-Implementation
- [ ] Day 1 completion verified
- [ ] `@radix-ui/react-separator` installed
- [ ] No TypeScript errors: `npx tsc --noEmit`

### Utility Functions (lib/utils.ts)
- [ ] `cn()` function works
- [ ] `formatCurrency(1234.56)` returns "S$1,234.56"
- [ ] `formatDate('2025-01-15')` returns "15 Jan 2025"
- [ ] `formatDate('2025-01-15', { month: 'short', day: 'numeric' })` returns "15 Jan"
- [ ] `getRelativeTime()` returns human-readable time

### Type Definitions (lib/types.ts)
- [ ] `ActivityType` is exported standalone
- [ ] `InvoiceStatus` includes 'cancelled'
- [ ] `DashboardMetrics` interface exported
- [ ] `DashboardPageProps` interface exported

### Shared Components
- [ ] PageHeader renders title, subtitle, actions
- [ ] PageHeader title uses `font-display text-4xl tracking-tight`
- [ ] StatusBadge renders all 5 statuses correctly
- [ ] StatusBadge draft has dashed border
- [ ] StatusBadge has sr-only accessibility text

### Dashboard Components
- [ ] MetricCard label is uppercase, tracking-wide
- [ ] MetricCard value is font-mono, text-3xl
- [ ] MetricCard danger variant shows rose color
- [ ] MetricCard success variant shows emerald color
- [ ] MetricCard trend has accessibility labels
- [ ] RecentInvoiceCard displays all invoice data
- [ ] RecentInvoiceCard hover changes border color
- [ ] RecentInvoiceCard chevron appears on hover
- [ ] RecentInvoices shows "View All" link
- [ ] RecentInvoices shows empty state when no invoices
- [ ] ActivityItem shows correct icon per type
- [ ] ActivityItem shows timeline connector line
- [ ] ActivityItem handles 'invoice_overdue' type
- [ ] ActivityFeed shows empty state when no activities

### Dashboard Page
- [ ] All 4 metrics display correct values from mock data
- [ ] Metrics grid: 4 cols desktop, 2 cols tablet, 1 col mobile
- [ ] Two-column layout: RecentInvoices | ActivityFeed
- [ ] Layout stacks on mobile
- [ ] "New Invoice" button visible and linked

### Animations
- [ ] Staggered fade-in on invoice cards
- [ ] Staggered fade-in on activity items
- [ ] Animations respect prefers-reduced-motion
- [ ] Animation keyframes defined outside @layer

### Accessibility
- [ ] All interactive elements have focus rings
- [ ] Focus rings have correct offset colors (light & dark)
- [ ] StatusBadge has role="status"
- [ ] Trend indicators have aria-labels
- [ ] Timeline connector has aria-hidden="true"
- [ ] Time elements use <time> with dateTime

### Dark Mode
- [ ] Canvas uses bg-slate-950
- [ ] Cards use bg-slate-900
- [ ] All text colors adapt correctly
- [ ] Status badges colors adapt
- [ ] Activity icon colors adapt
- [ ] Focus ring offset uses slate-950
```

---

## 8. Summary

### Your Day 2 Plan: Assessment

| Category | Score | Notes |
|----------|-------|-------|
| Structure | 9/10 | Excellent phasing, clear objectives |
| PRD Alignment | 9/10 | Strong v4.2 adherence |
| Code Quality | 8/10 | Good, needs minor fixes |
| Completeness | 7/10 | Missing utilities identified |
| Documentation | 9/10 | Excellent JSDoc comments |
| Accessibility | 8/10 | Good, minor enhancements needed |

### Critical Fixes Required

1. **Add `getRelativeTime` to utils.ts** — Without this, ActivityItem crashes
2. **Export `ActivityType` from types.ts** — TypeScript compilation fails
3. **Move keyframes outside `@layer`** — CSS specificity issues
4. **Add `invoice_overdue` to ActivityItem config** — Incomplete mapping

### Recommended Execution Order

```
1. Apply utils.ts patch (Critical)
2. Apply types.ts patch (Critical)
3. Apply application.css patch (Animation fix)
4. Install @radix-ui/react-separator
5. Create separator.tsx
6. Execute Day 2 Phases 1-7 as planned
7. Run validation checklist
```

### Cross-Day Compatibility

With these patches, Day 2 will seamlessly integrate with:
- **Day 3**: Clients view (uses StatusBadge)
- **Day 4**: Invoices view (uses StatusBadge, types)
- **Day 5-7**: Invoice editor (uses all shared components)

---

**Your Day 2 plan is production-ready with the identified patches applied.** The architecture is sound, the component design follows best practices, and the v4.2 design system adherence is excellent.

**Ready to proceed with implementation?**
