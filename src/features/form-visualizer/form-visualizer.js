/**
 * Form Visualizer
 * A demonstration tool showing form data flow through business tools
 * @author Liam Miller
 * @version 1.0.0
 */

// Animation Utilities
class TypeWriter {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.currentChar = 0;
    this.isTyping = false;
  }

  async type() {
    this.isTyping = true;
    this.element.textContent = '';
    
    while (this.currentChar < this.text.length) {
      await new Promise(resolve => setTimeout(resolve, this.speed));
      this.element.textContent += this.text.charAt(this.currentChar);
      this.currentChar++;
    }
    
    this.isTyping = false;
    return true;
  }

  reset() {
    this.currentChar = 0;
    this.isTyping = false;
    this.element.textContent = '-';
  }
}

// State Management
class FormVisualizerState {
  constructor() {
    this.formData = {};
    this.currentStep = 1;
    this.steps = [
      { field: 'firstName', label: 'First Name' },
      { field: 'lastName', label: 'Last Name' },
      { field: 'companyName', label: 'Company Name' },
      { field: 'jobTitle', label: 'Job Title' }
    ];
    this.activeTab = 'crm';
    this.pipelineStage = 'unqualified';
    this.isComplete = false;
    this.animationStates = {
      crm: { played: false },
      pipeline: { played: false }
    };
  }

  updateFormData(field, value) {
    this.formData[field] = value;
    // Check if all fields are filled
    this.isComplete = this.steps.every(step => 
      this.formData[step.field] && this.formData['email']
    );
    return this.formData;
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    } else {
      this.currentStep = 1;
    }
    return this.steps[this.currentStep - 1];
  }

  getCurrentStep() {
    return this.steps[this.currentStep - 1];
  }

  setActiveTab(tab) {
    this.activeTab = tab;
    return this.activeTab;
  }

  updatePipelineStage() {
    const stages = ['unqualified', 'marketing', 'sales', 'opportunity', 'customer'];
    const completedFields = Object.keys(this.formData).length;
    
    if (completedFields <= 1) return 'unqualified';
    if (completedFields <= 2) return 'marketing';
    if (completedFields <= 3) return 'sales';
    if (completedFields <= 4) return 'opportunity';
    return 'customer';
  }

  reset() {
    this.formData = {};
    this.currentStep = 1;
    this.activeTab = 'crm';
    this.pipelineStage = 'unqualified';
    this.isComplete = false;
    this.resetAnimationStates();
  }

  resetAnimationStates() {
    this.animationStates = {
      crm: { played: false },
      pipeline: { played: false }
    };
  }

  markAnimationPlayed(tab) {
    this.animationStates[tab].played = true;
  }

  shouldPlayAnimation(tab) {
    return !this.animationStates[tab].played && Object.keys(this.formData).length > 0;
  }
}

// Animation Controller
class AnimationController {
  constructor() {
    this.gsap = window.gsap;
    this.defaultDuration = 0.3;
    this.loadingOverlay = document.querySelector('.loading-overlay');
    this.pageRefresh = document.querySelector('.page-refresh');
    this.writers = new Map();
  }

  fadeOut(element) {
    return this.gsap.to(element, {
      opacity: 0,
      duration: this.defaultDuration
    });
  }

  fadeIn(element) {
    return this.gsap.to(element, {
      opacity: 1,
      duration: this.defaultDuration
    });
  }

