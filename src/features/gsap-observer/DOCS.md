# GSAP Observer

## Installation
```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@latest/dist/gsap-observer.js"></script>
```

## Requirements
- GSAP 3.x
- Observer plugin

## Attributes Reference

### Basic Usage
```html
<!-- Basic velocity tracking -->
<div ts-observe="true">
  <!-- Element to observe -->
</div>

<!-- Specific observation types -->
<div ts-observe="true" ts-observe-type="wheel,touch,scroll,pointer">...</div>
```

### Event Configuration
```html
<!-- Velocity threshold -->
<div ts-observe="true" ts-threshold="0.5">...</div>

<!-- Lock axis -->
<div ts-observe="true" ts-lock-axis="true">...</div>

<!-- Ignore touches -->
<div ts-observe="true" ts-ignore-touch="true">...</div>

<!-- Event tolerance -->
<div ts-observe="true" ts-tolerance="10">...</div>
```

### Event Handlers
```html
<!-- OnChange callback name -->
<div ts-observe="true" ts-on-change="myFunction">...</div>

<!-- OnStop callback name -->
<div ts-observe="true" ts-on-stop="myStopFunction">...</div>

<!-- Debounce time (ms) -->
<div ts-observe="true" ts-debounce="100">...</div>
```

## Features

1. **Event Types**:
   - Wheel events
   - Touch events
   - Scroll events
   - Pointer events
   - Drag detection

2. **Velocity Tracking**:
   - X/Y velocity
   - Direction detection
   - Momentum calculation
   - Smoothing options

3. **Performance**:
   - Event debouncing
   - RAF optimization
   - Memory management
   - Cleanup handling

## Common Issues

1. **Event Not Firing**:
   - Check event type support
   - Verify threshold settings
   - Debug event propagation
   - Mobile compatibility

2. **Performance Issues**:
   - Reduce observer count
   - Increase debounce time
   - Optimize event types
   - Check device support

3. **Integration Problems**:
   - Event bubbling
   - Touch conflicts
   - Scroll interference
   - Animation sync

## Browser Support
- Modern browsers with touch support
- Mobile browsers
- Pointer Events API support 