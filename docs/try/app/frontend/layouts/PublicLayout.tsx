// app/frontend/layouts/PublicLayout.tsx
import { TooltipProvider } from "@/components/ui/tooltip"

interface PublicLayoutProps {
  children: React.ReactNode
}

/**
 * PublicLayout — Minimal layout for public-facing pages
 * 
 * Features:
 * - No navigation sidebar
 * - Centered content
 * - Print-optimized
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 print:bg-white">
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 print:py-0 print:px-0">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>

        {/* Minimal Footer (hidden in print) */}
        <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400 no-print">
          <p>Powered by InvoiceForge</p>
        </footer>
      </div>
    </TooltipProvider>
  )
}
