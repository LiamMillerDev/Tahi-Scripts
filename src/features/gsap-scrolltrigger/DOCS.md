# GSAP ScrollTrigger

## Installation
```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@latest/dist/gsap-scrolltrigger.js"></script>
```

## Requirements
- GSAP 3.x
- ScrollTrigger plugin (Club)
- Active GSAP Club membership

## Attributes Reference

### Basic ScrollTrigger
```html
<div ts-scroll="true">
  <!-- Element to animate -->
</div>
```

### Advanced Configuration
```html
<!-- Animation Type -->
<div ts-scroll="true" ts-animation="fade">...</div>
<div ts-scroll="true" ts-animation="slide">...</div>
<div ts-scroll="true" ts-animation="scale">...</div>

<!-- Trigger Position (default: center) -->
<div ts-scroll="true" ts-trigger="top">...</div>
<div ts-scroll="true" ts-trigger="center">...</div>
<div ts-scroll="true" ts-trigger="bottom">...</div>

<!-- Animation Duration (in seconds, default: 1) -->
<div ts-scroll="true" ts-duration="0.5">...</div>

<!-- Animation Ease (default: power2.out) -->
<div ts-scroll="true" ts-ease="power4.out">...</div>

<!-- Start/End Position -->
<div ts-scroll="true" ts-start="top center" ts-end="bottom center">...</div>
```

## Features

1. **Scroll-Based Animations**:
   - Fade in/out
   - Slide from any direction
   - Scale transformations
   - Custom GSAP animations

2. **Advanced Control**:
   - Trigger position customization
   - Animation timing control
   - Easing function selection
   - Start/End position markers

3. **Performance**:
   - Automatic cleanup on page leave
   - Optimized animation batching
   - Memory management
   - Mobile-friendly

## Common Issues

1. **GSAP Not Loading**:
   - Verify GSAP core is loaded
   - Check ScrollTrigger plugin registration
   - Confirm Club authentication

2. **Animation Not Triggering**:
   - Check marker positions
   - Verify scroll container setup
   - Ensure elements are in viewport
   - Debug with ts-markers="true"

3. **Performance Issues**:
   - Reduce concurrent animations
   - Use lighter animation properties
   - Implement will-change strategically
   - Consider mobile breakpoints

## Browser Support
- Modern browsers with IntersectionObserver support
- Mobile browsers with touch events
- IE11 not supported 