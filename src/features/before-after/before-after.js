/**
 * Before-After Comparison
 * A lightweight image comparison system for Webflow
 * @version 1.0.2
 * @author Liam Miller
 * @repository https://github.com/LiamMillerDev/Tahi-Scripts
 */

class BeforeAfter {
  constructor(element) {
    // Core elements
    this.wrapper = element;
    this.beforeEl = this.wrapper.querySelector('[ts-before]');
    this.afterEl = this.wrapper.querySelector('[ts-after]');
    this.sliderEl = this.wrapper.querySelector('[ts-slider]');
    
    // Configuration
    this.config = {
      direction: this.wrapper.getAttribute('ts-direction') || 'vertical',
      initialPosition: parseInt(this.wrapper.getAttribute('ts-initial-position')) || 50
    };
    
    // State
    this.state = {
      isDragging: false,
      position: this.config.initialPosition,
      bounds: null
    };
    
    // Initialize if all required elements exist
    if (this.beforeEl?.querySelector('img') && this.afterEl?.querySelector('img') && this.sliderEl) {
      this.init();
    } else {
      console.warn('BeforeAfter: Missing required elements (container, before/after images, or slider)');
    }
  }
  
  init() {
    // Only set essential styles
    this.wrapper.style.position = 'relative';
    this.wrapper.style.overflow = 'hidden';
    
    // Set image wrapper styles
    [this.beforeEl, this.afterEl].forEach(el => {
      el.style.position = 'absolute';
      el.style.inset = '0';
      // Ensure images fill the container
      const img = el.querySelector('img');
      if (img) {
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
      }
    });
    
    // Set slider styles
    this.sliderEl.style.position = 'absolute';
    this.sliderEl.style.zIndex = '2';
    this.sliderEl.style.cursor = this.config.direction === 'vertical' ? 'ns-resize' : 'ew-resize';
    
    // Set initial position
    this.updatePosition(this.config.initialPosition);
    
    // Bind events
    this.bindEvents();
    
    // Calculate initial bounds
    this.calculateBounds();
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  bindEvents() {
    // Mouse events
    this.wrapper.addEventListener('mousedown', this.handleDragStart.bind(this));
    document.addEventListener('mousemove', this.handleDrag.bind(this));
    document.addEventListener('mouseup', this.handleDragEnd.bind(this));
    
    // Touch events
    this.wrapper.addEventListener('touchstart', this.handleDragStart.bind(this), { passive: true });
    document.addEventListener('touchmove', this.handleDrag.bind(this), { passive: false });
    document.addEventListener('touchend', this.handleDragEnd.bind(this));
    
    // Click event for direct position
    this.wrapper.addEventListener('click', this.handleClick.bind(this));
    
    // Double click for reset
    this.wrapper.addEventListener('dblclick', this.handleReset.bind(this));
  }
  
  calculateBounds() {
    const rect = this.wrapper.getBoundingClientRect();
    this.state.bounds = {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height
    };
  }
  
  handleResize() {
    this.calculateBounds();
    this.updatePosition(this.state.position);
  }
  
  handleDragStart(e) {
    if (e.target === this.sliderEl) {
      this.state.isDragging = true;
      this.wrapper.style.cursor = 'grabbing';
    }
  }
  
  handleDrag(e) {
    if (!this.state.isDragging) return;
    
    e.preventDefault();
    const position = this.calculatePosition(e);
    this.updatePosition(position);
  }
  
  handleDragEnd() {
    this.state.isDragging = false;
    this.wrapper.style.cursor = '';
  }
  
  handleClick(e) {
    if (e.target === this.sliderEl) return;
    
    const position = this.calculatePosition(e);
    this.updatePosition(position);
  }
  
  handleReset() {
    this.updatePosition(this.config.initialPosition);
  }
  
  calculatePosition(e) {
    const { bounds } = this.state;
    const isTouch = e.type.startsWith('touch');
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    
    let position;
    if (this.config.direction === 'horizontal') {
      position = ((clientX - bounds.left) / bounds.width) * 100;
    } else {
      position = ((clientY - bounds.top) / bounds.height) * 100;
    }
    
    return Math.max(0, Math.min(100, position));
  }
  
  updatePosition(position) {
    this.state.position = position;
    
    requestAnimationFrame(() => {
      // Update before element clip
      if (this.config.direction === 'horizontal') {
        this.beforeEl.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
        this.sliderEl.style.left = `${position}%`;
        this.sliderEl.style.top = '0';
        this.sliderEl.style.height = '100%';
      } else {
        this.beforeEl.style.clipPath = `inset(0 0 ${100 - position}% 0)`;
        this.sliderEl.style.top = `${position}%`;
        this.sliderEl.style.left = '0';
        this.sliderEl.style.width = '100%';
      }
    });
  }
  
  destroy() {
    // Remove event listeners
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.wrapper.removeEventListener('mousedown', this.handleDragStart.bind(this));
    document.removeEventListener('mousemove', this.handleDrag.bind(this));
    document.removeEventListener('mouseup', this.handleDragEnd.bind(this));
    this.wrapper.removeEventListener('touchstart', this.handleDragStart.bind(this));
    document.removeEventListener('touchmove', this.handleDrag.bind(this));
    document.removeEventListener('touchend', this.handleDragEnd.bind(this));
    this.wrapper.removeEventListener('click', this.handleClick.bind(this));
    this.wrapper.removeEventListener('dblclick', this.handleReset.bind(this));
    
    // Clear references
    this.wrapper = null;
    this.beforeEl = null;
    this.afterEl = null;
    this.sliderEl = null;
    this.state = null;
    this.config = null;
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[ts-compare="true"]').forEach(element => {
    new BeforeAfter(element);
  });
}); 