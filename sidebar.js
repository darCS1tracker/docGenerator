// sidebar.js
document.addEventListener('DOMContentLoaded', async () => {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    try {
        // Fetch menus ordered by sort_order
        const { data: menus, error } = await window.supabaseClient
            .from('navigation_menus')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

        if (error) throw error;

        // Get current page to highlight the active link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // Build the Sidebar Header
        let sidebarHTML = `
            <div class="h-16 flex items-center justify-center border-b border-slate-700">
                <h1 class="text-xl font-bold tracking-wider">DAR DMS</h1>
            </div>
            <nav class="flex-1 px-4 py-6 space-y-2">
        `;

        // Filter menus based on the current user's role and build links
        menus.forEach(menu => {
            // PostgreSQL arrays come back as JS arrays. Check if user role is allowed.
            if (menu.allowed_roles.includes(window.currentUser.role)) {
                // Map DB paths to HTML file names (e.g., '/' -> 'index.html', '/draft' -> 'draft.html')
                let fileUrl = menu.path === '/' ? 'index.html' : `${menu.path.replace('/', '')}.html`;
                
                // Active state styling
                let isActive = currentPath === fileUrl;
                let activeClass = isActive 
                    ? "bg-slate-800 text-white" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white transition";

                sidebarHTML += `
                    <a href="${fileUrl}" class="block px-4 py-3 rounded-lg text-sm font-medium ${activeClass}">
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
        console.error("Error loading sidebar menu:", err);
        sidebarContainer.innerHTML = `<div class="p-4 text-red-400 text-sm">Failed to load menu.</div>`;
    }
});
