# Auto Accordions Documentation

## Installation

Add the script to your Webflow project's before `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/tahistudio/webflow-scripts@latest/auto-accordions.js"></script>
```

## HTML Structure

```html
<div class="accordion-container" ts-accordions="true" ts-transition-speed="200" ts-mobile-only="true" ts-mobile-breakpoint="990" ts-default-open="0" ts-allow-all-closed="false">
  <!-- Accordion Item 1 -->
  <div class="accordion-item" ts-accordion-item>
    <div class="accordion-header" ts-accordion-header>
      <div class="accordion-title">Item 1</div>
      <div class="accordion-icon"></div>
    </div>
    <div class="accordion-content" ts-accordion-content>
      <p>Content for item 1</p>
    </div>
  </div>
  
  <!-- Accordion Item 2 -->
  <div class="accordion-item" ts-accordion-item>
    <div class="accordion-header" ts-accordion-header>
      <div class="accordion-title">Item 2</div>
      <div class="accordion-icon"></div>
    </div>
    <div class="accordion-content" ts-accordion-content>
      <p>Content for item 2</p>
    </div>
  </div>
  
  <!-- Add more accordion items as needed -->
</div>
```

## Configuration

### Attributes
All attributes use the `ts-` prefix for consistency:

- `ts-accordions`: Enable auto-accordions functionality (true/false)
- `ts-transition-speed`: Transition speed in milliseconds (default: 200)
- `ts-mobile-only`: Only activate on mobile/tablet (default: true)
- `ts-mobile-breakpoint`: Mobile breakpoint in pixels (default: 990)
- `ts-default-open`: Index of initially open accordion (default: 0)
- `ts-allow-all-closed`: Allow all accordions to be closed (default: false)

### Styling Hooks

The script provides the following state classes for styling:

- `.is-active`: Applied to the active accordion item

### Example CSS Variables Setup

The script works great with CSS variables for theming. Here's an example setup:

```css
:root {
  /* Default theme colors */
  --accordion-bg-default: #f7f7f7;
  --accordion-bg-active: #ffffff;
  --accordion-text-default: #333333;
  --accordion-text-active: #0066ff;
  --accordion-icon-color: #333333;
  --accordion-border-color: #e0e0e0;
  --accordion-transition-speed: 200ms;
}

/* Accordion container */
.accordion-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* Accordion item */
.accordion-item {
  margin-bottom: 10px;
  border: 1px solid var(--accordion-border-color);
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--accordion-bg-default);
  transition: background-color var(--accordion-transition-speed) ease;
}

/* Accordion header */
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
}

/* Accordion title */
.accordion-title {
  font-weight: 500;
  color: var(--accordion-text-default);
  transition: color var(--accordion-transition-speed) ease;
}

/* Accordion icon (plus/minus) */
.accordion-icon {
  position: relative;
  width: 16px;
  height: 16px;
  transition: transform var(--accordion-transition-speed) ease;
}

.accordion-icon::before,
.accordion-icon::after {
  content: '';
  position: absolute;
  background-color: var(--accordion-icon-color);
  transition: transform var(--accordion-transition-speed) ease;
}

.accordion-icon::before {
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  transform: translateY(-50%);
}

.accordion-icon::after {
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  transform: translateX(-50%);
}

/* Accordion content */
.accordion-content {
  padding: 0 20px;
}

/* Active state styles */
.accordion-item.is-active {
  background-color: var(--accordion-bg-active);
}

.accordion-item.is-active .accordion-title {
  color: var(--accordion-text-active);
}

.accordion-item.is-active .accordion-icon::after {
  transform: translateX(-50%) rotate(90deg);
}
```

## Features

### Smart Height Animation

The script intelligently handles height animations using CSS transitions:
- Auto-calculates content height for smooth animations
- Properly handles images within accordion content
- Uses ResizeObserver to update heights as content changes

### Responsive Behavior

- Mobile/tablet vs desktop modes
- Configurable breakpoint
- Option to only enable accordions on mobile/tablet
- Reset styles on desktop when mobile-only is active

### Accessibility

- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Follows accessibility best practices

### Performance Optimizations

- Passive event listeners where possible
- Efficient resize handling with debouncing
- Minimal DOM operations
- Clean resource management with proper destroy method
- Height transitions via CSS instead of JavaScript

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Mobile Considerations

- Smooth animations even on lower-end devices
- Optimized touch interaction
- Reduced animations on low-power mode
- Proper viewport handling

## Migration from the Original Accordion

If you're migrating from the code snippet provided in the request, here's how to update your HTML:

### Original Structure:
```html
<div class="tabs-cycle-tablet_list">
  <div class="tabs-cycle-tablet_accordion">
    <div class="tabs-cycle-tablet_title">
      <div class="text-size-medium">Title</div>
    </div>
    <div class="tabs-cycle-tablet_paragraph">Content</div>
    <div class="tabs-cycle-tablet_icon-wrapper">Icon</div>
  </div>
  <!-- More accordions -->
</div>
```

### Updated Structure:
```html
<div class="tabs-cycle-tablet_list" ts-accordions="true" ts-mobile-only="true" ts-mobile-breakpoint="990">
  <div class="tabs-cycle-tablet_accordion" ts-accordion-item>
    <div class="tabs-cycle-tablet_title" ts-accordion-header>
      <div class="text-size-medium">Title</div>
      <div class="tabs-cycle-tablet_icon-wrapper">Icon</div>
    </div>
    <div class="tabs-cycle-tablet_paragraph" ts-accordion-content>Content</div>
  </div>
  <!-- More accordions -->
</div>
```

## Example Implementation

### Basic Accordion
```html
<div class="component_accordion" ts-accordions="true">
  <div class="component_accordion-item" ts-accordion-item>
    <div class="component_accordion-header" ts-accordion-header>
      <div class="component_accordion-title">Accordion Item 1</div>
      <div class="component_accordion-icon"></div>
    </div>
    <div class="component_accordion-content" ts-accordion-content>
      <p>This is the content for accordion item 1.</p>
    </div>
  </div>
  <!-- More accordion items -->
</div>
```

### Mobile-Only Accordion with Custom Speed
```html
<div class="component_accordion-mobile" ts-accordions="true" ts-mobile-only="true" ts-transition-speed="300" ts-mobile-breakpoint="768">
  <!-- Accordion items -->
</div>
```

### Accordion Allowing All Items Closed
```html
<div class="component_accordion-optional" ts-accordions="true" ts-allow-all-closed="true">
  <!-- Accordion items -->
</div>
``` 