// Main script for Tech Ignit 2025

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) return;

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    // Initialize hamburger menu
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        initHamburgerMenu();
    }

    // Debug: Log current time and timezone
    console.log('Current local time (browser):', new Date().toString());
    console.log('Current UTC time:', new Date().toISOString());
    console.log('Browser timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);

    // Countdown Timer
    function updateCountdown() {
        // Event dates (July 5th, 7th-8th, 2025)
        const eventStart = new Date('2025-07-05T10:00:00+01:00');
        const day2 = new Date('2025-07-07T00:00:00+01:00');
        const day3 = new Date('2025-07-08T00:00:00+01:00');
        const eventEnd = new Date('2025-07-08T23:59:59+01:00');

        const now = new Date();

        // Get the timezone offset in minutes and convert to milliseconds
        const timezoneOffset = now.getTimezoneOffset() * 60000;

        // Adjust for local timezone and WAT (UTC+1)
        const localTime = new Date(now.getTime() + timezoneOffset + (3600000 * 1));

        // Calculate the difference in milliseconds
        let diff = eventStart - localTime;

        // Debug log
        console.log('Event start:', eventStart);
        console.log('Event end:', eventEnd);
        console.log('Adjusted local time:', localTime);
        console.log('Time difference (ms):', diff);

        const countdownContainer = document.querySelector('.countdown-container');
        const countdownItems = document.querySelectorAll('.countdown-item');

        if (localTime >= eventStart && localTime <= eventEnd) {
            if (localTime >= eventStart && localTime < day2) {
                // Day 1
                countdownContainer.innerHTML = '<div class="countdown-message">Event is live! Day 1 in progress</div>';
            } else if (localTime >= day2 && localTime < day3) {
                // Day 2
                countdownContainer.innerHTML = '<div class="countdown-message">Event is live! Day 2 in progress</div>';
            } else {
                // Day 3
                countdownContainer.innerHTML = '<div class="countdown-message">Event is live! Day 3 in progress</div>';
            }
            return;
        } else if (localTime > eventEnd) {
            // Event has ended
            countdownContainer.innerHTML = '<div class="countdown-message">Event has ended. Thank you for attending!</div>';
            return;
        }

        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update the countdown display
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Start the countdown timer
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Schedule Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const scheduleDays = document.querySelectorAll('.schedule-day');

    // Function to switch tabs
    function switchTab(btn) {
        const targetDay = btn.getAttribute('data-day');
        
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Hide all schedule days
        scheduleDays.forEach(day => {
            day.style.display = 'none';
            day.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding day content
        const dayToShow = document.getElementById(targetDay);
        if (dayToShow) {
            dayToShow.style.display = 'block';
            dayToShow.classList.add('active');
        }
        
        // Scroll to schedule section
        const scheduleSection = document.getElementById('schedule');
        if (scheduleSection) {
            scheduleSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // About button functionality
    const aboutButton = document.getElementById('aboutButton');
    const aboutText = document.getElementById('aboutText');

    if (aboutButton && aboutText) {
        aboutButton.addEventListener('click', function() {
            if (aboutText.style.display === 'none') {
                aboutText.style.display = 'block';
                aboutButton.textContent = 'Hide About';
            } else {
                aboutText.style.display = 'none';
                aboutButton.textContent = 'About Tech Ignit 2025';
            }
        });
    }

    // Populate schedule
    function populateSchedule() {
        const timeline = document.querySelector('.timeline');
        if (timeline && window.scheduleData) {
            timeline.innerHTML = window.scheduleData.map(item => `
                <div class="schedule-item">
                    <div class="time">${item.time || ''}</div>
                    <div class="room-tag">${item.room || ''}</div>
                    <div class="content">
                        <h3>${item.title || ''}</h3>
                        <p class="speaker">${item.speaker || ''}</p>
                        <p class="description">${item.description || ''}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // Add click event listeners to all tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(btn);
        });
    });

    // Initialize the Day 1 tab by default without triggering scroll
    const day1Content = document.getElementById('day1');
    const day1Tab = document.querySelector('.tab-btn[data-day="day1"]');
    
    // First, hide all schedule days
    document.querySelectorAll('.schedule-day').forEach(day => {
        day.style.display = 'none';
        day.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show Day 1 content and activate its tab
    if (day1Tab && day1Content) {
        day1Tab.classList.add('active');
        day1Content.style.display = 'block';
        day1Content.classList.add('active');
    } else if (tabBtns.length > 0) {
        // Fallback to first tab if Day 1 is not found
        const firstBtn = tabBtns[0];
        const firstDayId = firstBtn.getAttribute('data-day');
        const firstDay = document.getElementById(firstDayId);
        
        if (firstDay) {
            firstBtn.classList.add('active');
            firstDay.style.display = 'block';
            firstDay.classList.add('active');
        }
    }

    // Sponsor scroll animation
    const scrollContent = document.querySelector('.sponsor-scroll');
    if (scrollContent) {
        // Clone the sponsor logos to ensure seamless looping
        const logos = scrollContent.innerHTML;
        scrollContent.innerHTML = logos + logos;
        
        function restartAnimation() {
            scrollContent.style.animation = 'none';
            void scrollContent.offsetWidth; // Trigger reflow
            scrollContent.style.animation = 'scroll 30s linear infinite';
        }

        // Restart animation when it ends
        scrollContent.addEventListener('animationiteration', restartAnimation);

        // Pause animation on hover
        const scrollContainer = document.querySelector('.sponsor-scroll-container');
        
        if (scrollContainer) {
            scrollContainer.addEventListener('mouseenter', () => {
                scrollContent.style.animationPlayState = 'paused';
            });

            scrollContainer.addEventListener('mouseleave', () => {
                scrollContent.style.animationPlayState = 'running';
            });
        }

        // Initial animation start
        scrollContent.style.animation = 'scroll 30s linear infinite';
    }

    // Call populateSchedule if it exists
    if (typeof populateSchedule === 'function') {
        populateSchedule();
    }
}); // End of DOMContentLoaded