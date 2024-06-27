class EventManager {
  constructor() {
    this.listeners = {};
  }

  addEventListener(type, listener, options) {
    if (!this.listeners[type]) {
      document.addEventListener(type, listener, options);
      this.listeners[type] = listener;
    }
  }

  removeEventListener(type, listener, options) {
    if (this.listeners[type]) {
      document.removeEventListener(type, listener, options);
      delete this.listeners[type];
    }
  }

  hasEventListener(type) {
    return !!this.listeners[type];
  }
}

const eventManager = new EventManager();
export default eventManager;
