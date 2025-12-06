# Install Inertia.js React adapter and React
npm install @inertiajs/react react react-dom

# Install TypeScript and types
npm install -D typescript @types/react @types/react-dom

# Install Vite React plugin if not already present
npm install -D @vitejs/plugin-react
npm install tailwindcss @tailwindcss/vite
npm install clsx tailwind-merge class-variance-authority lucide-react
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-separator @radix-ui/react-tooltip

# Day 2 Pre-Implementation Setup
# ─────────────────────────────────

# Install missing dependencies (if not already installed)
npm install @radix-ui/react-separator

# Verify all dependencies are present
npm ls @radix-ui/react-separator
npm ls clsx
npm ls tailwind-merge
npm ls lucide-react

# Day 3: Install all required dependencies upfront
npm install \
  @radix-ui/react-label \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-dialog \
  class-variance-authority

# Verify installation
npm ls @radix-ui/react-label @radix-ui/react-dropdown-menu @radix-ui/react-dialog class-variance-authority

npm install @radix-ui/react-label @radix-ui/react-dropdown-menu @radix-ui/react-dialog class-variance-authority
