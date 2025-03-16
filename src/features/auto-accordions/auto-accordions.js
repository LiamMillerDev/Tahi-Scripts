/**
 * Auto Accordions
 * A lightweight, performant accordion system for Webflow
 * @version 1.0.0
 * @author Liam Miller
 * @repository https://github.com/LiamMillerDev/Tahi-Scripts
 */

class AutoAccordions {
  constructor(element) {
    // Core element
    this.wrapper = element;
    
    // Configuration (with defaults)
    this.config = {
      transitionSpeed: parseInt(this.wrapper.getAttribute('ts-transition-speed')) || 200,
      mobileOnly: this.wrapper.getAttribute('ts-mobile-only') !== 'false',
      mobileBreakpoint: parseInt(this.wrapper.getAttribute('ts-mobile-breakpoint')) || 990,
      defaultOpen: parseInt(this.wrapper.getAttribute('ts-default-open')) || 0,
      allowAllClosed: this.wrapper.getAttribute('ts-allow-all-closed') === 'true'
    };
    
    // DOM elements
    this.items = Array.from(this.wrapper.querySelectorAll('[ts-accordion-item]'));
    
    // State
    this.state = {
      activeIndex: this.config.defaultOpen,
      isMobile: window.innerWidth < this.config.mobileBreakpoint,
      transitioning: false
    };
    
    // Observers
    this.resizeObserver = null;
    
    // Initialize
    this.init();
  }
  
  /**
   * Initialize the accordion
   */
  init() {
    // Skip initialization if empty
    if (!this.items.length) return;
    
    // Setup ARIA attributes
    this.setupAccessibility();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Apply initial state
    this.updateMobileState();
    
    // Setup ResizeObserver for dynamic height calculations
    this.setupResizeObserver();
  }
  
