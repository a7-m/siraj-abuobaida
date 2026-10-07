/**
 * Main application entry point
 */
import ThemeManager from './theme.js';
import { authService } from '../services/auth.js';
import { Toast } from '../utils/toast.js';

// Attach Toast to window for easy access in inline HTML scripts
window.Toast = Toast;

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  const updateAuthUI = (isLoggedIn) => {
    // Determine login from argument, or fallback to instant synchronous request.
    const logged = isLoggedIn !== undefined ? isLoggedIn : authService.isLoggedIn();
    
    document.querySelectorAll('.auth-required').forEach(el => {
      if (logged) el.classList.remove('hidden');
      else el.classList.add('hidden');
    });

    document.querySelectorAll('.guest-only').forEach(el => {
      if (!logged) el.classList.remove('hidden');
      else el.classList.add('hidden');
    });
  };

  // Initial Sync check
  updateAuthUI();

  // Async exact check (good for when navigating after tokens change)
  authService.getSessionAsync().then(({ session }) => {
    updateAuthUI(!!session);
  });

  // Listener for dynamic changes over time
  document.addEventListener('auth-status-changed', (e) => {
    updateAuthUI(e.detail.isLoggedIn);
  });
  
  console.log('Siraj Educational Platform Initialized');
});
