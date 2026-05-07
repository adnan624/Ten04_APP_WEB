import { defineConfig }                       from 'hot-updater';
import { bare }                               from '@hot-updater/bare';
import { supabaseDatabase, supabaseStorage }  from '@hot-updater/supabase';
import { config }                             from 'dotenv';

config({ path: '.env.hotupdater' });

// CLI-side deploy operations need write access to the bundles table and
// storage bucket — that's the service role key. The app itself never sees
// this key; the edge function uses its own auth.
const supabaseUrl    = process.env.HOT_UPDATER_SUPABASE_URL!;
const supabaseKey    = process.env.HOT_UPDATER_SUPABASE_SERVICE_ROLE_KEY!;
const bucketName     = process.env.HOT_UPDATER_SUPABASE_BUCKET_NAME ?? 'hot-updater-bundles';

export default defineConfig({
  build: bare({
    enableHermes: true,
  }),
  storage: supabaseStorage({
    supabaseUrl,
    supabaseAnonKey: supabaseKey,   // field is named "anon" but service role JWT works here too
    bucketName,
  }),
  database: supabaseDatabase({
    supabaseUrl,
    supabaseAnonKey: supabaseKey,
  }),
});
