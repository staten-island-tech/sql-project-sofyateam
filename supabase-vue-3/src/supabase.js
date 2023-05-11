import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ootyuoggelqpdnthupxg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdHl1b2dnZWxxcGRudGh1cHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3MzcxMTcsImV4cCI6MTk5OTMxMzExN30.umL1Z4e9pOmfdnbuydhHql3BoIND37EPEyWQlpvpLQ0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
