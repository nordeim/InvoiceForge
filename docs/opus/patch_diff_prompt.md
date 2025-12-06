awesome job on your meticulous analysis, planning and execution! Please keep up the good work in your rigorous and meticulous approach to planning and execution! Now, please meticulously review the diff output comparing the "original" versus "your patched version", double-check that there is no regression in the updated version of `app/frontend/components/shared/StatusBadge.tsx`.

```diff
--- app/frontend/components/shared/StatusBadge.tsx-original    2025-12-05 12:23:05.821363507 +0800
+++ app/frontend/components/shared/StatusBadge.tsx-patched      2025-12-06 11:23:55.781380943 +0800
@@ -5,6 +5,8 @@
 interface StatusBadgeProps {
   status: InvoiceStatus
   className?: string
+  /** Size variant */
+  size?: 'sm' | 'md'
 }
 
 /**
@@ -15,71 +17,102 @@
  * - Pending: Solid border, amber colors
  * - Paid: Solid border, emerald colors
  * - Overdue: Solid border, rose colors
- * - All: rounded-full, text-xs, font-medium
+ * - Cancelled: Solid border, muted slate colors
+ * 
+ * All badges: rounded-full, font-medium
  */
-export function StatusBadge({ status, className }: StatusBadgeProps) {
+export function StatusBadge({ status, className, size = 'sm' }: StatusBadgeProps) {
+  const config = statusConfig[status] || statusConfig.draft
+  
   return (
     <span
+      role="status"
       className={cn(
         // Base styles
-        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
+        "inline-flex items-center font-medium rounded-full border",
+        // Size variants
+        size === 'sm' && "px-2.5 py-0.5 text-xs",
+        size === 'md' && "px-3 py-1 text-sm",
         // Status-specific styles
-        statusStyles[status],
+        config.className,
         className
       )}
     >
-      {statusLabels[status]}
-      {/* Screen reader enhancement */}
-      <span className="sr-only">
-        {statusAriaLabels[status]}
-      </span>
+      {config.label}
+      <span className="sr-only">, {config.srText}</span>
     </span>
   )
 }
 
-// Status display labels
-const statusLabels: Record<InvoiceStatus, string> = {
-  draft: "Draft",
-  pending: "Pending",
-  paid: "Paid",
-  overdue: "Overdue",
+/**
+ * Status configuration
+ * Includes styling, labels, and accessibility text
+ */
+const statusConfig: Record<InvoiceStatus, {
+  label: string
+  srText: string
+  className: string
+}> = {
+  draft: {
+    label: 'Draft',
+    srText: 'Invoice is in draft status and has not been sent',
+    className: cn(
+      // Light mode
+      "bg-slate-100 text-slate-600 border-slate-300 border-dashed",
+      // Dark mode
+      "dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600"
+    ),
+  },
+  pending: {
+    label: 'Pending',
+    srText: 'Invoice has been sent and is awaiting payment',
+    className: cn(
+      // Light mode
+      "bg-amber-50 text-amber-700 border-amber-300",
+      // Dark mode
+      "dark:bg-amber-950 dark:text-amber-400 dark:border-amber-700"
+    ),
+  },
+  paid: {
+    label: 'Paid',
+    srText: 'Invoice has been paid in full',
+    className: cn(
+      // Light mode
+      "bg-emerald-50 text-emerald-700 border-emerald-300",
+      // Dark mode
+      "dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-700"
+    ),
+  },
+  overdue: {
+    label: 'Overdue',
+    srText: 'Invoice payment is past due date',
+    className: cn(
+      // Light mode
+      "bg-rose-50 text-rose-700 border-rose-300",
+      // Dark mode
+      "dark:bg-rose-950 dark:text-rose-400 dark:border-rose-700"
+    ),
+  },
+  cancelled: {
+    label: 'Cancelled',
+    srText: 'Invoice has been cancelled and is no longer active',
+    className: cn(
+      // Light mode
+      "bg-slate-100 text-slate-500 border-slate-300",
+      // Dark mode
+      "dark:bg-slate-800 dark:text-slate-500 dark:border-slate-600"
+    ),
+  },
 }
 
-// Screen reader descriptions
-const statusAriaLabels: Record<InvoiceStatus, string> = {
-  draft: "Invoice is in draft status and has not been sent",
-  pending: "Invoice has been sent and is awaiting payment",
-  paid: "Invoice has been paid",
-  overdue: "Invoice payment is past due date",
-}
+// Export for use in other components (e.g., filters)
+export { statusConfig }
 
-// Tailwind classes for each status (v4.2 specification)
-const statusStyles: Record<InvoiceStatus, string> = {
-  draft: cn(
-    // Light mode
-    "bg-slate-100 text-slate-600 border-slate-300 border-dashed",
-    // Dark mode
-    "dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600"
-  ),
-  pending: cn(
-    // Light mode
-    "bg-amber-50 text-amber-700 border-amber-300",
-    // Dark mode
-    "dark:bg-amber-950 dark:text-amber-400 dark:border-amber-700"
-  ),
-  paid: cn(
-    // Light mode
-    "bg-emerald-50 text-emerald-700 border-emerald-300",
-    // Dark mode
-    "dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-700"
-  ),
-  overdue: cn(
-    // Light mode
-    "bg-rose-50 text-rose-700 border-rose-300",
-    // Dark mode
-    "dark:bg-rose-950 dark:text-rose-400 dark:border-rose-700"
-  ),
+// Export status labels for filter tabs
+export const statusLabels: Record<InvoiceStatus, string> = {
+  draft: 'Draft',
+  pending: 'Pending',
+  paid: 'Paid',
+  overdue: 'Overdue',
+  cancelled: 'Cancelled',
 }
-
-// Export styles for use in other components if needed
-export { statusStyles, statusLabels }
```

