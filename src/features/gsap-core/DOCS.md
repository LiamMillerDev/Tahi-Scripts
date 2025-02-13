# GSAP Core

## Installation
```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@latest/dist/gsap-core.js"></script>
```

## Requirements
- GSAP 3.x

## Attributes Reference

### Basic Animation
```html
<!-- Basic animation -->
<div ts-gsap="true">
  <!-- Element to animate -->
</div>

<!-- Animation type -->
<div ts-gsap="true" ts-animation="fade">...</div>
<div ts-gsap="true" ts-animation="slide">...</div>
<div ts-gsap="true" ts-animation="scale">...</div>

<!-- Duration (in seconds) -->
<div ts-gsap="true" ts-duration="0.5">...</div>

<!-- Easing -->
<div ts-gsap="true" ts-ease="power2.out">...</div>

<!-- Delay -->
<div ts-gsap="true" ts-delay="0.2">...</div>
```

### Timeline Sequences
```html
<!-- Timeline group -->
<div ts-timeline="myTimeline">
  <!-- Timeline items with stagger -->
  <div ts-gsap="true" ts-index="0">First</div>
  <div ts-gsap="true" ts-index="1">Second</div>
  <div ts-gsap="true" ts-index="2">Third</div>
</div>

<!-- Stagger settings -->
<div ts-timeline="myTimeline" ts-stagger="0.2">...</div>
```

### Advanced Properties
```html
<!-- Transform properties -->
<div ts-gsap="true" 
     ts-x="100" 
     ts-y="50" 
     ts-rotation="45"
     ts-scale="1.2">...</div>

<!-- Opacity -->
<div ts-gsap="true" ts-opacity="0.5">...</div>

<!-- Custom properties -->
<div ts-gsap="true" ts-props='{"backgroundColor": "#fff"}'>...</div>
```

## Features

1. **Animation Types**:
   - Fade in/out
   - Slide from any direction
   - Scale transformations
   - Custom GSAP animations

2. **Timeline Control**:
   - Sequence management
   - Stagger effects
   - Timeline labels
   - Nested timelines

3. **Performance**:
   - Batch animations
   - Memory management
   - Automatic cleanup

## Common Issues

1. **GSAP Not Loading**:
   - Verify GSAP core is loaded
   - Check script order
   - Console for errors

2. **Animation Not Playing**:
   - Check attribute syntax
   - Verify element exists
   - Debug with ts-debug="true"

3. **Performance Issues**:
   - Reduce concurrent animations
   - Use transform properties
   - Implement will-change
   - Consider mobile performance

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with transform support 