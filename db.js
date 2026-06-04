// db.js
// 1. Initialize Supabase using your specific project keys
const SUPABASE_URL = 'https://aqukqugxeptwnpwaucsg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YuMrATqmH3KbesNBHiBA_w_HVw61kYJ';

// Create a global Supabase client instance
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Mock Current User (Temporary)
// Since we don't have a login page yet, we simulate a logged-in user here.
// Change this to 'EMPLOYEE' or 'PARPO_II' to test different access levels.
window.currentUser = {
    name: 'Juan Dela Cruz',
    role: 'PARPO_II' 
};

console.log("Supabase Connection Initialized for:", window.currentUser.name);
