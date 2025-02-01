# Before-After Comparison

## Installation
```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@latest/dist/before-after.js"></script>
```

## Attributes Reference

### Required Attributes
```html
<div ts-compare="true">
  <div ts-before>...</div>
  <div ts-slider>...</div>
  <div ts-after>...</div>
</div>
```

### Optional Attributes
```html
<!-- Direction (default: horizontal) -->
<div ts-compare="true" ts-direction="horizontal">...</div>
<div ts-compare="true" ts-direction="vertical">...</div>

<!-- Starting Position (0-100, default: 50) -->
<div ts-compare="true" ts-initial-position="30">...</div>
```

## Structural CSS for Webflow

Copy this into your Webflow custom code to handle the core positioning:

```css
/* Core Structure */
[ts-compare] {
  position: relative;
}

[ts-before],
[ts-after] {
  width: 100%;
  height: 100%;
}

[ts-before] {
  position: absolute;
  top: 0;
  left: 0;
}

[ts-after] {
  position: relative;
}

[ts-slider] {
  position: absolute;
  z-index: 2;
}

/* Direction-specific slider positioning */
[ts-direction="horizontal"] [ts-slider] {
  top: 0;
  height: 100%;
}

[ts-direction="vertical"] [ts-slider] {
  left: 0;
  width: 100%;
}

/* Prevent unwanted interactions */
[ts-before] img,
[ts-after] img {
  pointer-events: none;
  user-select: none;
}
```

## Features

1. **Click and Drag**:
   - Drag slider
   - Click anywhere to move slider
   - Touch support for mobile
   - Double-click to reset

2. **Script Handles**:
   - Positioning logic
   - Interaction behavior
   - Image clipping
   - Drag functionality

## Common Issues

1. **Missing Elements Error**:
   - Check all required attributes are added
   - Verify images exist in before/after wrappers
   - Ensure slider element exists

2. **Images Not Aligning**:
   - Set explicit container dimensions
   - Use same aspect ratio images
   - Container needs height

3. **Slider Not Visible**:
   - Add background color in Webflow
   - Set width/height based on direction
   - Horizontal: Set width (height is automatic)
   - Vertical: Set height (width is automatic)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with touch support 