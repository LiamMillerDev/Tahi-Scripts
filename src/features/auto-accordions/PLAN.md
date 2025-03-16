# Auto Accordion - Implementation Plan

## Feature Overview
A lightweight solution that leverages Webflow's built-in interactions while ensuring only one accordion is open at a time in each section.

## Technical Requirements
- Vanilla JavaScript implementation (no dependencies)
- Works with Webflow's native accordion behavior
- Uses attribute-based selectors for flexibility
- Minimal DOM manipulation
- Support for multiple accordion groups on same page

## Implementation Strategy

### Configuration Attributes
```javascript
{
  'ts-auto-accordion': boolean,       // Enable auto-accordion functionality (true)
  'ts-accordion-item': string/empty,  // Marks an accordion item (optional value "first" to set default)
  'ts-accordion-header': empty,       // Marks the clickable header
  'ts-accordion-content': empty       // Marks the expandable content
}
```

### Core Functionality
1. Detect clicks on accordion headers
2. When opening a new accordion, simulate a click to close any currently open accordion
3. Let Webflow handle all animations and state management
4. Keep track of the currently open accordion in each container

### Performance Considerations
- Event delegation (one listener per container)
- Minimal DOM manipulation
- Leverages existing Webflow animations
- No custom height calculations or transitions
- No CSS dependencies
- Small file size (~1KB unminified)

### Browser Support
- Modern browsers (last 2 versions)
- No special polyfills needed 