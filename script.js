// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const isMobile = window.innerWidth <= 768;

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll suave para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Header transparente en scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.background = 'rgba(44, 62, 80, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(44, 62, 80, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animaciones en scroll (desactivadas en móviles)
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animaciones a elementos solo en desktop
    document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll(
            '.stat-item, .player-card, .match-card, .news-card, .contact-info, .contact-form'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    });
}

// Contador animado para estadísticas (solo en desktop)
function animateCounters() {
    if (window.innerWidth <= 768) return; // No animar en móviles
    
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                if (counter.textContent.includes('+')) {
                    counter.textContent = target + '+';
                }
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Ejecutar contador cuando la sección sea visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío del formulario
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                submitBtn.textContent = 'Mensaje Enviado ✓';
                submitBtn.style.background = '#27ae60';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
});

// Efecto parallax ligero para el hero (solo en desktop)
window.addEventListener('scroll', function() {
    if (window.innerWidth <= 768) return; // No aplicar parallax en móviles
    
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
});

// Easter egg: Gol animation al hacer click en el logo + Hero interactivity
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const heroTitle = document.querySelector('.hero h1');
    const heroContent = document.querySelector('.hero-content');
    let clickCount = 0;
    
    // Logo click effect
    logo.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount >= 3) {
            // Crear efecto de "gol"
            const goalEffect = document.createElement('div');
            goalEffect.innerHTML = '⚽ ¡GOOOOOL! ⚽';
            goalEffect.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 3rem;
                font-weight: 900;
                color: #e74c3c;
                z-index: 9999;
                animation: goalAnimation 2s ease-out forwards;
                pointer-events: none;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            `;
            
            // Añadir la animación CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes goalAnimation {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-100px); }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(goalEffect);
            
            setTimeout(() => {
                document.body.removeChild(goalEffect);
                document.head.removeChild(style);
            }, 2000);
            
            clickCount = 0;
        }
    });

    // Efecto de typing en el subtítulo del hero
    const heroSubtitle = document.querySelector('.hero p');
    const originalText = heroSubtitle.textContent;
    
    function typeWriter(text, element, speed = 100) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Iniciar efecto de typing después de que aparezca el título
    setTimeout(() => {
        typeWriter(originalText, heroSubtitle, 80);
    }, 1000);

    // Crear partículas flotantes de fondo
    function createFloatingParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        const particles = ['⚽', '🏆', '⭐', '🥅'];
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                opacity: ${Math.random() * 0.3 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle${i} ${Math.random() * 10 + 15}s linear infinite;
                pointer-events: none;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatParticle${i} {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                    }
                }
            `;
            
            document.head.appendChild(style);
            heroParticles.appendChild(particle);
            
            // Eliminar y recrear la partícula cuando termine la animación
            setTimeout(() => {
                if (heroParticles.contains(particle)) {
                    heroParticles.removeChild(particle);
                    document.head.removeChild(style);
                }
            }, (Math.random() * 10 + 15) * 1000);
        }
    }

    // Iniciar partículas flotantes solo en desktop
    if (window.innerWidth > 768) {
        createFloatingParticles();
        // Recrear partículas cada 20 segundos
        setInterval(createFloatingParticles, 20000);
    }
});

// Lazy loading para imágenes (si se añaden más adelante)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mejorar la experiencia táctil en dispositivos móviles
document.addEventListener('touchstart', function() {}, { passive: true });

// Preloader simple (opcional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Ocultar cualquier preloader si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Manejo de errores para imágenes rotas
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// Función para compartir en redes sociales (si se implementa)
function shareOnSocial(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Función para copiar al portapapeles
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        // Mostrar notificación de éxito
        showNotification('¡Copiado al portapapeles!', 'success');
    } catch (err) {
        console.error('Error al copiar: ', err);
        showNotification('Error al copiar', 'error');
    }
}

// Sistema de notificaciones simple
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInNotification 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Añadir estilos para las notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInNotification {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutNotification {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);
