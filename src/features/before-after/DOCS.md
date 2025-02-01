# Before-After Comparison Documentation

## Minimal Working Example

```html
<div ts-compare="true">
  <div ts-before>
    <img src="before.jpg" alt="Before">
  </div>
  <div ts-slider></div>
  <div ts-after>
    <img src="after.jpg" alt="After">
  </div>
</div>
```

```css
/* Only required CSS */
[ts-slider] {
  background: white;
  /* Vertical slider (default) */
  height: 4px;
  /* OR Horizontal slider */
  /* width: 4px; */
}
```

## Installation

Add the script to your Webflow project's before </body> tag:

```html
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@v1.0.2/dist/before-after.js"></script>
```

## Configuration

### Required Attributes
- `ts-compare="true"`: On the container
- `ts-before`: On the before image wrapper
- `ts-after`: On the after image wrapper
- `ts-slider`: On the slider element

### Optional Attributes
- `ts-direction="horizontal"`: For horizontal sliding (default is vertical)
- `ts-initial-position="30"`: Starting position in percentage (default: 50)

## Webflow Setup Guide

1. Create the structure:
   ```
   Container (Div Block)
   ├── Before Wrapper (Div Block)
   │   └── Image
   ├── Slider (Div Block)
   └── After Wrapper (Div Block)
       └── Image
   ```

2. Add attributes:
   - Container: `ts-compare="true"`
   - Before wrapper: `ts-before`
   - After wrapper: `ts-after`
   - Slider: `ts-slider`

3. Style only what's needed:
   - Container: Set desired width/height
   - Images: No special styling needed (script handles sizing)
   - Slider: Set background color and width/height

## Common Issues

1. "Missing required elements" error:
   - Ensure all required attributes are added
   - Check that both before/after wrappers contain images
   - Verify slider element exists

2. Images not aligning:
   - Images are automatically set to cover the container
   - Ensure container has explicit dimensions
   - Use same aspect ratio images for best results

3. Slider not visible:
   - Add background color to slider
   - Set appropriate width/height based on direction
   - Vertical: Set width to 100% and height to 2-4px
   - Horizontal: Set height to 100% and width to 2-4px

## Example Setups

### Vertical Slider (Default)
```html
<div ts-compare="true" style="height: 400px;">
  <div ts-before>
    <img src="before.jpg" alt="Before">
  </div>
  <div ts-slider style="background: white; height: 4px;"></div>
  <div ts-after>
    <img src="after.jpg" alt="After">
  </div>
</div>
```

### Horizontal Slider
```html
<div ts-compare="true" ts-direction="horizontal" style="height: 400px;">
  <div ts-before>
    <img src="before.jpg" alt="Before">
  </div>
  <div ts-slider style="background: white; width: 4px;"></div>
  <div ts-after>
    <img src="after.jpg" alt="After">
  </div>
</div>
```

## HTML Structure

Basic structure with all features enabled:

```html
<div ts-compare="true" ts-show-percentage="true" ts-initial-position="50">
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
- `ts-direction`: Set comparison direction ("vertical"/"horizontal", default: "vertical")
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
   - Add `ts-direction="horizontal"` for horizontal sliding (vertical is default)
   - Add `ts-show-percentage="true"` to show percentage
   - Add `ts-initial-position="30"` to set starting position

## Styling Examples

### Vertical Slider (Default)
```css
/* Default vertical slider */
[ts-slider] {
  width: 100%;
  height: 4px;
  background: white;
  cursor: ns-resize;
}
```

### Horizontal Slider
```css
/* Optional horizontal slider */
[ts-direction="horizontal"] [ts-slider] {
  width: 4px;
  height: 100%;
  background: white;
  cursor: ew-resize;
}
```

### Percentage Display
```css
[ts-percentage] {
  padding: 4px 8px;
  background: rgba(0,0,0,0.5);
  color: white;
  border-radius: 4px;
}
```

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