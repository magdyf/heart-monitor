function setupMobileMenu() {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
    menuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function(event) {
      event.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking on a menu item
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }
}

// Check if window is defined (so if in the browser or in node.js).
if (typeof window !== 'undefined') {
  // Check if document is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupMobileMenu();
  } else {
    document.addEventListener('DOMContentLoaded', setupMobileMenu);
  }
}