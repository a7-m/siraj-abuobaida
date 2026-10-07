/**
 * Authentication Wrapper utilizing Supabase Auth
 */
import { supabase } from './supabase.js';

class AuthService {
  constructor() {
    this.user = null;
    this.session = null;
    
    // Attempt local load immediately if possible before real async fetch
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        this.session = session;
        this.user = session?.user ?? null;
        this._notify();
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        this.session = session;
        this.user = session?.user ?? null;
        this._notify();
      });
    }
  }

  isLoggedIn() {
    return !!this.session;
  }

  async getSessionAsync() {
    if (!supabase) return { session: null };
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Session Error:', error);
      return { session: null };
    }
    return data;
  }

  async login(email, password) {
    if (!supabase) {
      throw new Error('Supabase Configuration is missing. Please add URL and KEY.');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  }

  async logout() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  _notify() {
    document.dispatchEvent(new CustomEvent('auth-status-changed', {
      detail: { isLoggedIn: this.isLoggedIn(), user: this.user }
    }));
  }
}

export const authService = new AuthService();
