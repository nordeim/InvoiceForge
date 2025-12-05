// app/frontend/components/shared/PageHeader.tsx
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

/**
 * PageHeader — Consistent page title treatment
 * 
 * Typography (v4.2):
 * - Title: font-display text-4xl tracking-tight
 * - Subtitle: text-sm text-slate-600
 */
export function PageHeader({ 
  title, 
  subtitle, 
  actions,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8",
      className
    )}>
      <div>
        {/* Page Title — Instrument Serif, tight tracking */}
        <h1 className="font-display text-4xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
          {title}
        </h1>
        
        {/* Subtitle — Secondary information */}
        {subtitle && (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Action buttons slot */}
      {actions && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  )
}
