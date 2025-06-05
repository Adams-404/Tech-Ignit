// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeBtn = document.querySelector('.close-btn');
    const downloadBtn = document.getElementById('downloadLightbox');
    let currentItem = null;

    // Open lightbox function
    function openLightbox(item) {
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
            lightboxImage.src = src;
            lightboxImage.alt = title;
            lightboxImage.style.display = 'block';
            downloadBtn.style.display = 'flex';
        } else if (type === 'video') {
            lightboxVideo.src = src;
            lightboxVideo.poster = item.getAttribute('data-poster') || '';
            lightboxVideo.style.display = 'block';
            lightboxVideo.load();
            downloadBtn.style.display = 'flex';
        }

        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxVideo.pause();
    }

    // Initialize gallery items
    function initGallery() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            const itemType = item.getAttribute('data-type');
            const playBtn = item.querySelector('.play-btn');
            const downloadBtn = item.querySelector('.download-btn');

            // Show/hide play button based on media type
            if (playBtn) {
                playBtn.style.display = itemType === 'video' ? 'flex' : 'none';
                
                // Handle play button click for videos
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLightbox(item);
                });
            }

            // Handle item click (don't trigger if clicking on buttons)
            item.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    openLightbox(item);
                }
            });

            // Handle download button
            if (downloadBtn) {
                downloadBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const src = downloadBtn.getAttribute('data-src');
                    if (src) {
                        const link = document.createElement('a');
                        link.href = src;
                        link.download = src.split('/').pop();
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        setTimeout(() => {
                            document.body.removeChild(link);
                        }, 100);
                    }
                });
            }
        });
    }


    // Close lightbox when clicking outside content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Download button in lightbox
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentItem) {
            const src = currentItem.getAttribute('data-src');
            if (src) {
                const link = document.createElement('a');
                link.href = src;
                link.download = src.split('/').pop();
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 100);
            }
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Initialize the gallery
    initGallery();
});
