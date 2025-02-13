/**
 * Adventure Flow
 * An interactive path selection system with visual connections
 * @version 1.0.0
 * @author Liam Miller
 */

class AdventureFlow {
  constructor(selector, options = {}) {
    // Core elements
    this.wrapper = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!this.wrapper) {
      console.error('AdventureFlow: Wrapper element not found');
      return;
    }
    
    // Configuration
    this.config = {
      animationSpeed: options.animationSpeed || 300,
      pathDuration: options.pathDuration || 500,
      fadeDuration: options.fadeDuration || 200,
      pathStyle: options.pathStyle || 'orthogonal',
      pathColor: options.pathColor || '#4299e1',
      pathWidth: options.pathWidth || 2,
      enableTouch: options.enableTouch !== false,
      enableKeyboard: options.enableKeyboard !== false,
      onSelect: options.onSelect || (() => {}),
      onPathComplete: options.onPathComplete || (() => {}),
      onReset: options.onReset || (() => {})
    };
    
    // State
    this.state = {
      mouseX: 0,
      mouseY: 0,
      selectedCards: new Map(),
      activePaths: new Map(),
      currentTier: 1,
      isAnimating: false
    };
    
    // Elements
    this.elements = {
      svg: this.wrapper.querySelector('.path_layer'),
      mousePath: this.wrapper.querySelector('.path_mouse'),
      startConnector: this.wrapper.querySelector('.connector_start'),
      tiers: Array.from(this.wrapper.querySelectorAll('.tier_wrapper'))
    };
    
