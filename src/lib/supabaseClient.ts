import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars via import.meta.env when running in the browser.
// We also fall back to process.env so a Node script can use the same file when necessary.
const SUPABASE_URL = (import.meta.env?.VITE_SUPABASE_URL as string) ?? process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = (import.meta.env?.VITE_SUPABASE_ANON_KEY as string) ?? process.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Keep this a warning so dev server can still start; but features using Supabase will fail until keys are set.
  // This helps during local development when env file hasn't been created yet.
  // Use .env (Vite) or set VITE_SUPABASE_* in your environment.
  // Example: VITE_SUPABASE_URL=https://xyz.supabase.co
  //          VITE_SUPABASE_ANON_KEY=public-anon-key
  // See ../.env.example
  console.warn('Supabase keys not found. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '')

export default supabase
