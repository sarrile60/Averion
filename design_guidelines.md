# Averion – EU Digital Banking Platform Design System

## Executive Summary

This design system defines the visual language, component patterns, and interaction principles for **Averion**, a production-grade EU digital banking platform. The system is designed to convey **trust, professionalism, security, and modern European fintech excellence** while remaining distinct from existing competitors like Revolut, N26, and Monzo.

**Design Philosophy:** Clean, minimal, bank-like aesthetic with high trust signals, excellent readability for financial data, and subtle professional animations. Light theme default with full dark mode support.

---

## 🎨 Color System

### GRADIENT RESTRICTION RULE
**CRITICAL:** This platform uses **NO dark/saturated gradients** (purple/pink, blue/purple, etc.)
- Gradients are **ONLY** allowed for:
  - Hero section backgrounds (max 20% of viewport)
  - Large decorative elements with proper text contrast
  - Subtle accent overlays on marketing pages
- **NEVER** use gradients on:
  - Data tables, transaction lists, or financial information
  - Small UI elements (<100px)
  - Text-heavy content areas
  - Form inputs or interactive controls

### Primary Color Palette

```json
{
  "brand": {
    "primary": {
      "hex": "#0B5D8F",
      "hsl": "200 85% 31%",
      "usage": "Primary CTAs, navigation highlights, brand elements, key interactive elements"
    },
    "primaryHover": {
      "hex": "#094A73",
      "hsl": "200 85% 25%",
      "usage": "Hover state for primary buttons and links"
    },
    "secondary": {
      "hex": "#0B7D5A",
      "hsl": "162 85% 27%",
      "usage": "Success states, positive financial indicators, growth metrics, completed actions"
    },
    "secondaryHover": {
      "hex": "#096448",
      "hsl": "162 85% 21%",
      "usage": "Hover state for secondary actions"
    },
    "accent": {
      "hex": "#5BA3C5",
      "hsl": "200 50% 57%",
      "usage": "Highlights, badges, informational elements, chart accents"
    }
  },
  
  "semantic": {
    "success": {
      "hex": "#0B7D5A",
      "hsl": "162 85% 27%",
      "usage": "Success messages, positive balances, completed transactions, approved KYC"
    },
    "warning": {
      "hex": "#D97706",
      "hsl": "32 95% 44%",
      "usage": "Pending states, warnings, requires attention"
    },
    "error": {
      "hex": "#DC2626",
      "hsl": "0 73% 51%",
      "usage": "Errors, failed transactions, rejected documents, destructive actions"
    },
    "info": {
      "hex": "#0B5D8F",
      "hsl": "200 85% 31%",
      "usage": "Informational messages, tips, neutral notifications"
    }
  },
  
  "neutrals": {
    "gray50": {
      "hex": "#F9FAFB",
      "hsl": "210 20% 98%",
      "usage": "Page background (light mode)"
    },
    "gray100": {
      "hex": "#F3F4F6",
      "hsl": "220 14% 96%",
      "usage": "Card backgrounds, secondary surfaces"
    },
    "gray200": {
      "hex": "#E5E7EB",
      "hsl": "220 13% 91%",
      "usage": "Borders, dividers, disabled backgrounds"
    },
    "gray300": {
      "hex": "#D1D5DB",
      "hsl": "214 14% 83%",
      "usage": "Subtle borders, inactive states"
    },
    "gray400": {
      "hex": "#9CA3AF",
      "hsl": "218 11% 65%",
      "usage": "Placeholder text, secondary icons"
    },
    "gray500": {
      "hex": "#6B7280",
      "hsl": "220 9% 46%",
      "usage": "Secondary text, metadata, timestamps"
    },
    "gray600": {
      "hex": "#4B5563",
      "hsl": "215 14% 34%",
      "usage": "Body text, labels"
    },
    "gray700": {
      "hex": "#374151",
      "hsl": "217 19% 27%",
      "usage": "Headings, primary text"
    },
    "gray800": {
      "hex": "#1F2937",
      "hsl": "215 25% 17%",
      "usage": "Dark headings, high emphasis text"
    },
    "gray900": {
      "hex": "#111827",
      "hsl": "221 39% 11%",
      "usage": "Maximum contrast text, dark mode backgrounds"
    }
  },
  
  "financial": {
    "positive": {
      "hex": "#0B7D5A",
      "hsl": "162 85% 27%",
      "usage": "Income, deposits, positive balances, credits"
    },
    "negative": {
      "hex": "#DC2626",
      "hsl": "0 73% 51%",
      "usage": "Expenses, withdrawals, debits, fees"
    },
    "neutral": {
      "hex": "#6B7280",
      "hsl": "220 9% 46%",
      "usage": "Transfers, pending amounts, neutral transactions"
    }
  }
}
```

### Dark Mode Palette

```json
{
  "dark": {
    "background": {
      "primary": "#0F1419",
      "secondary": "#1A1F26",
      "tertiary": "#252B33"
    },
    "text": {
      "primary": "#F9FAFB",
      "secondary": "#D1D5DB",
      "tertiary": "#9CA3AF"
    },
    "border": {
      "default": "#374151",
      "subtle": "#252B33"
    }
  }
}
```

### CSS Custom Properties Implementation

Add to `/app/frontend/src/index.css`:

```css
@layer base {
  :root {
    /* Brand Colors */
    --brand-primary: 200 85% 31%;
    --brand-primary-hover: 200 85% 25%;
    --brand-secondary: 162 85% 27%;
    --brand-secondary-hover: 162 85% 21%;
    --brand-accent: 200 50% 57%;
    
    /* Semantic Colors */
    --color-success: 162 85% 27%;
    --color-warning: 32 95% 44%;
    --color-error: 0 73% 51%;
    --color-info: 200 85% 31%;
    
    /* Financial Colors */
    --financial-positive: 162 85% 27%;
    --financial-negative: 0 73% 51%;
    --financial-neutral: 220 9% 46%;
    
    /* Neutrals */
    --gray-50: 210 20% 98%;
    --gray-100: 220 14% 96%;
    --gray-200: 220 13% 91%;
    --gray-300: 214 14% 83%;
    --gray-400: 218 11% 65%;
    --gray-500: 220 9% 46%;
    --gray-600: 215 14% 34%;
    --gray-700: 217 19% 27%;
    --gray-800: 215 25% 17%;
    --gray-900: 221 39% 11%;
    
    /* Shadcn overrides for banking theme */
    --background: var(--gray-50);
    --foreground: var(--gray-900);
    --card: 0 0% 100%;
    --card-foreground: var(--gray-900);
    --popover: 0 0% 100%;
    --popover-foreground: var(--gray-900);
    --primary: var(--brand-primary);
    --primary-foreground: 0 0% 100%;
    --secondary: var(--gray-100);
    --secondary-foreground: var(--gray-900);
    --muted: var(--gray-100);
    --muted-foreground: var(--gray-500);
    --accent: var(--brand-accent);
    --accent-foreground: 0 0% 100%;
    --destructive: var(--color-error);
    --destructive-foreground: 0 0% 100%;
    --border: var(--gray-200);
    --input: var(--gray-200);
    --ring: var(--brand-primary);
    --radius: 0.5rem;
  }
  
  .dark {
    --background: 221 39% 6%;
    --foreground: 210 20% 98%;
    --card: 221 39% 8%;
    --card-foreground: 210 20% 98%;
    --popover: 221 39% 8%;
    --popover-foreground: 210 20% 98%;
    --primary: 200 50% 57%;
    --primary-foreground: 221 39% 11%;
    --secondary: 217 19% 15%;
    --secondary-foreground: 210 20% 98%;
    --muted: 217 19% 15%;
    --muted-foreground: 218 11% 65%;
    --accent: 200 50% 57%;
    --accent-foreground: 221 39% 11%;
    --destructive: 0 73% 51%;
    --destructive-foreground: 210 20% 98%;
    --border: 217 19% 15%;
    --input: 217 19% 15%;
    --ring: 200 50% 57%;
  }
}
```

