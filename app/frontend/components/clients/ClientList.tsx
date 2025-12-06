// app/frontend/components/clients/ClientList.tsx
import { ClientTable } from "./ClientTable"
import { ClientCard } from "./ClientCard"
import type { Client } from "@/lib/types"

interface ClientListProps {
  clients: Client[]
  onEdit?: (client: Client) => void
  onDelete?: (client: Client) => void
}

/**
 * ClientList — Responsive client display
 * 
 * Shows:
 * - Table on desktop (hidden on mobile)
 * - Card stack on mobile (hidden on desktop)
 */
export function ClientList({ clients, onEdit, onDelete }: ClientListProps) {
  return (
    <>
      {/* Desktop: Table */}
      <div className="hidden md:block">
        <ClientTable 
          clients={clients} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      </div>

      {/* Mobile: Card Stack */}
      <div className="md:hidden space-y-3">
        {clients.length > 0 ? (
          clients.map((client, index) => (
            <ClientCard
              key={client.id}
              client={client}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <MobileEmptyState />
        )}
      </div>
    </>
  )
}

/**
 * MobileEmptyState — Empty state for mobile card view
 */
function MobileEmptyState() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-8 text-center">
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
        No clients yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Add your first client to get started
      </p>
    </div>
  )
}
