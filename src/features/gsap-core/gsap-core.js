/**
 * GSAP Core Implementation
 * @author Liam Miller
 * @requires gsap
 */

(() => {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.error('GSAP is required for core animations');
    return;
  }

  // Default configuration
  const defaults = {
    animation: 'fade',
    duration: 0.5,
    ease: 'power2.out',
    delay: 0
  };

  // Animation presets
  const animations = {
    fade: (element) => ({
      opacity: 0,
      duration: element.getAttribute('ts-duration') || defaults.duration,
      ease: element.getAttribute('ts-ease') || defaults.ease,
      delay: element.getAttribute('ts-delay') || defaults.delay
    }),
    slide: (element) => ({
      y: 50,
      opacity: 0,
      duration: element.getAttribute('ts-duration') || defaults.duration,
      ease: element.getAttribute('ts-ease') || defaults.ease,
      delay: element.getAttribute('ts-delay') || defaults.delay
    }),
    scale: (element) => ({
      scale: 0.8,
      opacity: 0,
      duration: element.getAttribute('ts-duration') || defaults.duration,
      ease: element.getAttribute('ts-ease') || defaults.ease,
      delay: element.getAttribute('ts-delay') || defaults.delay
    })
  };

  // Timeline management
  const timelines = new Map();

  // Parse transform properties
  function parseTransformProps(element) {
    const props = {};
    ['x', 'y', 'rotation', 'scale'].forEach(prop => {
      const value = element.getAttribute(`ts-${prop}`);
      if (value !== null) {
        props[prop] = parseFloat(value);
      }
    });
    return props;
  }

  // Parse custom properties
  function parseCustomProps(element) {
    const propsAttr = element.getAttribute('ts-props');
    return propsAttr ? JSON.parse(propsAttr) : {};
  }

  // Initialize animation for an element
  function initAnimation(element) {
    const type = element.getAttribute('ts-animation') || defaults.animation;
    const animation = animations[type](element);
    const transformProps = parseTransformProps(element);
    const customProps = parseCustomProps(element);
    
    // Set initial state
    gsap.set(element, { ...animation, ...transformProps, ...customProps });

    // Create animation
    gsap.to(element, {
      ...animation,
      ...transformProps,
      ...customProps,
      opacity: 1,
      y: 0,
      scale: transformProps.scale || 1
    });
  }

  // Initialize timeline sequence
  function initTimeline(container) {
    const timelineId = container.getAttribute('ts-timeline');
    if (!timelineId) return;

    let timeline = timelines.get(timelineId);
    if (!timeline) {
      timeline = gsap.timeline();
      timelines.set(timelineId, timeline);
    }

    const stagger = parseFloat(container.getAttribute('ts-stagger')) || 0.2;
    const elements = [...container.querySelectorAll('[ts-gsap][ts-index]')]
      .sort((a, b) => {
        const indexA = parseInt(a.getAttribute('ts-index')) || 0;
        const indexB = parseInt(b.getAttribute('ts-index')) || 0;
        return indexA - indexB;
      });

    elements.forEach((element, index) => {
      const type = element.getAttribute('ts-animation') || defaults.animation;
      const animation = animations[type](element);
      const transformProps = parseTransformProps(element);
      const customProps = parseCustomProps(element);

      // Set initial state
      gsap.set(element, { ...animation, ...transformProps, ...customProps });

      // Add to timeline
      timeline.to(element, {
        ...animation,
        ...transformProps,
        ...customProps,
        opacity: 1,
        y: 0,
        scale: transformProps.scale || 1,
        delay: index * stagger
      }, index * stagger);
    });
  }

  // Initialize all animations
  function init() {
    // Initialize standalone animations
    document.querySelectorAll('[ts-gsap="true"]').forEach(initAnimation);

    // Initialize timelines
    document.querySelectorAll('[ts-timeline]').forEach(initTimeline);
  }

  // Clean up on page hide
  function cleanup() {
    timelines.forEach(timeline => timeline.kill());
    timelines.clear();
  }

  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Clean up on page hide
  window.addEventListener('pagehide', cleanup);
})(); 