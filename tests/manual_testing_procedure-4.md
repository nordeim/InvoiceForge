## Testing Steps

### 1. Start Development Servers
```bash
# Terminal 1
bin/rails server

# Terminal 2
bin/vite dev
```

### 2. Invoices Page Load
1. Navigate to http://localhost:3000/invoices
2. Verify page header shows "Invoices" and "4 total invoices"
3. Verify filter tabs are visible with counts
4. Verify 4 invoices are displayed

### 3. Filter Tabs Testing
1. Click "Draft" tab
2. Verify only 1 invoice shown (2025-0002)
3. Verify message "Showing 1 of 4 invoices"
4. Click "Pending" tab
5. Verify only 1 invoice shown (2025-0001)
6. Click "Paid" tab
7. Verify only 1 invoice shown (2024-0012)
8. Click "Overdue" tab
9. Verify only 1 invoice shown (2024-0010)
10. Click "All" tab
11. Verify all 4 invoices shown

### 4. Desktop Table Testing (>= 768px)
1. Ensure viewport is at least 768px wide
2. Verify table is visible with all columns
3. Verify each row shows:
   - Invoice number in monospace
   - Client name and company
   - Amount in monospace
   - Due date
   - Status badge
4. Verify overdue invoice (2024-0010) has red due date
5. Hover over a row, verify background changes
6. Click on a row
7. Verify navigation to /invoices/:id/edit

### 5. Row Actions Testing
1. Open actions for draft invoice (2025-0002)
2. Verify options: Edit, Send, Delete (in red)
3. Close menu
4. Open actions for pending invoice (2025-0001)
5. Verify options: Edit, View Public, Copy Link, Mark Paid
6. Click "Copy Link"
7. Verify alert shows "copied to clipboard"
8. Open actions for paid invoice (2024-0012)
9. Verify options: Edit, View Public, Copy Link (no Mark Paid)
10. Open actions for overdue invoice (2024-0010)
11. Verify options: Edit, View Public, Copy Link, Mark Paid

### 6. Mobile Card Testing (< 768px)
1. Set viewport to 375px
2. Verify table is hidden
3. Verify card stack is visible
4. Verify each card shows:
   - Invoice number at top
   - Client name
   - Amount in large font
   - Due date with status
5. Verify overdue invoice has red date
6. Tap actions button
7. Verify dropdown opens
8. Tap on card (not actions)
9. Verify navigation to edit page

### 7. Status Badge Verification
1. Find invoice 2025-0002 (Draft)
2. Verify badge has dashed border, slate colors
3. Find invoice 2025-0001 (Pending)
4. Verify badge has amber colors
5. Find invoice 2024-0012 (Paid)
6. Verify badge has emerald colors
7. Find invoice 2024-0010 (Overdue)
8. Verify badge has rose colors

### 8. New Invoice Button
1. Click "New Invoice" button
2. Verify navigation to /invoices/new
3. Verify placeholder page shows
4. Click "Back to Invoices"
5. Verify return to invoices list

### 9. Dark Mode Testing
1. Toggle to dark mode
2. Verify table has dark background
3. Verify filter tabs adapt
4. Verify cards have dark background
5. Verify status badges remain visible
6. Verify action menus have dark backgrounds

### 10. Accessibility Testing
1. Tab through the page
2. Verify focus on filter tabs
3. Use arrow keys between tabs
4. Press Enter to select tab
5. Continue tabbing to table rows
6. Verify focus visible on action buttons
7. Press Enter on action button
8. Verify dropdown opens
9. Arrow through dropdown items
10. Press Escape to close
