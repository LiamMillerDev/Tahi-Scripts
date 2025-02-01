# Form Visualizer Documentation

## Overview
The Form Visualizer is an interactive demonstration tool that showcases form data flow through various business tools. It features a multi-step form with real-time visualization updates, animations, and state management.

## Features
- Multi-step form with progress tracking
- Real-time data visualization in CRM, Pipeline, and Business Card views
- Animated transitions and data updates
- Email validation and field locking
- Complete state management and reset functionality
- Responsive design with modern UI/UX

## Components

### FormVisualizer
Main class that initializes and coordinates all components.

```javascript
const formVisualizer = new FormVisualizer({
  stepDuration: 300,
  refreshDuration: 1000,
  validateEmail: true
});
```

### FormVisualizerState
Manages application state including:
- Form data
- Current step
- Active tab
- Pipeline stage
- Animation states
- Completion status

### FormController
Handles form interactions:
- Step navigation
- Email validation
- Field locking
- Form submission
- Form reset
- Progress tracking

### VisualizationController
Manages visualization updates:
- Tab switching
- CRM data display with typing animations
- Pipeline card movement
- Business card updates
- Animation state tracking

### AnimationController
Controls all animations:
- Typing effects
- Card movements
- Loading states
- Tab transitions
- Progress updates

## HTML Structure

### Basic Structure
```html
<div class="section_form-visualizer">
  <button class="button_clear">Clear All</button>
  
  <!-- Form Component -->
  <div class="component_form">
    <!-- Progress Indicator -->
    <div class="form_progress">...</div>
    
    <!-- Form Steps -->
    <div class="form_step">...</div>
  </div>
  
  <!-- Visualization Component -->
  <div class="component_visualizations">
    <!-- Tab Menu -->
    <div class="tabs_menu">...</div>
    
    <!-- Tab Content -->
    <div class="tabs_content">...</div>
  </div>
</div>
```

## Custom Attributes

### Form Attributes
- `ts-email`: Marks the email input field
- `ts-dynamic`: Marks the dynamic input field
- `ts-next`: Next button
- `ts-submit`: Submit button

### Visualization Attributes
- `ts-tab`: Tab button identifier
- `ts-content`: Tab content identifier

## Styling

### Required Classes
```css
.section_form-visualizer {
  /* Main wrapper styles */
}

.component_form {
  /* Form component styles */
}

.component_visualizations {
  /* Visualization component styles */
}

/* State Classes */
.is-active
.is-disabled
.is-loading
.is-complete
```

## JavaScript Events

### Form Events
```javascript
// Form step completed
document.addEventListener('formStepComplete', (e) => {
  const { step, data } = e.detail;
});

// Form submission
document.addEventListener('formSubmit', (e) => {
  const { formData } = e.detail;
});
```

### Visualization Events
```javascript
// Tab change
document.addEventListener('tabChange', (e) => {
  const { tab } = e.detail;
});

// Data update
document.addEventListener('dataUpdate', (e) => {
  const { type, data } = e.detail;
});
```

## Configuration Options

### Form Configuration
```javascript
{
  stepDuration: 300,        // Animation duration in ms
  refreshDuration: 1000,    // Refresh animation duration
  validateEmail: true,      // Enable email validation
}
```

## Examples

### Basic Implementation
```html
<div class="section_form-visualizer">
  <!-- Minimum required structure -->
  <div class="component_form">
    <!-- Form fields -->
  </div>
  <div class="component_visualizations">
    <!-- Visualization tabs -->
  </div>
</div>

<script>
  // Initialize form visualizer
  document.addEventListener('DOMContentLoaded', () => {
    new FormVisualizer();
  });
</script>
```

### Custom Configuration
```javascript
const formVisualizer = new FormVisualizer({
  stepDuration: 500,
  refreshDuration: 1500,
  validateEmail: true
});
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallback animations for older browsers
- Progressive enhancement approach

## Performance Notes
- Animations are optimized for 60fps
- Uses CSS transforms for smooth animations
- Minimal DOM operations
- Efficient state management

## Troubleshooting

### Common Issues
1. Animations not working
   - Check if GSAP is properly loaded
   - Verify browser compatibility

2. Form not submitting
   - Check console for validation errors
   - Verify event listeners

3. Visualizations not updating
   - Check data structure
   - Verify tab configuration 

## State Management
1. Form Data
   - Email (locked after entry)
   - First Name
   - Last Name
   - Company Name
   - Job Title

2. Pipeline Stages
   - Unqualified Lead (1 field)
   - Marketing Qualified (2 fields)
   - Sales Qualified (3 fields)
   - Opportunity (4 fields)
   - Customer (all fields)

3. Animation States
   - CRM typing animations
   - Pipeline card movements
   - Tab transitions
   - Loading states

## Events
- `formSubmit` - Triggered on form submission
- `formReset` - Triggered when form is cleared
- Tab change events
- Step navigation events

## Animation Details
1. Typing Animation
   - Speed: 50ms per character
   - Cursor blink effect
   - Sequential field updates

2. Pipeline Movement
   - Duration: 0.8s per stage
   - Easing: power2.inOut
   - Card scaling on hover

3. Tab Transitions
   - Fade duration: 0.3s
   - Content slide effect
   - Smooth tab indicator

## Performance Considerations
- Efficient DOM updates
- Optimized animation frame rates
- Minimal layout shifts
- Smooth scrolling
- Responsive breakpoints

## Dependencies
- GSAP (for animations)
- Modern CSS features
- ES6+ JavaScript

## Usage
1. Include required files
2. Initialize FormVisualizer
3. Configure options if needed
4. Handle form submissions
5. Manage state updates

## Best Practices
1. Keep animations smooth and purposeful
2. Maintain clear visual hierarchy
3. Provide immediate user feedback
4. Ensure accessibility
5. Handle edge cases gracefully 