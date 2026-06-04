// sidebar.js
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById('sidebar-container');
    if(sidebar) {
        sidebar.innerHTML = `
            <div class="p-6 font-bold text-xl border-b border-gray-700 tracking-wider">DAR DMS</div>
            <nav class="flex-1 p-4 space-y-2 mt-4">
                <a href="index.html" class="block py-2 px-4 rounded transition hover:bg-slate-700 text-sm font-medium">Dashboard</a>
                <a href="new-document.html" class="block py-2 px-4 rounded transition hover:bg-slate-700 text-sm font-medium">New Document</a>
            </nav>
            <div class="p-4 border-t border-gray-700">
                <button id="logout-btn" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition text-sm">
                    Log Out
                </button>
            </div>
        `;

        // Logout Logic
        document.getElementById('logout-btn').addEventListener('click', async () => {
            await window.supabaseClient.auth.signOut();
            window.location.href = 'login.html';
        });
    }
});
