// app/frontend/pages/Clients/Index.tsx
import { useState, useMemo } from "react"
import { AppLayout } from "@/layouts/AppLayout"
import { PageHeader } from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClientList, ClientFormSheet } from "@/components/clients"
import { mockClients } from "@/lib/mock-data"
import { Plus, Search } from "lucide-react"
import type { Client } from "@/lib/types"

interface ClientsIndexProps {
  /** Clients from backend (optional - falls back to mock data) */
  clients?: Client[]
}

/**
 * Clients Page — Client directory with table/card views
 * 
 * Features:
 * - PageHeader with count and "New Client" button
 * - Search/filter input
 * - Responsive table (desktop) / cards (mobile)
 * - New/Edit client sheet
 */
export default function ClientsIndex({ clients: propsClients }: ClientsIndexProps) {
  // Use props clients if provided, otherwise fall back to mock data
  const allClients = propsClients || mockClients
  
  // Sheet state
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | undefined>()

  // Search state
  const [searchQuery, setSearchQuery] = useState('')

  // Filter clients based on search
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) {
      return allClients
    }

    const query = searchQuery.toLowerCase()
    return allClients.filter(client => 
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.company?.toLowerCase().includes(query)
    )
  }, [allClients, searchQuery])

  // Handle opening the sheet for a new client
  const handleNewClient = () => {
    setEditingClient(undefined)
    setSheetOpen(true)
  }

  // Handle opening the sheet for editing a client
  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setSheetOpen(true)
  }

  // Handle deleting a client (mock - just logs for now)
  const handleDeleteClient = (client: Client) => {
    // In a real app, this would show a confirmation dialog
    // and then make an API call
    console.log('Delete client:', client.id, client.name)
    alert(`Delete "${client.name}"? (This is a mock action)`)
  }

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    if (editingClient) {
      console.log('Update client:', editingClient.id, data)
    } else {
      console.log('Create client:', data)
    }
    // In a real app, this would make an API call
    // and refresh the client list
  }

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        title="Clients"
        subtitle={`${allClients.length} total client${allClients.length !== 1 ? 's' : ''}`}
        actions={
          <Button onClick={handleNewClient}>
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="Search clients"
          />
        </div>
      </div>

      {/* Client List (responsive table/cards) */}
      <ClientList
        clients={filteredClients}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
      />

      {/* Search Results Count (when searching) */}
      {searchQuery && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400" role="status">
          {filteredClients.length === 0 
            ? 'No clients found matching your search.'
            : `Showing ${filteredClients.length} of ${allClients.length} clients`
          }
        </p>
      )}

      {/* Client Form Sheet */}
      <ClientFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        client={editingClient}
        onSubmit={handleFormSubmit}
      />
    </AppLayout>
  )
}
