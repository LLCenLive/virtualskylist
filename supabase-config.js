// =============================================================
// VirtualSkyList — Shared Supabase configuration
// Used by tier-list.js, auth.js and admin.js so the project URL
// and key only need to be set in ONE place.
//
// Project → Settings → Data API → "Project URL"
// Project → Settings → API Keys → anon key (legacy) or
// publishable key (sb_publishable_...) — either works here.
// Never put the service_role / secret key in this file.
// =============================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://jqjcqpqtqargrzitzzux.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Wl43gUYhwHdSTk3Uc0HtnQ_5FRJOe7_";

export const isConfigured =
  SUPABASE_URL && !SUPABASE_URL.startsWith("YOUR_") && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.startsWith("YOUR_");

export const supabase = isConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
