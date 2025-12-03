Executive Summary
I will now create a re-imagined, comprehensive Project Requirements Document (PRD) incorporating all your confirmed preferences. This document will serve as the definitive blueprint for the invoicing application's Phase 1 frontend implementation.

Execution Plan
Step	Deliverable	Status
1	Document Structure & Vision	📋
2	Design System Specification	📋
3	Technical Architecture & Setup	📋
4	Data Models & Mock Data Structure	📋
5	Application Shell Specification	📋
6	View-by-View Specifications	📋
7	Component Library & ShadCN Setup	📋
8	Responsive & Theme Specifications	📋
9	Implementation Roadmap	📋
10	Quality Assurance Checklist	📋
📄 Project Requirements Document
InvoiceForge — Personal Invoicing Application
Version: 1.0.0
Phase: 1 — Frontend Design & Prototyping
Last Updated: January 2025

Table of Contents
Product Vision & Philosophy
Design System
Technical Architecture
Data Models
Application Shell
View Specifications
Component Library
Responsive Design
Theme System
Print Optimization
Implementation Roadmap
Quality Assurance
Appendices
1. Product Vision & Philosophy
1.1 Purpose Statement
InvoiceForge is a single-user invoicing application designed for freelancers and solo professionals who demand speed, clarity, and a polished client-facing presentation. The application prioritizes:

Frictionless Workflow: Rapid invoice creation with intelligent defaults
Professional Presentation: Client-facing invoices that inspire trust and prompt payment
Data Clarity: Dashboard and lists that surface financial insights at a glance
1.2 Core Philosophy
"Precision is the ultimate sophistication."

Every pixel, interaction, and typographic choice serves a purpose. The interface should feel:

Swift — Inertia/React SPA architecture ensures instant navigation
Confident — Bold typography and deliberate spacing project competence
Trustworthy — Clean financial presentation that clients take seriously
1.3 Design Manifesto: "Neo-Editorial Precision"
We merge Swiss International Style foundations with Neo-Editorial boldness:

Swiss Foundation	Neo-Editorial Execution
Rigid grid systems	Asymmetric tension within the grid
Purposeful whitespace	Generous margins that breathe
Typographic hierarchy	Dramatic scale contrasts
Functional minimalism	Singular bold accent for focus
Data-forward layouts	Editorial typography treatments
The Unforgettable Element: The invoice number treatment — oversized, typographically distinctive, positioned with editorial confidence. When clients see 2025-0001, it's not just a reference — it's a statement.

1.4 Currency & Locale
Primary Currency: SGD (Singapore Dollar)
Format: S$1,234.56 with locale-aware thousand separators
Decimal Precision: 2 decimal places for all monetary values
2. Design System
2.1 Typography
Font Selection Rationale
We employ a distinctive serif + modern sans-serif pairing that balances editorial sophistication with technical precision:

