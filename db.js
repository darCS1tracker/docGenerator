// db.js
const SUPABASE_URL = 'https://aqukqugxeptwnpwaucsg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YuMrATqmH3KbesNBHiBA_w_HVw61kYJ';

// Initialize Supabase
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mock User (Change this to 'EMPLOYEE' or 'PARPO_II' to test access)
window.currentUser = {
    name: 'Juan Dela Cruz',
    role: 'PARPO_II' 
};
