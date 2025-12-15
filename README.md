<div align="center">

<img src="https://abhipotter.github.io/toastify-pro/assets/logo/logo.png" alt="Toastify Pro Logo" width="100" height="100"/>
<h1> 🚀 Quick Start - Install Toastify Pro (JavaScript Toast Notifications) </h1>

**A modern, lightweight, and highly customizable toast notification library**

[![npm version](https://img.shields.io/npm/v/toastify-pro.svg)](https://www.npmjs.com/package/toastify-pro)
[![npm downloads](https://img.shields.io/npm/dm/toastify-pro.svg)](https://www.npmjs.com/package/toastify-pro)
[![License](https://img.shields.io/npm/l/toastify-pro.svg)](https://github.com/abhipotter/toastify-pro/blob/main/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/toastify-pro)](https://bundlephobia.com/package/toastify-pro)

[Demo](https://abhipotter.github.io/toastify-pro/demo) • [Documentation](https://github.com/abhipotter/toastify-pro/wiki) • [Examples](https://github.com/abhipotter/toastify-pro/tree/main/examples)

</div>

## ✨ Features

- 🚀 **Lightweight** - Minimal bundle size with zero dependencies
- 🎨 **6 Built-in Themes** - Success, Error, Info, Warning, Dark, and Light themes
- 🎯 **Interactive Confirmation Dialogs** - Perfect replacement for SweetAlert with dark/light themes only
- 📱 **7 Flexible Positions** - Including new center position ideal for confirmations
- ⚡ **Apple-Style Animations** - Smooth AirDrop-inspired entrance and car-swipe exit effects
- 🔧 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS
- 🎯 **Auto-dismiss** - Configurable timeout with manual close option
- 📝 **Description Support** - Optional secondary text for detailed messages
- 🌈 **Easy Customization** - Simple API with sensible defaults
- ♿ **Accessible** - Clean HTML structure with proper ARIA support
- 🎨 **Custom SVG Icons** - Beautiful vector icons for each toast type
- ✨ **Modern Design** - Glassmorphism effects with backdrop blur
- � **Perfect Callback Handling** - No double execution, conflict-free patterns
- ❌ **Close Button** - Interactive close buttons for confirmation dialogs

## 🚀 Quick Start

### 📦 Installation

#### NPM (React, Node.js, etc.)
```bash
npm install toastify-pro
```

#### CDN (Browser)
```html
<script src="https://cdn.jsdelivr.net/npm/toastify-pro/dist/toastify-pro.umd.min.js"></script>
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

// Show toasts with descriptions
toast.success('Success!', 'Your changes have been saved successfully.');
toast.error('Error occurred!', 'Please check your network connection and try again.');
toast.info('New feature!', 'Check out our latest updates in the dashboard.');

// 🆕 NEW: Confirmation dialogs
toast.conf('Delete this item?', (confirmed) => {
    if (confirmed) {
        toast.success('Item deleted successfully!');
    } else {
        toast.info('Delete cancelled');
    }
});

// Confirmation with description
toast.conf('Are you sure?', 'This action cannot be undone.', (confirmed) => {
    console.log('User confirmed:', confirmed);
});

// Advanced confirmation options
toast.conf('Save changes?', {
    description: 'Your changes will be permanently saved.',
    confirmText: 'Save',
    cancelText: 'Discard',
    theme: 'light', // 'dark' (default) or 'light'
    position: 'center', // Default for confirmations
    onConfirm: () => console.log('Confirmed!'),
    onCancel: () => console.log('Cancelled!')
});
```

#### With CDN
```html
<!DOCTYPE html>
<html>
<head>
    <title>Toastify Pro Example</title>
    <script src="https://cdn.jsdelivr.net/npm/toastify-pro/dist/toastify-pro.umd.min.js"></script>
</head>
<body>
    <button onclick="showToast()">Show Toast</button>
    <button onclick="showConfirmation()">Show Confirmation</button>
    
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
        
        // 🆕 NEW: Confirmation dialogs
        function showConfirmation() {
            toast.conf('Delete this item?', 'This action cannot be undone.', (confirmed) => {
                if (confirmed) {
                    toast.success('Item deleted!');
                } else {
                    toast.info('Delete cancelled');
                }
            });
        }
        
        function showAdvancedConfirmation() {
            toast.conf('Save document?', {
                description: 'All your changes will be saved permanently.',
                confirmText: 'Save Now',
                cancelText: 'Cancel',
                theme: 'light',
                position: 'center'
            }, (confirmed) => {
                console.log('User decision:', confirmed);
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
- `center` - Perfect center of screen (ideal for confirmations)

### Methods

#### `toast.show(message, type, options)`
Main method to display a toast notification.
```javascript
toast.show('Custom message', 'success', {
    timeout: 5000,      // Override default timeout
    allowClose: false,  // Hide close button for this toast
    maxLength: 50,      // Override message length limit
    description: 'Additional details about the message' // Optional description
});
```

#### Enhanced Toast Methods with Description Support
All toast methods now support description as a second parameter or in options:

#### `toast.success(message, options|description)`
Display a success toast with green background and checkmark icon.
```javascript
toast.success('Data saved successfully!');
toast.success('Upload complete!', { timeout: 2000 });
toast.success('Success!', 'Your changes have been saved.'); // With description
```

#### `toast.error(message, options|description)`
Display an error toast with red background and error icon.
```javascript
toast.error('Failed to save data!');
toast.error('Network error occurred!', { allowClose: false });
toast.error('Error!', 'Please check your connection and try again.'); // With description
```

#### `toast.warning(message, options|description)`
Display a warning toast with orange background and warning icon.
```javascript
toast.warning('Please verify your input');
toast.warning('Session expires in 5 minutes', { timeout: 10000 });
toast.warning('Warning!', 'This action cannot be undone.'); // With description
```

#### `toast.info(message, options|description)`
Display an info toast with blue background and info icon.
```javascript
toast.info('New feature available!');
toast.info('Check your email for verification', { timeout: 0 }); // No auto-dismiss
toast.info('Info', 'Here are some helpful tips for you.'); // With description
```

#### `toast.dark(message, options|description)`
Display a dark themed toast with star icon.
```javascript
toast.dark('Dark mode enabled');
toast.dark('Processing in background...', { allowClose: false });
toast.dark('Dark Mode', 'Switched to elegant dark theme.'); // With description
```

#### `toast.light(message, options|description)`
Display a light themed toast with dark text and calendar icon.
```javascript
toast.light('Light theme activated');
toast.light('Settings updated', { timeout: 2000 });
toast.light('Light Mode', 'Switched to clean light theme.'); // With description
```

#### 🆕 `toast.conf(message, descriptionOrCallback, callback)` or `toast.confirm(message, descriptionOrCallback, callback)`
Display an interactive confirmation dialog with confirm/cancel buttons. Both methods work identically - `confirm` is the newer recommended name, while `conf` is kept for backward compatibility.

**Features:**
- 🎯 **Center positioning** (default) for maximum attention
- ✖️ **Close button** in top-right corner (acts as cancel)
- 🎨 **Simple theming** - Dark (default) or Light themes only
- 📱 **Responsive** design for mobile devices
- ⚡ **No auto-dismiss** - requires user interaction

**Theme Options:**
- `theme: 'dark'` (default) - Dark theme with elegant styling
- `theme: 'light'` or `theme: 'white'` - Clean light theme with dark text

```javascript
// Simple confirmation with callback (using newer confirm method)
toast.confirm('Delete this item?', (confirmed) => {
    if (confirmed) {
        console.log('User confirmed');
    } else {
        console.log('User cancelled');
    }
});

// Confirmation with description (using legacy conf method)
toast.conf('Are you sure?', 'This action cannot be undone.', (confirmed) => {
    handleUserChoice(confirmed);
});

// Advanced confirmation with full options (using newer confirm method)
toast.confirm('Save changes?', {
    description: 'Your changes will be permanently saved to the server.',
    confirmText: 'Save Now',        // Custom confirm button text
    cancelText: 'Discard',          // Custom cancel button text
    theme: 'light',                 // Theme: 'dark' (default) or 'light'
    position: 'center',             // Position (defaults to 'center' for confirmations)
    onConfirm: () => saveData(),    // Alternative callback approach
    onCancel: () => discardChanges()
});

// Real-world example: Delete confirmation
function deleteItem(itemId) {
    toast.conf('Delete item?', 
        'This will permanently remove the item from your account.', 
        (confirmed) => {
            if (confirmed) {
                // Perform deletion
                deleteFromServer(itemId);
                toast.success('Item deleted successfully!');
            } else {
                toast.info('Delete cancelled');
            }
        }
    );
}

// Form save confirmation
function handleFormSubmit() {
    toast.conf('Save changes?', {
        description: 'Your form data will be submitted and cannot be edited later.',
        confirmText: 'Submit',
        cancelText: 'Keep Editing',
        theme: 'dark', // Default theme, can be 'light'
        position: 'center'
    }, (confirmed) => {
        if (confirmed) {
            submitForm();
        }
    });
}
```

### 🆕 Enhanced Features

#### Custom SVG Icons
Each toast type includes beautiful vector icons that scale perfectly:
- **Success**: ✓ Checkmark circle icon
- **Error**: ✗ X circle icon  
- **Warning**: ⚠ Triangle warning icon
- **Info**: ℹ Info circle icon
- **Dark**: ★ Star icon
- **Light**: ☀ Calendar icon

#### Position-Aware Car Swipe Animations
Toasts automatically exit with position-aware animations:
- `carSwipeBottom` - For bottom positioned toasts (swipes down)
- `carSwipeTop` - For top positioned toasts (swipes up)
- `carSwipeLeft` - For left positioned toasts (swipes left)
- `carSwipeRight` - For right positioned toasts (swipes right)
- `carSwipeCenter` - For center positioned toasts (swipes down)

#### POP UP Entrance Animation
All toasts use the `airdropPop` entrance animation with:
- 4-stage rotation and scaling effects
- Professional iOS-inspired timing
- Smooth cubic-bezier transitions

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

// Toast with description - object format
toast.info('Update Available', {
    description: 'Version 2.0 is now available with new features and improvements.',
    timeout: 8000,
    allowClose: true
});

// Toast with description - simple format
toast.success('Welcome!', 'Thanks for joining our platform. Explore the features!');

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
    
    const handleWithDescription = () => {
        toast?.info('New Feature!', 'Check out our latest React integration updates.');
    };

    // 🆕 NEW: Confirmation dialog examples
    const handleDelete = () => {
        toast?.conf('Delete item?', 'This action cannot be undone.', (confirmed) => {
            if (confirmed) {
                // Perform deletion logic
                console.log('Deleting item...');
                toast?.success('Item deleted successfully!');
            } else {
                toast?.info('Delete cancelled');
            }
        });
    };
    
    const handleLogout = () => {
        toast?.conf('Sign out?', {
            description: 'You will need to sign in again to access your account.',
            confirmText: 'Sign Out',
            cancelText: 'Stay Signed In',
            theme: 'dark',
            position: 'center'
        }, (confirmed) => {
            if (confirmed) {
                // Logout logic
                window.location.href = '/login';
            }
        });
    };

    const handleIconDemo = () => {
        // Showcase different icons with descriptions
        toast?.success('✓ Success Icon', 'Beautiful checkmark with green theme');
        setTimeout(() => toast?.error('✗ Error Icon', 'Clear error indication with red theme'), 500);
        setTimeout(() => toast?.warning('⚠ Warning Icon', 'Alert triangle with orange theme'), 1000);
        setTimeout(() => toast?.info('ℹ Info Icon', 'Information circle with blue theme'), 1500);
    };

    return (
        <div>
            <button onClick={handleSuccess}>Show Success</button>
            <button onClick={handleError}>Show Error</button>
            <button onClick={handleWithDescription}>Show with Description</button>
            <button onClick={handleIconDemo}>Demo All Icons</button>
            <button onClick={handleDelete}>Delete with Confirmation</button>
            <button onClick={handleLogout}>Logout Confirmation</button>
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
        <button @click="showConfirmation">Show Confirmation</button>
        <button @click="showDeleteConfirmation">Delete Item</button>
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
        },
        // 🆕 NEW: Confirmation methods
        showConfirmation() {
            this.toast.conf('Save changes?', (confirmed) => {
                if (confirmed) {
                    this.saveData();
                } else {
                    this.toast.info('Changes not saved');
                }
            });
        },
        showDeleteConfirmation() {
            this.toast.conf('Delete this item?', {
                description: 'This action cannot be undone and will remove all associated data.',
                confirmText: 'Delete',
                cancelText: 'Keep',
                theme: 'dark',
                position: 'center'
            }, (confirmed) => {
                if (confirmed) {
                    this.deleteItem();
                    this.toast.success('Item deleted successfully!');
                }
            });
        },
        saveData() {
            // Save logic here
            this.toast.success('Data saved successfully!');
        },
        deleteItem() {
            // Delete logic here
            console.log('Item deleted');
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
        <button (click)="showConfirmation()">Show Confirmation</button>
        <button (click)="showLogoutConfirmation()">Logout</button>
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
    
    // 🆕 NEW: Confirmation methods
    showConfirmation() {
        this.toast.conf('Save document?', 'All changes will be saved permanently.', (confirmed: boolean) => {
            if (confirmed) {
                this.saveDocument();
            } else {
                this.toast.info('Save cancelled');
            }
        });
    }
    
    showLogoutConfirmation() {
        this.toast.conf('Sign out?', {
            description: 'You will be logged out of your account.',
            confirmText: 'Sign Out',
            cancelText: 'Cancel',
            theme: 'light',
            position: 'center'
        }, (confirmed: boolean) => {
            if (confirmed) {
                this.logout();
            }
        });
    }
    
    private saveDocument() {
        // Save logic
        this.toast.success('Document saved successfully!');
    }
    
    private logout() {
        // Logout logic
        this.toast.success('Logged out successfully!');
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

// Form submission example with confirmation
document.getElementById('submitForm').addEventListener('click', async function() {
    toast.conf('Submit form?', 'Your data will be sent to the server.', async (confirmed) => {
        if (confirmed) {
            try {
                // Simulate API call
                const response = await fetch('/api/submit', { method: 'POST' });
                
                if (response.ok) {
                    toast.success('Form submitted successfully!', 'Your data has been processed and saved.');
                } else {
                    toast.error('Failed to submit form', 'Please check your inputs and try again.');
                }
            } catch (error) {
                toast.error('Network error occurred', 'Check your connection and retry.');
            }
        }
    });
});

// Delete confirmation example
function deleteItem(itemId) {
    toast.conf('Delete this item?', {
        description: 'This action cannot be undone and will permanently remove all associated data.',
        confirmText: 'Delete',
        cancelText: 'Keep',
        theme: 'dark',
        position: 'center'
    }, (confirmed) => {
        if (confirmed) {
            // Perform deletion
            console.log('Deleting item:', itemId);
            toast.success('Item deleted!', 'The item has been permanently removed.');
        } else {
            toast.info('Delete cancelled', 'Your item is safe.');
        }
    });
}

// File upload with confirmation and progress
function handleFileUpload() {
    toast.conf('Upload file?', 'The file will be uploaded to your account.', (confirmed) => {
        if (confirmed) {
            toast.info('Uploading...', 'Please wait while we process your file.');
            
            // Simulate upload completion
            setTimeout(() => {
                toast.success('Upload complete!', 'Your file has been uploaded successfully.');
            }, 3000);
        }
    });
}

// Logout confirmation
function logout() {
    toast.conf('Sign out?', {
        description: 'You will need to sign in again to access your account.',
        confirmText: 'Sign Out',
        cancelText: 'Stay Signed In',
        theme: 'light'
    }, (confirmed) => {
        if (confirmed) {
            window.location.href = '/login';
        }
    });
}

// Multiple toast types with descriptions
function showAllTypes() {
    toast.success('Success!', 'Operation completed successfully');
    setTimeout(() => toast.error('Error!', 'Something went wrong'), 500);
    setTimeout(() => toast.warning('Warning!', 'Please review this action'), 1000);
    setTimeout(() => toast.info('Info', 'Here is some helpful information'), 1500);
    setTimeout(() => toast.dark('Dark Mode', 'Elegant dark notification'), 2000);
    setTimeout(() => toast.light('Light Mode', 'Clean light notification'), 2500);
}

// Showcase new enhanced features including confirmations
function demoEnhancedFeatures() {
    // SVG Icons demo
    toast.success('✓ Beautiful Icons', 'Each type has its own vector icon that scales perfectly');
    
    // Car swipe animation (automatic based on position)
    setTimeout(() => {
        toast.info('🚗 Car Swipe Exit', 'Watch the position-aware exit animation');
    }, 1000);
    
    // Apple AirDrop entrance (automatic)
    setTimeout(() => {
        toast.warning('📱 AirDrop Style', 'iOS-inspired entrance with rotation effects');
    }, 2000);
    
    // Glassmorphism design
    setTimeout(() => {
        toast.dark('✨ Glassmorphism', 'Modern backdrop blur with translucent design');
    }, 3000);
    
    // 🆕 Confirmation dialog demo
    setTimeout(() => {
        toast.conf('Try confirmation?', 'Experience the new interactive dialog feature.', (confirmed) => {
            if (confirmed) {
                toast.success('🎉 Confirmation works!', 'You can now create interactive dialogs easily.');
            } else {
                toast.info('No problem!', 'Confirmation dialogs are optional.');
            }
        });
    }, 4000);
}

// Advanced confirmation examples
function advancedConfirmationExamples() {
    // Settings reset confirmation
    toast.conf('Reset all settings?', {
        description: 'This will restore all settings to their default values.',
        confirmText: 'Reset',
        cancelText: 'Cancel',
        theme: 'dark',
        position: 'center'
    }, (confirmed) => {
        if (confirmed) {
            // Reset settings logic
            toast.success('Settings reset!', 'All settings have been restored to defaults.');
        }
    });
}

// Advanced usage with all new features
function advancedExample() {
    // Progress indication with confirmation first
    toast.conf('Start processing?', {
        description: 'This will upload your file to the server and may take a few minutes.',
        confirmText: 'Start',
        cancelText: 'Later',
        theme: 'light'
    }, (confirmed) => {
        if (confirmed) {
            toast.info('Processing...', {
                description: 'Please wait while we upload your file to the server',
                timeout: 0, // No auto-dismiss
                allowClose: true
            });
            
            // Simulate progress completion
            setTimeout(() => {
                toast.success('Upload Complete!', {
                    description: 'Your file has been uploaded successfully with all metadata',
                    timeout: 5000
                });
            }, 3000);
        }
    });
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
| `description` | string | `undefined` | Optional secondary text for detailed information |

## 🎨 Available Themes

| Theme | Background | Text Color | Icon | Use Case |
|-------|------------|------------|------|----------|
| `success` | Green | White | ✓ Checkmark | Success messages |
| `error` | Red | White | ✗ X Circle | Error messages |
| `warning` | Orange | White | ⚠ Triangle | Warning messages |
| `info` | Blue | White | ℹ Info Circle | Information messages |
| `dark` | Dark Gray | White | ★ Star | General purpose |
| `light` | Light Gray | Black | ☀ Calendar | Light theme compatibility |

### 🆕 Enhanced Visual Features

- **Custom SVG Icons**: Each theme includes beautiful vector icons that are crisp at any resolution
- **Glassmorphism Design**: Modern backdrop-filter blur effects with translucent backgrounds  
- **Car Swipe Animations**: Position-aware exit animations that swipe toasts in natural directions
- **POP UP Entrance**: Professional iOS-inspired entrance with 4-stage rotation and scaling
- **Progress Bar**: Animated progress bar with shimmer effects showing remaining time
- **Responsive Design**: Mobile-first approach that adapts to all screen sizes

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
