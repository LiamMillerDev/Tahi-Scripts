/**
 * Auto Accordion
 * A lightweight solution for ensuring only one accordion is open at a time
 * @version 1.0.0
 * @author Liam Miller
 * @repository https://github.com/LiamMillerDev/Tahi-Scripts
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all accordion containers
  const accordionContainers = document.querySelectorAll('[ts-auto-accordion="true"]');
  
  accordionContainers.forEach(function(container) {
    // Store currently open accordion
    let openAccordion = null;
    
    // Get all accordion items in this container
    const accordionItems = container.querySelectorAll('[ts-accordion-item]');
    
    // Check for initially open accordion
    let foundOpen = false;
    
    // First try to find any item that's visibly open
    accordionItems.forEach(function(item) {
      const content = item.querySelector('[ts-accordion-content]');
      if (content && getComputedStyle(content).height !== '0px' && getComputedStyle(content).display !== 'none') {
        openAccordion = item;
        foundOpen = true;
      }
    });
    
    // If no open accordion found and there's at least one item, consider the first one open
    if (!foundOpen && accordionItems.length > 0) {
      // Check if any item is explicitly marked as first
      const firstMarkedItem = container.querySelector('[ts-accordion-item="first"]');
      if (firstMarkedItem) {
        openAccordion = firstMarkedItem;
      } else {
        // Default to the first item in the list
        openAccordion = accordionItems[0];
      }
    }
    
    // Add click event listeners to each header in this container
    container.addEventListener('click', function(event) {
      // Find the closest header element from the click target
      const header = event.target.closest('[ts-accordion-header]');
      
      // If not clicking on a header, ignore
      if (!header) return;
      
      // Find the parent accordion item
      const accordionItem = header.closest('[ts-accordion-item]');
      
      // Skip if we couldn't find the accordion item
      if (!accordionItem) return;
      
      // Determine if this accordion is currently closed
      const content = accordionItem.querySelector('[ts-accordion-content]');
      const isClosed = !content || getComputedStyle(content).height === '0px';
      
      // If opening this accordion and there's already one open, close it first
      if (isClosed && openAccordion && openAccordion !== accordionItem) {
        // Find the header of the currently open accordion
        const openHeader = openAccordion.querySelector('[ts-accordion-header]');
        
        // Simulate a click on the open header to close it
        if (openHeader) {
          // Small delay to avoid conflicts
          setTimeout(function() {
            openHeader.click();
          }, 10);
        }
      }
      
      // Update the open accordion reference
      if (isClosed) {
        openAccordion = accordionItem;
      } else if (openAccordion === accordionItem) {
        openAccordion = null;
      }
    });
  });
}); 