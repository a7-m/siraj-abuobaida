/**
 * Main application entry point
 */
import ThemeManager from './theme.js';
import { authService } from '../services/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme manager
  ThemeManager.init();
  
  // Setup Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Setup Auth UI states (Dashboard link hiding/showing)
  const updateAuthUI = () => {
    const isLoggedIn = authService.isLoggedIn();
    
    // Toggle Dashboard links
    document.querySelectorAll('.auth-required').forEach(el => {
      if (isLoggedIn) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Toggle Login links
    document.querySelectorAll('.guest-only').forEach(el => {
      if (!isLoggedIn) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  };

  // Run on mount
  updateAuthUI();

  // Listen to auth changes
  document.addEventListener('auth-status-changed', updateAuthUI);
  
  console.log('Siraj Educational Platform Initialized');
});
