# How to Create a View

Views are isolated pages used to showcase and test individual components in isolation. They provide a development environment where components can be tested independently from the main application.

## Overview

Each view consists of:

- **Entry.tsx**: The main React component file containing examples and demonstrations
- **example.html**: An HTML file that serves as the entry point for the view
- **styles.module.css** (optional): Additional styles specific to the view

## Directory Structure

```
src/views/
├── README.md           # This file
├── Button/            # Example view for Button component
│   ├── Entry.tsx      # React component with examples
│   └── example.html   # HTML entry point
└── TextField/         # Example view for TextField component
    ├── Entry.tsx      # React component with examples
    ├── example.html   # HTML entry point
    └── styles.module.css  # View-specific styles
```

## Step-by-Step Guide

### 1. Create the View Directory

Create a new directory under `src/views/` named after your component:

```bash
mkdir src/views/YourComponent
```

### 2. Create the HTML Entry Point

Create `example.html` in your view directory:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Component Name</title>
    <link rel="stylesheet" href="/src/styles/base.css" />
  </head>
  <body data-theme="default">
    <div class="container">
      <nav style="margin-bottom: 2rem">
        <a href="/index.html" class="nav-link">← Main App</a>
      </nav>

      <h1>Your Component Name</h1>
      <p>This page is for testing the YourComponent in isolation.</p>

      <div id="example"></div>
    </div>
    <script type="module" src="/src/views/YourComponent/Entry.tsx"></script>
  </body>
</html>
```

### 3. Create the Entry Component

Create `Entry.tsx` in your view directory:

```tsx
import YourComponent from "~/src/components/YourComponent/YourComponent";
import "~/src/theme/theme.module.css";
import { createRoot } from "~/src/utilities/shared/shared";

function Examples() {
  return (
    <>
      <div className="test-section">
        <h3>Basic Examples</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <YourComponent testId="example-1">Example 1</YourComponent>
        </div>
      </div>

      {/* Add more sections for different variations */}
    </>
  );
}

createRoot("example", <Examples />);
```

### 4. Add View-Specific Styles (Optional)

If needed, create `styles.module.css` for view-specific styling:

```css
.code {
  background: var(--color-base-light);
  border: 1px solid var(--color-mono-light);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  font-family: "Monaco", "Consolas", monospace;
  font-size: var(--font-size-sm);
  overflow-x: auto;
}
```

## Best Practices

### 1. **Organize Examples by Category**

Group examples into logical sections using descriptive headings:

```tsx
<div className="test-section">
  <h3>Sizes</h3>
  {/* Size variations */}
</div>

<div className="test-section">
  <h3>Variants</h3>
  {/* Different variants */}
</div>

<div className="test-section">
  <h3>States</h3>
  {/* Different states (disabled, error, etc.) */}
</div>
```

### 2. **Include Interactive Examples**

For form components, create interactive examples that demonstrate validation and state management:

```tsx
const InteractiveExample = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    // Add validation logic
  };

  return <YourComponent value={value} onChange={handleChange} error={error} />;
};
```

### 3. **Provide Test IDs**

Always include `testId` props for E2E testing:

```tsx
<YourComponent testId="component-variant-size">Content</YourComponent>
```

### 4. **Include Usage Examples**

Add a section showing how to use the component:

```tsx
<div className="test-section">
  <h3>Usage</h3>
  <pre className={styles.code}>
    {`import { YourComponent } from '@your-org/react-components/YourComponent'

<YourComponent
  variant="primary"
  size="medium"
>
  Click me
</YourComponent>`}
  </pre>
</div>
```

### 5. **Test All Props and States**

Ensure your view demonstrates:

- All size variations
- All visual variants
- All interactive states (hover, focus, active)
- Disabled states
- Error states
- Loading states (if applicable)
- Edge cases (long text, empty content, etc.)

## Common Patterns

### Grid Layout for Multiple Examples

```tsx
<div
  style={{
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  }}
>
  {/* Components */}
</div>
```

### Flex Layout for Inline Examples

```tsx
<div
  style={{
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  }}
>
  {/* Components */}
</div>
```

## Running Your View

Views are automatically served by Vite. To access your view:

1. Start the development server: `npm run dev` or `pnpm dev`
2. Navigate to: `http://localhost:5173/src/views/YourComponent/example.html`

## Tips

- Use the existing Button and TextField views as references
- Keep examples focused and easy to understand
- Include both common use cases and edge cases
- Make the view self-documenting with clear labels and sections
- Consider adding keyboard navigation and accessibility testing examples
- Use consistent spacing and layout patterns across all views
