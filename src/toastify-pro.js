/**
 * ToastifyPro - Modern Toast Notification Library
 * A beautiful, customizable toast notification library with glassmorphism design,
 * Apple AirDrop-style animations, and car swipe exit effects.
 * 
 * Features:
 * - Glassmorphism design with backdrop-filter effects
 * - Apple AirDrop-style entrance animations
 * - Position-aware car swipe exit animations  
 * - Description support for enhanced messaging
 * - Six theme variants (success, error, info, warning, dark, light)
 * - Progress bar with shimmer effects
 * - Responsive design for mobile devices
 * - Framework agnostic (works with React, Vue, Angular, etc.)
 * - Confirmation dialogs with customizable buttons and callbacks
 * - Center position support for enhanced focus
 * - Independent positioning for confirmations
 * 
 * @version 1.3.0
 * @author ToastifyPro Team
 * @license MIT
 */
class ToastifyPro {
  /**
   * Creates a new ToastifyPro instance
   * @param {Object} options - Configuration options
   * @param {string} options.position - Toast position (top-left, top-right, bottom-left, bottom-right, top-center, bottom-center, center)
   * @param {number} options.timeout - Auto-dismiss timeout in milliseconds (0 to disable)
   * @param {boolean} options.allowClose - Whether to show close button
   * @param {number} options.maxLength - Maximum message length
   */
  constructor(options = {}) {
    // Validate options parameter
    if (typeof options !== 'object' || options === null) {
      console.warn('ToastifyPro: Invalid options parameter. Using defaults.');
      options = {};
    }

    // Merge with default options
    this.defaultOptions = {
      position: options.position || "bottom-center", // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center, center
      timeout: options.timeout || 3000,
      allowClose: options.allowClose !== false, // default true
      maxLength: options.maxLength || 100,
    };

    // Validate position
    const validPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center', 'center'];
    if (!validPositions.includes(this.defaultOptions.position)) {
      console.warn(`ToastifyPro: Invalid position "${this.defaultOptions.position}". Using "bottom-center".`);
      this.defaultOptions.position = "bottom-center";
    }

    // Check if we're in a browser environment
    if (typeof document === 'undefined') {
      throw new Error('ToastifyPro: This library requires a DOM environment (browser).');
    }

    // Create or reuse container for this position
    const existing = document.querySelector(
      `.toastify-pro-container.${this.defaultOptions.position}`
    );
    
    if (existing) {
      this.container = existing;
    } else {
      try {
        this.container = document.createElement("div");
        this.container.className = `toastify-pro-container ${this.defaultOptions.position}`;
        document.body.appendChild(this.container);
      } catch (error) {
        throw new Error('ToastifyPro: Failed to create container element. DOM may not be ready.');
      }
    }

    // Inject styles once
    this.injectStyles();
  }

