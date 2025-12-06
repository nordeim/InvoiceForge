$ python3 extract_code_files.py oo2
Processing compacted file: oo2
Input file encoding detected as: utf-8
  Warning: Overwriting file: app/frontend/lib/utils.ts
Extracted: app/frontend/lib/utils.ts
  Warning: Overwriting file: app/frontend/lib/types.ts
Extracted: app/frontend/lib/types.ts
  Warning: Overwriting file: app/frontend/components/shared/StatusBadge.tsx
Extracted: app/frontend/components/shared/StatusBadge.tsx
  Warning: Overwriting file: app/frontend/components/dashboard/ActivityItem.tsx
Extracted: app/frontend/components/dashboard/ActivityItem.tsx
  Warning: Overwriting file: app/frontend/components/ui/separator.tsx
Extracted: app/frontend/components/ui/separator.tsx

Extraction complete!
Total code blocks found: 7
Files successfully extracted: 5
Blocks rejected: 2

Rejected blocks:
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence

Files overwritten: 5
Note: Multiple code blocks with the same filename were found; each file contains the content from the last matching block.

---

$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   Deep_Analysis_InvoiceForge_PRD_v4.2.md
        modified:   app/assets/stylesheets/application.css
        modified:   app/frontend/components/dashboard/ActivityItem.tsx
        modified:   app/frontend/components/shared/StatusBadge.tsx
        modified:   app/frontend/lib/types.ts
        modified:   app/frontend/lib/utils.ts
        new file:   docs/plan-2_patch_overwrite.md
        modified:   npm_install_script.sh
        new file:   plan_patch_day-2_implementation.md