---

## 📝 Typography System

### Font Stack

**Primary Font (UI & Body):** Inter  
**Display Font (Headlines & Marketing):** Space Grotesk  
**Monospace Font (Technical Data):** IBM Plex Mono

### Font Loading

Add to `/app/frontend/public/index.html` in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Typography Scale & Usage

```json
{
  "typography": {
    "display": {
      "font": "Space Grotesk",
      "size": "text-5xl sm:text-6xl lg:text-7xl",
      "weight": "font-bold",
      "lineHeight": "leading-tight",
      "usage": "Hero headlines, marketing pages only"
    },
    "h1": {
      "font": "Space Grotesk",
      "size": "text-3xl sm:text-4xl lg:text-5xl",
      "weight": "font-semibold",
      "lineHeight": "leading-tight",
      "usage": "Page titles, main dashboard headings"
    },
    "h2": {
      "font": "Inter",
      "size": "text-2xl sm:text-3xl",
      "weight": "font-semibold",
      "lineHeight": "leading-snug",
      "usage": "Section headings, card titles"
    },
    "h3": {
      "font": "Inter",
      "size": "text-xl sm:text-2xl",
      "weight": "font-semibold",
      "lineHeight": "leading-snug",
      "usage": "Subsection headings"
    },
    "h4": {
      "font": "Inter",
      "size": "text-lg",
      "weight": "font-semibold",
      "lineHeight": "leading-normal",
      "usage": "Component headings, form sections"
    },
    "body-large": {
      "font": "Inter",
      "size": "text-base sm:text-lg",
      "weight": "font-normal",
      "lineHeight": "leading-relaxed",
      "usage": "Important body text, descriptions"
    },
    "body": {
      "font": "Inter",
      "size": "text-sm sm:text-base",
      "weight": "font-normal",
      "lineHeight": "leading-relaxed",
      "usage": "Default body text, form labels"
    },
    "body-small": {
      "font": "Inter",
      "size": "text-xs sm:text-sm",
      "weight": "font-normal",
      "lineHeight": "leading-normal",
      "usage": "Secondary text, metadata, timestamps"
    },
    "caption": {
      "font": "Inter",
      "size": "text-xs",
      "weight": "font-medium",
      "lineHeight": "leading-tight",
      "usage": "Labels, badges, small UI text"
    },
    "financial-large": {
      "font": "IBM Plex Mono",
      "size": "text-3xl sm:text-4xl",
      "weight": "font-semibold",
      "lineHeight": "leading-none",
      "usage": "Large balance displays, key metrics"
    },
    "financial": {
      "font": "IBM Plex Mono",
      "size": "text-base sm:text-lg",
      "weight": "font-medium",
      "lineHeight": "leading-tight",
      "usage": "Transaction amounts, account numbers"
    },
    "financial-small": {
      "font": "IBM Plex Mono",
      "size": "text-sm",
      "weight": "font-normal",
      "lineHeight": "leading-tight",
      "usage": "Small amounts, IBANs, reference codes"
    }
  }
}
```

### CSS Implementation

Add to `/app/frontend/src/index.css`:

```css
@layer base {
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
  }
  
  .font-display {
    font-family: 'Space Grotesk', sans-serif;
  }
  
  .font-mono {
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
  }
  
  /* Financial number formatting */
  .financial-amount {
    font-family: 'IBM Plex Mono', monospace;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }
}
```

---

## 🎯 Component Library & Patterns

### Core Components from shadcn/ui

**Use these existing components from `/app/frontend/src/components/ui/`:**

```json
{
  "navigation": [
    "navigation-menu.jsx",
    "breadcrumb.jsx",
    "tabs.jsx"
  ],
  "forms": [
    "input.jsx",
    "textarea.jsx",
    "select.jsx",
    "checkbox.jsx",
    "radio-group.jsx",
    "switch.jsx",
    "calendar.jsx",
    "input-otp.jsx",
    "form.jsx",
    "label.jsx"
  ],
  "feedback": [
    "alert.jsx",
    "alert-dialog.jsx",
    "toast.jsx",
    "toaster.jsx",
    "sonner.jsx",
    "progress.jsx",
    "skeleton.jsx"
  ],
  "data-display": [
    "table.jsx",
    "card.jsx",
    "badge.jsx",
    "avatar.jsx",
    "separator.jsx",
    "scroll-area.jsx"
  ],
  "overlays": [
    "dialog.jsx",
    "sheet.jsx",
    "drawer.jsx",
    "popover.jsx",
    "hover-card.jsx",
    "dropdown-menu.jsx",
    "context-menu.jsx",
    "tooltip.jsx"
  ],
  "layout": [
    "accordion.jsx",
    "collapsible.jsx",
    "resizable.jsx",
    "carousel.jsx"
  ],
  "controls": [
    "button.jsx",
    "toggle.jsx",
    "toggle-group.jsx",
    "slider.jsx",
    "pagination.jsx"
  ]
}
```

### Button Variants & Styling

**Update button styles for banking context:**

```javascript
// Recommended button usage patterns
const buttonPatterns = {
  primary: {
    variant: "default",
    usage: "Primary CTAs (Send Money, Confirm, Submit)",
    className: "bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary-hover))] text-white shadow-sm transition-all duration-200 hover:shadow-md",
    testId: "primary-action-button"
  },
  secondary: {
    variant: "outline",
    usage: "Secondary actions (Cancel, Back, View Details)",
    className: "border-[hsl(var(--gray-300))] hover:bg-[hsl(var(--gray-100))] transition-colors duration-200",
    testId: "secondary-action-button"
  },
  success: {
    variant: "default",
    usage: "Positive confirmations (Approve, Accept)",
    className: "bg-[hsl(var(--brand-secondary))] hover:bg-[hsl(var(--brand-secondary-hover))] text-white",
    testId: "success-action-button"
  },
  destructive: {
    variant: "destructive",
    usage: "Dangerous actions (Delete, Reject, Disable)",
    className: "bg-[hsl(var(--color-error))] hover:bg-red-700 text-white",
    testId: "destructive-action-button"
  },
  ghost: {
    variant: "ghost",
    usage: "Tertiary actions, icon buttons",
    className: "hover:bg-[hsl(var(--gray-100))] transition-colors duration-200",
    testId: "ghost-action-button"
  }
};
```

