// Gallery functionality
function initGallery() {
    // Remove any existing event listeners to prevent duplicates
    document.querySelectorAll('.gallery-item').forEach(item => {
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
    });
    
    // Initialize lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeBtn = document.querySelector('.close-btn');
    const downloadBtn = document.getElementById('downloadLightbox');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    let currentItem = null;
    let galleryItems = [];
    let currentIndex = 0;

    // Add navigation buttons to lightbox
    prevBtn.className = 'nav-btn prev-btn';
    nextBtn.className = 'nav-btn next-btn';
    prevBtn.innerHTML = '&lt;';
    nextBtn.innerHTML = '&gt;';
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);

    // Open lightbox function
    function openLightbox(item) {
        // Get all gallery items if not already stored
        if (galleryItems.length === 0) {
            galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        }
        
        // Find the index of the current item
        currentIndex = galleryItems.findIndex(i => i === item);
        if (currentIndex === -1) return; // Item not found in gallery
        
        updateLightboxContent(item);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Update lightbox content
    function updateLightboxContent(item) {
        currentItem = item;
        const type = item.getAttribute('data-type');
        const src = item.getAttribute('data-src');
        const title = item.querySelector('h3')?.textContent || '';
        const desc = item.querySelector('p')?.textContent || '';

        // Reset and hide both media types
        lightboxImage.style.display = 'none';
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();

        if (type === 'image') {
            // Preload the image
            const img = new Image();
            img.onload = function() {
                lightboxImage.src = src;
                lightboxImage.alt = title;
                lightboxImage.style.display = 'block';
                downloadBtn.style.display = 'flex';
                downloadBtn.setAttribute('data-src', src);
            };
            img.src = src;
        } else if (type === 'video') {
            lightboxVideo.src = src;
            lightboxVideo.poster = item.getAttribute('data-poster') || '';
            lightboxVideo.style.display = 'block';
            lightboxVideo.load();
            downloadBtn.style.display = 'flex';
            downloadBtn.setAttribute('data-src', src);
        }

        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
    }

    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxVideo.pause();
    }

    // Navigate to next/previous item
    function navigate(direction) {
        if (galleryItems.length === 0) return;
        
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        updateLightboxContent(galleryItems[currentIndex]);
    }
    
    // Initialize gallery items
    function initGallery() {
        galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        
        galleryItems.forEach((item, index) => {
            const itemType = item.getAttribute('data-type');
            const playBtn = item.querySelector('.play-btn');
            const downloadBtn = item.querySelector('.download-btn');

            // Only show play button for video items
            if (playBtn) {
                const isVideo = itemType === 'video';
                playBtn.style.display = isVideo ? 'flex' : 'none';
                
                if (isVideo) {
                    // Handle play button click for videos
                    playBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openLightbox(item);
                    });
                }
            }
            
            // Handle item click (don't trigger if clicking on buttons)
            item.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    openLightbox(item);
                }
            });

            // Handle download button
            if (downloadBtn) {
                const src = item.getAttribute('data-src');
                if (src) {
                    downloadBtn.setAttribute('data-src', src);
                    downloadBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        downloadFile(src, src.split('/').pop());
                    });
                }
            }
        });
    }
    
    // Download file function
    function downloadFile(url, filename) {
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
        })
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
            // Fallback to direct download if fetch fails (for same-origin URLs)
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }


    // Event listeners
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(-1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
        }
    });
    
    // Download button in lightbox
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = downloadBtn.getAttribute('data-src');
        if (src) {
            downloadFile(src, src.split('/').pop());
        }
    });

    // Initialize the gallery
    initGallery();
}

// Initialize the gallery when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}
