document.addEventListener('DOMContentLoaded', function() {
    
    // Clock functionality
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const clockEl = document.getElementById('clock');
        if (clockEl) {
            clockEl.textContent = timeString;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Responsive utilities
    function handleResize() {
        if (window.innerWidth <= 768 || 'ontouchstart' in window) {
            const cursor = document.getElementById('cursor');
            const cursorDot = document.getElementById('cursorDot');
            if (cursor) cursor.style.display = 'none';
            if (cursorDot) cursorDot.style.display = 'none';
        } else {
            const cursor = document.getElementById('cursor');
            const cursorDot = document.getElementById('cursorDot');
            if (cursor) cursor.style.display = 'block';
            if (cursorDot) cursorDot.style.display = 'block';
        }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100);
    });
    handleResize();

    // Eye tracking
    const eyes = document.querySelectorAll('.eye');
    const pupils = document.querySelectorAll('.pupil');

    document.addEventListener('mousemove', (e) => {
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursorDot');
        
        if (cursor && cursor.style.display !== 'none') {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        }
        if (cursorDot && cursorDot.style.display !== 'none') {
            cursorDot.style.left = e.clientX - 3 + 'px';
            cursorDot.style.top = e.clientY - 3 + 'px';
        }
        
        pupils.forEach((pupil, index) => {
            const eye = eyes[index];
            if (!eye) return;
            const eyeRect = eye.getBoundingClientRect();
            const eyeX = eyeRect.left + eyeRect.width / 2;
            const eyeY = eyeRect.top + eyeRect.height / 2;
            
            const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
            const distance = Math.min(6, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 15);
            
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
        });
    });

    // Cursor trails
    const trails = [];
    const numTrails = 5;

    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / numTrails) * 0.5;
        trail.style.width = (8 - i * 1.5) + 'px';
        trail.style.height = (8 - i * 1.5) + 'px';
        document.body.appendChild(trail);
        trails.push({ el: trail, x: 0, y: 0 });
    }

    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        trailX = e.clientX;
        trailY = e.clientY;
    });

    function animateTrails() {
        if (document.getElementById('cursor')?.style.display !== 'none') {
            let currentX = trailX;
            let currentY = trailY;
            
            trails.forEach((trail, i) => {
                const speed = 0.3 - (i * 0.05);
                trail.x += (currentX - trail.x) * speed;
                trail.y += (currentY - trail.y) * speed;
                trail.el.style.left = trail.x - (8 - i * 1.5) / 2 + 'px';
                trail.el.style.top = trail.y - (8 - i * 1.5) / 2 + 'px';
                currentX = trail.x;
                currentY = trail.y;
            });
        }
        
        requestAnimationFrame(animateTrails);
    }
    animateTrails();

    // Click ripple effect
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'click-effect';
        ripple.style.left = e.clientX - 10 + 'px';
        ripple.style.top = e.clientY - 10 + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });

    // Window popup functionality
    function openWindow(windowId) {
        const win = document.getElementById(windowId);
        const overlay = document.getElementById('windowOverlay');
        
        if (win && overlay) {
            win.classList.add('active');
            overlay.classList.add('active');
        }
    }

    function closeWindow(windowId) {
        const win = document.getElementById(windowId);
        const overlay = document.getElementById('windowOverlay');
        
        if (win && overlay) {
            win.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    document.getElementById('windowOverlay')?.addEventListener('click', () => {
        document.querySelectorAll('.window-popup.active').forEach(w => w.classList.remove('active'));
        document.getElementById('windowOverlay')?.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.window-popup.active').forEach(w => w.classList.remove('active'));
            document.getElementById('windowOverlay')?.classList.remove('active');
        }
    });

    // Desktop Icons Drag Functionality
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    desktopIcons.forEach(function(icon) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        function onMouseDown(e) {
            // Don't drag if clicking on links
            if (e.target.closest('a')) return;
            
            isDragging = true;
            icon.classList.add('dragging');
            
            // Get initial position
            const rect = icon.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            startX = e.clientX || e.touches?.[0]?.clientX;
            startY = e.clientY || e.touches?.[0]?.clientY;
            
            // Convert any right positioning to left
            icon.style.left = initialX + 'px';
            icon.style.top = initialY + 'px';
            icon.style.right = 'auto';
            icon.style.transform = 'none';
            
            e.preventDefault();
        }
        
        function onMouseMove(e) {
            if (!isDragging) return;
            
            const clientX = e.clientX || e.touches?.[0]?.clientX;
            const clientY = e.clientY || e.touches?.[0]?.clientY;
            
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            
            icon.style.left = (initialX + deltaX) + 'px';
            icon.style.top = (initialY + deltaY) + 'px';
            
            e.preventDefault();
        }
        
        function onMouseUp(e) {
            if (!isDragging) return;
            
            isDragging = false;
            icon.classList.remove('dragging');
            
            // Check if it was a click (not a drag)
            const rect = icon.getBoundingClientRect();
            const movedX = Math.abs(rect.left - initialX);
            const movedY = Math.abs(rect.top - initialY);
            
            // If barely moved, treat as click
            if (movedX < 5 && movedY < 5) {
                const windowId = icon.dataset.window;
                if (windowId) {
                    openWindow(windowId);
                }
            }
        }
        
        // Mouse events
        icon.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        
        // Touch events
        icon.addEventListener('touchstart', onMouseDown, { passive: false });
        document.addEventListener('touchmove', onMouseMove, { passive: false });
        document.addEventListener('touchend', onMouseUp);
    });

    // Video background error handling
    const video = document.getElementById('bg-video');
    if (video) {
        video.addEventListener('error', () => {
            video.style.display = 'none';
        });
    }
    
    // Sticky card drag
    const stickyCard = document.getElementById('sticky');
    if (stickyCard) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        stickyCard.addEventListener('mousedown', function(e) {
            if (e.target.closest('a')) return;
            
            isDragging = true;
            stickyCard.style.cursor = 'grabbing';
            
            const rect = stickyCard.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            startX = e.clientX;
            startY = e.clientY;
            
            stickyCard.style.left = initialX + 'px';
            stickyCard.style.top = initialY + 'px';
            stickyCard.style.right = 'auto';
            
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            stickyCard.style.left = (initialX + deltaX) + 'px';
            stickyCard.style.top = (initialY + deltaY) + 'px';
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                stickyCard.style.cursor = '';
            }
        });
    }
    
    console.log('Portfolio initialized successfully');
});