Role	Font Family	Weight Range	Rationale
Display/Headlines	Instrument Serif	400 (Regular)	Elegant, modern serif with subtle contrast. Projects financial credibility while avoiding stuffy traditionalism.
UI/Body	Geist	400, 500, 600, 700	Vercel's precision-crafted sans-serif. Excellent legibility at small sizes, technical character suits data-dense interfaces.
Monospace (Invoice #s, amounts)	Geist Mono	400, 500	Tabular numerals for perfect financial alignment.
Google Fonts Import
HTML

<!-- In application layout head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
Tailwind v4 Configuration
CSS

/* app/assets/stylesheets/application.css */
@import "tailwindcss";

@theme {
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
}
Typographic Scale
Element	Font	Size	Weight	Tracking	Line Height
Page Title	Display	text-4xl / text-5xl	400	-tracking-tight	leading-none
Section Heading	Sans	text-xl / text-2xl	600	-tracking-tight	leading-tight
Card Title	Sans	text-lg	600	normal	leading-snug
Body	Sans	text-sm / text-base	400	normal	leading-relaxed
Caption/Label	Sans	text-xs	500	tracking-wide	leading-normal
Data/Numbers	Mono	text-sm / text-lg	500	tracking-tight	leading-none
Invoice Number (Hero)	Mono	text-6xl / text-8xl	400	-tracking-tighter	leading-none
2.2 Color System
Palette Definition
Base: Slate (neutral with subtle blue undertone — professional, digital)

Accent: Electric Blue — used exclusively for primary actions

CSS

/* Tailwind v4 color tokens in application.css */
@theme {
  /* Primary Action */
  --color-accent: var(--color-blue-500);
  --color-accent-hover: var(--color-blue-600);
  --color-accent-subtle: var(--color-blue-50);
  
  /* Status Colors */
  --color-status-draft: var(--color-slate-400);
  --color-status-pending: var(--color-amber-500);
  --color-status-paid: var(--color-emerald-500);
  --color-status-overdue: var(--color-rose-500);
}
Light Mode (Primary)
Token	Usage	Tailwind Class
Background	Page canvas	bg-slate-50
Surface	Cards, modals	bg-white
Surface Elevated	Dropdowns, popovers	bg-white + shadow
Border	Dividers, card borders	border-slate-200
Border Strong	Focused inputs, tables	border-slate-300
Text Primary	Headings, body	text-slate-900
Text Secondary	Labels, captions	text-slate-600
Text Muted	Placeholders, disabled	text-slate-400
Accent	Primary buttons, links	bg-blue-500 text-white
Accent Hover	Button hover	bg-blue-600
Dark Mode (Alternative)
Token	Usage	Tailwind Class
Background	Page canvas	dark:bg-slate-950
Surface	Cards, modals	dark:bg-slate-900
Surface Elevated	Dropdowns, popovers	dark:bg-slate-800
Border	Dividers, card borders	dark:border-slate-800
Border Strong	Focused inputs, tables	dark:border-slate-700
Text Primary	Headings, body	dark:text-slate-50
Text Secondary	Labels, captions	dark:text-slate-400
Text Muted	Placeholders, disabled	dark:text-slate-600
Accent	Primary buttons, links	dark:bg-blue-500 dark:text-white
Accent Hover	Button hover	dark:bg-blue-400
Status Badge Specifications
Status	Light Mode	Dark Mode	Border Style
Draft	bg-slate-100 text-slate-600 border-slate-300	dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600	Dashed (border-dashed)
Pending	bg-amber-50 text-amber-700 border-amber-300	dark:bg-amber-950 dark:text-amber-400 dark:border-amber-700	Solid
Paid	bg-emerald-50 text-emerald-700 border-emerald-300	dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-700	Solid
Overdue	bg-rose-50 text-rose-700 border-rose-300	dark:bg-rose-950 dark:text-rose-400 dark:border-rose-700	Solid
2.3 Spacing & Layout
Grid System
Container Max Width: max-w-7xl (1280px)
Content Max Width: max-w-5xl (1024px) for focused views (Invoice Editor)
Page Padding: px-4 sm:px-6 lg:px-8
Section Spacing: space-y-8 or gap-8
Card Padding: p-6
Spacing Scale (Tailwind defaults)
Token	Value	Usage
gap-1	4px	Inline icon + text
gap-2	8px	Form label to input
gap-3	12px	Compact list items
gap-4	16px	Standard element spacing
gap-6	24px	Card internal sections
gap-8	32px	Major page sections
gap-12	48px	Page header to content
2.4 Effects & Treatments
Shadows (Brutalist Precision)
Shallow, harsh shadows that suggest elevation without softness:

Level	Tailwind Class	Usage
None	shadow-none	Flat cards, inline elements
Subtle	shadow-sm	Cards at rest
Elevated	shadow-md	Dropdowns, popovers
Prominent	shadow-lg	Modals
Custom Brutalist Shadow (optional enhancement):

CSS

@theme {
  --shadow-brutal: 4px 4px 0px 0px var(--color-slate-900);
  --shadow-brutal-sm: 2px 2px 0px 0px var(--color-slate-900);
}
Borders
Usage	Style
Card borders	border border-slate-200 dark:border-slate-800
Focused inputs	ring-2 ring-blue-500 ring-offset-2
Dividers	border-t border-slate-200 dark:border-slate-800
Table rows	border-b border-slate-100 dark:border-slate-800
Border Radius
Element	Class	Rationale
Cards	rounded-lg	Standard container
Buttons	rounded-md	Slightly tighter for precision
Inputs	rounded-md	Matches buttons
Badges	rounded-full	Pill shape for status
Avatars	rounded-full	Circular for initials
2.5 Iconography
Library: Lucide React

Standard Sizes:

Context	Size	Class
Inline with text	16px	size-4
Button icon	16-20px	size-4 or size-5
Navigation	20px	size-5
Empty state	48px	size-12
Stroke Width: Default (2) for standard UI; reduce to 1.5 for delicate contexts.

Key Icons:

Usage	Icon Name
Dashboard	LayoutDashboard
Clients	Users
Invoices	FileText
Add/Create	Plus
Edit	Pencil
Delete	Trash2
Send	Send
Money/Payment	CreditCard
Calendar	Calendar
Search	Search
Filter	Filter
More actions	MoreHorizontal
External link	ExternalLink
Download	Download
Check/Success	Check
Warning	AlertTriangle
Info	Info
Close	X
Menu	Menu
Sun (light mode)	Sun
Moon (dark mode)	Moon
3. Technical Architecture
3.1 Stack Overview
text

┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  React 18+ (View Layer)                              │   │
│  │  └── ShadCN UI (Component Primitives)               │   │
│  │  └── Lucide React (Icons)                           │   │
│  │  └── TailwindCSS v4 (Styling)                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                    Inertia.js                               │
│                   (SPA Adapter)                             │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                        BACKEND                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Ruby on Rails 8                                     │   │
│  │  └── Inertia Rails Adapter                          │   │
│  │  └── Routes & Controllers                           │   │
│  │  └── (Phase 2: Models & Database)                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
3.2 Directory Structure
text

app/
├── controllers/
│   ├── dashboard_controller.rb
│   ├── clients_controller.rb
│   ├── invoices_controller.rb
│   └── public_invoices_controller.rb
├── frontend/
│   ├── components/
│   │   ├── ui/               # ShadCN components
│   │   ├── layout/           # Shell, Nav, Footer
│   │   ├── dashboard/        # Dashboard-specific
│   │   ├── clients/          # Client-specific
│   │   ├── invoices/         # Invoice-specific
│   │   └── shared/           # Reusable across views
│   ├── layouts/
│   │   ├── AppLayout.tsx     # Main authenticated layout
│   │   └── PublicLayout.tsx  # Shareable invoice layout
│   ├── lib/
│   │   ├── utils.ts          # cn() helper, formatters
│   │   └── mock-data.ts      # Phase 1 stub data
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Clients/
│   │   │   ├── Index.tsx
│   │   │   └── (Show.tsx)    # Optional for Phase 1
│   │   ├── Invoices/
│   │   │   ├── Index.tsx
│   │   │   ├── New.tsx
│   │   │   └── Edit.tsx
│   │   └── PublicInvoice/
│   │       └── Show.tsx
│   ├── hooks/                # Custom React hooks
│   └── entrypoints/
│       └── inertia.tsx       # Inertia app initialization
└── assets/
    └── stylesheets/
        └── application.css   # Tailwind v4 entry point
3.3 Routing Configuration
Ruby

# config/routes.rb

Rails.application.routes.draw do
  # Redirect root to dashboard
  root "dashboard#index"

  # Main application routes
  get "dashboard", to: "dashboard#index"
  
  resources :clients, only: [:index, :new, :create, :edit, :update, :destroy]
  
  resources :invoices, only: [:index, :new, :create, :edit, :update, :destroy] do
    member do
      post :send_invoice    # Changes status to 'pending'
      post :mark_paid       # Changes status to 'paid'
    end
  end

  # Public shareable invoice (no auth required)
  get "i/:token", to: "public_invoices#show", as: :public_invoice
end
3.4 Route-to-View Mapping
Route	Controller#Action	React Page Component	Description
/	redirect	—	Redirects to /dashboard
/dashboard	dashboard#index	pages/Dashboard.tsx	Main dashboard
/clients	clients#index	pages/Clients/Index.tsx	Client list
/clients/new	clients#new	Modal/Sheet on Index	New client form
/invoices	invoices#index	pages/Invoices/Index.tsx	Invoice list
/invoices/new	invoices#new	pages/Invoices/New.tsx	Invoice editor (create)
/invoices/:id/edit	invoices#edit	pages/Invoices/Edit.tsx	Invoice editor (edit)
/i/:token	public_invoices#show	pages/PublicInvoice/Show.tsx	Shareable invoice
4. Data Models
4.1 Entity Relationship Diagram
text

┌─────────────────┐       ┌─────────────────────┐
│     CLIENT      │       │       INVOICE       │
├─────────────────┤       ├─────────────────────┤
│ id              │       │ id                  │
│ name            │◄──────│ client_id           │
│ email           │   1:N │ invoice_number      │
│ company         │       │ status              │
│ address         │       │ issue_date          │
│ phone           │       │ due_date            │
│ notes           │       │ notes               │
│ created_at      │       │ token (public URL)  │
│ updated_at      │       │ created_at          │
└─────────────────┘       │ updated_at          │
                          └─────────┬───────────┘
                                    │
                                    │ 1:N
                                    ▼
                          ┌─────────────────────┐
                          │    LINE_ITEM        │
                          ├─────────────────────┤
                          │ id                  │
                          │ invoice_id          │
                          │ type (item/section/ │
                          │       discount)     │
                          │ description         │
                          │ quantity            │
                          │ unit_type           │
                          │ unit_price          │
                          │ position (ordering) │
                          │ created_at          │
                          │ updated_at          │
                          └─────────────────────┘
4.2 TypeScript Interfaces
TypeScript

// app/frontend/lib/types.ts

// ============================================
// ENUMS
// ============================================

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue';

export type LineItemType = 'item' | 'section' | 'discount';

export type UnitType = 'hours' | 'days' | 'items' | 'units' | 'fixed';

// ============================================
// ENTITIES
// ============================================

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  address?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // Computed (for list views)
  totalBilled?: number;
  lastInvoiceDate?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // Format: "2025-0001"
  clientId: string;
  client?: Client; // Expanded relation
  status: InvoiceStatus;
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  notes?: string;
  lineItems: LineItem[];
  token: string; // For public URL
  createdAt: string;
  updatedAt: string;
  // Computed
  subtotal?: number;
  totalDiscount?: number;
  total?: number;
}

