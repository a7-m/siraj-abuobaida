/**
 * Main application entry point
 */
import ThemeManager from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme manager
  ThemeManager.init();
  
  // Later: Initialize Auth, Load components dynamically if needed
  console.log('Siraj Educational Platform Initialized');
});
