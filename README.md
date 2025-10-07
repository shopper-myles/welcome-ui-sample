# Unknown UI - React Component Library

A modern, tree-shakable React component library built with TypeScript, CSS Modules, and design tokens. This library provides a set of customizable, accessible UI components that can be imported individually to minimize bundle size.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Development Workflow](#development-workflow)
- [Available Scripts](#available-scripts)
- [Component Architecture](#component-architecture)
- [Building and Publishing](#building-and-publishing)
- [Testing Strategy](#testing-strategy)

## 🎯 Overview

Unknown UI is a React component library designed with the following principles:

- **Tree-shakable**: Import only the components you need
- **Type-safe**: Full TypeScript support with exported types
- **Themeable**: CSS variables-based theming system
- **Accessible**: ARIA-compliant components
- **Tested**: Unit tests with Vitest and E2E tests with Playwright
- **Developer-friendly**: Hot reload, component showcase, and comprehensive documentation

## 📁 Project Structure

```
unknown-ui/
├── src/
│   ├── components/          # Component source files
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.types.ts
│   │   │   └── tests/
│   │   └── TextField/
│   │       └── ... (similar structure)
│   ├── lib/                 # Library entry points
│   ├── views/               # Component showcase/demo pages (see [documentation](./src/views/README.md))
│   ├── theme/               # Design tokens and theme
│   ├── types/               # Shared TypeScript types
│   ├── utilities/           # Shared utilities
│   └── styles/              # Global styles
├── dist/                    # Build output
├── testSetup/               # Test configuration
└── public/                  # Static assets
```

### Key Directories

- **`src/components/`**: Individual component implementations with their styles, types, and tests
- **`src/lib/`**: Export files for tree-shaking support
- **`src/views/`**: Component showcase pages for development and documentation
- **`src/theme/`**: CSS custom properties for theming
- **`src/types/`**: Shared TypeScript definitions

## 🛠️ Tech Stack

### Core Dependencies

- **React**: UI library
- **TypeScript**: Type safety and better DX
- **CSS Modules**: Scoped styling with `.module.css` files

### Build Tools

- **Vite**: Lightning-fast build tool and dev server
  - Development server with HMR
  - Optimized production builds
  - Multi-page app support for component showcases
- **@vitejs/plugin-react**: React Fast Refresh support
- **vite-plugin-dts**: TypeScript declaration generation
- **vite-bundle-analyzer**: Bundle size analysis

### Testing

- **Vitest**: Unit testing framework (Jest-compatible)
- **@testing-library/react**: React component testing utilities
- **@playwright/test**: E2E testing framework
- **jsdom**: DOM implementation for tests

### Code Quality

- **ESLint**: Linting with flat config
- **typescript-eslint**: TypeScript-specific ESLint rules
- **eslint-plugin-react-hooks**: React hooks linting
- **eslint-plugin-react-refresh**: Fast refresh compatibility

### Package Management

- **pnpm**: Fast, disk space efficient package manager

## 🔄 Development Workflow

### 1. **Development Server**

```bash
pnpm dev
```

Starts Vite dev server with hot module replacement at `http://localhost:5173`

### 2. **Component Showcase**

```bash
pnpm dev:showcase
```

Opens the component showcase automatically in your browser. See the [views documentation](./src/views/README.md) for details on creating component showcases.

### 3. **Component Structure**

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.module.css # Scoped styles
├── ComponentName.types.ts   # TypeScript interfaces
└── tests/
    ├── ComponentName.test.tsx    # Unit tests
    └── ComponentName.e2e.spec.ts # E2E tests
```

### 4. **Adding a New Component**

1. Create component directory in `src/components/`
2. Implement component with types and styles
3. Add tests (unit and E2E)
4. Create export in `src/lib/`
5. Add showcase in `src/views/` (see [views documentation](./src/views/README.md))
6. Update package.json exports

## 📜 Available Scripts

### Development

- `pnpm dev` - Start development server
- `pnpm dev:showcase` - Start showcase with auto-open

### Building

- `pnpm build` - Build for production (multi-page app)
- `pnpm build:lib` - Build as library with individual exports
- `pnpm preview` - Preview production build

### Testing

- `pnpm test` - Run unit tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm test:bundle` - Test bundle sizes

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm size:check` - Check bundle sizes

### Versioning

- `pnpm version:patch` - Bump patch version
- `pnpm version:minor` - Bump minor version
- `pnpm version:major` - Bump major version

## 🏗️ Component Architecture

### Design Principles

1. **Composition over Configuration**: Components are built to be composed together
2. **Controlled and Uncontrolled**: Support both patterns where applicable
3. **Accessibility First**: ARIA attributes and keyboard navigation
4. **Type Safety**: Full TypeScript support with exported types

### Example Component Structure

```typescript
// Button.types.ts
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  // ... other props
}

// Button.tsx
import styles from './Button.module.css';
import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ ... }) => {
  // Implementation
};
```

### CSS Modules & Theming

Components use CSS Modules for scoped styling and CSS custom properties for theming:

```css
/* Button.module.css */
.button {
  background-color: var(--color-primary-base);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
}
```

## 📦 Building and Publishing

### Library Build Process

1. **TypeScript Compilation**: Generates type definitions
2. **Vite Build**: Creates ES modules with preserved imports
3. **CSS Processing**: Bundles CSS modules
4. **Tree-shaking**: Separate entry points for each component

### Export Configuration

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./Button": {
      "types": "./dist/Button.d.ts",
      "import": "./dist/Button.js"
    }
  }
}
```

### Usage in Projects

```typescript
// Import entire library
import { Button, TextField } from "unknown-ui";

// Import individual components (better for tree-shaking)
import { Button } from "unknown-ui/Button";
import { TextField } from "unknown-ui/TextField";
```

## 🧪 Testing Strategy

### Unit Tests (Vitest + Testing Library)

- Component rendering
- User interactions
- Accessibility
- Edge cases

### E2E Tests (Playwright)

- Cross-browser testing
- Visual regression
- Complex interactions
- Real browser environment

### Bundle Size Testing

- Automated size checks
- Tree-shaking verification
- Individual component sizes

## 🎨 Theming System

The library uses CSS custom properties defined in `theme.module.css`:

- **Colors**: HSL-based color system with light/base/dark variants
- **Spacing**: Consistent spacing scale (xs to 2xl)
- **Typography**: Font size scale
- **Borders**: Radius options
- **Shadows**: Elevation levels

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start development: `pnpm dev`
4. View components: `pnpm dev:showcase`

## 📝 License

MIT

---

Built with ❤️ using Vite, React, and TypeScript
