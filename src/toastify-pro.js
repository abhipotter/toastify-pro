  class ToastifyPro {
    constructor(options = {}) {
      this.defaultOptions = {
        position: options.position || "bottom-center", // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
        timeout: options.timeout || 3000,
        allowClose: options.allowClose !== false, // default true
        maxLength: options.maxLength || 100,
      };

      // create container only once
      const existing = document.querySelector(
        `.toastify-pro-container.${this.defaultOptions.position}`
      );
      if (existing) {
        this.container = existing;
      } else {
        this.container = document.createElement("div");
        this.container.className = `toastify-pro-container ${this.defaultOptions.position}`;
        document.body.appendChild(this.container);
      }

      this.injectStyles();
    }

    injectStyles() {
      if (document.getElementById("toastify-pro-styles")) return; // load once
      const style = document.createElement("style");
      style.id = "toastify-pro-styles";
      style.textContent = `
      .toastify-pro-container {
        position: fixed;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      }
      .toastify-pro-container.top-left { top: 20px; left: 20px; align-items: flex-start; }
      .toastify-pro-container.top-right { top: 20px; right: 20px; align-items: flex-end; }
      .toastify-pro-container.bottom-left { bottom: 20px; left: 20px; align-items: flex-start; }
      .toastify-pro-container.bottom-right { bottom: 20px; right: 20px; align-items: flex-end; }
      .toastify-pro-container.top-center { top: 20px; left: 50%; transform: translateX(-50%); }
      .toastify-pro-container.bottom-center { bottom: 150px; left: 50%; transform: translateX(-50%); }

      .toastify-pro {
        min-width: 220px;
        max-width: 320px;
        padding: 12px 18px;
        border-radius: 20px;
        font-size: 14px;
        font-family: sans-serif;
        color: white;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        pointer-events: auto;
        position: relative;
      }
      .toastify-pro.show { opacity: 1; transform: translateY(0); }
      .toastify-pro.success { background: rgba(76, 175, 80, 0.9); }
      .toastify-pro.error { background: rgba(244, 67, 54, 0.9); }
      .toastify-pro.info { background: rgba(33, 150, 243, 0.9); }
      .toastify-pro.warning { background: rgba(255, 152, 0, 0.9); }
      .toastify-pro.dark { background: rgba(0,0,0,0.85); }
      .toastify-pro.light { background: rgba(255,255,255,0.9); color: #000; }

      .toastify-pro .close-btn {
        position: absolute;
        right: 20px;
        top: 8px;
        cursor: pointer;
        font-size: 20px;
        color: inherit;
        opacity: 0.8;
      }
      .toastify-pro .close-btn:hover { opacity: 1; }
    `;
      document.head.appendChild(style);
    }

    show(message, type = "dark", opts = {}) {
      const options = { ...this.defaultOptions, ...opts };

      const toast = document.createElement("div");
      toast.className = `toastify-pro ${type}`;
      toast.innerText = message.substring(0, options.maxLength);

      if (options.allowClose) {
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = () => this.removeToast(toast);
        toast.appendChild(closeBtn);
      }

      this.container.appendChild(toast);

      // show animation
      setTimeout(() => toast.classList.add("show"), 50);

      // auto remove
      if (options.timeout > 0) {
        setTimeout(() => this.removeToast(toast), options.timeout);
      }
    }

    removeToast(toast) {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }

    success(msg, opts) {
      this.show(msg, "success", opts);
    }
    error(msg, opts) {
      this.show(msg, "error", opts);
    }
    info(msg, opts) {
      this.show(msg, "info", opts);
    }
    warning(msg, opts) {
      this.show(msg, "warning", opts);
    }
    dark(msg, opts) {
      this.show(msg, "dark", opts);
    }
    light(msg, opts) {
      this.show(msg, "light", opts);
    }
  }