  /**
   * Returns the SVG icon for a given toast type
   * @param {string} type - Toast type (success, error, info, warning, dark, light)
   * @returns {string} SVG icon markup
   */
  getIconSVG(type) {
    // Validate type parameter
    if (typeof type !== 'string') {
      console.warn('ToastifyPro: Invalid icon type. Using default info icon.');
      type = 'info';
    }

    const icons = {
      success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
      </svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" fill="currentColor"/>
      </svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
      </svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
      </svg>`,
      dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
      </svg>`,
      light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.11 2 2 3.11 2 4.5v14C2 19.89 3.11 21 4.5 21h15c1.39 0 2.5-1.11 2.5-2.5v-14C22 3.11 20.89 2 19.5 2zm0 16h-15v-11h15v11z" fill="currentColor"/>
      </svg>`
    };
    
    return icons[type] || icons.info;
  }

  /**
   * Injects the CSS styles into the document head
   * Styles include glassmorphism design, animations, and responsive layout
   */
  injectStyles() {
    // Prevent duplicate style injection
    if (document.getElementById("toastify-pro-styles")) return;
    
    try {
      const style = document.createElement("style");
      style.id = "toastify-pro-styles";
      style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    
    .toastify-pro-container {
      position: fixed;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 16px;
      pointer-events: none;
    }
    .toastify-pro-container.top-left { top: 50px; left: 24px; align-items: flex-start; }
    .toastify-pro-container.top-right { top: 50px; right: 24px; align-items: flex-end; }
    .toastify-pro-container.bottom-left { bottom: 50px; left: 24px; align-items: flex-start; }
    .toastify-pro-container.bottom-right { bottom: 50px; right: 24px; align-items: flex-end; }
    .toastify-pro-container.top-center { top: 50px; left: 50%; transform: translateX(-50%); }
    .toastify-pro-container.bottom-center { bottom: 50px; left: 50%; transform: translateX(-50%); }
    .toastify-pro-container.center { top: 50%; left: 50%; transform: translate(-50%, -50%); }

    .toastify-pro {
      min-width: 280px;
      max-width: 400px;
      padding: 20px 24px;
      border-radius: 16px;
      font-size: 15px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 500;
      color: white;
      opacity: 0;
      transform: scale(0.3);
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events: auto;
      position: relative;
      display: flex;
      align-items: center;
      gap: 16px;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04),
        0 0 0 1px rgba(255, 255, 255, 0.05);
      overflow: hidden;
    }
    
    .toastify-pro::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0.8) 100%);
      animation: shimmer 2s infinite;
      transition: opacity 0.8s ease;
    }
    
    .toastify-pro::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.6);
      animation: progress var(--duration, 5s) linear;
      border-radius: 0 0 16px 16px;
    }
    
    @keyframes airdropPop {
      0% { 
        opacity: 0;
        transform: scale(0.3) rotateY(-20deg); 
      }
      30% { 
        opacity: 0.8;
        transform: scale(1.1) rotateY(10deg); 
      }
      60% { 
        opacity: 1;
        transform: scale(0.98) rotateY(-3deg); 
      }
      100% { 
        opacity: 1;
        transform: scale(1) rotateY(0deg); 
      }
    }
    
    @keyframes carSwipeBottom {
      0% { 
        opacity: 1;
        transform: scale(1) translateY(0); 
      }
      15% { 
        opacity: 1;
        transform: scale(1.02) translateY(-8px); 
      }
      100% { 
        opacity: 0;
        transform: scale(0.8) translateY(200px); 
      }
    }
    
    @keyframes carSwipeTop {
      0% { 
        opacity: 1;
        transform: scale(1) translateY(0); 
      }
      15% { 
        opacity: 1;
        transform: scale(1.02) translateY(8px); 
      }
      100% { 
        opacity: 0;
        transform: scale(0.8) translateY(-200px); 
      }
    }
    
    @keyframes carSwipeLeft {
      0% { 
        opacity: 1;
        transform: scale(1) translateX(0); 
      }
      15% { 
        opacity: 1;
        transform: scale(1.02) translateX(8px); 
      }
      100% { 
        opacity: 0;
        transform: scale(0.8) translateX(-300px); 
      }
    }
    
    @keyframes carSwipeRight {
      0% { 
        opacity: 1;
        transform: scale(1) translateX(0); 
      }
      15% { 
        opacity: 1;
        transform: scale(1.02) translateX(-8px); 
      }
      100% { 
        opacity: 0;
        transform: scale(0.8) translateX(300px); 
      }
    }
    
    @keyframes carSwipeCenter {
      0% { 
        opacity: 1;
        transform: scale(1) translateY(0); 
      }
      15% { 
        opacity: 1;
        transform: scale(1.02) translateY(-5px); 
      }
      100% { 
        opacity: 0;
        transform: scale(0.6) translateY(150px); 
      }
    }
    
    @keyframes progress {
      0% { width: 100%; }
      100% { width: 0%; }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .toastify-pro.show { 
      opacity: 1; 
      transform: scale(1);
      animation: airdropPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .toastify-pro.success { 
      background: linear-gradient(135deg, 
        rgba(34, 197, 94, 0.9) 0%,
        rgba(21, 128, 61, 0.9) 100%);
      border-color: rgba(34, 197, 94, 0.3);
    }
    
    .toastify-pro.error { 
      background: linear-gradient(135deg, 
        rgba(239, 68, 68, 0.9) 0%,
        rgba(185, 28, 28, 0.9) 100%);
      border-color: rgba(239, 68, 68, 0.3);
    }
    
    .toastify-pro.info { 
      background: linear-gradient(135deg, 
        rgba(59, 130, 246, 0.9) 0%,
        rgba(29, 78, 216, 0.9) 100%);
      border-color: rgba(59, 130, 246, 0.3);
    }
    
    .toastify-pro.warning { 
      background: linear-gradient(135deg, 
        rgba(245, 158, 11, 0.9) 0%,
        rgba(217, 119, 6, 0.9) 100%);
      border-color: rgba(245, 158, 11, 0.3);
    }
    
    .toastify-pro.dark { 
      background: linear-gradient(135deg, 
        rgba(15, 23, 42, 0.95) 0%,
        rgba(30, 41, 59, 0.95) 100%);
      border-color: rgba(148, 163, 184, 0.2);
    }
    
    .toastify-pro.light { 
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(248, 250, 252, 0.95) 100%);
      color: #1e293b;
      border-color: rgba(226, 232, 240, 0.8);
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.08),
        0 10px 10px -5px rgba(0, 0, 0, 0.03);
    }
    
    .toastify-pro.light::before {
      background: linear-gradient(90deg, 
        rgba(30, 41, 59, 0.8) 0%,
        rgba(30, 41, 59, 0.4) 50%,
        rgba(30, 41, 59, 0.8) 100%);
    }
    
    .toastify-pro.light::after {
      background: rgba(30, 41, 59, 0.6);
    }

    .toastify-pro .toast-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      animation: iconPulse 2s infinite;
    }
    
    @keyframes iconPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes iconBounce {
      0% { transform: scale(0.2) rotate(-15deg); }
      40% { transform: scale(1.2) rotate(8deg); }
      70% { transform: scale(0.95) rotate(-3deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes iconCarExit {
      0% { 
        transform: scale(1) rotate(0deg); 
        opacity: 1;
      }
      20% { 
        transform: scale(1.1) rotate(-10deg); 
        opacity: 0.9;
      }
      100% { 
        transform: scale(0.3) rotate(180deg); 
        opacity: 0;
      }
    }

    .toastify-pro .toast-icon svg {
      width: 18px;
      height: 18px;
      color: inherit;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .toastify-pro.light .toast-icon {
      background: rgba(15, 23, 42, 0.1);
    }

    .toastify-pro .toast-content {
      flex: 1;
      line-height: 1.5;
      font-weight: 500;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .toastify-pro .toast-message {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 0;
    }

    .toastify-pro .toast-description {
      font-size: 13px;
      font-weight: 400;
      opacity: 0.85;
      margin-top: 4px;
      line-height: 1.4;
    }

    .toastify-pro .close-btn {
      cursor: pointer;
      font-size: 20px;
      color: inherit;
      opacity: 0.7;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.2s ease;
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      font-weight: 300;
      line-height: 1;
    }
    
    .toastify-pro .close-btn:hover { 
      opacity: 1; 
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
    
    .toastify-pro.light .close-btn {
      background: rgba(15, 23, 42, 0.08);
    }
    
    .toastify-pro.light .close-btn:hover { 
      background: rgba(15, 23, 42, 0.15);
    }
    
    @media (max-width: 640px) {
      .toastify-pro {
        min-width: 260px;
        max-width: calc(100vw - 48px);
        margin: 0 8px;
      }
      
      .toastify-pro-container.top-left,
      .toastify-pro-container.bottom-left { left: 16px; }
      .toastify-pro-container.top-right,
      .toastify-pro-container.bottom-right { right: 16px; }
    }

    /* Confirmation Toast Styles */
    .toastify-pro.confirmation {
      min-width: 320px;
      max-width: 450px;
      padding: 24px;
      flex-direction: column;
      align-items: stretch;
      gap: 20px;
      position: relative;
    }

    /* Hide progress bar for confirmation toasts */
    .toastify-pro.confirmation::after {
      display: none;
    }

    /* Close button for confirmation dialogs */
    .toastify-pro.confirmation .conf-close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
      font-size: 18px;
      color: inherit;
      opacity: 0.6;
      padding: 4px;
      border-radius: 50%;
      transition: all 0.2s ease;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      font-weight: 300;
      line-height: 1;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .toastify-pro.confirmation .conf-close-btn:hover { 
      opacity: 1; 
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .toastify-pro.confirmation.light .conf-close-btn {
      background: rgba(15, 23, 42, 0.08);
      border-color: rgba(15, 23, 42, 0.1);
    }
    
    .toastify-pro.confirmation.light .conf-close-btn:hover { 
      background: rgba(15, 23, 42, 0.15);
      border-color: rgba(15, 23, 42, 0.2);
    }

    .toastify-pro.confirmation .toast-content {
      text-align: center;
      margin-bottom: 8px;
    }

    .toastify-pro.confirmation .toast-message {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 6px;
    }

    .toastify-pro.confirmation .toast-description {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 6px;
    }

    /* Fix text visibility for dark/light variants */
    .toastify-pro.confirmation.dark .toast-message,
    .toastify-pro.confirmation.dark .toast-description {
      color: white;
    }

    .toastify-pro.confirmation.light .toast-message,
    .toastify-pro.confirmation.light .toast-description {
      color: #1e293b;
    }

    .toast-actions {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .toast-btn {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .toast-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .toast-btn:active {
      transform: translateY(0);
    }

    .toast-btn-cancel {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.3);
      font-weight: 500;
    }

    .toast-btn-cancel:hover {
      background: rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .toast-btn-confirm {
      color: white;
      font-weight: 700;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
      border-color: rgba(148, 163, 184, 0.5);
    }

    .toast-btn-confirm::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .toast-btn-confirm:hover::before {
      left: 100%;
    }

    .toast-btn-confirm:hover {
      background: linear-gradient(135deg, rgba(15, 23, 42, 1), rgba(30, 41, 59, 1));
      border-color: rgba(148, 163, 184, 0.7);
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.4);
    }

    .toastify-pro.light .toast-btn-cancel {
      background: rgba(15, 23, 42, 0.08);
      color: rgba(15, 23, 42, 0.8);
      border-color: rgba(15, 23, 42, 0.2);
    }

    .toastify-pro.light .toast-btn-cancel:hover {
      background: rgba(15, 23, 42, 0.12);
      color: rgba(15, 23, 42, 1);
      border-color: rgba(15, 23, 42, 0.3);
    }

    /* Enhanced light theme confirm buttons */
    .toastify-pro.light .toast-btn-confirm {
      border-color: rgba(15, 23, 42, 0.3);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9));
      color: #1e293b;
    }

    .toastify-pro.light .toast-btn-confirm:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(248, 250, 252, 1));
      border-color: rgba(15, 23, 42, 0.4);
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
    }

    @media (max-width: 640px) {
      .toastify-pro.confirmation {
        min-width: 280px;
        max-width: calc(100vw - 32px);
      }
    }
  `;
      document.head.appendChild(style);
    } catch (error) {
      console.error('ToastifyPro: Failed to inject styles:', error);
    }
  }

