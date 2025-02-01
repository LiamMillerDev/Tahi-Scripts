# Before-After Comparison Documentation

## Installation

Add the script to your Webflow project's before </body> tag:

```html
<script src="https://cdn.jsdelivr.net/gh/tahistudio/webflow-scripts@latest/before-after.js"></script>
```

## HTML Structure

Basic structure with all features enabled:

```html
<div class="before-after_wrapper" ts-compare="true" ts-direction="horizontal" ts-show-percentage="true" ts-initial-position="50">
  <!-- Before Image/Content -->
  <div class="before-after_before">
    <img src="before-image.jpg" alt="Before">
  </div>
  
  <!-- After Image/Content -->
  <div class="before-after_after">
    <img src="after-image.jpg" alt="After">
  </div>
  
  <!-- Slider Element -->
  <div class="before-after_slider" ts-slider="true">
    <!-- Custom slider design in Webflow -->
  </div>
  
  <!-- Optional: Percentage Display -->
  <div class="before-after_percentage" ts-percentage="true">50%</div>
</div>
```

## Configuration

### Attributes
All attributes use the `ts-` prefix for consistency:

- `ts-compare`: Enable comparison functionality (true/false)
- `ts-direction`: Set comparison direction ("horizontal"/"vertical")
- `ts-show-percentage`: Toggle percentage display (true/false)
- `ts-initial-position`: Starting position in percentage (default: 50)
- `ts-slider`: Identifies the slider element
- `ts-percentage`: Identifies the percentage display element

### Interaction Modes

1. **Click and Drag**:
   - Click and hold the slider to drag
   - Smooth transition while dragging
   - Touch support for mobile devices

2. **Click Position**:
   - Click anywhere on the image to move slider
   - Smooth transition to clicked position
   - Works with both horizontal and vertical modes

### Optional Features

1. **Percentage Display**:
   - Shows current split percentage
   - Updates in real-time during interaction
   - Can be styled via Webflow

2. **Reset Position**:
   - Double-click to reset to initial position
   - Smooth transition on reset
   - Configurable initial position

## CSS Classes

Required Webflow classes:
- `.before-after_wrapper`: Main component wrapper
- `.before-after_before`: Before image/content container
- `.before-after_after`: After image/content container
- `.before-after_slider`: Slider element
- `.before-after_percentage`: Percentage display (optional)

## Example CSS

```css
.before-after_wrapper {
  position: relative;
  overflow: hidden;
}

.before-after_before,
.before-after_after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.before-after_slider {
  position: absolute;
  z-index: 10;
  /* Style in Webflow */
}

.before-after_percentage {
  position: absolute;
  z-index: 11;
  /* Style in Webflow */
}
```

## Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers with touch support

## Performance Considerations

1. **Image Optimization**:
   - Use appropriately sized images
   - Consider lazy loading for multiple instances
   - Compress images appropriately

2. **Interaction Performance**:
   - Throttled event handlers
   - RAF for smooth animations
   - Touch event optimization

3. **Multiple Instances**:
   - Each instance is independent
   - Efficient memory management
   - Proper cleanup on destroy

## Best Practices

1. **Image Preparation**:
   - Use same-sized images for before/after
   - Ensure images are properly aligned
   - Optimize for web delivery

2. **Responsive Design**:
   - Test across all breakpoints
   - Ensure touch targets are adequate on mobile
   - Consider different aspect ratios

3. **Accessibility**:
   - Provide meaningful alt text
   - Ensure keyboard navigation
   - Consider ARIA labels for interaction 