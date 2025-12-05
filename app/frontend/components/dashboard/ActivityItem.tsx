// app/frontend/components/dashboard/ActivityItem.tsx
// Update to include animation class

import { cn } from "@/lib/utils"
import { getRelativeTime } from "@/lib/utils"
import type { RecentActivity, ActivityType } from "@/lib/types"
import { 
  FileText, 
  Send, 
  CheckCircle, 
  UserPlus 
} from "lucide-react"

interface ActivityItemProps {
  activity: RecentActivity
  isLast?: boolean
  index?: number
}

export function ActivityItem({ 
  activity, 
  isLast = false,
  index = 0
}: ActivityItemProps) {
  const { icon: Icon, color } = activityConfig[activity.type]

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
        />
      )}

      {/* Icon Container */}
      <div
        className={cn(
          "relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          color
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-0.5">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {activity.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {getRelativeTime(activity.timestamp)}
        </p>
      </div>
    </div>
  )
}

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
  client_created: {
    icon: UserPlus,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  },
}