export interface LineItem {
  id: string;
  invoiceId: string;
  type: LineItemType;
  description: string;
  quantity?: number; // null for section headers
  unitType?: UnitType; // null for section headers
  unitPrice?: number; // Negative for discounts
  position: number;
  // Computed
  lineTotal?: number;
}

// ============================================
// DASHBOARD METRICS
// ============================================

export interface DashboardMetrics {
  totalOutstanding: number;
  totalPaidThisMonth: number;
  totalPaidYTD: number;
  overdueAmount: number;
  overdueCount: number;
}

export interface RecentActivity {
  id: string;
  type: 'invoice_created' | 'invoice_sent' | 'invoice_paid' | 'client_created';
  description: string;
  timestamp: string;
  relatedId?: string;
  relatedType?: 'invoice' | 'client';
}
4.3 Mock Data Structure
TypeScript

// app/frontend/lib/mock-data.ts

import type { Client, Invoice, DashboardMetrics, RecentActivity } from './types';

export const mockClients: Client[] = [
  {
    id: 'cli_001',
    name: 'Acme Corporation',
    email: 'billing@acme.corp',
    company: 'Acme Corporation Pte Ltd',
    address: '123 Business Park, #10-01, Singapore 123456',
    phone: '+65 6123 4567',
    notes: 'Net 30 payment terms preferred',
    totalBilled: 15750.00,
    lastInvoiceDate: '2025-01-15',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'cli_002',
    name: 'Startup Labs',
    email: 'finance@startuplabs.io',
    company: 'Startup Labs Pte Ltd',
    address: '456 Innovation Drive, Singapore 654321',
    phone: '+65 6987 6543',
    totalBilled: 8400.00,
    lastInvoiceDate: '2025-01-10',
    createdAt: '2024-09-15T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'cli_003',
    name: 'Global Ventures',
    email: 'accounts@globalventures.com',
    company: 'Global Ventures Holdings',
    address: '789 Commerce Tower, Singapore 789012',
    totalBilled: 32000.00,
    lastInvoiceDate: '2024-12-20',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv_001',
    invoiceNumber: '2025-0001',
    clientId: 'cli_001',
    client: mockClients[0],
    status: 'pending',
    issueDate: '2025-01-15',
    dueDate: '2025-02-14',
    token: 'abc123xyz',
    lineItems: [
      {
        id: 'li_001',
        invoiceId: 'inv_001',
        type: 'section',
        description: 'Development Services',
        position: 1,
      },
      {
        id: 'li_002',
        invoiceId: 'inv_001',
        type: 'item',
        description: 'Frontend Development - Dashboard Module',
        quantity: 24,
        unitType: 'hours',
        unitPrice: 150.00,
        position: 2,
        lineTotal: 3600.00,
      },
      {
        id: 'li_003',
        invoiceId: 'inv_001',
        type: 'item',
        description: 'API Integration',
        quantity: 16,
        unitType: 'hours',
        unitPrice: 150.00,
        position: 3,
        lineTotal: 2400.00,
      },
      {
        id: 'li_004',
        invoiceId: 'inv_001',
        type: 'section',
        description: 'Additional Services',
        position: 4,
      },
      {
        id: 'li_005',
        invoiceId: 'inv_001',
        type: 'item',
        description: 'Technical Consultation',
        quantity: 2,
        unitType: 'hours',
        unitPrice: 200.00,
        position: 5,
        lineTotal: 400.00,
      },
      {
        id: 'li_006',
        invoiceId: 'inv_001',
        type: 'discount',
        description: 'Loyalty Discount (5%)',
        quantity: 1,
        unitType: 'fixed',
        unitPrice: -320.00,
        position: 6,
        lineTotal: -320.00,
      },
    ],
    subtotal: 6400.00,
    totalDiscount: 320.00,
    total: 6080.00,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'inv_002',
    invoiceNumber: '2025-0002',
    clientId: 'cli_002',
    client: mockClients[1],
    status: 'draft',
    issueDate: '2025-01-20',
    dueDate: '2025-02-19',
    token: 'def456uvw',
    lineItems: [
      {
        id: 'li_007',
        invoiceId: 'inv_002',
        type: 'item',
        description: 'UI/UX Design - Mobile App',
        quantity: 3,
        unitType: 'days',
        unitPrice: 800.00,
        position: 1,
        lineTotal: 2400.00,
      },
    ],
    subtotal: 2400.00,
    totalDiscount: 0,
    total: 2400.00,
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-20T09:00:00Z',
  },
  {
    id: 'inv_003',
    invoiceNumber: '2024-0012',
    clientId: 'cli_003',
    client: mockClients[2],
    status: 'paid',
    issueDate: '2024-12-20',
    dueDate: '2025-01-19',
    token: 'ghi789rst',
    lineItems: [
      {
        id: 'li_008',
        invoiceId: 'inv_003',
        type: 'item',
        description: 'Annual Retainer - Q4 2024',
        quantity: 1,
        unitType: 'fixed',
        unitPrice: 8000.00,
        position: 1,
        lineTotal: 8000.00,
      },
    ],
    subtotal: 8000.00,
    totalDiscount: 0,
    total: 8000.00,
    createdAt: '2024-12-20T08:00:00Z',
    updatedAt: '2025-01-05T14:00:00Z',
  },
  {
    id: 'inv_004',
    invoiceNumber: '2024-0010',
    clientId: 'cli_001',
    client: mockClients[0],
    status: 'overdue',
    issueDate: '2024-11-15',
    dueDate: '2024-12-15',
    token: 'jkl012mno',
    lineItems: [
      {
        id: 'li_009',
        invoiceId: 'inv_004',
        type: 'item',
        description: 'Maintenance & Support - November',
        quantity: 10,
        unitType: 'hours',
        unitPrice: 120.00,
        position: 1,
        lineTotal: 1200.00,
      },
    ],
    subtotal: 1200.00,
    totalDiscount: 0,
    total: 1200.00,
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
  },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalOutstanding: 7280.00, // pending + overdue totals
  totalPaidThisMonth: 8000.00,
  totalPaidYTD: 56150.00,
  overdueAmount: 1200.00,
  overdueCount: 1,
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'act_001',
    type: 'invoice_created',
    description: 'Invoice #2025-0002 created for Startup Labs',
    timestamp: '2025-01-20T09:00:00Z',
    relatedId: 'inv_002',
    relatedType: 'invoice',
  },
  {
    id: 'act_002',
    type: 'invoice_sent',
    description: 'Invoice #2025-0001 sent to Acme Corporation',
    timestamp: '2025-01-15T10:30:00Z',
    relatedId: 'inv_001',
    relatedType: 'invoice',
  },
  {
    id: 'act_003',
    type: 'invoice_paid',
    description: 'Invoice #2024-0012 paid by Global Ventures',
    timestamp: '2025-01-05T14:00:00Z',
    relatedId: 'inv_003',
    relatedType: 'invoice',
  },
  {
    id: 'act_004',
    type: 'client_created',
    description: 'New client added: Startup Labs',
    timestamp: '2024-09-15T11:00:00Z',
    relatedId: 'cli_002',
    relatedType: 'client',
  },
];
5. Application Shell
5.1 Layout Architecture
text

┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Mobile: Full width, Desktop: Hidden - Nav in Sidebar)  │
│ ┌─────────────┬───────────────────────────────────┬───────────┐ │
│ │ Logo        │                                   │ Theme     │ │
│ │ (Mobile)    │        (Mobile: Hamburger Menu)   │ Toggle    │ │
│ └─────────────┴───────────────────────────────────┴───────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────────────────────────────────┐ │
│  │              │  │                                          │ │
│  │   SIDEBAR    │  │              MAIN CONTENT                │ │
│  │  (Desktop)   │  │                                          │ │
│  │              │  │  ┌──────────────────────────────────────┐│ │
│  │  ┌────────┐  │  │  │  PAGE HEADER                        ││ │
│  │  │ Logo   │  │  │  │  Title + Actions                    ││ │
│  │  └────────┘  │  │  └──────────────────────────────────────┘│ │
│  │              │  │                                          │ │
│  │  Navigation  │  │  ┌──────────────────────────────────────┐│ │
│  │  ┌────────┐  │  │  │                                      ││ │
│  │  │Dashboard│  │  │  │          PAGE CONTENT               ││ │
│  │  ├────────┤  │  │  │                                      ││ │
│  │  │Clients │  │  │  │                                      ││ │
│  │  ├────────┤  │  │  │                                      ││ │
│  │  │Invoices│  │  │  │                                      ││ │
│  │  └────────┘  │  │  │                                      ││ │
│  │              │  │  │                                      ││ │
│  │  ┌────────┐  │  │  └──────────────────────────────────────┘│ │
│  │  │Theme   │  │  │                                          │ │
│  │  │Toggle  │  │  │                                          │ │
│  │  └────────┘  │  │                                          │ │
│  │              │  │                                          │ │
│  └──────────────┘  └──────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
5.2 Logo Design
Concept: Typographic mark that doubles as a visual identity

text

┌──────────────────────────────────┐
│                                  │
│   INV                            │
│   ────  ← Horizontal rule        │
│   FORGE                          │
│                                  │
└──────────────────────────────────┘

Alternative (Inline):
┌──────────────────────────────────┐
│   INV/FORGE                      │
│   ─────────                      │
└──────────────────────────────────┘
Typography: font-display (Instrument Serif) for "INV", font-mono (Geist Mono) for "FORGE"

5.3 Navigation Specification
Nav Item	Icon	Route	Active State
Dashboard	LayoutDashboard	/dashboard	bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400
Clients	Users	/clients	Same as above
Invoices	FileText	/invoices	Same as above
Mobile Navigation: Sheet/Drawer from left, triggered by hamburger menu icon in header.

