import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://acqtzlewrgwnsmyrswyp.supabase.co";
// eslint-disable-next-line no-undef
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcXR6bGV3cmd3bnNteXJzd3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMjAxODAsImV4cCI6MjAzMTY5NjE4MH0.1cDwOJ9wE86J_WyzYDzT4i0MIqClcls6EzrzRuOs9jU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcXR6bGV3cmd3bnNteXJzd3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMjAxODAsImV4cCI6MjAzMTY5NjE4MH0.1cDwOJ9wE86J_WyzYDzT4i0MIqClcls6EzrzRuOs9jU

*/
