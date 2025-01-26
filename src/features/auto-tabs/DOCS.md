# Auto Tabs Documentation

## Installation

Add the script to your Webflow project's before </body> tag:

```html
<script src="https://cdn.jsdelivr.net/gh/tahistudio/webflow-scripts@latest/auto-tabs.js"></script>
```

## HTML Structure

```html
<div class="tabs-component w-tabs" ts-tabs="true" ts-tabs-speed="5000" ts-hover-pause="true" ts-manual-mode="false" ts-start-in-view="true">
  <div class="tabs-menu w-tab-menu">
    <a class="tab-link w-tab-link w--current">
      <!-- Progress bar elements -->
      <div ts-progress-bar="base" class="progress-bar-base"></div>
      <div ts-progress-bar="loader" class="progress-bar-loader"></div>
      Tab 1
    </a>
    <!-- Add more tab links as needed -->
  </div>
  <div class="w-tab-content">
    <!-- Tab content panes -->
  </div>
</div>
```

## Configuration

### Attributes
All attributes use the `ts-` prefix for consistency:
- `ts-tabs`: Enable auto-tabs functionality (true/false)
- `ts-tabs-speed`: Rotation speed in milliseconds (default: 5000)
- `ts-hover-pause`: Pause progress on hover and resume from same point on leave (true/false)
- `ts-manual-mode`: Enter manual mode on click, exit on mouseleave (true/false)
- `ts-start-in-view`: Only start when tab component is in viewport (true/false)
- `ts-progress-bar`: Progress bar type ("base" or "loader")

### Interaction Modes

1. **Auto Mode** (default):
   - Tabs rotate automatically at specified interval
   - Progress bar shows time until next rotation
   - Can be paused on hover if `ts-hover-pause` is enabled

2. **Manual Mode** (`ts-manual-mode="true"`):
   - Enters manual mode when user clicks a tab
   - Progress bars are hidden during manual mode
   - Returns to auto mode when mouse leaves component
   - Useful for temporary manual control

3. **Hover Pause** (`ts-hover-pause="true"`):
   - Pauses rotation when mouse enters component
   - Maintains progress position
   - Resumes from same position when mouse leaves
   - Works in auto mode only

Note: Manual mode takes precedence over hover pause when both are enabled.

### CSS Classes
Required Webflow classes:
- `.w-tabs`: Main tabs component
- `.w-tab-menu`: Tab menu container
- `.w-tab-link`: Individual tab links
- `.w--current`: Active tab indicator
- `.w-tab-content`: Tab content container

Optional progress bar classes:
- `.progress-bar-base`: Base progress bar styling
- `.progress-bar-loader`: Loading progress bar styling

## Features

### Auto Rotation
- Automatically cycles through tabs at specified interval
- Smooth progress bar animation
- Maintains tab order during rotation

### State Management
- Centralized state tracking
- Consistent behavior across interactions
- Proper cleanup on destroy

### Viewport Detection
- Optional start-in-view functionality
- Uses IntersectionObserver for performance
- Starts when 25% of component is visible

### Multiple Instances
- Support for multiple tab components on same page
- Independent configuration per instance
- Isolated state management

## Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Example CSS

```css
.progress-bar-base {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(0,0,0,0.1);
}

.progress-bar-loader {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: #000;
  transition: width 0.1s linear;
} 