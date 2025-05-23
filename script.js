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
            const eventDate = new Date('2025-01-12T09:00:00'); // January 12, 2025, 9:00 AM
            const now = new Date();
            
            const diff = eventDate - now;
            
            if (diff <= 0) {
                // Event has passed
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
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