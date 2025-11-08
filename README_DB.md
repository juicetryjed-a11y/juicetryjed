# Supabase setup (local)

1) Create a Supabase project at https://app.supabase.com and copy the project's URL and anon key.

2) Add env vars
   - Copy `./.env.example` to `./.env` inside `joustry-fresh` (or set env vars in your shell).
   - Fill `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with values from your Supabase project.

3) Start the dev server
   - From project root (where `package.json` is):

     ```powershell
     cd joustry-fresh
     pnpm install --prefer-offline
     pnpm run dev
     ```

4) Notes
   - `.env` should NOT be committed. Keep service-role keys secret if you add them.
   - The file `src/lib/supabaseClient.ts` provides a pre-built client you can import:

     import { supabase } from './lib/supabaseClient'

   - If you want me to try starting the dev server here, provide the Supabase URL and anon key (or allow me to use them as environment variables) and I will run the dev script and report the output.