  async refreshAnimation(element) {
    // Show loading overlay
    this.loadingOverlay.classList.add('is-active');
    
    // Create timeline for page refresh effect
    const tl = this.gsap.timeline();
    
    // Flash screen white
    tl.to(this.pageRefresh, {
      opacity: 0.5,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(this.pageRefresh, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    // Wait for 1 second total
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hide loading overlay
    this.loadingOverlay.classList.remove('is-active');
    
    return tl;
  }

  moveCard(element, { x, y }) {
    return this.gsap.to(element, {
      x,
      y,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  updateProgress(step) {
    const steps = document.querySelectorAll('.progress_step');
    steps.forEach((stepEl, index) => {
      if (index + 1 < step) {
        stepEl.classList.add('is-complete');
        stepEl.classList.remove('is-active');
      } else if (index + 1 === step) {
        stepEl.classList.add('is-active');
        stepEl.classList.remove('is-complete');
      } else {
        stepEl.classList.remove('is-active', 'is-complete');
      }
    });
  }

  async animatePipelineCard(card, fromStage, toStage) {
    const fromColumn = document.querySelector(`[ts-pipeline="${fromStage}"]`);
    const toColumn = document.querySelector(`[ts-pipeline="${toStage}"]`);
    
    if (!fromColumn || !toColumn) return;
    
    const fromRect = fromColumn.getBoundingClientRect();
    const toRect = toColumn.getBoundingClientRect();
    
    const x = toRect.left - fromRect.left;
    
    await this.gsap.to(card, {
      x,
      duration: 0.8,
      ease: 'power2.inOut'
    });
    
    toColumn.appendChild(card);
    this.gsap.set(card, { x: 0 });
  }

  createTypeWriter(element, text) {
    if (!this.writers.has(element)) {
      this.writers.set(element, new TypeWriter(element, text));
    }
    return this.writers.get(element);
  }

  clearTypeWriters() {
    this.writers.forEach(writer => writer.reset());
    this.writers.clear();
  }
}

// Form Controller
class FormController {
  constructor(state, animations) {
    console.log('FormController initialized');
    this.state = state;
    this.animations = animations;
    this.emailField = document.querySelector('[ts-email]');
    this.dynamicField = document.querySelector('[ts-dynamic]');
    this.nextButton = document.querySelector('[ts-next]');
    this.submitButton = document.querySelector('[ts-submit]');
    this.clearButton = document.querySelector('[ts-clear]');
    this.formSteps = document.querySelectorAll('.form_step');
    
    // Track if email is locked
    this.emailLocked = false;
    this.emailValue = '';
    
    console.log('Found elements:', {
      emailField: !!this.emailField,
      dynamicField: !!this.dynamicField,
      nextButton: !!this.nextButton,
      submitButton: !!this.submitButton,
      clearButton: !!this.clearButton,
      formSteps: this.formSteps.length
    });
    
    this.completionMessage = `
      <div class="completion_message">
        <h3>Do this and more with Nodeo...</h3>
        <a href="/pricing" class="completion_button">View Pricing</a>
      </div>
    `;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    console.log('Setting up event listeners');
    if (this.nextButton) {
      this.nextButton.addEventListener('click', (e) => {
        console.log('Next button clicked');
        e.preventDefault();
        this.handleNext();
      });
    }
    
    if (this.submitButton) {
      this.submitButton.addEventListener('click', (e) => {
        console.log('Submit button clicked');
        e.preventDefault();
        this.handleSubmit();
      });
    }
    
    if (this.emailField) {
      this.emailField.addEventListener('input', (e) => {
        console.log('Email input:', e.target.value);
        this.validateEmail(e.target.value);
      });
    }
    
    if (this.clearButton) {
      this.clearButton.addEventListener('click', (e) => {
        console.log('Clear button clicked');
        e.preventDefault();
        this.handleClear();
      });
    }
  }

  async handleNext() {
    console.log('Handling next action');
    if (!this.validateEmail(this.emailField.value)) return;
    
    // Store email and update state
    this.emailValue = this.emailField.value;
    this.state.updateFormData('email', this.emailValue);
    
    // Lock email field
    this.emailField.disabled = true;
    this.emailField.classList.add('is-disabled');
    this.emailLocked = true;
    
    // Switch to next step
    await this.switchToStep(2);
    
    // Focus the dynamic field
    setTimeout(() => {
      this.dynamicField.focus();
    }, 300);
  }

  async handleSubmit() {
    console.log('Handling submit action');
    const dynamicValue = this.dynamicField.value.trim();
    
    if (!dynamicValue) {
      this.dynamicField.classList.add('is-invalid');
      return;
    }
    
    const currentStep = this.state.getCurrentStep();
    this.state.updateFormData(currentStep.field, dynamicValue);
    
    // Start loading animation
    await this.animations.refreshAnimation();
    
    // Clear dynamic field
    this.dynamicField.value = '';
    this.dynamicField.classList.remove('is-invalid');
    
    // Check if form is complete
    if (this.state.isComplete) {
      this.showCompletionMessage();
    } else {
      // Reset to step 1
      await this.switchToStep(1);
      
      // Update for next field
      const nextStep = this.state.nextStep();
      this.dynamicField.placeholder = nextStep.label;
    }
    
    // Dispatch form submit event
    document.dispatchEvent(new CustomEvent('formSubmit', {
      detail: { formData: this.state.formData }
    }));
  }

  showCompletionMessage() {
    const formContent = document.querySelector('.component_form');
    formContent.innerHTML = this.completionMessage;
  }

  async handleClear() {
    // Reset state
    this.state.reset();
    
    // Reset form fields and structure
    const formContent = document.querySelector('.component_form');
    formContent.innerHTML = `
      <div class="form_progress">
        <div class="progress_step is-active" data-step="1"></div>
        <div class="progress_step" data-step="2"></div>
        <div class="progress_step" data-step="3"></div>
        <div class="progress_step" data-step="4"></div>
      </div>
      <div class="form_step is-active" data-step="1">
        <div class="form_input-wrapper">
          <input type="email" class="form_input" ts-email placeholder="Email Address">
        </div>
        <div class="form_button-wrapper">
          <button class="form_button button_next" ts-next>Next</button>
        </div>
      </div>
      <div class="form_step" data-step="2">
        <div class="form_input-wrapper">
          <input type="text" class="form_input" ts-dynamic placeholder="First Name">
        </div>
        <div class="form_button-wrapper">
          <button class="form_button button_next" ts-submit>Submit</button>
        </div>
      </div>
    `;
    
    // Re-initialize elements
    this.emailField = document.querySelector('[ts-email]');
    this.dynamicField = document.querySelector('[ts-dynamic]');
    this.nextButton = document.querySelector('[ts-next]');
    this.submitButton = document.querySelector('[ts-submit]');
    this.formSteps = document.querySelectorAll('.form_step');
    
    // Reset email lock
    this.emailLocked = false;
    this.emailValue = '';
    
    // Setup event listeners again
    this.setupEventListeners();
    
    // Focus email field
    setTimeout(() => {
      this.emailField.focus();
    }, 300);
    
    // Reset visualizations with animation states
    document.dispatchEvent(new CustomEvent('formReset'));
  }

  validateEmail(email) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (this.emailField && !this.emailLocked) {
      this.emailField.classList.toggle('is-valid', isValid);
      this.emailField.classList.toggle('is-invalid', !isValid);
    }
    
    return isValid;
  }

  async switchToStep(step) {
    console.log('Switching to step:', step);
    const currentStep = document.querySelector('.form_step.is-active');
    const nextStep = document.querySelector(`.form_step[data-step="${step}"]`);
    
    if (!currentStep || !nextStep) {
      console.error('Missing step elements');
      return;
    }
    
    try {
      await this.animations.fadeOut(currentStep);
      currentStep.classList.remove('is-active');
      nextStep.classList.add('is-active');
      await this.animations.fadeIn(nextStep);
      
      this.animations.updateProgress(step);
      
      // Update dynamic field placeholder if moving to step 2
      if (step === 2) {
        this.dynamicField.placeholder = this.state.getCurrentStep().label;
      }
      
      console.log('Step switch complete');
    } catch (error) {
      console.error('Error switching steps:', error);
    }
  }
}

// Visualization Controller
class VisualizationController {
  constructor(state, animations) {
    this.state = state;
    this.animations = animations;
    this.tabButtons = document.querySelectorAll('[ts-tab]');
    this.tabContents = document.querySelectorAll('[ts-content]');
    this.stages = ['unqualified', 'marketing', 'sales', 'opportunity', 'customer'];
    this.currentCard = null;
    
    // Track last animated state for each view
    this.lastAnimatedState = {
      crm: {},
      pipeline: { stage: 'unqualified' }
    };
    
    this.setupEventListeners();
    this.setupFormListener();
  }

  setupEventListeners() {
    this.tabButtons.forEach(button => {
      button.addEventListener('click', () => this.switchTab(button.getAttribute('ts-tab')));
    });
  }

  setupFormListener() {
    document.addEventListener('formSubmit', async (e) => {
      await this.updateVisualizations(e.detail.formData, true);
    });
    document.addEventListener('formReset', () => this.resetVisualizations());
  }

  async updateVisualizations(data, isNewSubmission = false) {
    // Update data without animations for non-active tabs
    if (this.state.activeTab === 'crm') {
      // Animate CRM if it's active
      await this.updateCRM(data, true);
      // Update pipeline without animation
      await this.updatePipeline(data, false);
    } else if (this.state.activeTab === 'pipeline') {
      // Update CRM without animation
      await this.updateCRM(data, false);
      // Animate pipeline if it's active
      await this.updatePipeline(data, true);
    } else {
      // Update both without animation for other tabs
      await this.updateCRM(data, false);
      await this.updatePipeline(data, false);
    }
    
    // Always update business card
    this.updateBusinessCard(data);
    
    // Update last animated state
    if (isNewSubmission) {
      if (this.state.activeTab === 'crm') {
        this.lastAnimatedState.crm = { ...data };
      }
      if (this.state.activeTab === 'pipeline') {
        this.lastAnimatedState.pipeline.stage = this.state.updatePipelineStage();
      }
    }
  }

  async switchTab(tabId) {
    const currentContent = document.querySelector(`[ts-content="${this.state.activeTab}"]`);
    const newContent = document.querySelector(`[ts-content="${tabId}"]`);
    
    // Update tab buttons
    this.tabButtons.forEach(button => {
      button.classList.toggle('is-active', button.getAttribute('ts-tab') === tabId);
    });
    
    await this.animations.fadeOut(currentContent);
    currentContent.classList.remove('is-active');
    this.state.setActiveTab(tabId);
    newContent.classList.add('is-active');
    await this.animations.fadeIn(newContent);

    // Animate from last known state to current state
    if (Object.keys(this.state.formData).length > 0) {
      if (tabId === 'crm') {
        // Animate from last animated state to current state
        const fieldsToAnimate = {};
        const orderedFields = ['email', 'firstName', 'lastName', 'companyName', 'jobTitle'];
        
        for (const field of orderedFields) {
          if (this.state.formData[field] && this.state.formData[field] !== this.lastAnimatedState.crm[field]) {
            fieldsToAnimate[field] = this.state.formData[field];
          }
        }
        
        if (Object.keys(fieldsToAnimate).length > 0) {
          await this.updateCRM(this.state.formData, true);
          this.lastAnimatedState.crm = { ...this.state.formData };
        }
      } else if (tabId === 'pipeline') {
        const currentStage = this.state.updatePipelineStage();
        if (currentStage !== this.lastAnimatedState.pipeline.stage) {
          await this.updatePipeline(this.state.formData, true);
          this.lastAnimatedState.pipeline.stage = currentStage;
        }
      }
    }
  }

  async updateCRM(data, animate = true) {
    const orderedFields = ['email', 'firstName', 'lastName', 'companyName', 'jobTitle'];
    
    if (!animate) {
      // Update all fields instantly
      orderedFields.forEach(field => {
        const element = document.querySelector(`[ts-crm-${field}]`);
        if (element && data[field]) {
          element.textContent = data[field];
        }
      });
      return;
    }

    // Type each field in sequence, including previous fields
    for (const field of orderedFields) {
      const element = document.querySelector(`[ts-crm-${field}]`);
      if (element && data[field]) {
        // Only animate if the content is different from last animated state
        if (data[field] !== this.lastAnimatedState.crm[field]) {
          const writer = this.animations.createTypeWriter(element, data[field]);
          await writer.type();
          await new Promise(resolve => setTimeout(resolve, 200));
          this.lastAnimatedState.crm[field] = data[field];
        }
      }
    }
  }

  async updatePipeline(data, animate = true) {
    const newStage = this.state.updatePipelineStage();
    
    // Create or update card
    if (!this.currentCard) {
      this.currentCard = this.createPipelineCard(data);
      const firstColumn = document.querySelector(`[ts-pipeline="${this.stages[0]}"]`);
      firstColumn.appendChild(this.currentCard);
    } else {
      this.updatePipelineCard(this.currentCard, data);
    }
    
    if (!animate) {
      // Move card directly to final stage
      const container = document.querySelector(`[ts-pipeline="${newStage}"]`);
      if (container) container.appendChild(this.currentCard);
      return;
    }

    // Get current and target stages
    const currentStage = this.findCardStage(this.currentCard);
    const currentIndex = this.stages.indexOf(currentStage);
    const targetIndex = this.stages.indexOf(newStage);
    
    // Animate through each stage from current to target
    for (let i = currentIndex; i < targetIndex; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      await this.animations.animatePipelineCard(this.currentCard, this.stages[i], this.stages[i + 1]);
    }
  }

  findCardStage(card) {
    for (const stage of this.stages) {
      const container = document.querySelector(`[ts-pipeline="${stage}"]`);
      if (container && container.contains(card)) {
        return stage;
      }
    }
    return this.stages[0];
  }

  createPipelineCard(data) {
    const card = document.createElement('div');
    card.className = 'pipeline_card';
    this.updatePipelineCard(card, data);
    return card;
  }

  updatePipelineCard(card, data) {
    card.innerHTML = `
      <div class="card_name">${data.firstName || ''} ${data.lastName || ''}</div>
      <div class="card_company">${data.companyName || ''}</div>
      <div class="card_email">${data.email || ''}</div>
    `;
  }

  updateBusinessCard(data) {
    const name = document.querySelector('[ts-card-name]');
    const title = document.querySelector('[ts-card-title]');
    const company = document.querySelector('[ts-card-company]');
    const email = document.querySelector('[ts-card-email]');
    
    if (name) name.textContent = `${data.firstName || ''} ${data.lastName || ''}`.trim() || '-';
    if (title) title.textContent = data.jobTitle || '-';
    if (company) company.textContent = data.companyName || '-';
    if (email) email.textContent = data.email || '-';
  }

  resetVisualizations() {
    // Reset CRM
    document.querySelectorAll('[class*="ts-crm-"]').forEach(element => {
      element.textContent = '-';
    });
    
    // Reset Pipeline
    document.querySelectorAll('.pipeline_cards').forEach(container => {
      container.innerHTML = '';
    });
    this.currentCard = null;
    
    // Reset Business Card
    document.querySelectorAll('[class*="ts-card-"]').forEach(element => {
      element.textContent = '-';
    });
    
    // Reset animation states
    this.lastAnimatedState = {
      crm: {},
      pipeline: { stage: 'unqualified' }
    };
    this.animations.clearTypeWriters();
  }
}

// Main Form Visualizer Class
class FormVisualizer {
  constructor(config = {}) {
    this.config = {
      stepDuration: 300,
      refreshDuration: 1000,
      validateEmail: true,
      ...config
    };
    
    this.state = new FormVisualizerState();
    this.animations = new AnimationController();
    this.form = new FormController(this.state, this.animations);
    this.visualizations = new VisualizationController(this.state, this.animations);
  }

  reset() {
    this.state.reset();
    this.form.handleClear();
  }
}

// Auto-initialize if GSAP is available
if (typeof window !== 'undefined' && window.gsap) {
  document.addEventListener('DOMContentLoaded', () => {
    window.formVisualizer = new FormVisualizer();
  });
} 