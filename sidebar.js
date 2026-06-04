// sidebar.js
document.addEventListener('DOMContentLoaded', async () => {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    try {
        // Fetch navigation items from your Supabase table
        const { data: menus, error } = await window.supabaseClient
            .from('navigation_menus')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

        if (error) throw error;

        // Get current file to highlight the active menu item
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        let sidebarHTML = `
            <div class="h-16 flex items-center justify-center border-b border-slate-700">
                <h1 class="text-xl font-bold tracking-wider">DAR DMS</h1>
            </div>
            <nav class="flex-1 px-4 py-6 space-y-2">
        `;

        // Build the links based on the database
        menus.forEach(menu => {
            // Check if the current user's role is allowed to see this link
            if (menu.allowed_roles && menu.allowed_roles.includes(window.currentUser.role)) {
                let isActive = currentPath === menu.path;
                let activeClass = isActive 
                    ? "bg-slate-800 text-white" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white transition";

                sidebarHTML += `
                    <a href="${menu.path}" class="block px-4 py-3 rounded-lg text-sm font-medium ${activeClass}">
                        ${menu.label}
                    </a>
                `;
            }
        });

        sidebarHTML += `</nav>`;
        
        // Add User Profile Footer
        sidebarHTML += `
            <div class="p-4 border-t border-slate-700 bg-slate-950">
                <div class="text-sm font-medium truncate">${window.currentUser.name}</div>
                <div class="text-xs text-slate-400 mt-1 uppercase">${window.currentUser.role.replace('_', ' ')}</div>
            </div>
        `;

        sidebarContainer.innerHTML = sidebarHTML;

    } catch (err) {
        console.error("Error loading sidebar menu from table:", err);
        sidebarContainer.innerHTML = `<div class="p-4 text-red-400 text-sm">Failed to load menu.</div>`;
    }
});
