# 🎉 Toastify Pro

<div align="center">

<img src="https://abhipotter.github.io/toastify-pro/assets/logo/logo.png" alt="Toastify Pro Logo" width="100" height="100"/>
<p>Toastify Pro</p>

**A modern, lightweight, and highly customizable toast notification library**

[![npm version](https://img.shields.io/npm/v/toastify-pro.svg)](https://www.npmjs.com/package/toastify-pro)
[![npm downloads](https://img.shields.io/npm/dm/toastify-pro.svg)](https://www.npmjs.com/package/toastify-pro)
[![License](https://img.shields.io/npm/l/toastify-pro.svg)](https://github.com/abhipotter/toastify-pro/blob/main/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/toastify-pro)](https://bundlephobia.com/package/toastify-pro)

[Demo](https://abhipotter.github.io/toastify-pro) • [Documentation](https://github.com/abhipotter/toastify-pro/wiki) • [Examples](https://github.com/abhipotter/toastify-pro/tree/main/examples)

</div>

## ✨ Features

- 🚀 **Lightweight** - Minimal bundle size with zero dependencies
- 🎨 **6 Built-in Themes** - Success, Error, Info, Warning, Dark, and Light themes
- 📱 **Flexible Positioning** - 6 different position options
- ⚡ **Smooth Animations** - CSS transitions with fade and slide effects
- 🔧 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS
- 🎯 **Auto-dismiss** - Configurable timeout with manual close option
- 🌈 **Easy Customization** - Simple API with sensible defaults
- ♿ **Accessible** - Clean HTML structure with proper styling

## 🚀 Quick Start

### 📦 Installation

#### NPM (React, Node.js, etc.)
```bash
npm install toastify-pro
```

#### CDN (Browser)
```html
<script src="https://cdn.jsdelivr.net/npm/toastify-pro@1.0.1/dist/toastify-pro.umd.min.js"></script>
```

### 🔨 Basic Usage

#### With NPM
```javascript
import ToastifyPro from 'toastify-pro';

const toast = new ToastifyPro();

// Show different types of toasts
toast.success('Operation completed successfully!');
toast.error('Something went wrong!');
toast.warning('Please check your input');
toast.info('New update available');
toast.dark('Dark themed message');
toast.light('Light themed message');
```

#### With CDN
```html
<!DOCTYPE html>
<html>
<head>
    <title>Toastify Pro Example</title>
    <script src="https://cdn.jsdelivr.net/npm/toastify-pro@1.0.1/dist/toastify-pro.umd.min.js"></script>
</head>
<body>
    <button onclick="showToast()">Show Toast</button>
    
    <script>
        const toast = new ToastifyPro();
        
        function showToast() {
            toast.success('Hello from Toastify Pro!');
        }
        
        function showError() {
            toast.error('Something went wrong!');
        }
        
        function showCustom() {
            toast.show('Custom message', 'info', {
                timeout: 5000,
                allowClose: true
            });
        }
    </script>
</body>
</html>
```

## 📚 API Reference

### Constructor Options

```javascript
const toast = new ToastifyPro({
    position: 'bottom-center',  // Position of toast container
    timeout: 3000,              // Auto-dismiss time in milliseconds
    allowClose: true,           // Show close button
    maxLength: 100              // Maximum message length
});
```

#### Position Options
- `top-left` - Top left corner
- `top-right` - Top right corner  
- `top-center` - Top center
- `bottom-left` - Bottom left corner
- `bottom-right` - Bottom right corner
- `bottom-center` - Bottom center (default)

### Methods

#### `toast.show(message, type, options)`
Main method to display a toast notification.
```javascript
toast.show('Custom message', 'success', {
    timeout: 5000,      // Override default timeout
    allowClose: false,  // Hide close button for this toast
    maxLength: 50       // Override message length limit
});
```

#### `toast.success(message, options)`
Display a success toast with green background.
```javascript
toast.success('Data saved successfully!');
toast.success('Upload complete!', { timeout: 2000 });
```

#### `toast.error(message, options)`
Display an error toast with red background.
```javascript
toast.error('Failed to save data!');
toast.error('Network error occurred!', { allowClose: false });
```

#### `toast.warning(message, options)`
Display a warning toast with orange background.
```javascript
toast.warning('Please verify your input');
toast.warning('Session expires in 5 minutes', { timeout: 10000 });
```

#### `toast.info(message, options)`
Display an info toast with blue background.
```javascript
toast.info('New feature available!');
toast.info('Check your email for verification', { timeout: 0 }); // No auto-dismiss
```

#### `toast.dark(message, options)`
Display a dark themed toast.
```javascript
toast.dark('Dark mode enabled');
toast.dark('Processing in background...', { allowClose: false });
```

#### `toast.light(message, options)`
Display a light themed toast with dark text.
```javascript
toast.light('Light theme activated');
toast.light('Settings updated', { timeout: 2000 });
```

## 🎨 Customization

### Global Configuration
```javascript
const toast = new ToastifyPro({
    position: 'top-right',
    timeout: 4000,
    allowClose: true,
    maxLength: 150
});
```

### Per-Toast Options
```javascript
// Persistent toast (no auto-dismiss)
toast.error('Critical error!', { timeout: 0 });

// Quick notification
toast.success('Saved!', { timeout: 1000 });

// Long message with close button
toast.info('This is a very long message that might be truncated', {
    maxLength: 200,
    allowClose: true,
    timeout: 8000
});
```

### Custom Styling
You can override the default styles by adding your own CSS:

```css
/* Custom positioning */
.toastify-pro-container.bottom-center {
    bottom: 50px; /* Adjust distance from bottom */
}

/* Custom toast appearance */
.toastify-pro {
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Custom success color */
.toastify-pro.success {
    background: rgba(34, 197, 94, 0.95);
}

/* Custom close button */
.toastify-pro .close-btn {
    font-weight: bold;
    font-size: 18px;
}
```

## 🌟 Framework Examples

### React Integration
```jsx
import React, { useEffect } from 'react';
import ToastifyPro from 'toastify-pro';

function App() {
    const [toast, setToast] = React.useState(null);
    
    useEffect(() => {
        setToast(new ToastifyPro({
            position: 'top-right',
            timeout: 3000
        }));
    }, []);

    const handleSuccess = () => {
        toast?.success('React integration works perfectly!');
    };

    const handleError = () => {
        toast?.error('Something went wrong in React!');
    };

    return (
        <div>
            <button onClick={handleSuccess}>Show Success</button>
            <button onClick={handleError}>Show Error</button>
        </div>
    );
}

export default App;
```

### Vue.js Integration
```vue
<template>
    <div>
        <button @click="showSuccess">Show Success</button>
        <button @click="showError">Show Error</button>
        <button @click="showCustom">Show Custom</button>
    </div>
</template>

<script>
import ToastifyPro from 'toastify-pro';

export default {
    name: 'ToastExample',
    data() {
        return {
            toast: null
        };
    },
    mounted() {
        this.toast = new ToastifyPro({
            position: 'bottom-right',
            timeout: 4000
        });
    },
    methods: {
        showSuccess() {
            this.toast.success('Vue.js integration successful!');
        },
        showError() {
            this.toast.error('Error in Vue component!');
        },
        showCustom() {
            this.toast.show('Custom Vue message', 'warning', {
                timeout: 6000,
                allowClose: true
            });
        }
    }
};
</script>
```

### Angular Integration
```typescript
import { Component, OnInit } from '@angular/core';
import ToastifyPro from 'toastify-pro';

@Component({
    selector: 'app-toast-example',
    template: `
        <button (click)="showSuccess()">Show Success</button>
        <button (click)="showError()">Show Error</button>
        <button (click)="showInfo()">Show Info</button>
    `
})
export class ToastExampleComponent implements OnInit {
    private toast: ToastifyPro;

    ngOnInit() {
        this.toast = new ToastifyPro({
            position: 'top-center',
            timeout: 3500,
            allowClose: true
        });
    }

    showSuccess() {
        this.toast.success('Angular integration works!');
    }

    showError() {
        this.toast.error('Error in Angular component!');
    }

    showInfo() {
        this.toast.info('Information from Angular', {
            timeout: 5000
        });
    }
}
```

### Vanilla JavaScript Examples
```javascript
// Initialize toast
const toast = new ToastifyPro({
    position: 'top-left',
    timeout: 3000,
    allowClose: true
});

// Form submission example
document.getElementById('submitForm').addEventListener('click', async function() {
    try {
        // Simulate API call
        const response = await fetch('/api/submit', { method: 'POST' });
        
        if (response.ok) {
            toast.success('Form submitted successfully!');
        } else {
            toast.error('Failed to submit form');
        }
    } catch (error) {
        toast.error('Network error occurred');
    }
});

// Multiple toast types
function showAllTypes() {
    toast.success('Success message');
    setTimeout(() => toast.error('Error message'), 500);
    setTimeout(() => toast.warning('Warning message'), 1000);
    setTimeout(() => toast.info('Info message'), 1500);
    setTimeout(() => toast.dark('Dark message'), 2000);
    setTimeout(() => toast.light('Light message'), 2500);
}
```

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | ≥ 60    |
| Firefox | ≥ 55    |
| Safari  | ≥ 12    |
| Edge    | ≥ 79    |

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | string | `'bottom-center'` | Toast container position |
| `timeout` | number | `3000` | Auto-dismiss time (0 = no auto-dismiss) |
| `allowClose` | boolean | `true` | Show close button |
| `maxLength` | number | `100` | Maximum message length |

## 🎨 Available Themes

| Theme | Background | Text Color | Use Case |
|-------|------------|------------|----------|
| `success` | Green | White | Success messages |
| `error` | Red | White | Error messages |
| `warning` | Orange | White | Warning messages |
| `info` | Blue | White | Information messages |
| `dark` | Dark Gray | White | General purpose |
| `light` | Light Gray | Black | Light theme compatibility |

## 📄 License

MIT © [Abhishek Potter](https://github.com/abhipotter)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/abhipotter/toastify-pro/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/abhipotter/toastify-pro/discussions)
- 📧 **Email**: [abhishekpotter77@gmail.com](mailto:abhishekpotter77@gmail.com)

## 🙏 Acknowledgments

- Inspired by modern toast libraries
- Built with ❤️ by the open-source community
- Special thanks to all contributors

---

<div align="center">

**Made with ❤️ by [Abhishek Potter](https://github.com/abhipotter)**

If you found this project helpful, please consider giving it a ⭐️!

</div>
