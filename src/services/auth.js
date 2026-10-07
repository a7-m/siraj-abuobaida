/**
 * Placeholder for Authentication logic (Supabase Auth future).
 * Current handles mock login states via localStorage and updates UI accordingly.
 */

class AuthService {
  constructor() {
    this.isAuthenticated = localStorage.getItem('siraj-mock-auth') === 'true';
  }

  // Placeholder login
  async login(email, password) {
    console.log('Logging in with', email);
    // Mock success
    this.isAuthenticated = true;
    localStorage.setItem('siraj-mock-auth', 'true');
    
    // Dispatch event so UI can update
    document.dispatchEvent(new Event('auth-status-changed'));
    return { success: true };
  }

  // Placeholder logout
  async logout() {
    console.log('Logging out');
    this.isAuthenticated = false;
    localStorage.removeItem('siraj-mock-auth');
    
    // Dispatch event so UI can update
    document.dispatchEvent(new Event('auth-status-changed'));
    return { success: true };
  }

  // Helper check
  isLoggedIn() {
    return this.isAuthenticated;
  }
}

export const authService = new AuthService();
