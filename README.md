<div align="center">

# Toastify Pro

**Modern, lightweight toast notifications for JavaScript**

[![npm version](https://img.shields.io/npm/v/toastify-pro.svg)](https://www.npmjs.com/package/toastify-pro)
[![npm downloads](https://img.shields.io/npm/dm/toastify-pro.svg)](https://www.npmjs.com/package/toastify-pro)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/toastify-pro)](https://bundlephobia.com/package/toastify-pro)
[![License](https://img.shields.io/npm/l/toastify-pro.svg)](LICENSE)

[Demo](https://abhipotter.github.io/toastify-pro/demo) · [Documentation](https://abhipotter.github.io/toastify-pro/demo)

</div>

---

## Features

- **Lightweight** — ~2KB minified, zero dependencies
- **6 Themes** — Success, error, warning, info, dark, light
- **7 Positions** — All corners, centers, and center
- **Confirmations** — Interactive dialogs with async support
- **Input Prompts** — Text input with validation
- **Glassmorphism** — Modern blur effects
- **Accessible** — ARIA support, keyboard navigation
- **Framework Agnostic** — Works everywhere

---

## Installation

```bash
npm install toastify-pro
```

**Or use CDN:**

```html
<script src="https://cdn.jsdelivr.net/npm/toastify-pro/dist/toastify-pro.umd.min.js"></script>
```

---

## Quick Start

```javascript
import ToastifyPro from 'toastify-pro';

const toast = new ToastifyPro();

// Basic toasts
toast.success('Saved successfully!');
toast.error('Something went wrong');
toast.warning('Please check your input');
toast.info('New update available');

// With description
toast.success('File uploaded', { description: 'document.pdf is ready' });
```

---

## Confirmation Dialogs

```javascript
// Simple
toast.conf('Delete this item?', (confirmed) => {
  if (confirmed) toast.success('Deleted!');
});

// With options
toast.conf('Save changes?', {
  description: 'This cannot be undone',
  confirmText: 'Save',
  cancelText: 'Discard',
  theme: 'light'
}, (confirmed) => {
  if (confirmed) saveData();
});

// Async loading
toast.conf('Submit form?', {
  onConfirm: async ({ setLoading, close }) => {
    setLoading(true);
    await fetch('/api/submit', { method: 'POST' });
    close();
    toast.success('Submitted!');
  }
});
```

---

## Input Prompts

```javascript
// Simple
toast.input('What is your name?', (value) => {
  toast.success(`Hello, ${value}!`);
});

// With validation
toast.input('Enter email', {
  type: 'email',
  placeholder: 'you@example.com',
  validate: (val) => val.includes('@') || 'Invalid email',
  onSubmit: async (email) => {
    await subscribe(email);
    toast.success('Subscribed!');
  }
});
```

---

## Custom Colors

```javascript
// Gradient toast
toast.custom('Custom styled!', {
  primaryColor: '#8b5cf6',
  secondaryColor: '#6366f1'
});

// Gradient confirmation
toast.conf('Continue?', {
  primaryColor: '#f97316',
  secondaryColor: '#ea580c'
});
```

---

## API Reference

### Constructor

```javascript
const toast = new ToastifyPro({
  position: 'bottom-center',  // Position on screen
  timeout: 3000,              // Auto-dismiss (0 to disable)
  allowClose: true,           // Show close button
  pauseOnHover: true,         // Pause timeout on hover
  maxToasts: 0,               // Max visible (0 = unlimited)
  newestOnTop: true           // Stack order
});
```

### Positions

`top-left` · `top-center` · `top-right` · `bottom-left` · `bottom-center` · `bottom-right` · `center`

### Methods

| Method | Description |
|--------|-------------|
| `success(msg, opts?)` | Green success toast |
| `error(msg, opts?)` | Red error toast |
| `warning(msg, opts?)` | Orange warning toast |
| `info(msg, opts?)` | Blue info toast |
| `dark(msg, opts?)` | Dark theme toast |
| `light(msg, opts?)` | Light theme toast |
| `custom(msg, opts?)` | Custom colors |
| `conf(msg, opts?, cb?)` | Confirmation dialog |
| `input(msg, opts?, cb?)` | Input prompt |
| `dismissAll(type?)` | Dismiss all toasts |

### Toast Options

```javascript
{
  description: 'Secondary text',
  timeout: 5000,
  allowClose: true,
  action: {
    label: 'Undo',
    onClick: ({ close }) => { /* ... */ }
  }
}
```

### Confirmation Options

```javascript
{
  description: 'Details text',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  theme: 'dark',           // 'dark' | 'light'
  position: 'center',
  primaryColor: '#6366f1', // Custom gradient
  secondaryColor: '#8b5cf6',
  onConfirm: (helpers) => {},
  onCancel: () => {}
}
```

### Input Options

```javascript
{
  description: 'Help text',
  placeholder: 'Enter value...',
  submitText: 'Submit',
  cancelText: 'Cancel',
  type: 'text',            // 'text' | 'email' | 'password' | 'number' | 'url'
  defaultValue: '',
  required: true,
  validate: (val) => true, // Return true or error string
  theme: 'dark',
  primaryColor: '#6366f1',
  onSubmit: (value, helpers) => {},
  onCancel: () => {}
}
```

---

## Browser Support

Chrome, Firefox, Safari, Edge (all modern versions)

---

## License

MIT © [Abhishek Potter](https://github.com/abhipotter)