  /**
   * Creates and displays a toast notification
   * @param {string} message - Main message text
   * @param {string} type - Toast type (success, error, info, warning, dark, light)
   * @param {Object} opts - Additional options
   * @param {string} opts.description - Optional description text
   * @param {number} opts.timeout - Override default timeout
   * @param {boolean} opts.allowClose - Override close button setting
   * @param {number} opts.maxLength - Override max message length
   */
  show(message, type = "dark", opts = {}) {
    // Input validation
    if (typeof message !== 'string') {
      console.warn('ToastifyPro: Message must be a string. Converting to string.');
      message = String(message);
    }

    if (!message.trim()) {
      console.warn('ToastifyPro: Empty message provided.');
      return;
    }

    // Validate type
    const validTypes = ['success', 'error', 'info', 'warning', 'dark', 'light'];
    if (!validTypes.includes(type)) {
      console.warn(`ToastifyPro: Invalid type "${type}". Using "dark".`);
      type = 'dark';
    }

    // Validate and merge options
    if (typeof opts !== 'object' || opts === null) {
      console.warn('ToastifyPro: Invalid options parameter. Using defaults.');
      opts = {};
    }

    const options = { ...this.defaultOptions, ...opts };

    try {
      // Create toast element
      const toast = document.createElement("div");
      toast.className = `toastify-pro ${type}`;
      
      // Set duration for progress bar animation
      if (options.timeout > 0) {
        toast.style.setProperty('--duration', `${options.timeout}ms`);
      }

      // Create icon wrapper
      const iconWrapper = document.createElement("div");
      iconWrapper.className = "toast-icon";
      iconWrapper.innerHTML = this.getIconSVG(type);
      toast.appendChild(iconWrapper);

      // Create content wrapper for the message and description
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "toast-content";
      
      // Main message
      const messageElement = document.createElement("div");
      messageElement.className = "toast-message";
      messageElement.textContent = message.substring(0, options.maxLength);
      contentWrapper.appendChild(messageElement);
      
      // Optional description (if provided)
      if (options.description && typeof options.description === 'string') {
        const descriptionElement = document.createElement("div");
        descriptionElement.className = "toast-description";
        descriptionElement.textContent = options.description.substring(0, options.maxLength * 2);
        contentWrapper.appendChild(descriptionElement);
      }
      
      toast.appendChild(contentWrapper);

      // Add close button if enabled
      if (options.allowClose) {
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.setAttribute('aria-label', 'Close notification');
        closeBtn.onclick = () => this.removeToast(toast);
        toast.appendChild(closeBtn);
      }

      // Add toast to container
      this.container.appendChild(toast);

      // Apple AirDrop-style entrance animation
      setTimeout(() => {
        toast.classList.add("show");
        // Add icon bounce effect with Apple-style timing
        const icon = toast.querySelector('.toast-icon');
        if (icon) {
          icon.style.animation = 'iconBounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
      }, 10);

      // Auto-remove after timeout
      if (options.timeout > 0) {
        setTimeout(() => this.removeToast(toast), options.timeout);
      }

      return toast; // Return element for potential future manipulation
    } catch (error) {
      console.error('ToastifyPro: Failed to create toast:', error);
    }
  }

  /**
   * Removes a toast with position-aware car swipe animation
   * @param {HTMLElement} toast - Toast element to remove
   */
  removeToast(toast) {
    if (!toast || !toast.parentNode) {
      console.warn('ToastifyPro: Invalid toast element for removal.');
      return;
    }

    try {
      // Detect position to choose the right swipe direction
      const container = toast.parentNode;
      const position = container.className.split(' ')[1]; // get position class
      
      let swipeAnimation = 'carSwipeBottom'; // default fallback
      
      // Choose animation based on position - car swipes away from screen edge
      if (position.includes('bottom')) {
        swipeAnimation = 'carSwipeBottom'; // swipe down off screen
      } else if (position.includes('top')) {
        swipeAnimation = 'carSwipeTop'; // swipe up off screen
      } else if (position.includes('left')) {
        swipeAnimation = 'carSwipeLeft'; // swipe left off screen
      } else if (position.includes('right')) {
        swipeAnimation = 'carSwipeRight'; // swipe right off screen
      } else if (position.includes('center')) {
        swipeAnimation = 'carSwipeCenter'; // swipe down for center
      }
      
      // Apply fast car swipe animation with improved easing
      toast.style.animation = `${swipeAnimation} 0.4s cubic-bezier(0.4, 0.0, 1, 1) forwards`;
      
      // Add spinning icon animation for extra polish
      const icon = toast.querySelector('.toast-icon');
      if (icon) {
        icon.style.animation = 'iconCarExit 0.4s cubic-bezier(0.4, 0.0, 1, 1) forwards';
      }
      
      // Remove element after animation completes
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 400);
    } catch (error) {
      console.error('ToastifyPro: Error removing toast:', error);
      // Fallback: remove immediately if animation fails
      if (toast.parentNode) {
        toast.remove();
      }
    }
  }

