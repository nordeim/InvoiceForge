$ grep Overwrit docs/plan-4_overwrite.md
  Warning: Overwriting file: app/frontend/components/ui/index.ts
  Warning: Overwriting file: app/frontend/components/invoices/index.ts
  Warning: Overwriting file: app/frontend/components/invoices/index.ts
  Warning: Overwriting file: app/frontend/components/invoices/index.ts
  Warning: Overwriting file: app/frontend/components/invoices/index.ts
  Warning: Overwriting file: app/frontend/pages/Invoices/Index.tsx
  Warning: Overwriting file: app/frontend/pages/Invoices/New.tsx
  Warning: Overwriting file: app/frontend/pages/Invoices/Edit.tsx
  Warning: Overwriting file: app/controllers/invoices_controller.rb
  Warning: Overwriting file: config/routes.rb


---

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   app/controllers/invoices_controller.rb
        modified:   app/frontend/pages/Invoices/Edit.tsx
        modified:   app/frontend/pages/Invoices/Index.tsx
        modified:   app/frontend/pages/Invoices/New.tsx
        modified:   config/routes.rb
        modified:   docs/plan-4.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        app/controllers/invoices_controller.rb.3
        app/frontend/components/invoices/InvoiceCard.tsx
        app/frontend/components/invoices/InvoiceFilterTabs.tsx
        app/frontend/components/invoices/InvoiceList.tsx
        app/frontend/components/invoices/InvoiceRowActions.tsx
        app/frontend/components/invoices/InvoiceTable.tsx
        app/frontend/components/ui/tabs.tsx

---

$ python3 extract_code_files.py docs/plan-4.md
Processing compacted file: docs/plan-4.md
Input file encoding detected as: utf-8
Extracted: app/frontend/components/ui/tabs.tsx
  Warning: Overwriting file: app/frontend/components/ui/index.ts
Extracted: app/frontend/components/ui/index.ts
Extracted: app/frontend/components/invoices/InvoiceFilterTabs.tsx
  Warning: Overwriting file: app/frontend/components/invoices/index.ts
Extracted: app/frontend/components/invoices/index.ts
Extracted: app/frontend/components/invoices/InvoiceRowActions.tsx
Extracted: app/frontend/components/invoices/InvoiceTable.tsx
  Warning: Overwriting file: app/frontend/components/invoices/index.ts
Extracted: app/frontend/components/invoices/index.ts
Extracted: app/frontend/components/invoices/InvoiceCard.tsx
  Warning: Overwriting file: app/frontend/components/invoices/index.ts
Extracted: app/frontend/components/invoices/index.ts
Extracted: app/frontend/components/invoices/InvoiceList.tsx
  Warning: Overwriting file: app/frontend/components/invoices/index.ts
Extracted: app/frontend/components/invoices/index.ts
  Warning: Overwriting file: app/frontend/pages/Invoices/Index.tsx
Extracted: app/frontend/pages/Invoices/Index.tsx
  Warning: Overwriting file: app/frontend/pages/Invoices/New.tsx
Extracted: app/frontend/pages/Invoices/New.tsx
  Warning: Overwriting file: app/frontend/pages/Invoices/Edit.tsx
Extracted: app/frontend/pages/Invoices/Edit.tsx
  Warning: Overwriting file: app/controllers/invoices_controller.rb
Extracted: app/controllers/invoices_controller.rb
  Warning: Overwriting file: config/routes.rb
Extracted: config/routes.rb

Extraction complete!
Total code blocks found: 18
Files successfully extracted: 16
Blocks rejected: 2

Rejected blocks:
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence

Files overwritten: 10
Note: Multiple code blocks with the same filename were found; each file contains the content from the last matching block.

