# GSAP FLIP

## Installation
```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@latest/dist/gsap-flip.js"></script>
```

## Requirements
- GSAP 3.x
- FLIP plugin

## Attributes Reference

### Basic Usage
```html
<!-- FLIP container -->
<div ts-flip-container="myList">
  <!-- Items to animate -->
  <div ts-flip="true">Item 1</div>
  <div ts-flip="true">Item 2</div>
</div>
```

### Animation Configuration
```html
<!-- Duration -->
<div ts-flip="true" ts-duration="0.5">...</div>

<!-- Easing -->
<div ts-flip="true" ts-ease="power2.inOut">...</div>

<!-- Fade -->
<div ts-flip="true" ts-fade="true">...</div>

<!-- Scale -->
<div ts-flip="true" ts-scale="true">...</div>
```

### Advanced Options
```html
<!-- Absolute positioning -->
<div ts-flip="true" ts-absolute="true">...</div>

<!-- Custom properties -->
<div ts-flip="true" ts-props='{"rotation": 360}'>...</div>

<!-- Stagger -->
<div ts-flip-container="myList" ts-stagger="0.1">...</div>

<!-- Custom origin -->
<div ts-flip="true" ts-origin="top left">...</div>
```

## Features

1. **Animation Types**:
   - Position transitions
   - Scale animations
   - Fade effects
   - Rotation support
   - Custom properties

2. **Container Management**:
   - Group animations
   - Stagger effects
   - Batch updates
   - Dynamic content

3. **Performance**:
   - GPU acceleration
   - Memory optimization
   - Automatic cleanup
   - Event debouncing

## Common Issues

1. **Animation Glitches**:
   - Check container setup
   - Verify positioning
   - Debug transitions
   - Layout shifts

2. **Performance Issues**:
   - Reduce item count
   - Optimize properties
   - Check transforms
   - Monitor memory

3. **Integration Problems**:
   - Layout conflicts
   - Style inheritance
   - Dynamic content
   - Event timing

## Browser Support
- Modern browsers with transform support
- Mobile browsers
- No IE11 support 