# Before-After Comparison

## Overview
A lightweight, customizable before/after image comparison script that works with existing Webflow elements.

## Core Features
1. Comparison Types
   - Horizontal (left/right)
   - Vertical (top/bottom)

2. Interaction Modes
   - Click and drag slider
   - Click anywhere to move slider
   - Touch support for mobile

3. Optional Features
   - Percentage display
   - Reset to default position
   - Custom slider styling via Webflow

## HTML Structure
```html
<div class="before-after_wrapper" ts-compare="true" ts-direction="horizontal" ts-show-percentage="true">
  <div class="before-after_before">
    <!-- Before image/content -->
  </div>
  <div class="before-after_after">
    <!-- After image/content -->
  </div>
  <div class="before-after_slider" ts-slider="true">
    <!-- Optional: Custom slider design -->
  </div>
</div>
```

## Attributes
- `ts-compare`: Enable comparison functionality (true/false)
- `ts-direction`: Set comparison direction ("horizontal"/"vertical")
- `ts-show-percentage`: Toggle percentage display (true/false)
- `ts-initial-position`: Starting position in percentage (default: 50)
- `ts-slider`: Identifies the slider element

## Implementation Steps
1. Core Class Setup
   - Constructor with configuration
   - Element initialization
   - Event binding

2. Interaction Handling
   - Mouse/touch event listeners
   - Drag functionality
   - Click position calculation
   - Mobile touch support

3. Visual Updates
   - Image clipping calculations
   - Slider position updates
   - Optional percentage display
   - Smooth transitions

4. Utility Functions
   - Position calculations
   - Boundary checking
   - Reset functionality
   - Responsive adjustments

5. Performance Optimizations
   - Throttled event handlers
   - RAF for animations
   - Efficient DOM updates
   - Touch event handling

## Testing Requirements
1. Browser Compatibility
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - Mobile browsers
   - Touch devices

2. Performance Testing
   - Multiple instances on page
   - Large images
   - Different screen sizes
   - Touch response time

3. Edge Cases
   - Window resize handling
   - Dynamic content changes
   - Invalid configurations
   - Error states 