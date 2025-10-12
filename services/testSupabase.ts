// Run with:
// 'npx cross-env NODE_ENV=test node --loader ts-node/esm services/testSupabase.ts' to test

// services/testSupabase.ts
import { supabase } from './supabaseClient.ts';

async function testConnection() {
  try {
    // Make a simple request to test the client
    const { data, error } = await supabase.from('user').select('*').limit(1);

    if (error) {
      console.error('Supabase connection error:', error.message);
    } else {
      console.log('Supabase connected successfully. Sample data:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testConnection();

