# Auto Accordion Documentation

## Installation

Add the script to your Webflow project's before `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/tahistudio/webflow-scripts@latest/auto-accordion.js"></script>
```

## Overview

Auto Accordion is a lightweight solution (< 1KB) that works with Webflow's built-in interactions to ensure only one accordion is open at a time within a container. Rather than reimplementing accordion functionality, it simply manages which accordion is currently active.

## HTML Structure

```html
<div ts-auto-accordion="true" class="tabs-cycle-tablet_list">
  <!-- First accordion (open by default) -->
  <div ts-accordion-item="first" class="tabs-cycle-tablet_accordion">
    <div ts-accordion-header class="tabs-cycle-tablet_title">
      <div class="text-size-medium">First Item</div>
      <div class="icon-wrapper"><!-- icon --></div>
    </div>
    <div ts-accordion-content class="tabs-cycle-tablet_paragraph">
      <!-- Content for first accordion -->
    </div>
  </div>
  
  <!-- Additional accordions -->
  <div ts-accordion-item class="tabs-cycle-tablet_accordion">
    <div ts-accordion-header class="tabs-cycle-tablet_title">
      <div class="text-size-medium">Second Item</div>
      <div class="icon-wrapper"><!-- icon --></div>
    </div>
    <div ts-accordion-content class="tabs-cycle-tablet_paragraph">
      <!-- Content for second accordion -->
    </div>
  </div>
</div>
```

## Configuration

### Attributes
All attributes use the `ts-` prefix for consistency:

- `ts-auto-accordion="true"`: Add to the container element that holds all accordion items
- `ts-accordion-item`: Add to each accordion item
  - Optional value `first` to specify which accordion is initially open: `ts-accordion-item="first"`
- `ts-accordion-header`: Add to the clickable header element of each accordion
- `ts-accordion-content`: Add to the expandable content element of each accordion

## How It Works

1. **Initialization**: The script identifies which accordion is initially open by:
   - First checking for any visibly open accordion
   - Then looking for an accordion marked as `ts-accordion-item="first"`
   - Defaulting to the first accordion if neither is found

2. **Click Detection**: When a header is clicked:
   - If a new accordion is being opened, the script automatically closes any currently open accordion
   - All animations and state changes are handled by Webflow's built-in functionality
   - The script simply keeps track of which accordion is currently open

3. **Isolation**: Each container operates independently, so you can have multiple accordion groups on the same page

## Implementation Examples

### Basic Implementation
```html
<div ts-auto-accordion="true" class="component_accordion">
  <div ts-accordion-item="first" class="accordion_item">
    <div ts-accordion-header class="accordion_header">Accordion 1</div>
    <div ts-accordion-content class="accordion_content">Content 1</div>
  </div>
  <div ts-accordion-item class="accordion_item">
    <div ts-accordion-header class="accordion_header">Accordion 2</div>
    <div ts-accordion-content class="accordion_content">Content 2</div>
  </div>
</div>
```

### With Existing Webflow Classes
```html
<div ts-auto-accordion="true" class="tabs-cycle-tablet_list">
  <div ts-accordion-item="first" class="tabs-cycle-tablet_accordion">
    <div ts-accordion-header class="tabs-cycle-tablet_title">
      <div class="text-size-medium">Title</div>
    </div>
    <div ts-accordion-content class="tabs-cycle-tablet_paragraph">
      Content goes here
    </div>
  </div>
</div>
```

## Performance Benefits

- **Minimal Footprint**: Less than 1KB of JavaScript
- **No Custom Animation Code**: Leverages Webflow's built-in animations
- **Event Delegation**: One event listener per container instead of per element
- **No DOM Manipulation**: Doesn't modify styles directly, just simulates clicks

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Migration from Previous Versions

If you were previously using the more complex implementation that handled its own animations:

1. Ensure your accordions work properly in Webflow's design mode first
2. Add the attributes to your HTML as shown above
3. Remove any custom JavaScript that was previously handling the accordion functionality

## Troubleshooting

If your accordions aren't working properly:

1. Make sure all required attributes are present
2. Check browser console for any JavaScript errors
3. Verify that Webflow's built-in accordion behavior is functioning correctly
4. Ensure there are no conflicting scripts that might be interfering 