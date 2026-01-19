document.addEventListener('DOMContentLoaded', function () {
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
        const petalsScreen = document.getElementById('petals-screen');

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

            // Después de 1.2s, mostrar lluvia de corazones elegantes
            setTimeout(() => {
                loaderScreen.style.opacity = '0';
                petalsScreen.classList.add('active');

                // Crear corazones elegantes con variaciones profesionales
                const heartVariants = ['', 'filled', 'rose-gold', 'wine-outline', 'white-subtle'];
                const totalHearts = 45; // Cantidad óptima para 2 segundos

                for (let i = 0; i < totalHearts; i++) {
                    const heart = document.createElement('div');
                    heart.classList.add('elegant-heart');

                    // Asignar variante aleatoria con pesos
                    const variantIndex = Math.random();
                    if (variantIndex < 0.3) heart.classList.add('filled');
                    else if (variantIndex < 0.5) heart.classList.add('rose-gold');
                    else if (variantIndex < 0.7) heart.classList.add('wine-outline');
                    else if (variantIndex < 0.85) heart.classList.add('white-subtle');

                    // Posición horizontal distribuida uniformemente
                    heart.style.left = Math.random() * 100 + '%';

                    // Variables CSS para animación personalizada
                    const size = 16 + Math.random() * 20; // Entre 16px y 36px
                    const fallDuration = 1.8 + Math.random() * 0.6; // Entre 1.8s y 2.4s
                    const fallDelay = Math.random() * 0.8; // Escalonado en 0.8s
                    const maxOpacity = 0.6 + Math.random() * 0.4; // Entre 0.6 y 1

                    // Balanceo sutil aleatorio
                    const swayStart = (Math.random() - 0.5) * 30;
                    const swayMid = (Math.random() - 0.5) * 40;
                    const swayEnd = (Math.random() - 0.5) * 25;

                    // Rotaciones suaves
                    const rotateStart = (Math.random() - 0.5) * 30;
                    const rotateMid = (Math.random() - 0.5) * 20;
                    const rotateEnd = (Math.random() - 0.5) * 25;
                    const rotateFinal = (Math.random() - 0.5) * 40;

                    heart.style.setProperty('--heart-size', `${size}px`);
                    heart.style.setProperty('--fall-duration', `${fallDuration}s`);
                    heart.style.setProperty('--fall-delay', `${fallDelay}s`);
                    heart.style.setProperty('--max-opacity', maxOpacity);
                    heart.style.setProperty('--sway-start', `${swayStart}px`);
                    heart.style.setProperty('--sway-mid', `${swayMid}px`);
                    heart.style.setProperty('--sway-end', `${swayEnd}px`);
                    heart.style.setProperty('--rotate-start', `${rotateStart}deg`);
                    heart.style.setProperty('--rotate-mid', `${rotateMid}deg`);
                    heart.style.setProperty('--rotate-end', `${rotateEnd}deg`);
                    heart.style.setProperty('--rotate-final', `${rotateFinal}deg`);

                    petalsScreen.appendChild(heart);
                }
            }, 1200);

            // Después de 3.2s (1.2s delay + 2s lluvia), desvanecer y mostrar contenido
            setTimeout(() => {
                petalsScreen.classList.add('fade-out');
            }, 3200);

            setTimeout(() => {
                loaderScreen.style.display = 'none';
                petalsScreen.style.display = 'none';
                invitationContent.classList.remove('hidden');
                document.body.classList.remove('bg-wine-red');
            }, 3700);

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
    const countdownFunction = setInterval(function () {
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

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // ═══════════════════════════════════════════════════════════════
            // 🔧 CONFIGURACIÓN DEL CLIENTE - CAMBIAR PARA CADA CLIENTE
            // ═══════════════════════════════════════════════════════════════
            const CLIENT_ID = 'demo';  // ← Cambiar por el ID del cliente (ej: 'juansofia2025')
            const scriptURL = 'https://script.google.com/macros/s/AKfycbz3cbMmMWL0Xjh0QLIoDgh3-JO-mxrTDkOkOkCcz8fEuHdkOi1IqWcdJv_se7Z8bnYC/exec';
            // ═══════════════════════════════════════════════════════════════

            const status = document.getElementById('form-status');
            const submitButton = form.querySelector('button[type="submit"]');

            const formData = new FormData(form);
            formData.append('ClientId', CLIENT_ID);  // ← Envía el ID del cliente al backend
            const confirmacionValue = formData.get('Confirmacion');

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            status.style.color = '';
            status.classList.remove('wine-red');

            fetch(scriptURL, { method: 'POST', body: formData })
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

    // ============================================
    // LLUVIA DE CORAZONES EN CANVAS (Hero Section)
    // ============================================
    const heartCanvas = document.getElementById('heartCanvas');
    if (heartCanvas) {
        const ctx = heartCanvas.getContext('2d');
        let canvasWidth, canvasHeight;
        let hearts = [];
        let animationId = null;
        let isAnimating = false;

        // Configuración de la lluvia de corazones
        const heartSettings = {
            count: 50,        // Cantidad de corazones
            gravity: 1.2,     // Velocidad de caída
            sway: 0.6,        // Balanceo horizontal
            colors: [
                'rgba(201, 162, 39, 0.85)',   // Dorado
                'rgba(183, 110, 121, 0.8)',   // Rose gold
                'rgba(114, 47, 55, 0.75)',    // Wine
                'rgba(220, 20, 60, 0.7)',     // Carmesí
                'rgba(255, 255, 255, 0.6)',   // Blanco sutil
            ]
        };

        // Ajustar canvas al tamaño de la ventana
        function resizeCanvas() {
            canvasWidth = heartCanvas.width = window.innerWidth;
            canvasHeight = heartCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Clase Corazón con curvas Bezier
        class CanvasHeart {
            constructor(initial = true) {
                this.reset(initial);
            }

            reset(initial = false) {
                this.x = Math.random() * canvasWidth;
                this.y = initial ? Math.random() * canvasHeight : -60;
                this.size = Math.random() * 18 + 12; // Entre 12 y 30
                this.speed = Math.random() * 1.2 + 0.8;
                this.swayOffset = Math.random() * 100;
                this.opacity = Math.random() * 0.4 + 0.5;
                this.color = heartSettings.colors[Math.floor(Math.random() * heartSettings.colors.length)];
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 1.5;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.globalAlpha = this.opacity;

                // Dibujar corazón con curvas Bezier (calidad vectorial)
                ctx.beginPath();
                const topCurveHeight = this.size * 0.3;
                ctx.moveTo(0, topCurveHeight);

                // Curva izquierda
                ctx.bezierCurveTo(
                    0, 0,
                    -this.size / 2, 0,
                    -this.size / 2, topCurveHeight
                );
                ctx.bezierCurveTo(
                    -this.size / 2, (this.size + topCurveHeight) / 2,
                    0, (this.size + topCurveHeight) / 2,
                    0, this.size
                );

                // Curva derecha
                ctx.bezierCurveTo(
                    0, (this.size + topCurveHeight) / 2,
                    this.size / 2, (this.size + topCurveHeight) / 2,
                    this.size / 2, topCurveHeight
                );
                ctx.bezierCurveTo(
                    this.size / 2, 0,
                    0, 0,
                    0, topCurveHeight
                );

                ctx.fillStyle = this.color;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetY = 2;
                ctx.fill();

                ctx.restore();
            }

            update() {
                this.y += this.speed * heartSettings.gravity;
                this.x += Math.sin((this.y / 60) + this.swayOffset) * heartSettings.sway;
                this.rotation += this.rotationSpeed;

                // Reiniciar si sale de la pantalla
                if (this.y > canvasHeight + 60) {
                    this.reset();
                }
            }
        }

        // Inicializar corazones
        function initHearts() {
            hearts = [];
            for (let i = 0; i < heartSettings.count; i++) {
                hearts.push(new CanvasHeart(true));
            }
        }

        // Bucle de animación (60 FPS)
        function animateHearts() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            hearts.forEach(heart => {
                heart.update();
                heart.draw();
            });

            animationId = requestAnimationFrame(animateHearts);
        }

        // Observar visibilidad del hero para optimizar rendimiento
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isAnimating) {
                        isAnimating = true;
                        animateHearts();
                    } else if (!entry.isIntersecting && isAnimating) {
                        isAnimating = false;
                        if (animationId) {
                            cancelAnimationFrame(animationId);
                            animationId = null;
                        }
                    }
                });
            }, { threshold: 0.1 });

            heroObserver.observe(heroSection);
        }

        // Iniciar
        initHearts();
        animateHearts();
    }
});
