# Adventure Flow Documentation

## Installation

```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@latest/dist/adventure-flow.js"></script>
```

## HTML Structure

### Basic Structure
```html
<div class="section_adventure-flow">
  <!-- Start Connector -->
  <div class="connector_start"></div>
  
  <!-- SVG Path Layer -->
  <svg class="path_layer"></svg>
  
  <!-- First Tier -->
  <div class="tier_wrapper" data-tier="1">
    <div class="card_selection" ts-option="personal">
      <div class="card_content">For Me</div>
    </div>
    <div class="card_selection" ts-option="business">
      <div class="card_content">For My Business</div>
    </div>
    <div class="card_selection" ts-option="agency">
      <div class="card_content">For My Agency</div>
    </div>
  </div>
  
  <!-- Second Tier (Conditional) -->
  <div class="tier_wrapper" data-tier="2">
    <!-- Personal Options -->
    <div class="card_group" ts-parent="personal">
      <div class="card_selection" ts-option="personal-1">...</div>
      <div class="card_selection" ts-option="personal-2">...</div>
      <div class="card_selection" ts-option="personal-3">...</div>
    </div>
    
    <!-- Business Options -->
    <div class="card_group" ts-parent="business">...</div>
    
    <!-- Agency Options -->
    <div class="card_group" ts-parent="agency">...</div>
  </div>
  
  <!-- Third Tier (Pricing) -->
  <div class="tier_wrapper" data-tier="3">
    <!-- Pricing cards for each path -->
    <div class="card_group" ts-parent="personal-1">...</div>
    <div class="card_group" ts-parent="personal-2">...</div>
    <!-- ... other pricing groups ... -->
  </div>
</div>
```

## Custom Attributes

### Core Attributes
- `ts-option`: Unique identifier for each selection option
- `ts-parent`: Links conditional content to parent selection
- `data-tier`: Identifies the selection tier (1, 2, or 3)

### Optional Attributes
- `ts-disabled`: Marks a card as non-selectable
- `ts-selected`: Indicates currently selected option
- `ts-highlight`: Applies highlight styling to a card

## CSS Classes

### Structure Classes
- `section_adventure-flow`: Main wrapper
- `connector_start`: Starting point circle
- `path_layer`: SVG container for paths
- `tier_wrapper`: Contains cards for each tier
- `card_group`: Groups related conditional cards
- `card_selection`: Individual selection card
- `card_content`: Card content wrapper

### State Classes
- `is-active`: Currently selected card
- `is-available`: Cards available for selection
- `is-disabled`: Non-selectable cards
- `is-connected`: Cards with active path connections
- `is-highlighted`: Cards with highlight effect

## JavaScript API

### Initialization
```javascript
// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new AdventureFlow('.section_adventure-flow');
});

// Manual initialization
const flow = new AdventureFlow('.section_adventure-flow', {
  animationSpeed: 300,
  pathStyle: 'orthogonal',
  enableTouch: true
});
```

### Configuration Options
```javascript
{
  // Animation durations (ms)
  animationSpeed: 300,
  pathDuration: 500,
  fadeDuration: 200,
  
  // Path styling
  pathStyle: 'orthogonal', // or 'direct'
  pathColor: '#4299e1',
  pathWidth: 2,
  
  // Interaction
  enableTouch: true,
  enableKeyboard: true,
  
  // Callbacks
  onSelect: (option) => {},
  onPathComplete: (from, to) => {},
  onReset: () => {}
}
```

### Methods
```javascript
// Public methods
flow.select(optionId);        // Select a specific option
flow.reset();                 // Reset all selections
flow.highlightPath(optionId); // Highlight a specific path
flow.disable(optionId);       // Disable an option
flow.enable(optionId);        // Enable an option
```

### Events
```javascript
// Event listeners
flow.on('select', (option) => {
  console.log('Selected:', option);
});

flow.on('pathComplete', (from, to) => {
  console.log('Path created from', from, 'to', to);
});

flow.on('reset', () => {
  console.log('Flow reset');
});
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers with touch support

## Performance Considerations

### Optimizations
1. SVG Path Rendering
   - Uses requestAnimationFrame for smooth animations
   - Batches path updates
   - Implements path caching

2. DOM Updates
   - Minimizes reflows
   - Uses CSS transforms
   - Batches class changes

3. Event Handling
   - Debounced mouse tracking
   - Touch event optimization
   - Passive event listeners

### Best Practices
1. Card Content
   - Keep DOM structure minimal
   - Optimize images
   - Use system fonts when possible

2. Animations
   - Use CSS transforms
   - Avoid layout-triggering properties
   - Implement will-change strategically

3. Mobile
   - Adjust animation complexity
   - Optimize touch targets
   - Reduce path complexity

## Common Issues

### Path Not Appearing
- Check SVG layer z-index
- Verify path coordinates
- Confirm card positions

### Animation Performance
- Reduce animation complexity
- Check browser compatibility
- Monitor CPU usage

### Mobile Issues
- Verify touch event handling
- Check viewport settings
- Test different devices

## Examples

### Basic Implementation
```html
<div class="section_adventure-flow">
  <div class="connector_start"></div>
  <svg class="path_layer"></svg>
  
  <div class="tier_wrapper" data-tier="1">
    <div class="card_selection" ts-option="option1">
      <div class="card_content">Option 1</div>
    </div>
    <!-- More cards... -->
  </div>
</div>

<script>
  new AdventureFlow('.section_adventure-flow');
</script>
```

### Custom Configuration
```javascript
const flow = new AdventureFlow('.section_adventure-flow', {
  animationSpeed: 400,
  pathStyle: 'orthogonal',
  pathColor: '#2d3748',
  onSelect: (option) => {
    console.log('Selected:', option);
  }
});
```

## Troubleshooting

1. Paths not connecting properly
   - Check card positioning
   - Verify SVG viewport
   - Confirm path calculations

2. Animations not smooth
   - Reduce animation complexity
   - Use CSS transforms
   - Check browser support

3. Mobile interaction issues
   - Increase touch targets
   - Verify touch events
   - Test viewport settings
``` 