### Status Badge Patterns

```javascript
// Status badge component patterns
const statusBadges = {
  kyc: {
    pending: {
      variant: "outline",
      className: "border-amber-300 bg-amber-50 text-amber-700",
      icon: "Clock",
      text: "Pending Review",
      testId: "kyc-status-pending"
    },
    approved: {
      variant: "default",
      className: "bg-green-100 text-green-700 border-green-200",
      icon: "CheckCircle",
      text: "Verified",
      testId: "kyc-status-approved"
    },
    rejected: {
      variant: "destructive",
      className: "bg-red-100 text-red-700 border-red-200",
      icon: "XCircle",
      text: "Rejected",
      testId: "kyc-status-rejected"
    },
    incomplete: {
      variant: "outline",
      className: "border-gray-300 bg-gray-50 text-gray-600",
      icon: "AlertCircle",
      text: "Incomplete",
      testId: "kyc-status-incomplete"
    }
  },
  transaction: {
    completed: {
      className: "bg-green-100 text-green-700 border-green-200",
      icon: "Check",
      text: "Completed",
      testId: "transaction-status-completed"
    },
    pending: {
      className: "bg-amber-100 text-amber-700 border-amber-200",
      icon: "Clock",
      text: "Pending",
      testId: "transaction-status-pending"
    },
    failed: {
      className: "bg-red-100 text-red-700 border-red-200",
      icon: "X",
      text: "Failed",
      testId: "transaction-status-failed"
    },
    processing: {
      className: "bg-blue-100 text-blue-700 border-blue-200",
      icon: "Loader",
      text: "Processing",
      testId: "transaction-status-processing"
    }
  },
  account: {
    active: {
      className: "bg-green-100 text-green-700 border-green-200",
      text: "Active",
      testId: "account-status-active"
    },
    frozen: {
      className: "bg-blue-100 text-blue-700 border-blue-200",
      text: "Frozen",
      testId: "account-status-frozen"
    },
    closed: {
      className: "bg-gray-100 text-gray-700 border-gray-200",
      text: "Closed",
      testId: "account-status-closed"
    }
  }
};
```

### Card Patterns

```javascript
// Card component patterns for different contexts
const cardPatterns = {
  accountCard: {
    className: "rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6",
    testId: "account-card",
    structure: "CardHeader with account name + CardContent with balance + CardFooter with quick actions"
  },
  transactionCard: {
    className: "rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer",
    testId: "transaction-card",
    structure: "Flex layout: icon + merchant/description + amount (right-aligned)"
  },
  dashboardWidget: {
    className: "rounded-xl border border-gray-200 bg-white shadow-sm p-6",
    testId: "dashboard-widget",
    structure: "CardHeader with title + icon + CardContent with data visualization or metrics"
  },
  kycDocumentCard: {
    className: "rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200",
    testId: "kyc-document-upload-card",
    structure: "Upload zone with icon, instructions, and file requirements"
  }
};
```

---

## 📐 Layout & Spacing System

### Spacing Scale

Use Tailwind's default spacing scale with these semantic mappings:

```json
{
  "spacing": {
    "xs": "0.5rem (2)",
    "sm": "0.75rem (3)",
    "md": "1rem (4)",
    "lg": "1.5rem (6)",
    "xl": "2rem (8)",
    "2xl": "3rem (12)",
    "3xl": "4rem (16)",
    "section": "4rem (16) mobile, 6rem (24) desktop",
    "container": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }
}
```

### Responsive Breakpoints

```json
{
  "breakpoints": {
    "sm": "640px (mobile landscape, small tablets)",
    "md": "768px (tablets)",
    "lg": "1024px (desktop)",
    "xl": "1280px (large desktop)",
    "2xl": "1536px (extra large)"
  }
}
```

### Layout Patterns

#### Customer App Layout

```javascript
// Mobile: Bottom Tab Navigation
const mobileLayout = {
  structure: "Fixed bottom navigation with 5 tabs",
  tabs: [
    { icon: "Home", label: "Home", route: "/", testId: "nav-home" },
    { icon: "CreditCard", label: "Accounts", route: "/accounts", testId: "nav-accounts" },
    { icon: "Activity", label: "Activity", route: "/transactions", testId: "nav-activity" },
    { icon: "MessageCircle", label: "Support", route: "/support", testId: "nav-support" },
    { icon: "User", label: "Profile", route: "/profile", testId: "nav-profile" }
  ],
  className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50",
  tabClassName: "flex-1 flex flex-col items-center justify-center py-2 text-xs"
};

// Desktop: Top Navigation
const desktopLayout = {
  structure: "Horizontal top nav with logo left, menu center, user right",
  className: "sticky top-0 bg-white border-b border-gray-200 shadow-sm z-40 px-6 py-4",
  testId: "desktop-navigation"
};
```

#### Admin Portal Layout

```javascript
// Sidebar Navigation (Desktop)
const adminSidebarLayout = {
  structure: "Fixed left sidebar with collapsible menu",
  width: "w-64 (expanded), w-16 (collapsed)",
  sections: [
    {
      title: "Management",
      items: [
        { icon: "Users", label: "Users", route: "/admin/users", testId: "admin-nav-users" },
        { icon: "FileCheck", label: "KYC Review", route: "/admin/kyc", badge: "pending count", testId: "admin-nav-kyc" },
        { icon: "Wallet", label: "Accounts", route: "/admin/accounts", testId: "admin-nav-accounts" }
      ]
    },
    {
      title: "Operations",
      items: [
        { icon: "ArrowLeftRight", label: "Ledger Tools", route: "/admin/ledger", testId: "admin-nav-ledger" },
        { icon: "Activity", label: "Transactions", route: "/admin/transactions", testId: "admin-nav-transactions" },
        { icon: "FileText", label: "Audit Logs", route: "/admin/audit", testId: "admin-nav-audit" }
      ]
    },
    {
      title: "Support",
      items: [
        { icon: "MessageSquare", label: "Tickets", route: "/admin/support", badge: "open count", testId: "admin-nav-support" },
        { icon: "Settings", label: "Settings", route: "/admin/settings", testId: "admin-nav-settings" }
      ]
    }
  ],
  className: "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-sm overflow-y-auto"
};
```

### Grid Systems

```javascript
// Dashboard Grid
const dashboardGrid = {
  className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  usage: "Dashboard widgets, account cards, metric displays"
};

// Transaction List Grid
const transactionListGrid = {
  className: "grid grid-cols-1 gap-2",
  usage: "Mobile transaction list (card-based)"
};

// Form Grid
const formGrid = {
  className: "grid grid-cols-1 md:grid-cols-2 gap-6",
  usage: "Multi-column forms (KYC, profile settings)"
};
```

---

## 🎭 Component-Specific Patterns

### Transaction List / Table

**Desktop Table:**

