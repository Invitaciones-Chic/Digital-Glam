document.addEventListener('DOMContentLoaded', function() {
    // Inicializa los íconos de Lucide
    try {
        lucide.createIcons();
    } catch (e) { console.error("Lucide icons failed to initialize.", e); }
    
    // --- Constantes del DOM ---
    const loaderScreen = document.getElementById('loader-screen');
    const envelope = document.getElementById('envelope');
    const invitationContent = document.getElementById('invitation-content');
    const backgroundMusic = document.getElementById('background-music');
    const musicControlButton = document.getElementById('music-control-button');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const heartsContainer = document.getElementById('hearts-container');

    // --- Lógica para abrir el sobre ---
    if (envelope) {
        envelope.addEventListener('click', () => {
            if (envelope.classList.contains('open')) return;
            
            envelope.classList.add('open');
            
            // Explosión de corazones
            for (let i = 0; i < 25; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                const x = (Math.random() - 0.5) * 500;
                const y = (Math.random() - 0.5) * 500 - 150;
                heart.style.setProperty('--x', `${x}px`);
                heart.style.setProperty('--y', `${y}px`);
                heart.style.animationDelay = `${Math.random()}s`;
                heartsContainer.appendChild(heart);
            }

            backgroundMusic.play().catch(error => console.log("La reproducción automática de música fue bloqueada por el navegador."));
            
            setTimeout(() => { loaderScreen.style.opacity = '0'; }, 2000);
            
            setTimeout(() => {
                loaderScreen.style.display = 'none';
                invitationContent.classList.remove('hidden');
                document.body.classList.remove('bg-wine-red');
            }, 3500);

        }, { once: true });
    }

    // --- Control de Música ---
    if (musicControlButton && backgroundMusic) {
        const toggleMusicIcons = () => {
            playIcon.classList.toggle('hidden', !backgroundMusic.paused);
            pauseIcon.classList.toggle('hidden', backgroundMusic.paused);
        };
        backgroundMusic.addEventListener('play', toggleMusicIcons);
        backgroundMusic.addEventListener('pause', toggleMusicIcons);
        
        musicControlButton.addEventListener('click', () => {
            backgroundMusic.paused ? backgroundMusic.play() : backgroundMusic.pause();
        });
    }

    // --- Cuenta Regresiva ---
    const countdownDate = new Date("Dec 14, 2025 10:00:00").getTime();
    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance > 0) {
            document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
        } else {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "<div class='col-span-4 text-2xl font-bold'>¡El gran día ha llegado!</div>";
        }
    }, 1000);

    // --- Formulario RSVP ---
    const form = document.getElementById('rsvp-form');
    if (form) {
        const asisteSi = document.getElementById('asiste-si');
        const asisteNo = document.getElementById('asiste-no');
        const asistenciaDetails = document.getElementById('asistencia-details');
        const comentariosLabel = document.getElementById('comentarios-label');

        // Función para actualizar la vista del formulario
        const updateFormView = () => {
            if (asisteNo.checked) {
                asistenciaDetails.style.display = 'none';
                comentariosLabel.textContent = '¡Te vamos a extrañar! Si lo deseas, puedes dejarnos un mensaje.';
            } else {
                asistenciaDetails.style.display = 'block';
                comentariosLabel.textContent = 'Comentarios o alergias alimentarias';
            }
        };
        
        // Añadir listeners a los radio buttons
        asisteSi.addEventListener('change', updateFormView);
        asisteNo.addEventListener('change', updateFormView);

        // Estado inicial del formulario
        updateFormView();

        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const scriptURL = 'https://script.google.com/macros/s/AKfycbx9EGxUaVtJjB9wZ-emJSZOUJhrIsVAbANlXgh9FRXiIbuZMmpBVv-kPnWlLx0LBkJ1/exec'; 
            const status = document.getElementById('form-status');
            const submitButton = form.querySelector('button[type="submit"]');
            
            const formData = new FormData(form);
            const confirmacionValue = formData.get('Confirmacion');

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            status.style.color = '';
            status.classList.remove('wine-red');

            fetch(scriptURL, { method: 'POST', body: formData})
                .then(response => {
                    if (confirmacionValue === 'no') {
                        status.textContent = "Lamentamos que no puedas acompañarnos. Gracias por hacérnoslo saber. ¡Te enviamos un fuerte abrazo!";
                    } else {
                        status.textContent = "¡Gracias por confirmar! Tu respuesta ha sido guardada. ¡Te esperamos!";
                    }
                    status.classList.add('wine-red');
                    form.style.display = 'none';
                }).catch(error => {
                    console.error('Error!', error.message);
                    status.textContent = "Oops! Hubo un problema de conexión al enviar tu confirmación.";
                    status.style.color = 'red';
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar Confirmación';
                });
        });
    }

    // --- Animación al hacer scroll (OPTIMIZADO) ---
    const scrollElements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => observer.observe(el));
});