  /**
   * Setup ARIA attributes for accessibility
   */
  setupAccessibility() {
    this.wrapper.setAttribute('role', 'tablist');
    this.wrapper.setAttribute('aria-multiselectable', this.config.allowAllClosed ? 'true' : 'false');
    
    this.items.forEach((item, index) => {
      const id = `accordion-${this.getUniqueId()}-${index}`;
      const headerId = `${id}-header`;
      const contentId = `${id}-content`;
      
      const header = item.querySelector('[ts-accordion-header]');
      const content = item.querySelector('[ts-accordion-content]');
      
      if (header && content) {
        // Header attributes
        header.setAttribute('id', headerId);
        header.setAttribute('role', 'tab');
        header.setAttribute('aria-controls', contentId);
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('tabindex', '0');
        
        // Content attributes
        content.setAttribute('id', contentId);
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', headerId);
        content.setAttribute('aria-hidden', 'true');
        
        // Style preparation
        content.style.overflow = 'hidden';
        content.style.transition = `height ${this.config.transitionSpeed}ms ease`;
        content.style.height = '0px';
      }
    });
  }
  
  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Click handlers for headers
    this.items.forEach((item, index) => {
      const header = item.querySelector('[ts-accordion-header]');
      if (header) {
        header.addEventListener('click', () => this.toggleAccordion(index), { passive: true });
        
        // Keyboard support
        header.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleAccordion(index);
          }
        });
      }
    });
    
    // Debounced resize handler
    const debouncedResize = this.debounce(() => {
      const wasMobile = this.state.isMobile;
      this.state.isMobile = window.innerWidth < this.config.mobileBreakpoint;
      
      // Only update if mobile state changed
      if (wasMobile !== this.state.isMobile) {
        this.updateMobileState();
      }
    }, 150);
    
    window.addEventListener('resize', debouncedResize, { passive: true });
  }
  
  /**
   * Setup ResizeObserver for content height changes
   */
  setupResizeObserver() {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const content = entry.target;
          const index = this.items.findIndex(item => 
            item.querySelector('[ts-accordion-content]') === content
          );
          
          if (index === this.state.activeIndex && this.state.isMobile) {
            // Update height for active content when its contents change
            this.updateContentHeight(content);
          }
        });
      });
      
      // Observe all content elements
      this.items.forEach(item => {
        const content = item.querySelector('[ts-accordion-content]');
        if (content) this.resizeObserver.observe(content);
      });
    }
  }
  
  /**
   * Toggle accordion at specified index
   * @param {number} index - The index of the accordion to toggle
   */
  toggleAccordion(index) {
    // Skip if not in mobile mode and mobile-only is enabled
    if (this.config.mobileOnly && !this.state.isMobile) return;
    
    // Skip if already transitioning
    if (this.state.transitioning) return;
    
    const wasActive = index === this.state.activeIndex;
    
    // Don't allow closing if allowAllClosed is false
    if (wasActive && !this.config.allowAllClosed) return;
    
    // Close current accordion
    if (this.state.activeIndex !== null) {
      this.closeAccordion(this.state.activeIndex);
    }
    
    // Either open new accordion or update active index
    if (!wasActive) {
      this.openAccordion(index);
    } else {
      this.state.activeIndex = null;
    }
  }
  
  /**
   * Open accordion at specified index
   * @param {number} index - The index of the accordion to open
   */
  openAccordion(index) {
    const item = this.items[index];
    if (!item) return;
    
    const header = item.querySelector('[ts-accordion-header]');
    const content = item.querySelector('[ts-accordion-content]');
    
    if (header && content) {
      // Update ARIA attributes
      header.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
      
      // Apply open styles
      item.classList.add('is-active');
      
      // Animate height
      this.animateHeight(content, 'open');
      
      // Update active index
      this.state.activeIndex = index;
    }
  }
  
  /**
   * Close accordion at specified index
   * @param {number} index - The index of the accordion to close
   */
  closeAccordion(index) {
    const item = this.items[index];
    if (!item) return;
    
    const header = item.querySelector('[ts-accordion-header]');
    const content = item.querySelector('[ts-accordion-content]');
    
    if (header && content) {
      // Update ARIA attributes
      header.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      
      // Remove active class
      item.classList.remove('is-active');
      
      // Animate height
      this.animateHeight(content, 'close');
    }
  }
  
  /**
   * Animate content height
   * @param {HTMLElement} content - The content element to animate
   * @param {string} action - Either 'open' or 'close'
   */
  animateHeight(content, action) {
    if (action === 'open') {
      // Set transitioning state
      this.state.transitioning = true;
      
      // Get natural height
      content.style.height = 'auto';
      content.style.position = 'absolute';
      content.style.visibility = 'hidden';
      content.style.display = 'block';
      
      const height = content.offsetHeight;
      
      // Reset for animation
      content.style.position = '';
      content.style.visibility = '';
      content.style.display = '';
      content.style.height = '0px';
      
      // Force reflow
      void content.offsetHeight;
      
      // Animate to full height
      content.style.height = `${height}px`;
      
      // Clear transitioning state after animation completes
      setTimeout(() => {
        this.state.transitioning = false;
        content.style.height = 'auto';
      }, this.config.transitionSpeed);
      
    } else if (action === 'close') {
      // Set transitioning state
      this.state.transitioning = true;
      
      // Get current height
      const height = content.offsetHeight;
      content.style.height = `${height}px`;
      
      // Force reflow
      void content.offsetHeight;
      
      // Animate to 0
      content.style.height = '0px';
      
      // Clear transitioning state after animation completes
      setTimeout(() => {
        this.state.transitioning = false;
      }, this.config.transitionSpeed);
    }
  }
  
  /**
   * Update content height for dynamic content
   * @param {HTMLElement} content - The content element to update
   */
  updateContentHeight(content) {
    if (!content || this.state.transitioning) return;
    
    // Save current scroll position
    const scrollPos = window.scrollY;
    
    // Temporarily set auto height to measure
    content.style.height = 'auto';
    const height = content.offsetHeight;
    
    // Reset height to maintain smooth appearance
    content.style.height = `${height}px`;
    
    // Restore scroll position
    window.scrollTo(0, scrollPos);
  }
  
  /**
   * Update state based on mobile/desktop mode
   */
  updateMobileState() {
    const isMobile = this.state.isMobile;
    
    if (this.config.mobileOnly && !isMobile) {
      // Reset all styles for desktop
      this.items.forEach(item => {
        const content = item.querySelector('[ts-accordion-content]');
        const header = item.querySelector('[ts-accordion-header]');
        
        if (content) {
          content.style.height = '';
          content.style.overflow = '';
        }
        
        if (header) {
          header.setAttribute('aria-expanded', 'true');
        }
        
        item.classList.remove('is-active');
      });
    } else {
      // Initialize for mobile
      // Close all items first
      this.items.forEach((item, index) => {
        const content = item.querySelector('[ts-accordion-content]');
        const header = item.querySelector('[ts-accordion-header]');
        
        if (content) {
          content.style.height = '0px';
          content.style.overflow = 'hidden';
        }
        
        if (header) {
          header.setAttribute('aria-expanded', 'false');
        }
        
        item.classList.remove('is-active');
      });
      
      // Open default item if specified
      if (this.config.defaultOpen >= 0 && this.config.defaultOpen < this.items.length) {
        this.openAccordion(this.config.defaultOpen);
      }
    }
  }
  
  /**
   * Generate a unique ID
   * @returns {string} A unique ID string
   */
  getUniqueId() {
    return Math.random().toString(36).substring(2, 9);
  }
  
  /**
   * Simple debounce function
   * @param {function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {function} Debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  /**
   * Clean up resources
   */
  destroy() {
    // Clean up ResizeObserver
    if (this.resizeObserver) {
      this.items.forEach(item => {
        const content = item.querySelector('[ts-accordion-content]');
        if (content) this.resizeObserver.unobserve(content);
      });
      this.resizeObserver = null;
    }
    
    // Reset styles
    this.items.forEach(item => {
      const content = item.querySelector('[ts-accordion-content]');
      if (content) {
        content.style.height = '';
        content.style.overflow = '';
        content.style.transition = '';
      }
    });
    
    // Clear references
    this.wrapper = null;
    this.items = null;
    this.state = null;
    this.config = null;
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[ts-accordions="true"]').forEach(element => {
    new AutoAccordions(element);
  });
}); 