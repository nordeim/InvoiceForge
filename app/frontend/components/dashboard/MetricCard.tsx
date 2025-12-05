// app/frontend/components/dashboard/MetricCard.tsx
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricCardProps {
  /** Uppercase label above the value */
  label: string
  /** Main metric value (pre-formatted) */
  value: string
  /** Optional subtext below value */
  subtext?: string
  /** Color variant for the value */
  variant?: 'default' | 'danger' | 'success'
  /** Optional trend indicator */
  trend?: {
    value: string
    direction: 'up' | 'down'
    /** Is the trend positive (green) or negative (red)? */
    positive: boolean
  }
  /** Optional icon to display */
  icon?: React.ComponentType<{ className?: string }>
  /** Additional class names */
  className?: string
}

/**
 * MetricCard — Dashboard metric display
 * 
 * Typography (v4.2):
 * - Label: text-xs uppercase tracking-wide
 * - Value: font-mono text-3xl font-medium
 * - Subtext: text-sm text-slate-500
 * 
 * Layout:
 * - Surface card with p-6
 * - Optional icon in top-right
 */
export function MetricCard({
  label,
  value,
  subtext,
  variant = 'default',
  trend,
  icon: Icon,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        // Surface styling (v4.2)
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "rounded-lg shadow-sm",
        "p-6",
        // Relative for icon positioning
        "relative",
        className
      )}
    >
      {/* Optional Icon */}
      {Icon && (
        <div className="absolute top-4 right-4">
          <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
        </div>
      )}

      {/* Label — Uppercase, tracking-wide */}
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>

      {/* Value — Monospace, large */}
      <p
        className={cn(
          "font-mono text-3xl font-medium mt-2",
          variantStyles[variant]
        )}
      >
        {value}
      </p>

      {/* Subtext & Trend Row */}
      <div className="flex items-center gap-2 mt-1">
        {/* Subtext */}
        {subtext && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtext}
          </p>
        )}

        {/* Trend Indicator */}
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.positive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            )}
          >
            {trend.direction === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Value color variants
const variantStyles = {
  default: "text-slate-900 dark:text-slate-50",
  danger: "text-rose-600 dark:text-rose-400",
  success: "text-emerald-600 dark:text-emerald-400",
}