    // Initialize
    this.init();
  }
  
  init() {
    // Set up SVG viewBox
    this.updateSVGViewBox();
    
    // Bind events
    this.bindEvents();
    
    // Initial setup
    this.hideConditionalContent();
    
    // Start animation frame
    this.animate();
  }
  
  bindEvents() {
    // Mouse events
    this.wrapper.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.wrapper.addEventListener('click', this.handleClick.bind(this));
    
    // Card events
    this.wrapper.addEventListener('mouseenter', this.handleCardHover.bind(this), true);
    this.wrapper.addEventListener('mouseleave', this.handleCardLeave.bind(this), true);
    
    // Touch events
    if (this.config.enableTouch) {
      this.wrapper.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      this.wrapper.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
      this.wrapper.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }
    
    // Keyboard events
    if (this.config.enableKeyboard) {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    // Window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  // Event Handlers
  handleMouseMove(e) {
    const rect = this.wrapper.getBoundingClientRect();
    this.state.mouseX = e.clientX - rect.left;
    this.state.mouseY = e.clientY - rect.top;
  }
  
  handleClick(e) {
    const card = e.target.closest('.card_selection');
    if (!card) return;
    
    const option = card.getAttribute('ts-option');
    if (!option) return;
    
    this.selectCard(card, option);
  }
  
  handleCardHover(e) {
    const card = e.target.closest('.card_selection');
    if (!card) return;
    
    card.classList.add('is-highlighted');
  }
  
  handleCardLeave(e) {
    const card = e.target.closest('.card_selection');
    if (!card) return;
    
    card.classList.remove('is-highlighted');
  }
  
  handleTouchStart(e) {
    const touch = e.touches[0];
    const rect = this.wrapper.getBoundingClientRect();
    this.state.mouseX = touch.clientX - rect.left;
    this.state.mouseY = touch.clientY - rect.top;
  }
  
  handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.wrapper.getBoundingClientRect();
    this.state.mouseX = touch.clientX - rect.left;
    this.state.mouseY = touch.clientY - rect.top;
  }
  
  handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const card = element?.closest('.card_selection');
    
    if (card) {
      const option = card.getAttribute('ts-option');
      if (option) {
        this.selectCard(card, option);
      }
    }
  }
  
  handleKeyDown(e) {
    // Handle keyboard navigation
    if (e.key === 'Escape') {
      this.reset();
    }
  }
  
  handleResize() {
    this.updateSVGViewBox();
    this.updatePaths();
  }
  
  // Core Functionality
  selectCard(card, option) {
    if (this.state.isAnimating) return;
    this.state.isAnimating = true;
    
    // Get tier information
    const tierWrapper = card.closest('.tier_wrapper');
    const tier = parseInt(tierWrapper.getAttribute('data-tier'));
    
    // Check if card is already selected
    const currentSelection = this.state.selectedCards.get(tier);
    if (currentSelection?.option === option) {
      this.state.isAnimating = false;
      return;
    }
    
    // Clear subsequent selections
    this.clearSelectionsAfterTier(tier - 1);
    
    // Update state
    this.state.selectedCards.set(tier, { card, option });
    this.state.currentTier = tier;
    
    // Update UI
    this.updateCardStates();
    
    // Show next tier's conditional content
    if (tier < 3) {
      this.showConditionalContent(option);
    }
    
    // Create connection path
    this.createConnectionPath(card);
    
    // Trigger callback
    this.config.onSelect(option);
    
    // Animation complete
    setTimeout(() => {
      this.state.isAnimating = false;
    }, this.config.animationSpeed);
  }
  
  clearSelectionsAfterTier(tier) {
    for (let i = tier + 1; i <= this.elements.tiers.length; i++) {
      this.state.selectedCards.delete(i);
      this.state.activePaths.delete(i);
    }
  }
  
  updateCardStates() {
    // Reset all cards
    this.wrapper.querySelectorAll('.card_selection').forEach(card => {
      card.classList.remove('is-active');
      card.classList.remove('is-disabled');
    });
    
    // Update selected cards and disable others in same tier
    this.state.selectedCards.forEach(({ card, option }, tier) => {
      card.classList.add('is-active');
      
      // Disable other cards in the same tier
      const tierWrapper = card.closest('.tier_wrapper');
      tierWrapper.querySelectorAll('.card_selection').forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.add('is-disabled');
        }
      });
    });
    
    // Enable cards in the next tier if they're in the active group
    const nextTier = this.state.currentTier + 1;
    const nextTierWrapper = this.elements.tiers[nextTier - 1];
    if (nextTierWrapper) {
      const activeGroup = nextTierWrapper.querySelector('.card_group.is-active');
      if (activeGroup) {
        activeGroup.querySelectorAll('.card_selection').forEach(card => {
          card.classList.remove('is-disabled');
        });
      }
    }
  }
  
  showConditionalContent(parentOption) {
    const nextTier = this.state.currentTier + 1;
    const tierWrapper = this.elements.tiers[nextTier - 1];
    if (!tierWrapper) return;
    
    // Hide all groups in this tier
    tierWrapper.querySelectorAll('.card_group').forEach(group => {
      group.classList.remove('is-active');
    });
    
    // Show relevant group
    const targetGroup = tierWrapper.querySelector(`[ts-parent="${parentOption}"]`);
    if (targetGroup) {
      targetGroup.classList.add('is-active');
      
      // If this is tier 2, also show relevant pricing
      if (nextTier === 2) {
        // Hide all pricing groups first
        const pricingTier = this.elements.tiers[2];
        if (pricingTier) {
          pricingTier.querySelectorAll('.card_group').forEach(group => {
            group.classList.remove('is-active');
          });
        }
      }
    }
  }
  
  hideConditionalContent() {
    this.wrapper.querySelectorAll('.card_group').forEach(group => {
      group.classList.remove('is-active');
    });
  }
  
  createConnectionPath(toCard) {
    const fromElement = this.state.currentTier === 1 
      ? this.elements.startConnector 
      : this.state.selectedCards.get(this.state.currentTier - 1)?.card;
    
    if (!fromElement || !toCard) return;
    
    const path = this.calculatePath(fromElement, toCard);
    const pathElement = this.createSVGPath(path);
    
    // Store path
    this.state.activePaths.set(this.state.currentTier, pathElement);
    
    // Animate path
    this.animatePath(pathElement);
  }
  
  calculatePath(fromElement, toElement) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    const wrapperRect = this.wrapper.getBoundingClientRect();
    
    const from = {
      x: fromRect.left + fromRect.width / 2 - wrapperRect.left,
      y: fromRect.bottom - wrapperRect.top // Changed to bottom for first tier
    };
    
    const to = {
      x: toRect.left + toRect.width / 2 - wrapperRect.left,
      y: toRect.top - wrapperRect.top
    };
    
    // Create path with rounded corners
    const midY = (from.y + to.y) / 2;
    const radius = 20; // Corner radius
    
    // Calculate control points for rounded corners
    const y1 = from.y - radius;
    const y2 = midY + radius;
    const y3 = midY - radius;
    const y4 = to.y + radius;
    
    return `M ${from.x} ${from.y}
            L ${from.x} ${y1}
            Q ${from.x} ${midY} ${from.x < to.x ? from.x + radius : from.x - radius} ${midY}
            L ${to.x < from.x ? to.x + radius : to.x - radius} ${midY}
            Q ${to.x} ${midY} ${to.x} ${y4}
            L ${to.x} ${to.y}`;
  }
  
  createSVGPath(pathData) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'path_connection');
    path.setAttribute('d', pathData);
    this.elements.svg.appendChild(path);
    return path;
  }
  
  animatePath(pathElement) {
    // Get path length
    const length = pathElement.getTotalLength();
    
    // Set up animation
    pathElement.style.strokeDasharray = length;
    pathElement.style.strokeDashoffset = length;
    
    // Force reflow
    pathElement.getBoundingClientRect();
    
    // Animate
    pathElement.style.transition = `stroke-dashoffset ${this.config.pathDuration}ms ease`;
    pathElement.style.strokeDashoffset = '0';
    pathElement.classList.add('is-active');
  }
  
  updateMousePath() {
    if (!this.elements.mousePath) return;
    
    const fromElement = this.state.currentTier === 1 
      ? this.elements.startConnector 
      : this.state.selectedCards.get(this.state.currentTier)?.card;
    
    if (!fromElement) return;
    
    const rect = this.wrapper.getBoundingClientRect();
    const fromRect = fromElement.getBoundingClientRect();
    
    const from = {
      x: fromRect.left + fromRect.width / 2 - rect.left,
      y: this.state.currentTier === 1 
        ? fromRect.bottom - rect.top 
        : fromRect.bottom - rect.top
    };
    
    // Create curved path to mouse
    const midY = (from.y + this.state.mouseY) / 2;
    const radius = 20;
    
    const path = `M ${from.x} ${from.y}
                  L ${from.x} ${midY - radius}
                  Q ${from.x} ${midY} ${from.x < this.state.mouseX ? from.x + radius : from.x - radius} ${midY}
                  L ${this.state.mouseX < from.x ? this.state.mouseX + radius : this.state.mouseX - radius} ${midY}
                  Q ${this.state.mouseX} ${midY} ${this.state.mouseX} ${this.state.mouseY}`;
                  
    this.elements.mousePath.setAttribute('d', path);
  }
  
  updateSVGViewBox() {
    const rect = this.wrapper.getBoundingClientRect();
    this.elements.svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
  }
  
  updatePaths() {
    // Clear existing paths
    this.state.activePaths.forEach(path => path.remove());
    this.state.activePaths.clear();
    
    // Recreate paths
    this.state.selectedCards.forEach(({ card }, tier) => {
      if (tier > 1) {
        this.createConnectionPath(card);
      }
    });
  }
  
  reset() {
    // Clear state
    this.state.selectedCards.clear();
    this.state.activePaths.forEach(path => path.remove());
    this.state.activePaths.clear();
    this.state.currentTier = 1;
    
    // Reset UI
    this.updateCardStates();
    this.hideConditionalContent();
    
    // Trigger callback
    this.config.onReset();
  }
  
  animate() {
    this.updateMousePath();
    requestAnimationFrame(this.animate.bind(this));
  }
  
  // Public Methods
  select(optionId) {
    const card = this.wrapper.querySelector(`[ts-option="${optionId}"]`);
    if (card) {
      this.selectCard(card, optionId);
    }
  }
  
  highlightPath(optionId) {
    const card = this.wrapper.querySelector(`[ts-option="${optionId}"]`);
    if (card) {
      card.classList.add('is-highlighted');
    }
  }
  
  disable(optionId) {
    const card = this.wrapper.querySelector(`[ts-option="${optionId}"]`);
    if (card) {
      card.classList.add('is-disabled');
    }
  }
  
  enable(optionId) {
    const card = this.wrapper.querySelector(`[ts-option="${optionId}"]`);
    if (card) {
      card.classList.remove('is-disabled');
    }
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.section_adventure-flow');
  elements.forEach(element => new AdventureFlow(element));
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdventureFlow;
} 