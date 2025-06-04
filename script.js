// Hamburger Menu Animation - only run on index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
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
                    countdownContainer.innerHTML = '<div class="event-status">🎉 Happening Now - Day 1: Hackathon 🚀</div>';
                } else if (localTime >= day2 && localTime < day3) {
                    countdownContainer.innerHTML = '<div class="event-status">🎉 Happening Now - Day 2: Conference & Celebrations 🎤</div>';
                } else if (localTime >= day3) {
                    countdownContainer.innerHTML = '<div class="event-status">🎉 Happening Now - Day 3: Games & Community 🎮</div>';
                }
                return;
            } else if (localTime > eventEnd) {
                // Event has passed
                countdownContainer.innerHTML = '<div class="event-status">🎉 Event Concluded - Thanks for joining us! See you next year! 🎉</div>';
                return;
            }
            
            // Event is in the future, show countdown
            countdownContainer.style.display = 'flex';
            countdownItems.forEach(item => item.style.display = 'block');
            
            // Calculate time remaining
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff -= days * (1000 * 60 * 60 * 24);
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);
            
            const minutes = Math.floor(diff / (1000 * 60));
            diff -= minutes * (1000 * 60);
            
            const seconds = Math.floor(diff / 1000);
            
            // Add animation class when time is running out (last 24 hours)
            if (days === 0) {
                countdownItems.forEach(item => item.classList.add('pulse'));
            }
            
            // Update the countdown display
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // Add animation class when time is running out
            if (days === 0) {
                const countdownItems = document.querySelectorAll('.countdown-item');
                countdownItems.forEach(item => {
                    item.classList.add('pulse');
                });
            }
        }

        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call

        // Schedule Tabs
        document.addEventListener('DOMContentLoaded', function() {
            const tabBtns = document.querySelectorAll('.tab-btn');
            const scheduleDays = document.querySelectorAll('.schedule-day');

            // Hide all schedule days by default
            scheduleDays.forEach(day => {
                day.style.display = 'none';
            });

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
                document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' });
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
        });

        // Sample schedule data - Removed as per request
// JavaScript for the About button functionality
        document.addEventListener('DOMContentLoaded', function() {
            const aboutButton = document.getElementById('aboutButton');
            const aboutText = document.getElementById('aboutText');

            aboutButton.addEventListener('click', function() {
                if (aboutText.style.display === 'none') {
                    aboutText.style.display = 'block';
                    aboutButton.textContent = 'Hide About';
                } else {
                    aboutText.style.display = 'none';
                    aboutButton.textContent = 'About Tech Ignit 2025';
                }
            });
        });
        // Populate schedule
        function populateSchedule() {
            const timeline = document.querySelector('.timeline');
            timeline.innerHTML = scheduleData.map(item => `
                <div class="schedule-item">
                    <div class="time">${item.time}</div>
                    <div class="room-tag">${item.room}</div>
                    <div class="content">
                        <h3>${item.title}</h3>
                        <p class="speaker">${item.speaker}</p>
                        <p class="description">${item.description}</p>
                    </div>
                </div>
            `).join('');
        }
        
       document.addEventListener('DOMContentLoaded', (event) => {
    const scrollContent = document.querySelector('.sponsor-scroll');
    
    // Clone the sponsor logos to ensure seamless looping
    scrollContent.innerHTML += scrollContent.innerHTML;

    // Function to restart animation
    function restartAnimation() {
        scrollContent.style.animation = 'none';
        scrollContent.offsetHeight; // Trigger reflow
        scrollContent.style.animation = null;
    }

    // Restart animation when it ends
    scrollContent.addEventListener('animationiteration', restartAnimation);

    // Pause animation on hover
    const scrollContainer = document.querySelector('.sponsor-scroll-container');
    scrollContainer.addEventListener('mouseenter', () => {
        scrollContent.style.animationPlayState = 'paused';
    });

    scrollContainer.addEventListener('mouseleave', () => {
        scrollContent.style.animationPlayState = 'running';
    });
});


        // Initialize schedule
        populateSchedule();

        // Day selector functionality
        const dayButtons = document.querySelectorAll('.day-selector button');
        dayButtons.forEach(button => {
            button.addEventListener('click', () => {
                dayButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                // Here you would typically load different schedule data based on the selected day
            });
        });