```javascript
const transactionTableColumns = [
  {
    key: "date",
    label: "Date",
    width: "w-32",
    align: "text-left",
    format: "DD MMM YYYY, HH:mm",
    className: "text-sm text-gray-600",
    testId: "transaction-date"
  },
  {
    key: "merchant",
    label: "Description",
    width: "flex-1",
    align: "text-left",
    className: "font-medium text-gray-900",
    subtext: "category (text-xs text-gray-500)",
    testId: "transaction-merchant"
  },
  {
    key: "account",
    label: "Account",
    width: "w-32",
    align: "text-left",
    format: "Last 4 digits",
    className: "text-sm text-gray-600 font-mono",
    testId: "transaction-account"
  },
  {
    key: "amount",
    label: "Amount",
    width: "w-32",
    align: "text-right",
    className: "font-mono font-semibold",
    colorLogic: "green for positive, red for negative, gray for transfers",
    testId: "transaction-amount"
  },
  {
    key: "status",
    label: "Status",
    width: "w-28",
    align: "text-center",
    component: "Badge",
    testId: "transaction-status"
  }
];

const transactionTableStyles = {
  table: "w-full",
  header: "bg-gray-50 border-b border-gray-200",
  headerCell: "px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",
  row: "border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer",
  cell: "px-4 py-4",
  testId: "transactions-table"
};
```

**Mobile List:**

