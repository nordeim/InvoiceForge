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
