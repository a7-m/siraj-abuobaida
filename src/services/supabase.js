/**
 * Supabase SDK Initialization using ES Modules from CDN
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// The USER should replace these placeholders with real keys later.
const SUPABASE_URL = 'PLACEHOLDER_URL';
const SUPABASE_KEY = 'PLACEHOLDER_KEY';

// Only create a client if keys are provided, else create a dummy object to prevent instant crashes 
// when keys are just Placeholders.
let supabaseClient = null;

try {
  if (SUPABASE_URL.startsWith('http')) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
  } else {
    console.warn('⚠️ Supabase Keys are placeholders. Supabase connection is disabled. Replace them in User settings.');
  }
} catch (e) {
  console.error('Supabase Initialization Error:', e);
}

export const supabase = supabaseClient;
