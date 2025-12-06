$ grep Overwrit docs/plan-3i_overwrite.md | sort | uniq
  Warning: Overwriting file: app/frontend/components/clients/index.ts
  Warning: Overwriting file: app/frontend/components/ui/index.ts
  Warning: Overwriting file: app/frontend/components/ui/input.tsx
  Warning: Overwriting file: app/frontend/components/ui/sheet.tsx
  Warning: Overwriting file: app/frontend/lib/utils.ts
  Warning: Overwriting file: app/frontend/pages/Clients/Index.tsx

---
$ python3 extract_code_files.py plan/execution_plan_day-3_patch_to_apply_to_3i.md
Processing compacted file: plan/execution_plan_day-3_patch_to_apply_to_3i.md
Input file encoding detected as: utf-8
Extracted: ClientTable.tsx
Extracted: dropdown-menu.tsx
Extracted: app/frontend/components/ui/sheet.tsx
  Warning: Overwriting file: app/frontend/components/ui/index.ts
Extracted: app/frontend/components/ui/index.ts
Extracted: app/frontend/pages/Clients/Index.tsx
  Warning: Overwriting file: app/frontend/lib/utils.ts
Extracted: app/frontend/lib/utils.ts
Extracted: Alternative: Replace defaults entirely if options provided
Extracted: Day 5 might also use:
  Warning: Overwriting file: app/frontend/components/ui/input.tsx
Extracted: app/frontend/components/ui/input.tsx
Extracted: In ClientForm.tsx - Update FormField component
  Warning: Overwriting file: app/frontend/components/ui/sheet.tsx
Extracted: app/frontend/components/ui/sheet.tsx
  Warning: Overwriting file: app/frontend/components/ui/index.ts
Extracted: app/frontend/components/ui/index.ts
  Warning: Overwriting file: app/frontend/components/clients/index.ts
Extracted: app/frontend/components/clients/index.ts
  Warning: Overwriting file: app/frontend/pages/Clients/Index.tsx
Extracted: app/frontend/pages/Clients/Index.tsx

Extraction complete!
Total code blocks found: 35
Files successfully extracted: 14
Blocks rejected: 21

Rejected blocks:
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence
  - <unknown>: Expected a file marker comment after code fence

Files overwritten: 7
Note: Multiple code blocks with the same filename were found; each file contains the content from the last matching block.