```javascript
const transactionMobileCard = {
  structure: `
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="transaction-list-item">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {/* Category Icon */}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate" data-testid="transaction-merchant-name">{merchant}</p>
          <p className="text-xs text-gray-500" data-testid="transaction-date">{date} • {category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono font-semibold text-base" data-testid="transaction-amount">{amount}</p>
        <Badge className="mt-1" data-testid="transaction-status-badge">{status}</Badge>
      </div>
    </div>
  `
};
```

### Account Balance Display

```javascript
const balanceDisplay = {
  large: {
    structure: `
      <div className="text-center py-8" data-testid="account-balance-display">
        <p className="text-sm text-gray-500 mb-2">Available Balance</p>
        <h2 className="text-5xl font-bold font-mono text-gray-900" data-testid="balance-amount">€12,345.67</h2>
        <p className="text-xs text-gray-400 mt-2 font-mono" data-testid="account-iban">DE89 3704 0044 0532 0130 00</p>
      </div>
    `,
    usage: "Dashboard hero, account detail page"
  },
  compact: {
    structure: `
      <div className="flex items-baseline justify-between" data-testid="account-balance-compact">
        <span className="text-sm text-gray-600">Balance</span>
        <span className="text-xl font-semibold font-mono text-gray-900" data-testid="balance-amount-compact">€12,345.67</span>
      </div>
    `,
    usage: "Account cards, sidebar widgets"
  }
};
```

### KYC Document Upload

```javascript
const kycUploadComponent = {
  structure: `
    <div className="space-y-6" data-testid="kyc-document-upload-section">
      {/* Document Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-testid="document-type-selector">
        <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all" data-testid="document-type-passport">
          <FileText className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <p className="font-medium">Passport</p>
        </button>
        {/* National ID, Driver's License */}
      </div>
      
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer" data-testid="document-upload-zone">
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-base font-medium text-gray-700 mb-2">Drop your document here or click to browse</p>
        <p className="text-sm text-gray-500">Accepts JPG, PNG, PDF up to 10 MB</p>
        
        {/* Requirements List */}
        <div className="mt-6 text-left max-w-md mx-auto">
          <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Color photo, no glare</li>
            <li>✓ All corners visible</li>
            <li>✓ Valid, not expired</li>
            <li>✓ Clear and readable</li>
          </ul>
        </div>
      </div>
      
      {/* Uploaded Files Preview */}
      <div className="space-y-2" data-testid="uploaded-files-list">
        {/* File preview cards with thumbnail, name, size, remove button */}
      </div>
    </div>
  `,
  states: {
    idle: "border-gray-300",
    dragOver: "border-blue-500 bg-blue-50",
    uploading: "border-blue-500 bg-blue-50 (with progress bar)",
    success: "border-green-500 bg-green-50",
    error: "border-red-500 bg-red-50"
  }
};
```

### Multi-Step Form (Onboarding/KYC)

```javascript
const multiStepForm = {
  progressIndicator: {
    structure: `
      <div className="mb-8" data-testid="onboarding-progress">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center" data-testid={\`step-indicator-\${index}\`}>
              <div className={\`w-8 h-8 rounded-full flex items-center justify-center \${
                index < currentStep ? 'bg-green-500 text-white' :
                index === currentStep ? 'bg-blue-500 text-white' :
                'bg-gray-200 text-gray-500'
              }\`}>
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={\`h-1 w-12 mx-2 \${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}\`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: \`\${(currentStep / (steps.length - 1)) * 100}%\` }}
            data-testid="progress-bar"
          />
        </div>
        
        {/* Step Title */}
        <p className="text-sm text-gray-600 mt-4" data-testid="step-title">
          Step {currentStep + 1} of {steps.length} – {steps[currentStep].title}
        </p>
      </div>
    `,
    testId: "multi-step-progress"
  },
  formLayout: {
    className: "max-w-2xl mx-auto space-y-6",
    fieldSpacing: "space-y-4",
    sectionSpacing: "space-y-8"
  },
  navigation: {
    structure: `
      <div className="flex items-center justify-between pt-6 border-t border-gray-200" data-testid="form-navigation">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} data-testid="form-back-button">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} data-testid="form-next-button">
          {currentStep === steps.length - 1 ? 'Submit' : 'Continue'}
          {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    `
  }
};
```

### Data Filters & Search

```javascript
const filterPanel = {
  structure: `
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-4" data-testid="transaction-filters">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <Input 
            placeholder="Search transactions..." 
            icon={<Search className="w-4 h-4" />}
            data-testid="transaction-search-input"
          />
        </div>
        
        {/* Date Range */}
        <Select data-testid="date-range-filter">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Custom range</option>
        </Select>
        
        {/* Account Filter */}
        <Select data-testid="account-filter">
          <option>All accounts</option>
          {/* Account options */}
        </Select>
      </div>
      
      {/* Advanced Filters (Collapsible) */}
      <Collapsible>
        <CollapsibleTrigger className="text-sm text-blue-600 hover:text-blue-700" data-testid="advanced-filters-toggle">
          Advanced filters
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select data-testid="transaction-type-filter">
            <option>All types</option>
            <option>Income</option>
            <option>Expense</option>
            <option>Transfer</option>
          </Select>
          
          <Select data-testid="transaction-status-filter">
            <option>All statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </Select>
          
          <Select data-testid="transaction-category-filter">
            <option>All categories</option>
            {/* Category options */}
          </Select>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2" data-testid="active-filters">
        {/* Badge for each active filter with X to remove */}
      </div>
    </div>
  `
};
```

### Empty States

```javascript
const emptyStates = {
  noTransactions: {
    structure: `
      <div className="text-center py-12" data-testid="empty-state-transactions">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          Your transaction history will appear here once you start using your account.
        </p>
        <Button data-testid="empty-state-cta">Make your first transaction</Button>
      </div>
    `
  },
  noSearchResults: {
    structure: `
      <div className="text-center py-12" data-testid="empty-state-search">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-sm text-gray-500 mb-6">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <Button variant="outline" data-testid="clear-filters-button">Clear all filters</Button>
      </div>
    `
  },
  noAccounts: {
    structure: `
      <div className="text-center py-12" data-testid="empty-state-accounts">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No accounts yet</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          Create your first account to start managing your finances.
        </p>
        <Button data-testid="create-account-button">Create account</Button>
      </div>
    `
  }
};
```

### Loading States

```javascript
const loadingStates = {
  skeleton: {
    transactionList: `
      <div className="space-y-2" data-testid="transaction-list-skeleton">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 ml-auto" />
              <Skeleton className="h-5 w-16 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    `,
    dashboardCards: `
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="dashboard-skeleton">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-full" />
          </Card>
        ))}
      </div>
    `
  },
  spinner: {
    fullPage: `
      <div className="flex items-center justify-center min-h-screen" data-testid="loading-spinner-fullpage">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    `,
    inline: `
      <div className="flex items-center justify-center py-8" data-testid="loading-spinner-inline">
        <Loader className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
    `
  }
};
```

---

## 🎬 Motion & Animations

### Animation Principles

1. **Subtle and Professional** - No flashy or distracting animations
2. **Purposeful** - Every animation should communicate state or guide attention
3. **Fast** - Durations between 150-300ms for most interactions
4. **Accessible** - Respect `prefers-reduced-motion`

### Transition Utilities

Add to `/app/frontend/src/index.css`:

```css
@layer utilities {
  /* Transition utilities - NEVER use 'transition: all' */
  .transition-colors-smooth {
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
  
  .transition-transform-smooth {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
  
  .transition-opacity-smooth {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
  
  .transition-shadow-smooth {
    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Common Animation Patterns

```javascript
const animations = {
  buttonHover: {
    className: "transition-colors-smooth hover:shadow-md transition-shadow-smooth",
    description: "Subtle color change and shadow lift on hover"
  },
  cardHover: {
    className: "transition-shadow-smooth hover:shadow-lg",
    description: "Elevation increase on hover for interactive cards"
  },
  fadeIn: {
    className: "animate-in fade-in duration-300",
    description: "Fade in for modals, toasts, and new content"
  },
  slideUp: {
    className: "animate-in slide-in-from-bottom-4 duration-300",
    description: "Slide up for bottom sheets and mobile menus"
  },
  scaleIn: {
    className: "animate-in zoom-in-95 duration-200",
    description: "Scale in for dropdowns and popovers"
  },
  listItemStagger: {
    description: "Stagger animation for list items (use Framer Motion)",
    implementation: `
      import { motion } from 'framer-motion';
      
      const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      };
      
      const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      };
      
      <motion.div variants={container} initial="hidden" animate="show">
        {items.map((item) => (
          <motion.div key={item.id} variants={item}>
            {/* Item content */}
          </motion.div>
        ))}
      </motion.div>
    `
  }
};
```

### Micro-interactions

```javascript
const microInteractions = {
  buttonPress: {
    className: "active:scale-95 transition-transform-smooth",
    description: "Slight scale down on button press"
  },
  checkboxCheck: {
    description: "Smooth checkmark animation",
    implementation: "Use shadcn checkbox component (already animated)"
  },
  toggleSwitch: {
    description: "Smooth slide animation",
    implementation: "Use shadcn switch component (already animated)"
  },
  inputFocus: {
    className: "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors-smooth",
    description: "Ring and border color change on focus"
  },
  toastSlide: {
    description: "Slide in from top-right",
    implementation: "Use sonner toast library (already configured)"
  }
};
```

---

## 🖼️ Image Assets & Icons

### Icon Library

**Primary:** lucide-react (already installed)

```javascript
// Common icons for banking app
import {
  // Navigation
  Home, CreditCard, Activity, MessageCircle, User, Settings,
  
  // Financial
  Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft,
  DollarSign, Euro, PiggyBank, Receipt,
  
  // Actions
  Send, Download, Upload, Plus, Minus, X, Check, ChevronRight,
  ChevronLeft, ChevronDown, ChevronUp, MoreVertical, MoreHorizontal,
  
  // Status
  CheckCircle, XCircle, AlertCircle, Clock, Loader, Info,
  
  // Documents
  FileText, File, Image, Paperclip, Eye, EyeOff,
  
  // Security
  Lock, Unlock, Shield, Key, Smartphone, Fingerprint,
  
  // Communication
  Mail, Bell, MessageSquare, Phone, Video,
  
  // UI
  Search, Filter, Calendar, Menu, Grid, List, Copy, Edit, Trash,
  ExternalLink, RefreshCw, LogOut, HelpCircle
} from 'lucide-react';
```

### Image URLs & Usage

```json
{
  "images": {
    "hero_marketing": {
      "url": "https://images.pexels.com/photos/7979605/pexels-photo-7979605.jpeg",
      "description": "Professional business people for trust signals",
      "usage": "Marketing pages, about section, trust badges area",
      "alt": "Professional banking team"
    },
    "onboarding_welcome": {
      "url": "https://images.pexels.com/photos/7821729/pexels-photo-7821729.jpeg",
      "description": "Friendly person with card for onboarding",
      "usage": "Welcome screen, onboarding hero",
      "alt": "Welcome to digital banking"
    },
    "workspace_minimal": {
      "url": "https://images.pexels.com/photos/6203311/pexels-photo-6203311.jpeg",
      "description": "Clean minimal workspace",
      "usage": "Empty states, background patterns, feature sections",
      "alt": "Modern workspace"
    },
    "professional_desk": {
      "url": "https://images.pexels.com/photos/4465147/pexels-photo-4465147.jpeg",
      "description": "Professional desk setup",
      "usage": "Admin portal backgrounds, professional contexts",
      "alt": "Professional banking environment"
    }
  },
  
  "placeholders": {
    "avatar": "Use shadcn Avatar component with initials fallback",
    "cardImage": "Use solid color backgrounds with account type icons",
    "documentPreview": "Use FileText icon with document type badge"
  }
}
```

### Logo & Branding

```javascript
// Logo component structure
const LogoComponent = {
  structure: `
    <div className="flex items-center gap-2" data-testid="app-logo">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">A</span>
      </div>
      <span className="text-xl font-semibold font-display text-gray-900">Atlas</span>
    </div>
  `,
  variants: {
    full: "Icon + Text",
    iconOnly: "Icon only (for mobile, collapsed sidebar)",
    textOnly: "Text only (for specific contexts)"
  },
  note: "Brand name 'Atlas' should be easily replaceable from a single config file"
};
```

---

## ♿ Accessibility Guidelines

### WCAG 2.1 AA Compliance

1. **Color Contrast**
   - Text: Minimum 4.5:1 for normal text, 3:1 for large text
   - Interactive elements: Minimum 3:1 against background
   - All color combinations in this system meet these requirements

2. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Visible focus indicators on all focusable elements
   - Logical tab order following visual flow

3. **Screen Reader Support**
   - Semantic HTML elements (nav, main, article, aside, etc.)
   - ARIA labels for icon-only buttons
   - ARIA live regions for dynamic content (toasts, notifications)
   - Descriptive alt text for all images

4. **Form Accessibility**
   - Labels associated with inputs (use shadcn Label component)
   - Error messages linked to inputs via aria-describedby
   - Required fields indicated visually and programmatically
   - Clear error messages with recovery instructions

### Implementation Checklist

```javascript
const accessibilityPatterns = {
  focusIndicators: {
    className: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    description: "Visible focus ring for keyboard navigation"
  },
  skipLinks: {
    structure: `
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
        data-testid="skip-to-main"
      >
        Skip to main content
      </a>
    `,
    description: "Skip navigation for keyboard users"
  },
  ariaLabels: {
    iconButton: `<Button aria-label="Close dialog" data-testid="close-button"><X /></Button>`,
    statusBadge: `<Badge aria-label="Transaction status: Completed">Completed</Badge>`,
    loadingState: `<div role="status" aria-live="polite" aria-label="Loading transactions">...</div>`
  },
  semanticHTML: {
    navigation: "<nav aria-label='Main navigation'>",
    main: "<main id='main-content'>",
    complementary: "<aside aria-label='Account summary'>",
    search: "<search role='search'>"
  }
};
```

---

## 📱 Responsive Design Patterns

### Mobile-First Approach

All components should be designed mobile-first, then enhanced for larger screens.

```javascript
const responsivePatterns = {
  navigation: {
    mobile: "Bottom tab bar (fixed position)",
    tablet: "Top horizontal nav",
    desktop: "Top nav with expanded menu items"
  },
  dataTable: {
    mobile: "Card-based list view",
    tablet: "Simplified table (fewer columns)",
    desktop: "Full table with all columns"
  },
  forms: {
    mobile: "Single column, full-width inputs",
    tablet: "Two columns for related fields",
    desktop: "Two-three columns with optimal line length"
  },
  dashboard: {
    mobile: "Single column, stacked widgets",
    tablet: "Two columns",
    desktop: "Three columns with sidebar"
  },
  modals: {
    mobile: "Full-screen drawer (use Sheet component)",
    tablet: "Large centered modal",
    desktop: "Centered modal with max-width"
  }
};
```

### Touch Targets

```javascript
const touchTargets = {
  minimum: "44x44px (WCAG 2.1 AAA)",
  recommended: "48x48px",
  implementation: "All buttons, links, and interactive elements should meet minimum size",
  spacing: "Minimum 8px spacing between adjacent touch targets"
};
```

---

## 🔐 Security & Trust Indicators

### Visual Trust Signals

```javascript
const trustIndicators = {
  securityBadges: {
    structure: `
      <div className="flex items-center gap-4 text-xs text-gray-500" data-testid="security-badges">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4" />
          <span>256-bit encryption</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-4 h-4" />
          <span>GDPR compliant</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4" />
          <span>PCI DSS certified</span>
        </div>
      </div>
    `,
    placement: "Footer, KYC pages, payment pages"
  },
  
  secureConnection: {
    structure: `
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg" data-testid="secure-connection-indicator">
        <Lock className="w-4 h-4" />
        <span>Secure connection</span>
      </div>
    `,
    placement: "Login page, sensitive forms"
  },
  
  mfaIndicator: {
    structure: `
      <div className="flex items-center gap-2 text-sm" data-testid="mfa-status">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-gray-600">2FA enabled</span>
      </div>
    `,
    placement: "Profile page, security settings"
  },
  
  lastLogin: {
    structure: `
      <p className="text-xs text-gray-500" data-testid="last-login-info">
        Last login: {date} from {location}
      </p>
    `,
    placement: "Dashboard header, profile page"
  }
};
```

---

## 🎨 Additional Libraries & Integrations

### Required Installations

```bash
# Already installed
npm install lucide-react
npm install sonner
npm install framer-motion

# Additional recommended libraries
npm install recharts  # For charts and data visualization
npm install date-fns  # For date formatting
npm install react-hook-form  # For form management
npm install zod  # For form validation
npm install @tanstack/react-table  # For advanced tables
```

### Chart Patterns (Recharts)

```javascript
// Spending chart example
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
      <XAxis 
        dataKey="date" 
        stroke="#6B7280"
        style={{ fontSize: '12px' }}
      />
      <YAxis 
        stroke="#6B7280"
        style={{ fontSize: '12px' }}
      />
      <Tooltip 
        contentStyle={{
          backgroundColor: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      />
      <Line 
        type="monotone" 
        dataKey="amount" 
        stroke="hsl(var(--brand-primary))" 
        strokeWidth={2}
        dot={{ fill: 'hsl(var(--brand-primary))', r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
```

### Date Formatting

```javascript
import { format, formatDistance, formatRelative } from 'date-fns';

const dateFormats = {
  transaction: "dd MMM yyyy, HH:mm",
  shortDate: "dd MMM yyyy",
  longDate: "EEEE, MMMM d, yyyy",
  relative: (date) => formatDistance(date, new Date(), { addSuffix: true }),
  relativeCalendar: (date) => formatRelative(date, new Date())
};

// Usage
<span data-testid="transaction-date">
  {format(new Date(transaction.date), dateFormats.transaction)}
</span>
```

---

## 🧪 Testing Attributes

### data-testid Convention

**CRITICAL:** All interactive and key informational elements MUST include `data-testid` attributes.

```javascript
const testIdConventions = {
  format: "kebab-case describing element role, not appearance",
  examples: {
    buttons: "login-submit-button, transaction-send-button, kyc-upload-button",
    forms: "login-form, kyc-personal-details-form, transfer-form",
    inputs: "email-input, password-input, amount-input, iban-input",
    navigation: "nav-home, nav-accounts, nav-activity, admin-nav-users",
    cards: "account-card, transaction-card, dashboard-widget",
    lists: "transaction-list, account-list, user-list",
    modals: "confirm-dialog, transaction-details-modal, kyc-upload-modal",
    status: "kyc-status-badge, transaction-status-badge, account-status",
    amounts: "balance-amount, transaction-amount, available-balance"
  },
  structure: {
    containers: "{feature}-{component}-{type}",
    actions: "{action}-{target}-button",
    displays: "{data}-{context}-display",
    inputs: "{field}-input"
  }
};
```

### Example Implementation

```javascript
// Transaction list item with proper test IDs
<div 
  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
  data-testid="transaction-list-item"
  onClick={() => handleTransactionClick(transaction.id)}
>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      <CreditCard className="w-5 h-5 text-gray-600" />
    </div>
    <div>
      <p className="font-medium text-gray-900" data-testid="transaction-merchant-name">
        {transaction.merchant}
      </p>
      <p className="text-xs text-gray-500" data-testid="transaction-date">
        {format(new Date(transaction.date), 'dd MMM yyyy, HH:mm')}
      </p>
    </div>
  </div>
  <div className="text-right">
    <p 
      className={`font-mono font-semibold ${
        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
      }`}
      data-testid="transaction-amount"
    >
      {transaction.type === 'credit' ? '+' : '-'}€{transaction.amount}
    </p>
    <Badge 
      variant={transaction.status === 'completed' ? 'default' : 'outline'}
      data-testid="transaction-status-badge"
    >
      {transaction.status}
    </Badge>
  </div>
</div>
```

---

## 📋 Implementation Checklist for Main Agent

### Phase 1: Foundation Setup

- [ ] Update `/app/frontend/src/index.css` with custom CSS properties and color tokens
- [ ] Add Google Fonts link to `/app/frontend/public/index.html`
- [ ] Install additional libraries: `recharts`, `date-fns`, `react-hook-form`, `zod`
- [ ] Create theme provider component for light/dark mode switching
- [ ] Set up global font classes and typography utilities

### Phase 2: Core Components

- [ ] Review and customize shadcn button variants for banking context
- [ ] Create status badge components with all variants (KYC, transaction, account)
- [ ] Build account balance display components (large and compact)
- [ ] Create transaction list/table components (desktop and mobile)
- [ ] Build empty state components for all major features
- [ ] Create loading skeleton components

### Phase 3: Layout Components

- [ ] Build customer app bottom tab navigation (mobile)
- [ ] Build customer app top navigation (desktop)
- [ ] Build admin sidebar navigation with collapsible sections
- [ ] Create responsive container and grid layouts
- [ ] Build page header component with breadcrumbs

### Phase 4: Feature-Specific Components

- [ ] Build multi-step form component with progress indicator
- [ ] Create KYC document upload component with drag-and-drop
- [ ] Build transaction filter panel with search and advanced filters
- [ ] Create data table with sorting, filtering, and pagination
- [ ] Build confirmation dialog component for destructive actions
- [ ] Create notification/toast system using sonner

### Phase 5: Security & Trust

- [ ] Add security badges to footer and sensitive pages
- [ ] Create MFA enrollment flow with QR code display
- [ ] Build device management list component
- [ ] Add "last login" and security indicators to profile

### Phase 6: Admin Portal Specific

- [ ] Build user management table with search and filters
- [ ] Create KYC review interface with document viewer
- [ ] Build ledger tools forms with confirmation flows
- [ ] Create audit log viewer with filtering
- [ ] Build support ticket management interface

### Phase 7: Polish & Accessibility

- [ ] Add focus indicators to all interactive elements
- [ ] Implement skip links for keyboard navigation
- [ ] Add ARIA labels to icon-only buttons
- [ ] Test keyboard navigation flow
- [ ] Add data-testid attributes to all key elements
- [ ] Test responsive behavior on all breakpoints
- [ ] Implement dark mode toggle and test all components

### Phase 8: Testing & Validation

- [ ] Verify color contrast ratios meet WCAG AA
- [ ] Test with screen reader
- [ ] Validate form error states and messages
- [ ] Test loading and empty states
- [ ] Verify all animations respect prefers-reduced-motion
- [ ] Test PWA installation and offline behavior

---

## 🎨 Design Personality & Tone

### Visual Attributes

- **Sophisticated:** Clean lines, ample white space, professional typography
- **Trustworthy:** Consistent patterns, clear hierarchy, security indicators
- **Modern:** Contemporary color palette, subtle animations, current design trends
- **European:** Minimal aesthetic, high attention to detail, GDPR-first approach
- **Accessible:** High contrast, clear labels, keyboard-friendly, screen reader support

### Brand Voice (for microcopy)

- **Clear:** No jargon, plain language explanations
- **Confident:** Assertive but not aggressive
- **Helpful:** Proactive guidance, clear error messages
- **Professional:** Formal but not stuffy
- **Transparent:** Honest about processes, timelines, and requirements

### Example Microcopy

```javascript
const microcopy = {
  errors: {
    generic: "Something went wrong. Please try again or contact support if the problem persists.",
    validation: "Please check the highlighted fields and try again.",
    network: "Connection lost. Please check your internet connection and try again.",
    unauthorized: "Your session has expired. Please log in again to continue."
  },
  success: {
    transaction: "Transaction completed successfully. Your balance has been updated.",
    kyc: "Documents submitted successfully. We'll review them within 24 hours.",
    profile: "Profile updated successfully."
  },
  confirmations: {
    delete: "Are you sure you want to delete this? This action cannot be undone.",
    transfer: "Please review the details carefully before confirming this transfer.",
    disable: "Disabling this account will prevent all transactions. Continue?"
  },
  help: {
    iban: "Your IBAN is a unique identifier for your account, used for international transfers.",
    mfa: "Two-factor authentication adds an extra layer of security to your account.",
    kyc: "We need to verify your identity to comply with EU banking regulations."
  }
};
```

---

## 🚀 Performance Considerations

### Optimization Guidelines

1. **Lazy Loading**
   - Use React.lazy() for route-based code splitting
   - Lazy load heavy components (charts, document viewers)
   - Implement intersection observer for below-the-fold content

2. **Image Optimization**
   - Use appropriate image formats (WebP with fallbacks)
   - Implement responsive images with srcset
   - Lazy load images outside viewport
   - Use placeholder blur effect during load

3. **Data Fetching**
   - Implement pagination for large lists (50-100 items per page)
   - Use infinite scroll for mobile transaction lists
   - Cache frequently accessed data
   - Implement optimistic UI updates for better perceived performance

4. **Bundle Size**
   - Tree-shake unused components
   - Use dynamic imports for large libraries
   - Monitor bundle size with webpack-bundle-analyzer

---

## 📱 PWA Configuration

### Manifest Settings

```json
{
  "name": "Atlas Digital Banking",
  "short_name": "Atlas",
  "description": "Modern EU digital banking platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F9FAFB",
  "theme_color": "#0B5D8F",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## 🎯 Key Differentiators from Competitors

### What Makes Atlas Unique

1. **Color Palette:** Blue-green trust palette (not purple/pink like Revolut, not pure teal like N26, not coral like Monzo)
2. **Typography:** Space Grotesk + Inter + IBM Plex Mono (distinctive three-font system)
3. **Layout:** Cleaner, more spacious than Revolut; more structured than Monzo
4. **Animations:** More subtle than Revolut, more present than N26
5. **Data Display:** Monospace fonts for financial data (unique identifier)
6. **Admin Portal:** Full-featured backoffice (not just customer-facing)

---

## 📚 Component Usage Examples

### Dashboard Page Structure

```javascript
// Customer Dashboard
const CustomerDashboard = () => (
  <div className="min-h-screen bg-gray-50" data-testid="customer-dashboard">
    {/* Header */}
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <Button variant="ghost" size="icon" data-testid="notifications-button">
          <Bell className="w-5 h-5" />
        </Button>
      </div>
    </header>
    
    {/* Balance Hero */}
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm opacity-90 mb-2">Total Balance</p>
        <h2 className="text-5xl font-bold font-mono mb-4" data-testid="total-balance">
          €24,567.89
        </h2>
        <div className="flex gap-4">
          <Button variant="secondary" data-testid="send-money-button">
            <Send className="w-4 h-4 mr-2" />
            Send Money
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-white/10" data-testid="request-money-button">
            <Download className="w-4 h-4 mr-2" />
            Request
          </Button>
        </div>
      </div>
    </section>
    
    {/* Quick Actions */}
    <section className="px-6 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account cards */}
      </div>
    </section>
    
    {/* Recent Transactions */}
    <section className="px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
          <Button variant="ghost" data-testid="view-all-transactions">
            View all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <Card>
          {/* Transaction list */}
        </Card>
      </div>
    </section>
  </div>
);
```

---

## 🎨 Final Notes for Implementation

### Critical Reminders

1. **NO DARK GRADIENTS:** Never use purple/pink, blue/purple, or any dark saturated gradient combinations
2. **NO UNIVERSAL TRANSITIONS:** Never use `transition: all` - always specify properties
3. **NO CENTER ALIGNMENT:** Don't center-align the app container - disrupts reading flow
4. **NO EMOJI ICONS:** Use lucide-react icons only, never emoji characters
5. **ALWAYS ADD data-testid:** Every interactive element needs a test ID
6. **MOBILE-FIRST:** Design for mobile first, then enhance for desktop
7. **ACCESSIBILITY:** Focus indicators, ARIA labels, semantic HTML, keyboard navigation
8. **CONSISTENCY:** Use shadcn components as base, maintain consistent patterns

### Brand Configuration

Create a single config file for easy brand customization:

```javascript
// /app/frontend/src/config/brand.js
export const brandConfig = {
  name: "Atlas",
  tagline: "Modern European Banking",
  supportEmail: "support@atlas-bank.eu",
  supportPhone: "+49 30 1234 5678",
  colors: {
    primary: "hsl(200 85% 31%)",
    secondary: "hsl(162 85% 27%)",
    accent: "hsl(200 50% 57%)"
  },
  fonts: {
    display: "Space Grotesk",
    body: "Inter",
    mono: "IBM Plex Mono"
  }
};
```

---

## ✅ Design System Complete

This design system provides comprehensive guidelines for building a production-grade EU digital banking platform. All components, patterns, colors, typography, and interactions are specified with implementation details.

**Key deliverables:**
- Complete color system with light/dark modes
- Typography scale with three-font system
- Component library patterns using shadcn/ui
- Layout structures for customer and admin apps
- Responsive design patterns
- Accessibility guidelines
- Animation and motion principles
- Testing conventions with data-testid
- Image assets and icon library
- Security and trust indicators

**Next steps for main agent:**
1. Follow the implementation checklist phase by phase
2. Use the component patterns as templates
3. Maintain consistency with the color and typography systems
4. Add data-testid attributes to all interactive elements
5. Test responsive behavior and accessibility
6. Implement dark mode support
7. Build PWA features for installability

---

# GENERAL UI/UX DESIGN GUIDELINES (APPEND TO ALL DESIGNS)

## Universal Design Principles

### Transition Rules
- **NEVER** apply universal transitions like `transition: all`
- **ALWAYS** specify transition properties: `transition-property: color, background-color, border-color`
- Exclude transforms from transitions to prevent breaking animations
- Use specific transition utilities: `transition-colors`, `transition-transform`, `transition-opacity`, `transition-shadow`

### Layout Rules
- **NEVER** center-align the app container (`.App { text-align: center; }`)
- Center alignment disrupts natural reading flow
- Use left-aligned text for body content
- Center alignment only for specific components (modals, empty states, hero sections)

### Icon Usage
- **NEVER** use emoji characters for icons (🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇)
- **ALWAYS** use FontAwesome CDN or lucide-react library (already installed)
- Maintain consistent icon sizing and styling throughout the app

### Gradient Restrictions
**CRITICAL GRADIENT RULES:**
- **NEVER** use dark/saturated gradient combinations (purple/pink, blue-500/purple-600, purple-500/pink-500, green-500/blue-500, red/pink)
- **NEVER** use dark gradients for logos, testimonials, footers
- **NEVER** let gradients cover more than 20% of viewport
- **NEVER** apply gradients to text-heavy content or reading areas
- **NEVER** use gradients on small UI elements (<100px width)
- **NEVER** stack multiple gradient layers in same viewport

**ENFORCEMENT RULE:**
- IF gradient area exceeds 20% of viewport OR affects readability
- THEN use solid colors instead

**ALLOWED GRADIENT USAGE:**
- Section backgrounds (not content backgrounds)
- Hero section header content (dark to light to dark color progression)
- Decorative overlays and accent elements only
- Hero sections with 2-3 mild colors
- Any angle: horizontal, vertical, or diagonal

### Color Guidelines for AI/Voice Applications
- **DO NOT** use purple color for AI chat or voice applications
- **USE** colors like light green, ocean blue, peach orange, or other warm/cool tones
- Avoid cliché AI color associations

### Interaction & Animation
- Every interaction needs micro-animations: hover states, transitions, parallax effects, entrance animations
- Static designs feel lifeless - add motion purposefully
- Use 2-3x more spacing than feels comfortable initially
- Cramped designs appear unprofessional

### Visual Depth & Texture
- Add subtle grain textures and noise overlays where appropriate
- Consider custom cursors for enhanced interactivity
- Style selection states distinctly
- Design thoughtful loading animations
- These details separate good designs from extraordinary ones

### Design Token Instantiation
- Before generating UI, infer visual style from problem statement (palette, contrast, mood, motion)
- Immediately set global design tokens (primary, secondary/accent, background, foreground, ring, state colors)
- Don't rely on library defaults
- Don't default to dark backgrounds - understand the problem first and define colors accordingly
- Examples:
  - Playful/energetic → colorful scheme
  - Monochrome/minimal → black-white/neutral scheme

### Component Reuse
- Prioritize pre-existing components from `src/components/ui`
- Create new components matching existing style and conventions
- Examine existing components to understand project patterns before creating new ones

### Component Library Priority
- **DO NOT** use HTML-based components (dropdown, calendar, toast, etc.)
- **MUST** always use `/app/frontend/src/components/ui/` as primary component source
- These are modern, stylish, and accessible components

### Best Practices
- Use Shadcn/UI as primary component library for consistency and accessibility
- Import path: `./components/[component-name]`

### Export Conventions
- Components **MUST** use named exports: `export const ComponentName = ...`
- Pages **MUST** use default exports: `export default function PageName() {...}`

### Toast Notifications
- Use `sonner` for all toast notifications
- Sonner component located at `/app/src/components/ui/sonner.tsx`

### Visual Richness
- Use 2-4 color gradients where appropriate (following gradient restrictions)
- Add subtle textures/noise overlays
- Use CSS-based noise to avoid flat visuals
- Balance visual interest with readability

### Testing Requirements
- All interactive and key informational elements **MUST** include `data-testid` attribute
- Use kebab-case convention defining element's role, not appearance
- Example: `data-testid="login-form-submit-button"`
- Creates stable interface for tests, preventing breaks from style changes

### Calendar Components
- If calendar is required, **ALWAYS** use shadcn calendar component
- Never use HTML native date inputs for complex date selection

---

**Design Philosophy:** The result should feel human-made, visually appealing, converting, and easy for AI agents to implement. Maintain good contrast, balanced font sizes, proper gradients, sufficient whitespace, and thoughtful motion and hierarchy. Avoid overuse of elements and deliver a polished, effective design system.

---

**END OF DESIGN GUIDELINES**
