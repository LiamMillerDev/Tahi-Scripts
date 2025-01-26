/**
 * Auto Tabs
 * A lightweight tab rotation system for Webflow
 * @version 1.0.2
 * @author Liam Miller
 * @repository https://github.com/liammillerdev/webflow-scripts
 */

class AutoTabs {
  constructor(element) {
    // Core element
    this.wrapper = element;
    
    // Configuration (with defaults)
    this.config = {
      speed: parseInt(this.wrapper.getAttribute('ts-tabs-speed')) || 5000,
      startInView: this.wrapper.getAttribute('ts-start-in-view') !== 'false',
      hoverPause: this.wrapper.getAttribute('ts-hover-pause') === 'true',
      manualMode: this.wrapper.getAttribute('ts-manual-mode') === 'true'
    };
    
    // State
    this.state = {
      mode: this.config.startInView ? 'IDLE' : 'AUTO',
      currentTab: null
    };
    
    // Timers
    this.timer = null;
    this.init();
  }
  
  init() {
    // Get initial tab
    this.state.currentTab = this.wrapper.querySelector('.w-tab-link.w--current');
    
    // Core event listeners
    this.wrapper.addEventListener('click', this.handleClick.bind(this), { passive: true });
    
    if (this.config.hoverPause) {
      this.wrapper.addEventListener('mouseenter', this.handleHover.bind(this), { passive: true });
      this.wrapper.addEventListener('mouseleave', this.handleLeave.bind(this), { passive: true });
    }
    
    // Start in view detection
    if (this.config.startInView) {
      new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && this.state.mode === 'IDLE') {
          this.state.mode = 'AUTO';
          this.startRotation();
        }
      }, { threshold: 0.25 }).observe(this.wrapper);
    } else {
      this.startRotation();
    }
  }
  
  handleClick(event) {
    const tab = event.target.closest('.w-tab-link');
    if (!tab || tab.dataset.automated) return;
    
    this.state.currentTab = tab;
    this.state.mode = 'MANUAL';
    this.stopRotation();
  }
  
  handleHover() {
    if (this.state.mode === 'AUTO') {
      this.pauseRotation();
    }
  }
  
  handleLeave() {
    if (this.state.mode === 'MANUAL' && !this.config.manualMode) {
      this.state.mode = 'AUTO';
      this.startRotation();
    } else if (this.state.mode === 'PAUSED') {
      this.resumeRotation();
    }
  }
  
  startRotation() {
    if (this.state.mode !== 'AUTO') return;
    
    this.showProgress();
    const loader = this.getCurrentLoader();
    if (loader) {
      loader.style.transition = `width ${this.config.speed}ms linear`;
      loader.style.width = '100%';
    }
    
    this.timer = setTimeout(() => this.rotateToNextTab(), this.config.speed);
  }
  
  pauseRotation() {
    if (this.state.mode !== 'AUTO') return;
    
    this.state.mode = 'PAUSED';
    clearTimeout(this.timer);
    
    const loader = this.getCurrentLoader();
    if (loader) {
      const computedWidth = getComputedStyle(loader).width;
      const parentWidth = loader.parentElement.offsetWidth;
      const progressPercent = (parseFloat(computedWidth) / parentWidth) * 100;
      
      loader.style.transition = 'none';
      loader.style.width = `${progressPercent}%`;
    }
  }
  
  resumeRotation() {
    if (this.state.mode !== 'PAUSED') return;
    
    const loader = this.getCurrentLoader();
    if (!loader) return;
    
    const currentWidth = parseFloat(loader.style.width);
    const remainingTime = this.config.speed * (1 - (currentWidth / 100));
    
    this.state.mode = 'AUTO';
    loader.style.transition = `width ${remainingTime}ms linear`;
    loader.style.width = '100%';
    
    this.timer = setTimeout(() => this.rotateToNextTab(), remainingTime);
  }
  
  stopRotation() {
    clearTimeout(this.timer);
    this.hideProgress();
  }
  
  rotateToNextTab() {
    if (this.state.mode !== 'AUTO') return;
    
    let next = this.state.currentTab.nextElementSibling;
    if (!next || !next.classList.contains('w-tab-link')) {
      next = this.wrapper.querySelector('.w-tab-link');
    }
    
    if (next) {
      next.dataset.automated = true;
      next.click();
      delete next.dataset.automated;
      
      this.state.currentTab = next;
      this.showProgress();
      this.startRotation();
    }
  }
  
  getCurrentLoader() {
    return this.state.currentTab?.querySelector('[ts-progress-bar="loader"]') || null;
  }
  
  showProgress() {
    // Hide all progress bars first
    this.hideProgress();
    
    const currentTab = this.state.currentTab;
    if (!currentTab) return;
    
    const base = currentTab.querySelector('[ts-progress-bar="base"]');
    const loader = currentTab.querySelector('[ts-progress-bar="loader"]');
    
    if (base) base.style.display = 'block';
    if (loader) {
      loader.style.transition = 'none';
      loader.style.display = 'block';
      loader.style.width = '0%';
      // Force reflow
      void loader.offsetWidth;
    }
  }
  
  hideProgress() {
    this.wrapper.querySelectorAll('[ts-progress-bar]').forEach(bar => {
      bar.style.display = 'none';
      if (bar.getAttribute('ts-progress-bar') === 'loader') {
        bar.style.width = '0%';
      }
    });
  }
  
  destroy() {
    this.stopRotation();
    this.wrapper = null;
    this.state = null;
    this.config = null;
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[ts-tabs="true"]').forEach(element => {
    new AutoTabs(element);
  });
}); 