  /**
   * Shows a success toast notification
   * @param {string} msg - Main message
   * @param {string|Object} opts - Description string or options object
   */
  success(msg, opts) {
    // Handle both (message) and (message, description) formats
    if (typeof opts === 'string') {
      opts = { description: opts };
    }
    this.show(msg, "success", opts);
  }

  /**
   * Shows an error toast notification
   * @param {string} msg - Main message
   * @param {string|Object} opts - Description string or options object
   */
  error(msg, opts) {
    if (typeof opts === 'string') {
      opts = { description: opts };
    }
    this.show(msg, "error", opts);
  }

  /**
   * Shows an info toast notification
   * @param {string} msg - Main message
   * @param {string|Object} opts - Description string or options object
   */
  info(msg, opts) {
    if (typeof opts === 'string') {
      opts = { description: opts };
    }
    this.show(msg, "info", opts);
  }

  /**
   * Shows a warning toast notification
   * @param {string} msg - Main message
   * @param {string|Object} opts - Description string or options object
   */
  warning(msg, opts) {
    if (typeof opts === 'string') {
      opts = { description: opts };
    }
    this.show(msg, "warning", opts);
  }

  /**
   * Shows a dark-themed toast notification
   * @param {string} msg - Main message
   * @param {string|Object} opts - Description string or options object
   */
  dark(msg, opts) {
    if (typeof opts === 'string') {
      opts = { description: opts };
    }
    this.show(msg, "dark", opts);
  }

