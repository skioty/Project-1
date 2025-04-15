// Function to load HTML components
function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            // Re-initialize any scripts that might need it
            if (containerId === 'carousel-container') {
                // Re-initialize carousel if needed
            }
            // Initialize AOS for newly loaded content
            AOS.refresh();
        })
        .catch(error => console.error(`Error loading ${componentPath}:`, error));
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load all components
    loadComponent('navbar-container', 'components/navbar.html');
    loadComponent('carousel-container', 'components/carousel.html');
    loadComponent('explore-container', 'components/explore.html');
    loadComponent('events-container', 'components/events.html');
    loadComponent('participation-container', 'components/participation.html');
    loadComponent('activities-container', 'components/activities.html');
    loadComponent('clubs-container', 'components/clubs.html');
    loadComponent('footer-container', 'components/footer.html');
    loadComponent('modals-container', 'components/modals.html');
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});