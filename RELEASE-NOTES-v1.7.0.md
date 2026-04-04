# Toastify Pro v1.7.0

**Release Date:** April 2026

---

## What's New

### Input Prompts

New `input()` and `prompt()` methods for collecting user input:

```javascript
// Simple input
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

**Features:**
- Multiple input types: `text`, `email`, `password`, `number`, `url`, `tel`
- Built-in validation for email, URL, and number formats
- Custom validation functions
- Async callback support with loading states
- Error messages with smooth animations
- Keyboard support (Enter to submit, Escape to cancel)
- Custom colors and theming

---

## Improvements

### Faster Loading Spinner

- Spinner animation speed increased from 1s to 0.5s
- More responsive feel during async operations

### Fixed Dismiss Issues

- Fixed toast reappearing on hover after clicking close
- Added `isRemoving` flag to prevent hover interference
- Disabled pointer events during exit animation

### Smoother Animations

- Refined entrance animation (`airdropPop`) with better easing
- Faster exit animations (0.35s)
- Less exaggerated scale values for subtler feel
- Improved icon bounce and exit animations

### Fixed Hover Bounce

- Fixed toast replaying entrance animation on mouse leave
- Progress bar now restarts independently without affecting toast animation

---

## Breaking Changes

None. This release is fully backward compatible.

---

## Upgrade

```bash
npm update toastify-pro
```

Or update CDN link:

```html
<script src="https://cdn.jsdelivr.net/npm/toastify-pro@1.7.0/dist/toastify-pro.umd.min.js"></script>
```

---

## Full Changelog

- Added `input()` method for text input prompts
- Added `prompt()` as alias for `input()`
- Input validation: required, email, URL, number, custom
- Input types: text, email, password, number, url, tel
- Async input callbacks with automatic loading state
- Error display with shake animation
- Faster spinner (0.5s instead of 1s)
- Fixed close button hover causing toast reappear
- Fixed hover bounce issue on mouse leave
- Smoother entrance/exit animations
- Updated documentation page
- Version bump to 1.7.0
