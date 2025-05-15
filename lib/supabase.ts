// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzvbkhj1ifkghtpbzubn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6dmJraGpsaWZrZ2h0cGJ6dWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNDk2ODAsImV4cCI6MjA2MjgyNTY4MH0.tyGz_vEdKhsDTxXOUyLAyJszMFD8pcIn_4_3nhHLnlc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