5.4 Theme Toggle Component
Behavior:

Default to system preference on first load
User selection persists in localStorage
Smooth transition between modes (transition-colors duration-200)
Visual:

Sun icon (Sun) for light mode
Moon icon (Moon) for dark mode
Animated icon swap on toggle
6. View Specifications
6.1 Dashboard (/dashboard)
Purpose
Provide an at-a-glance financial overview and quick actions for common tasks.

Layout Wireframe
text

┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Dashboard (Page Title - Display)    │ [+ New Invoice]  │ │
│  │ Monday, 20 January 2025             │    Primary CTA   │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  METRICS GRID (4 columns desktop, 2 tablet, 1 mobile)       │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐     │
│  │ Outstanding   │ │ Paid (Month)  │ │ Paid (YTD)    │ ... │
│  │ S$7,280.00    │ │ S$8,000.00    │ │ S$56,150.00   │     │
│  │ 2 invoices    │ │ ↑ 12% vs last │ │               │     │
│  └───────────────┘ └───────────────┘ └───────────────┘     │
├─────────────────────────────────────────────────────────────┤
│  TWO COLUMN LAYOUT (stacks on mobile)                       │
│  ┌────────────────────────┐ ┌────────────────────────────┐  │
│  │ RECENT INVOICES        │ │ RECENT ACTIVITY            │  │
│  │ ┌────────────────────┐ │ │ ┌──────────────────────────┐│  │
│  │ │ #2025-0001         │ │ │ │ Invoice #2025-0002       ││  │
│  │ │ Acme Corp          │ │ │ │ created for Startup Labs ││  │
│  │ │ S$6,080 [Pending]  │ │ │ │ 2 hours ago              ││  │
│  │ └────────────────────┘ │ │ └──────────────────────────┘│  │
│  │ ┌────────────────────┐ │ │ ┌──────────────────────────┐│  │
│  │ │ #2025-0002         │ │ │ │ Invoice #2025-0001 sent  ││  │
│  │ │ Startup Labs       │ │ │ │ to Acme Corporation      ││  │
│  │ │ S$2,400 [Draft]    │ │ │ │ 5 days ago               ││  │
│  │ └────────────────────┘ │ │ └──────────────────────────┘│  │
│  │ [View All Invoices →] │ │ │ ...                        │  │
│  └────────────────────────┘ └────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
Component Breakdown
Component	Description	Key Design Notes
PageHeader	Title + date + primary CTA	Title in font-display text-4xl. Date in text-slate-500.
MetricCard	Large number + label + optional delta	Number in font-mono text-3xl font-semibold. Label uppercase text-xs tracking-wide.
RecentInvoiceCard	Invoice summary with status badge	Compact card with invoice # prominent. Click navigates to edit.
ActivityFeed	Timeline of recent actions	Icon + description + relative timestamp. Left border accent.
Metric Cards Detail
Metric	Value Format	Subtext	Visual Emphasis
Outstanding	S$X,XXX.XX	"X invoices pending"	Default card
Overdue	S$X,XXX.XX	"X invoices overdue"	Red/rose accent border when > 0
Paid This Month	S$X,XXX.XX	"↑ X% vs last month" (optional)	Default card
Paid YTD	S$X,XXX.XX	—	Default card
6.2 Clients List (/clients)
Purpose
Directory of all clients with quick-access to billing totals and actions.

Layout Wireframe
text

┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Clients (Page Title)                │ [+ New Client]   │ │
│  │ 3 total clients                     │                  │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  SEARCH BAR (optional for Phase 1)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🔍 Search clients...                                    │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  CLIENT TABLE / CARDS                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ┌──────┬────────────────────┬───────────┬─────────────┐ │ │
│  │ │Avatar│ Name / Company      │ Total     │ Last Invoice│ │ │
│  │ ├──────┼────────────────────┼───────────┼─────────────┤ │ │
│  │ │  AC  │ Acme Corporation   │ S$15,750  │ 15 Jan 2025 │ │ │
│  │ │      │ billing@acme.corp  │           │             │ │ │
│  │ ├──────┼────────────────────┼───────────┼─────────────┤ │ │
│  │ │  SL  │ Startup Labs       │ S$8,400   │ 10 Jan 2025 │ │ │
│  │ │      │ finance@startup... │           │             │ │ │
│  │ ├──────┼────────────────────┼───────────┼─────────────┤ │ │
│  │ │  GV  │ Global Ventures    │ S$32,000  │ 20 Dec 2024 │ │ │
│  │ │      │ accounts@global... │           │             │ │ │
│  │ └──────┴────────────────────┴───────────┴─────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
Mobile Layout
On mobile, switch from table to card layout:

text

┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ ┌────┐  Acme Corporation        │ │
│ │ │ AC │  billing@acme.corp       │ │
│ │ └────┘  ────────────────────    │ │
│ │         Total Billed: S$15,750  │ │
│ │         Last Invoice: 15 Jan    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ┌────┐  Startup Labs            │ │
│ │ │ SL │  finance@startuplabs.io  │ │
│ │ └────┘  ────────────────────    │ │
│ │         ...                     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
Component Breakdown
Component	Description	Key Design Notes
ClientAvatar	Initials in colored circle	Deterministic color from client name hash. size-10 rounded-full.
ClientTable	Data table with sortable columns (Phase 2)	Clean borders, hover state on rows.
ClientCard	Mobile card variant	Full-width, stacked info.
NewClientSheet	Slide-in form for adding client	Sheet from right (desktop) or bottom (mobile).
New Client Form Fields
Field	Type	Required	Validation
Name	Text	Yes	Min 2 chars
Email	Email	Yes	Valid email format
Company	Text	No	—
Address	Textarea	No	—
Phone	Text	No	—
Notes	Textarea	No	—
6.3 Invoices List (/invoices)
Purpose
Command center for all invoices with filtering and quick actions.

Layout Wireframe
text

┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Invoices (Page Title)               │ [+ New Invoice]  │ │
│  │ 4 total invoices                    │                  │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  FILTER TABS                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [ All (4) ] [ Draft (1) ] [ Pending (1) ] [ Paid (1) ] │ │
│  │                                         [ Overdue (1) ] │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  INVOICE TABLE                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Invoice #    │ Client       │ Amount    │ Due Date     │ │
│  │              │              │           │ Status       │ │
│  ├──────────────┼──────────────┼───────────┼──────────────┤ │
│  │ 2025-0001    │ Acme Corp    │ S$6,080   │ 14 Feb 2025  │ │
│  │              │              │           │ [Pending]    │ │
│  ├──────────────┼──────────────┼───────────┼──────────────┤ │
│  │ 2025-0002    │ Startup Labs │ S$2,400   │ 19 Feb 2025  │ │
│  │              │              │           │ [Draft]      │ │
│  ├──────────────┼──────────────┼───────────┼──────────────┤ │
│  │ 2024-0012    │ Global Vent  │ S$8,000   │ 19 Jan 2025  │ │
│  │              │              │           │ [Paid] ✓     │ │
│  ├──────────────┼──────────────┼───────────┼──────────────┤ │
│  │ 2024-0010    │ Acme Corp    │ S$1,200   │ 15 Dec 2024  │ │
│  │              │              │           │ [Overdue] ⚠  │ │
│  └──────────────┴──────────────┴───────────┴──────────────┘ │
└─────────────────────────────────────────────────────────────┘
Row Actions
Each row has a hover-revealed action menu (MoreHorizontal icon):

Action	Icon	Description	Condition
Edit	Pencil	Open invoice editor	All statuses
View Public	ExternalLink	Open shareable link	Not Draft
Send	Send	Send to client (→ Pending)	Draft only
Mark Paid	Check	Mark as paid	Pending/Overdue
Duplicate	Copy	Create copy as new draft	All statuses
Delete	Trash2	Delete invoice	Draft only
Component Breakdown
Component	Description
FilterTabs	ShadCN Tabs with count badges
InvoiceTable	Data table with row actions
StatusBadge	Color-coded pill per status
RowActionMenu	Dropdown menu for row actions
6.4 Invoice Editor (/invoices/new & /invoices/:id/edit)
Purpose
High-speed invoice creation and editing with real-time total calculations.

Layout Wireframe
text

┌─────────────────────────────────────────────────────────────┐
│  STICKY HEADER                                              │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ ← Back    New Invoice               │ [Save Draft]     │ │
│  │           #2025-0003 (auto)         │ [Save & Send]    │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  INVOICE FORM (max-w-4xl centered)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  CLIENT & DATES                                         │ │
│  │  ┌─────────────────────────┬───────────────────────────┐ │
│  │  │ Client                  │ Issue Date    Due Date    │ │
│  │  │ [Acme Corporation    ▼] │ [20/01/2025] [19/02/2025]│ │
│  │  └─────────────────────────┴───────────────────────────┘ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  LINE ITEMS                                             │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ Section: Development Services            [×]  │   │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ │ Frontend Development  │ 24 │ hrs │ $150 │$3600│ │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ │ API Integration       │ 16 │ hrs │ $150 │$2400│ │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ Discount: Loyalty 5%                    │-$320│ │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │                                                         │ │
│  │  [+ Add Item] [+ Add Section] [+ Add Discount]          │ │
│  │                                                         │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  TOTALS (right-aligned)                                 │ │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │                              Subtotal:    S$6,400   │ │
│  │  │                              Discount:    -S$320    │ │
│  │  │                              ─────────────────────  │ │
│  │  │                              TOTAL:       S$6,080   │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  NOTES (optional)                                       │ │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │ Payment terms: Net 30. Please include invoice      │ │
│  │  │ number with payment.                                │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  STICKY FOOTER (Mobile especially)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │          Total: S$6,080    [Save Draft] [Save & Send]  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
Line Item Types
Type	Visual Treatment	Fields
Section Header	Full-width, gray background, bold text	Description only
Item	Standard row with all columns	Description, Qty, Unit Type, Unit Price
Discount	Red/rose text, negative amount	Description, Amount (negative)
Unit Types Dropdown
Value	Display	Example Usage
hours	hrs	Hourly consulting
days	days	Daily rate work
items	items	Physical goods
units	units	Generic units
fixed	—	Fixed price, qty hidden
Component Breakdown
Component	Description
ClientCombobox	Searchable client selector with "Add new" option
DatePicker	Calendar popover for date selection
LineItemRow	Draggable row for item, section, or discount
LineItemActions	Add Item/Section/Discount buttons
TotalsDisplay	Real-time calculated totals
InvoiceNotes	Optional textarea for payment terms
Auto-Calculations
TypeScript

// Real-time calculation logic (frontend)
const calculateTotals = (lineItems: LineItem[]) => {
  const items = lineItems.filter(li => li.type === 'item');
  const discounts = lineItems.filter(li => li.type === 'discount');
  
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.quantity ?? 0) * (item.unitPrice ?? 0);
  }, 0);
  
  const totalDiscount = Math.abs(
    discounts.reduce((sum, d) => sum + (d.unitPrice ?? 0), 0)
  );
  
  const total = subtotal - totalDiscount;
  
  return { subtotal, totalDiscount, total };
};
6.5 Shareable Invoice (/i/:token)
Purpose
The "product" delivered to the client. Must look professional, printable, and prompt payment.

Design Philosophy
This view uses a distinct layout from the admin interface:

Clean and focused: No navigation, no distractions
Print-optimized: Proper margins, no shadows, clean borders
Trust-building: Professional typography, clear amounts
Layout Wireframe
text

┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     INVOICE HEADER                      ││
│  │  ┌───────────────────────┬─────────────────────────────┐││
│  │  │                       │                             │││
│  │  │  INV/FORGE            │        INVOICE              │││
│  │  │  Your Name            │        #2025-0001           │││
│  │  │  your@email.com       │                             │││
│  │  │  +65 9123 4567        │    Issue: 15 Jan 2025       │││
│  │  │                       │    Due:   14 Feb 2025       │││
│  │  │                       │                             │││
│  │  └───────────────────────┴─────────────────────────────┘││
│  │                                                         ││
│  │  BILLED TO                                              ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  Acme Corporation Pte Ltd                           │││
│  │  │  billing@acme.corp                                  │││
│  │  │  123 Business Park, #10-01, Singapore 123456        │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     LINE ITEMS                          ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │ DEVELOPMENT SERVICES                    (Section)   │││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ Frontend Development - Dashboard Module             │││
│  │  │ 24 hours × S$150.00                       S$3,600.00│││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ API Integration                                     │││
│  │  │ 16 hours × S$150.00                       S$2,400.00│││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ ADDITIONAL SERVICES                     (Section)   │││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ Technical Consultation                              │││
│  │  │ 2 hours × S$200.00                          S$400.00│││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ Loyalty Discount (5%)                      -S$320.00│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                       TOTALS                            ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │                           Subtotal:       S$6,400.00│││
│  │  │                           Discount:        -S$320.00│││
│  │  │                           ─────────────────────────│││
│  │  │                           TOTAL DUE:      S$6,080.00│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  NOTES                                                  ││
│  │  Payment terms: Net 30. Please include invoice number   ││
│  │  with payment.                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              [ PAY NOW - S$6,080.00 ]                   ││
│  │                    Primary CTA Button                   ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  STATUS BADGE (if paid)                                 ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │                    ✓ PAID                           │││
│  │  │                 on 5 January 2025                   │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  FOOTER                                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Thank you for your business.                           ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
Invoice Number Hero Treatment
The invoice number should be typographically distinctive:

HTML

<div class="text-right">
  <span class="text-sm font-medium tracking-wide text-slate-500 uppercase">
    Invoice
  </span>
  <p class="font-mono text-5xl tracking-tighter text-slate-900">
    2025-0001
  </p>
</div>
Payment Modal
When "Pay Now" is clicked, a modal appears with a mock payment form:

text

┌─────────────────────────────────────────────────────────────┐
│                                                     [×]     │
│                                                             │
│                    Pay Invoice #2025-0001                   │
│                        S$6,080.00                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Card Number                                            ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  4242 4242 4242 4242                                │││
│  │  └─────────────────────────────────────────────────────┘││
│  │                                                         ││
│  │  Expiry Date              CVV                           ││
│  │  ┌────────────────────┐  ┌────────────────────┐         ││
│  │  │  12 / 28            │  │  •••               │         ││
│  │  └────────────────────┘  └────────────────────┘         ││
│  │                                                         ││
│  │  Cardholder Name                                        ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  John Smith                                         │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   [ Pay S$6,080.00 ]                    ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  🔒 Secured by Stripe (mock)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
Note: This is a visual mockup only. No actual payment processing in Phase 1.

7. Component Library
7.1 ShadCN UI Components Required
Installation Commands
Run these commands in your Rails project root:

Bash

# Initialize ShadCN (if not already done)
npx shadcn@latest init

# Core UI Components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea

# Layout Components
npx shadcn@latest add card
npx shadcn@latest add separator
npx shadcn@latest add scroll-area

# Navigation & Overlays
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add popover
npx shadcn@latest add tooltip

# Form Components
npx shadcn@latest add select
npx shadcn@latest add command    # For combobox
npx shadcn@latest add calendar
npx shadcn@latest add switch     # For theme toggle

# Data Display
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add tabs
npx shadcn@latest add skeleton   # Loading states
Component Inventory
Component	Usage	Customization
Button	CTAs, actions	Variants: default, outline, ghost, destructive
Input	Text fields	Focus ring color to blue-500
Label	Form labels	Uppercase tracking-wide for certain contexts
Textarea	Notes, descriptions	—
Card	Content containers	Border color to slate-200/800
Separator	Visual dividers	—
Sheet	Side panels, mobile nav	Mobile: bottom, Desktop: right
Dialog	Payment modal, confirmations	—
DropdownMenu	Row actions	—
Popover	Date picker container	—
Tooltip	Icon hints	—
Select	Unit type dropdown	—
Command	Client combobox	Searchable select
Calendar	Date picking	—
Switch	Theme toggle	—
Table	Data tables	Striped rows optional
Badge	Status indicators	Custom variants for invoice states
Avatar	Client initials	Deterministic color assignment
Tabs	Invoice filters	—
Skeleton	Loading states	—
7.2 Custom Components to Build
Component	Location	Description
Logo	components/layout/Logo.tsx	Typographic INV/FORGE mark
ThemeToggle	components/layout/ThemeToggle.tsx	Sun/Moon switch
Sidebar	components/layout/Sidebar.tsx	Desktop navigation
MobileNav	components/layout/MobileNav.tsx	Hamburger + Sheet
PageHeader	components/shared/PageHeader.tsx	Title + subtitle + actions
MetricCard	components/dashboard/MetricCard.tsx	Dashboard stat card
ActivityFeed	components/dashboard/ActivityFeed.tsx	Recent activity list
StatusBadge	components/shared/StatusBadge.tsx	Invoice status pill
ClientAvatar	components/clients/ClientAvatar.tsx	Initials avatar
ClientTable	components/clients/ClientTable.tsx	Client data table
ClientForm	components/clients/ClientForm.tsx	New/edit client form
InvoiceTable	components/invoices/InvoiceTable.tsx	Invoice list table
LineItemEditor	components/invoices/LineItemEditor.tsx	Line item row
TotalsDisplay	components/invoices/TotalsDisplay.tsx	Invoice totals
InvoicePreview	components/invoices/InvoicePreview.tsx	Public invoice layout
PaymentModal	components/invoices/PaymentModal.tsx	Mock payment form
8. Responsive Design
8.1 Breakpoint Strategy
Breakpoint	Tailwind Class	Min Width	Layout Changes
Mobile	default	0px	Single column, bottom sheet nav, card layouts
Tablet	sm:	640px	—
Tablet+	md:	768px	Two columns where applicable
Desktop	lg:	1024px	Sidebar nav, full data tables
Wide	xl:	1280px	Max-width containers
Ultra-wide	2xl:	1536px	—
8.2 Responsive Patterns by View
View	Mobile	Desktop
Shell	Top header + hamburger → Sheet nav	Fixed sidebar (w-64)
Dashboard	Stacked metrics, stacked cards	4-col metrics, 2-col cards
Clients	Card list	Data table
Invoices	Card list	Data table
Invoice Editor	Full-width form, sticky bottom actions	Centered form (max-w-4xl), sticky header
Public Invoice	Full-width, stacked layout	Centered (max-w-3xl)
8.3 Touch Considerations
Minimum touch target: 44px (use p-3 or min-h-11)
Adequate spacing between interactive elements
Swipe-to-reveal actions on mobile invoice cards (optional enhancement)
9. Theme System
9.1 Implementation Strategy
Use Tailwind's dark: variant with class-based switching:

HTML

<!-- Root element (in application layout) -->
<html class="light"> <!-- or "dark" -->
TypeScript

// Theme toggle hook
// app/frontend/hooks/useTheme.ts

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
9.2 Transition Smoothness
Apply transition to color changes:

CSS

/* In application.css */
@layer base {
  * {
    @apply transition-colors duration-200;
  }
}
9.3 Theme Toggle UX
State	Display	Icon
Light Mode Active	"Light"	Sun
Dark Mode Active	"Dark"	Moon
System (optional)	"Auto"	Monitor
10. Print Optimization
10.1 Print Stylesheet Strategy
Apply print-specific styles for the shareable invoice view:

CSS

/* In application.css or component-level */
@media print {
  /* Hide non-essential elements */
  .no-print {
    display: none !important;
  }
  
  /* Reset backgrounds for print */
  body {
    background: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* Ensure proper page breaks */
  .invoice-container {
    page-break-inside: avoid;
  }
  
  /* Remove shadows and borders that don't print well */
  .print-clean {
    box-shadow: none !important;
    border: 1px solid #e2e8f0 !important;
  }
}
10.2 Tailwind Print Utilities
Use Tailwind's print: variant:

HTML

<!-- Hide Pay Now button when printing -->
<button class="print:hidden">Pay Now</button>

<!-- Force black text when printing -->
<p class="text-slate-700 print:text-black">Total Due</p>

<!-- Ensure backgrounds print -->
<div class="bg-emerald-50 print:bg-transparent print:border print:border-emerald-500">
  PAID
</div>
10.3 Print-Specific Considerations
Element	Screen	Print
Pay Now Button	Visible	Hidden
Status Badge	Colored background	Border only
Shadows	Applied	Removed
Theme	User preference	Force light
Page margins	—	Proper @page margins
11. Implementation Roadmap
Phase 1: Frontend Design (Current Scope)
text

Week 1
├── Day 1-2: Environment Setup & Shell
│   ├── Configure Tailwind v4 with custom fonts
│   ├── Install ShadCN components
│   ├── Build AppLayout with responsive nav
│   ├── Implement theme toggle
│   └── Create Logo component
│
├── Day 3: Dashboard View
│   ├── PageHeader component
│   ├── MetricCard components
│   ├── RecentInvoices list
│   ├── ActivityFeed component
│   └── Mobile responsiveness
│
├── Day 4: Clients View
│   ├── ClientTable/ClientCard components
│   ├── ClientAvatar with color generation
│   ├── NewClient Sheet/Form
│   └── Mobile card layout
│
├── Day 5: Invoices List View
│   ├── FilterTabs component
│   ├── InvoiceTable component
│   ├── StatusBadge variants
│   ├── Row action menus
│   └── Mobile card layout
│
├── Day 6: Invoice Editor
│   ├── ClientCombobox
│   ├── DatePicker integration
│   ├── LineItemEditor (item/section/discount)
│   ├── TotalsDisplay with calculations
│   ├── Sticky header/footer
│   └── Mobile optimization
│
└── Day 7: Shareable Invoice & Polish
    ├── PublicInvoice layout
    ├── PaymentModal mockup
    ├── Print optimization
    ├── Dark mode review
    ├── Responsive testing
    └── Final QA

Deliverables:
✓ 5 working frontend views with mock data
✓ Light/Dark theme support
✓ Mobile/Tablet/Desktop responsive
✓ Print-optimized shareable invoice
Future Phases (Out of Scope)
Phase 2: Backend API & Database
Phase 3: Authentication (if needed)
Phase 4: Payment Integration
Phase 5: Email Notifications
12. Quality Assurance
12.1 Design Review Checklist
Category	Criterion	Verification
Typography	Instrument Serif loads for display	Visual inspection
Typography	Geist/Geist Mono loads for UI	Visual inspection
Typography	Proper hierarchy across all views	Visual inspection
Color	Blue-500 accent used consistently	Visual inspection
Color	Status colors match specification	Compare to spec
Spacing	Consistent gap/padding scale	Visual inspection
Icons	Lucide icons render properly	Visual inspection
12.2 Responsiveness Checklist
Breakpoint	Test Devices	Key Validations
Mobile	375px (iPhone SE)	Nav sheet works, cards stack, touch targets adequate
Mobile Large	428px (iPhone 14 Pro Max)	—
Tablet	768px (iPad Mini)	Two-column layouts activate
Desktop	1024px (Laptop)	Sidebar visible, tables full-width
Wide	1440px+	Content properly constrained
12.3 Theme Checklist
Test	Expected Result
Toggle to Dark	All colors invert appropriately
Toggle to Light	Return to primary design
System preference: Dark	Auto-apply dark mode
System preference: Light	Auto-apply light mode
Refresh page	Theme persists from localStorage
12.4 Print Checklist (Public Invoice)
Test	Expected Result
Print preview	Clean layout, no nav elements
Colors	Black text, minimal color backgrounds
Pay Now button	Hidden in print
Page breaks	No awkward splits in line items
12.5 Accessibility Baseline
Criterion	Target
Color contrast	WCAG AA (4.5:1 for text)
Focus indicators	Visible focus rings on all interactive elements
Keyboard navigation	All actions reachable via keyboard
Screen reader	Semantic HTML, proper ARIA where needed