  /**
   * Shows a light-themed toast notification
   * @param {string} msg - Main message
   * @param {string|Object} opts - Description string or options object
   */
  light(msg, opts) {
    if (typeof opts === 'string') {
      opts = { description: opts };
    }
    this.show(msg, "light", opts);
  }

  /**
   * Shows a confirmation toast with confirm/cancel buttons
   * @param {string} message - Main confirmation question
   * @param {string|Function|Object} descriptionOrCallback - Description text, callback function, or options object
   * @param {Function} callback - Callback function (if description provided)
   */
  conf(message, descriptionOrCallback, callback) {
    // Parse arguments to support multiple usage patterns
    let description = '';
    let options = {};
    let resultCallback = null;

    // Pattern 1: conf('message', callback)
    if (typeof descriptionOrCallback === 'function' && !callback) {
      resultCallback = descriptionOrCallback;
    }
    // Pattern 2: conf('message', 'description', callback)
    else if (typeof descriptionOrCallback === 'string' && typeof callback === 'function') {
      description = descriptionOrCallback;
      resultCallback = callback;
    }
    // Pattern 3: conf('message', options) with onConfirm/onCancel
    else if (typeof descriptionOrCallback === 'object' && descriptionOrCallback !== null) {
      options = descriptionOrCallback;
      description = options.description || '';
      
      // Use onConfirm/onCancel if provided, otherwise use callback parameter
      if (options.onConfirm || options.onCancel) {
        // Don't use the callback parameter if onConfirm/onCancel are provided
        resultCallback = null;
      } else if (typeof callback === 'function') {
        resultCallback = callback;
      }
    }
    // Pattern 4: conf('message', 'description', options) - legacy support
    else if (typeof descriptionOrCallback === 'string' && typeof callback === 'object') {
      description = descriptionOrCallback;
      options = callback || {};
      // In this case, no unified callback, rely on onConfirm/onCancel
      resultCallback = null;
    }

    // Default options for confirmation
    const confirmOptions = {
      timeout: 0, // No auto-dismiss for confirmations
      allowClose: false, // No close button, must choose
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
      theme: options.theme || options.color || 'dark', // Support both theme and color for backward compatibility
      position: options.position || 'center', // Default to center for confirmations
      ...options
    };

    // Validate and set theme to only dark or light
    if (confirmOptions.theme === 'light' || confirmOptions.theme === 'white') {
      confirmOptions.theme = 'light';
    } else {
      confirmOptions.theme = 'dark'; // Default to dark for all other values
    }

    // Validate position for confirmation toast
    const validPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center', 'center'];
    if (!validPositions.includes(confirmOptions.position)) {
      console.warn(`ToastifyPro: Invalid confirmation position "${confirmOptions.position}". Using default position.`);
      confirmOptions.position = this.defaultOptions.position;
    }

    // Get or create container for the specified position
    let confirmContainer = document.querySelector(`.toastify-pro-container.${confirmOptions.position}`);
    
    if (!confirmContainer) {
      try {
        confirmContainer = document.createElement("div");
        confirmContainer.className = `toastify-pro-container ${confirmOptions.position}`;
        document.body.appendChild(confirmContainer);
      } catch (error) {
        console.warn('ToastifyPro: Failed to create confirmation container. Using default container.');
        confirmContainer = this.container;
      }
    }

    // Helper function to handle confirmation result
    const handleConfirmation = (confirmed) => {
      if (confirmed) {
        // Call onConfirm if provided
        if (options.onConfirm && typeof options.onConfirm === 'function') {
          try {
            options.onConfirm();
          } catch (error) {
            console.error('ToastifyPro: Error in onConfirm callback:', error);
          }
        }
        // Call unified callback if provided
        if (resultCallback && typeof resultCallback === 'function') {
          try {
            resultCallback(true);
          } catch (error) {
            console.error('ToastifyPro: Error in confirmation callback:', error);
          }
        }
      } else {
        // Call onCancel if provided
        if (options.onCancel && typeof options.onCancel === 'function') {
          try {
            options.onCancel();
          } catch (error) {
            console.error('ToastifyPro: Error in onCancel callback:', error);
          }
        }
        // Call unified callback if provided
        if (resultCallback && typeof resultCallback === 'function') {
          try {
            resultCallback(false);
          } catch (error) {
            console.error('ToastifyPro: Error in confirmation callback:', error);
          }
        }
      }
    };

    try {
      // Create confirmation toast element
      const toast = document.createElement("div");
      toast.className = `toastify-pro confirmation ${confirmOptions.theme}`;

      // Create close button for confirmation
      const closeBtn = document.createElement("span");
      closeBtn.className = "conf-close-btn";
      closeBtn.innerHTML = "&times;";
      closeBtn.setAttribute('aria-label', 'Cancel confirmation');
      closeBtn.onclick = () => {
        handleConfirmation(false);
        this.removeToast(toast);
      };
      toast.appendChild(closeBtn);

      // Create icon wrapper
      const iconWrapper = document.createElement("div");
      iconWrapper.className = "toast-icon";
      iconWrapper.innerHTML = this.getIconSVG('info'); // Default to info icon
      toast.appendChild(iconWrapper);

      // Create content wrapper
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "toast-content";
      
      // Main message
      const messageElement = document.createElement("div");
      messageElement.className = "toast-message";
      messageElement.textContent = message.substring(0, this.defaultOptions.maxLength);
      contentWrapper.appendChild(messageElement);
      
      // Optional description
      if (description) {
        const descriptionElement = document.createElement("div");
        descriptionElement.className = "toast-description";
        descriptionElement.textContent = description.substring(0, this.defaultOptions.maxLength * 2);
        contentWrapper.appendChild(descriptionElement);
      }
      
      toast.appendChild(contentWrapper);

      // Create action buttons container
      const actionsWrapper = document.createElement("div");
      actionsWrapper.className = "toast-actions";

      // Cancel button
      const cancelBtn = document.createElement("button");
      cancelBtn.className = "toast-btn toast-btn-cancel";
      cancelBtn.textContent = confirmOptions.cancelText;
      cancelBtn.onclick = () => {
        handleConfirmation(false);
        this.removeToast(toast);
      };

      // Confirm button
      const confirmBtn = document.createElement("button");
      confirmBtn.className = `toast-btn toast-btn-confirm`;
      confirmBtn.textContent = confirmOptions.confirmText;
      confirmBtn.onclick = () => {
        handleConfirmation(true);
        this.removeToast(toast);
      };

      actionsWrapper.appendChild(cancelBtn);
      actionsWrapper.appendChild(confirmBtn);
      toast.appendChild(actionsWrapper);

      // Add toast to the specified container (not default container)
      confirmContainer.appendChild(toast);

      // Entrance animation
      setTimeout(() => {
        toast.classList.add("show");
        const icon = toast.querySelector('.toast-icon');
        if (icon) {
          icon.style.animation = 'iconBounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
      }, 10);

      return toast;
    } catch (error) {
      console.error('ToastifyPro: Failed to create confirmation toast:', error);
    }
  }
}

/**
 * Export for different environments
 * Supports CommonJS (Node.js), AMD, and browser globals
 */

// CommonJS export (Node.js/npm)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToastifyPro;
}

// ES6 module export
if (typeof exports !== 'undefined') {
  exports.ToastifyPro = ToastifyPro;
  exports.default = ToastifyPro;
}

// AMD export (RequireJS)
if (typeof define === 'function' && define.amd) {
  define(function() {
    return ToastifyPro;
  });
}

// Browser global
if (typeof window !== 'undefined') {
  window.ToastifyPro = ToastifyPro;
}
