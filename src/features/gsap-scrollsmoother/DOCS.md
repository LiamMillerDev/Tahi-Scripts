# GSAP ScrollSmoother

## Installation
```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@latest/dist/gsap-scrollsmoother.js"></script>
```

## Requirements
- GSAP 3.x
- ScrollTrigger plugin
- ScrollSmoother plugin

## Attributes Reference

### Basic Setup
```html
<!-- Wrapper structure -->
<div ts-smooth-wrapper>
  <div ts-smooth-content>
    <!-- Page content -->
  </div>
</div>

<!-- Configuration -->
<div ts-smooth-wrapper ts-smooth-speed="1.5">...</div>
```

### Advanced Options
```html
<!-- Smoothness -->
<div ts-smooth-wrapper ts-smooth-speed="0.8">...</div>

<!-- Effects -->
<div ts-smooth-effects="true" ts-smooth-speed="1.2">
  <!-- Elements with effects -->
  <div ts-smooth-speed="0.5">Slower</div>
  <div ts-smooth-speed="2">Faster</div>
</div>
```

### Scroll Sections
```html
<!-- Locked scroll sections -->
<div ts-smooth-lock="true">
  <!-- Content that locks during scroll -->
</div>

<!-- Speed variations -->
<section ts-smooth-speed="0.5">
  <!-- Slower scrolling section -->
</section>
```

## Features

1. **Smooth Scrolling**:
   - Variable speed control
   - Section-specific speeds
   - Locked scroll sections
   - Effect variations

2. **Performance**:
   - GPU acceleration
   - Memory management
   - Mobile optimization
   - Automatic cleanup

3. **Integration**:
   - ScrollTrigger compatibility
   - Animation synchronization
   - Dynamic content support
   - Responsive behavior

## Common Issues

1. **Smoothing Not Working**:
   - Verify plugin loading
   - Check wrapper structure
   - Debug initialization
   - Mobile compatibility

2. **Performance Issues**:
   - Reduce effects usage
   - Optimize content weight
   - Check transform layers
   - Monitor memory usage

3. **Integration Problems**:
   - ScrollTrigger sync
   - Animation timing
   - Dynamic content
   - Mobile behavior

## Browser Support
- Modern browsers with transform support
- Mobile browsers (limited effects)
- No IE11 support 