function setupMobileMenu() {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
    menuOverlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  }

  if (menuButton && mobileMenu && menuOverlay) {
    menuButton.addEventListener('click', function(event) {
      event.stopPropagation();
      toggleMenu();
    });

    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking on a menu item
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', toggleMenu);
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
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