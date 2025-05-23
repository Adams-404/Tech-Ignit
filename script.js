// Hamburger Menu Animation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Countdown Timer
        function updateCountdown() {
            // Set event date to June 20, 2025, 10:00 AM WAT (Nigeria Time)
            const eventDate = new Date('2025-06-20T10:00:00+01:00');
            const now = new Date();
            
            // Calculate the difference in milliseconds
            let diff = eventDate - now;
            
            if (diff <= 0) {
                // Event has passed
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                
                // Update the countdown container to show event has started
                const countdownContainer = document.querySelector('.countdown-container');
                if (countdownContainer) {
                    countdownContainer.innerHTML = `
                        <div class="event-started">
                            <h3>Event is happening now!</h3>
                            <p>Join us at Tech Ignite 2025</p>
                        </div>
                    `;
                }
                return;
            }
            
            // Calculate time units
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff -= days * (1000 * 60 * 60 * 24);
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);
            
            const minutes = Math.floor(diff / (1000 * 60));
            diff -= minutes * (1000 * 60);
            
            const seconds = Math.floor(diff / 1000);
            
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

        // Sample schedule data
        const scheduleData = [
            {
                time: '9:00 AM - 10:00 AM',
                room: 'Keynote Speeches',
                speaker: 'Dr.....',
                title: 'AI Ethics and Its Impact on Society',
                description: 'Exploring the ethical implications of AI and how it shapes our future.'
            },
            {
                time: '10:15 AM - 11:15 AM',
                room: 'Keynote Speeches',
                speaker: 'Prof....',
                title: 'Blockchain Revolution in African Economies',
                description: 'Discover how blockchain technology is transforming financial systems across Africa.'
            },
            {
                time: '11:30 AM - 12:30 PM',
                room: 'Lunch Break',
                speaker: 'Lunch Break & Networking',
                title: 'Connect with people around',
                description: ''
            },
        ];
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