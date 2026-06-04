// sidebar.js
document.addEventListener('DOMContentLoaded', async () => {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    try {
        const { data: menus, error } = await window.supabaseClient
            .from('navigation_menus')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

        if (error) throw error;

        // Get the current file name (e.g., 'draft.html')
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';

        let sidebarHTML = `
            <div class="h-16 flex items-center justify-center border-b border-slate-700">
                <h1 class="text-xl font-bold tracking-wider">DAR DMS</h1>
            </div>
            <nav class="flex-1 px-4 py-6 space-y-2">
        `;

        menus.forEach(menu => {
            if (menu.allowed_roles.includes(window.currentUser.role)) {
                // Translate DB path to flat folder filename
                let targetFile = menu.path === '/' ? 'index.html' : `${menu.path.replace('/', '')}.html`;
                
                let isActive = currentFile === targetFile;
                let activeClass = isActive 
                    ? "bg-slate-800 text-white" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white transition";

                sidebarHTML += `
                    <a href="${targetFile}" class="block px-4 py-3 rounded-lg text-sm font-medium ${activeClass}">
                        ${menu.label}
                    </a>
                `;
            }
        });

        sidebarHTML += `</nav>
            <div class="p-4 border-t border-slate-700 bg-slate-950">
                <div class="text-sm font-medium truncate">${window.currentUser.name}</div>
                <div class="text-xs text-slate-400 mt-1 uppercase">${window.currentUser.role.replace('_', ' ')}</div>
            </div>`;

        sidebarContainer.innerHTML = sidebarHTML;
    } catch (err) {
        console.error("Menu error:", err);
    }
});
