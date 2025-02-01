# Before-After Comparison Documentation

## Installation

Add the script to your Webflow project's before </body> tag:

```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@main/dist/before-after.js"></script>
```

## HTML Structure

Basic structure with all features enabled:

```html
<div ts-compare="true" ts-direction="horizontal" ts-show-percentage="true" ts-initial-position="50">
  <!-- Before Image/Content -->
  <div ts-before>
    <img src="before-image.jpg" alt="Before">
  </div>
  
  <!-- After Image/Content -->
  <div ts-after>
    <img src="after-image.jpg" alt="After">
  </div>
  
  <!-- Slider Element -->
  <div ts-slider>
    <!-- Custom slider design in Webflow -->
  </div>
  
  <!-- Optional: Percentage Display -->
  <div ts-percentage>50%</div>
</div>
```

## Configuration

### Required Attributes
- `ts-compare="true"`: Enables the comparison functionality
- `ts-before`: Identifies the before content container
- `ts-after`: Identifies the after content container
- `ts-slider`: Identifies the slider element

### Optional Attributes
- `ts-direction`: Set comparison direction ("horizontal"/"vertical", default: "horizontal")
- `ts-show-percentage`: Toggle percentage display (true/false, default: false)
- `ts-initial-position`: Starting position in percentage (default: 50)
- `ts-percentage`: Identifies the percentage display element

## Webflow Setup Guide

1. Create the basic structure:
   - Add a container div
   - Inside it, add two divs for before/after content
   - Add a div for the slider
   - Optionally, add a div for percentage display

2. Add the required attributes:
   - On the container: `ts-compare="true"`
   - On the before div: `ts-before`
   - On the after div: `ts-after`
   - On the slider div: `ts-slider`
   - Optional: On percentage div: `ts-percentage`

3. Style your elements:
   - The script handles core positioning
   - Style the slider however you want (it will be positioned automatically)
   - Style the percentage display if used
   - Images/content in before/after divs should be same size

4. Configure behavior (optional):
   - Add `ts-direction="vertical"` for vertical sliding
   - Add `ts-show-percentage="true"` to show percentage
   - Add `ts-initial-position="30"` to set starting position

## Interaction Features

1. **Click and Drag**:
   - Click and hold the slider to drag
   - Smooth transition while dragging
   - Touch support for mobile devices

2. **Click Position**:
   - Click anywhere on the image to move slider
   - Smooth transition to clicked position
   - Works with both horizontal and vertical modes

3. **Reset Position**:
   - Double-click to reset to initial position
   - Smooth transition on reset

## Styling in Webflow

The script handles core positioning, but you can style everything else:

```css
/* Example custom styles */
[ts-slider] {
  /* Your slider styles */
  width: 4px;
  height: 100%;
  background: white;
  cursor: grab;
}

[ts-percentage] {
  /* Your percentage display styles */
  padding: 4px 8px;
  background: rgba(0,0,0,0.5);
  color: white;
  border-radius: 4px;
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
   - Compress images appropriately
   - Consider lazy loading for multiple instances

2. **Interaction Performance**:
   - Uses requestAnimationFrame for smooth animations
   - Optimized touch events for mobile
   - Efficient DOM updates

## Best Practices

1. **Image Preparation**:
   - Use same-sized images for before/after
   - Ensure images are properly aligned
   - Optimize for web delivery

2. **Responsive Design**:
   - Works automatically with responsive images
   - Test across all breakpoints
   - Consider touch target sizes on mobile

3. **Accessibility**:
   - Provide meaningful alt text for images
   - Consider ARIA labels for interaction
   - Test keyboard navigation 