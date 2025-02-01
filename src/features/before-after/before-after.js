/**
 * Before-After Comparison
 * A lightweight image comparison system for Webflow
 * @version 1.0.1
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
    this.percentageEl = this.wrapper.querySelector('[ts-percentage]');
    
    // Configuration
    this.config = {
      direction: this.wrapper.getAttribute('ts-direction') || 'vertical',
      showPercentage: this.wrapper.getAttribute('ts-show-percentage') === 'true',
      initialPosition: parseInt(this.wrapper.getAttribute('ts-initial-position')) || 50
    };
    
    // State
    this.state = {
      isDragging: false,
      position: this.config.initialPosition,
      bounds: null
    };
    
    // Initialize if all required elements exist
    if (this.beforeEl && this.afterEl && this.sliderEl) {
      this.init();
    } else {
      console.warn('BeforeAfter: Missing required elements');
    }
  }
  
  init() {
    // Set initial styles
    this.wrapper.style.position = 'relative';
    this.wrapper.style.overflow = 'hidden';
    
    this.beforeEl.style.position = 'absolute';
    this.beforeEl.style.top = '0';
    this.beforeEl.style.left = '0';
    this.beforeEl.style.width = '100%';
    this.beforeEl.style.height = '100%';
    
    this.afterEl.style.position = 'absolute';
    this.afterEl.style.top = '0';
    this.afterEl.style.left = '0';
    this.afterEl.style.width = '100%';
    this.afterEl.style.height = '100%';
    
    this.sliderEl.style.position = 'absolute';
    this.sliderEl.style.zIndex = '10';
    
    if (this.percentageEl) {
      this.percentageEl.style.position = 'absolute';
      this.percentageEl.style.zIndex = '11';
    }
    
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
      } else {
        this.beforeEl.style.clipPath = `inset(0 0 ${100 - position}% 0)`;
      }
      
      // Update slider position
      if (this.config.direction === 'horizontal') {
        this.sliderEl.style.left = `${position}%`;
      } else {
        this.sliderEl.style.top = `${position}%`;
      }
      
      // Update percentage display if enabled
      if (this.config.showPercentage && this.percentageEl) {
        this.percentageEl.textContent = `${Math.round(position)}%`;
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
    this.percentageEl = null;
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