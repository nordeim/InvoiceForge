## Testing Steps

### 1. Start Development Servers
```bash
# Terminal 1
bin/rails server

# Terminal 2
bin/vite dev
```

### 2. Dashboard Data Verification
1. Open http://localhost:3000/dashboard
2. Verify all 4 metric cards show correct values:
   - Outstanding: S$7,280.00
   - Paid (Month): S$8,000.00
   - Paid (YTD): S$56,150.00
   - Overdue: S$1,200.00
3. Verify Recent Invoices shows 4 entries
4. Verify Activity Feed shows 4 entries

### 3. Animation Testing
1. Refresh the page
2. Watch for staggered fade-in on invoice cards
3. Watch for staggered fade-in on activity items
4. Verify animations feel smooth (not jarring)

### 4. Interaction Testing
1. Hover over each invoice card
2. Verify border color changes
3. Verify chevron appears (desktop)
4. Click an invoice card
5. Verify navigation occurs (will 404 for now - that's OK)
6. Click "View All" in Recent Invoices
7. Verify navigation to /invoices
8. Click "New Invoice" button
9. Verify navigation to /invoices/new (will 404 - OK)

### 5. Status Badge Testing
1. Find a Draft invoice (2025-0002)
2. Verify badge has dashed border
3. Find a Pending invoice (2025-0001)
4. Verify badge has amber colors
5. Find a Paid invoice (2024-0012)
6. Verify badge has emerald colors
7. Find an Overdue invoice (2024-0010)
8. Verify badge has rose colors

### 6. Responsive Testing
1. Open Chrome DevTools
2. Set viewport to 375px (mobile)
3. Verify:
   - Metrics stack in single column
   - Two-column layout stacks
   - Invoice cards remain readable
   - Amount/date may be simplified
4. Set viewport to 768px (tablet)
5. Verify:
   - Metrics show 2 columns
   - Two-column layout may stack
6. Set viewport to 1280px (desktop)
7. Verify:
   - Metrics show 4 columns
   - Two-column layout side by side

### 7. Dark Mode Testing
1. Click theme toggle (or ensure dark mode)
2. Verify:
   - Canvas is very dark (slate-950)
   - Cards are slightly lighter (slate-900)
   - All text readable
   - Status badges adapt colors
   - Activity icons adapt colors
3. Refresh page
4. Verify dark mode persists

### 8. Accessibility Testing
1. Tab through the page
2. Verify focus rings on all interactive elements
3. Use screen reader (or browser a11y tools)
4. Verify status badges announce their meaning
5. Open DevTools > Rendering > Emulate prefers-reduced-motion
6. Verify animations are disabled
