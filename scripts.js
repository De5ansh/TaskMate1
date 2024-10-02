document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('show');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for background
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.pageYOffset;
                document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Animate services on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });

    document.querySelectorAll('.service-item').forEach(item => {
        observer.observe(item);
    });

    // Typing animation for hero text
    const heroTitle = document.querySelector('.hero h1');
    const heroText = heroTitle ? heroTitle.textContent : '';
    heroTitle.textContent = '';
    heroTitle.style.visibility = 'visible'; // Ensure it's visible after typing starts
    let i = 0;

    function typeWriter() {
        if (i < heroText.length) {
            heroTitle.textContent += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    // Glowing light effect
    const glowingLight = document.createElement('div');
    glowingLight.classList.add('glowing-light');
    document.body.appendChild(glowingLight);

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        glowingLight.style.left = `${x}px`;
        glowingLight.style.top = `${y}px`;
    });

    // Carousel functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const carousel = document.querySelector('.carousel');

    function showNextSlide() {
        if (carousel) {
            currentSlide = (currentSlide + 1) % totalSlides;
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

    // Change slide every 5 seconds
    setInterval(showNextSlide, 5000);

    const btn = document.getElementById("btn")

    btn.addEventListener('click', getResponse)

    async function getResponse() {                  
        var inputText = document.getElementById("input").value           
        const parentDiv = document.getElementById("chat-area") 
        if(inputText === '') { return }
        let res = await fetch('http://localhost:5000/chat', 
            {
              method: 'POST',
              headers: {
                "Content-Type": 'application/json'                
              },
              body: JSON.stringify({
                question: inputText          
              })
            }
          )
          
          const data = await res.json()
          if(data.message) {
            const answer = document.createElement('div')
            answer.innerHTML = data.message
            answer.classList.add("box", "answer")
            parentDiv.appendChild(answer)
          }
    }
});
