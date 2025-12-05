// app/frontend/components/dashboard/ActivityFeed.tsx

import { ActivityItem } from "./ActivityItem"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity, Clock } from "lucide-react"
import type { RecentActivity } from "@/lib/types"

interface ActivityFeedProps {
  activities: RecentActivity[]
  limit?: number
}

export function ActivityFeed({ activities, limit = 5 }: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, limit)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-slate-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {displayedActivities.length > 0 ? (
          <div className="space-y-4">
            {displayedActivities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isLast={index === displayedActivities.length - 1}
                index={index}
              />
            ))}
          </div>
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
      <Clock className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
        No activity yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Your recent actions will appear here
      </p>
    </div>
  )
}
