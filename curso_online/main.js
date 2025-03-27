// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // ===== NAVEGACIÓN =====
  // Mejora del smooth scrolling para enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          // Cerrar menú móvil si está abierto
          document.querySelector('.nav-menu').classList.remove('active');
          
          // Scroll suave
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });

  // Navegación móvil toggle mejorado
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navClose = document.getElementById('navClose');
  
  navToggle.addEventListener('click', () => {
      navMenu.classList.add('active');
  });
  
  navClose.addEventListener('click', () => {
      navMenu.classList.remove('active');
  });

  // Cerrar menú cuando se hace clic fuera
  document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
      }
  });

  // ===== FORMULARIOS =====
  // Formulario de contacto mejorado
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', sendWhatsAppMessage);
  }

  // Suscripción al boletín
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', subscribeNewsletter);
  }

  // ===== EFECTOS VISUALES =====
  // Sticky Navbar
  window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Animación de aparición para cards de cursos
  const animateOnScroll = () => {
      const cards = document.querySelectorAll('.course-card');
      cards.forEach(card => {
          const cardPosition = card.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (cardPosition < screenPosition) {
              card.classList.add('appear');
          }
      });
  };

  // Llamar a la función al cargar y al hacer scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Inicial check
  
  // ===== CAROUSEL DE TESTIMONIOS =====
  // Sistema simple de carrusel para testimonios
  let currentTestimonial = 0;
  const testimonials = [
      {
          content: "Gracias a estos cursos pude aprobar mi examen de cálculo con excelente calificación. La metodología es muy clara y los instructores explican de manera que realmente entiendes los conceptos.",
          author: "Laura Hernández",
          role: "Estudiante de Ingeniería",
          image: "images/Laura+Hernández.jpg"
      },
      {
          content: "Siempre tuve problemas con matemáticas hasta que encontré estos cursos. El enfoque práctico y los ejemplos claros me ayudaron a superar mis dificultades.",
          author: "Carlos Méndez",
          role: "Estudiante de Bachillerato",
          image: "images/CARLOS.jpg"
      },
      {
          content: "Como profesor, recomiendo estos cursos a mis alumnos que necesitan refuerzo. El contenido es riguroso pero accesible y las explicaciones son excelentes.",
          author: "Dr. Martínez Gómez",
          role: "Profesor Universitario",
          image: "images/MARTINEZ.jpg"
      }
  ];

  const testimonialContent = document.querySelector('.testimonial-content p');
  const testimonialAuthorImg = document.querySelector('.testimonial-author img');
  const testimonialAuthorName = document.querySelector('.testimonial-author h4');
  const testimonialAuthorRole = document.querySelector('.testimonial-author p');
  const dots = document.querySelectorAll('.testimonial-dots .dot');

  // Solo inicializar si existen los elementos en la página
  if (testimonialContent && dots.length > 0) {
      // Cambiar testimonio
      function showTestimonial(index) {
          const testimonial = testimonials[index];
          
          // Aplicar fade out
          testimonialContent.style.opacity = 0;
          testimonialAuthorImg.style.opacity = 0;
          testimonialAuthorName.style.opacity = 0;
          testimonialAuthorRole.style.opacity = 0;
          
          // Cambiar contenido después de breve delay
          setTimeout(() => {
              testimonialContent.textContent = testimonial.content;
              testimonialAuthorImg.src = testimonial.image;
              testimonialAuthorImg.alt = testimonial.author;
              testimonialAuthorName.textContent = testimonial.author;
              testimonialAuthorRole.textContent = testimonial.role;
              
              // Cambiar dot activo
              dots.forEach((dot, i) => {
                  dot.classList.toggle('active', i === index);
              });
              
              // Aplicar fade in
              testimonialContent.style.opacity = 1;
              testimonialAuthorImg.style.opacity = 1;
              testimonialAuthorName.style.opacity = 1;
              testimonialAuthorRole.style.opacity = 1;
          }, 300);
      }
      
      // Configurar dots para controlar testimonios
      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              currentTestimonial = index;
              showTestimonial(currentTestimonial);
          });
      });
      
      // Cambio automático de testimonios
      setInterval(() => {
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
          showTestimonial(currentTestimonial);
      }, 8000);
  }

  // ===== VALIDACIÓN DE FORMULARIOS =====
  // Validar el formulario de contacto
  function validateContactForm() {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;

      if (nameInput && nameInput.value.trim() === '') {
          showError(nameInput, 'Por favor ingresa tu nombre');
          isValid = false;
      } else if (nameInput) {
          clearError(nameInput);
      }

      if (emailInput) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailInput.value.trim() === '') {
              showError(emailInput, 'Por favor ingresa tu correo electrónico');
              isValid = false;
          } else if (!emailPattern.test(emailInput.value)) {
              showError(emailInput, 'Por favor ingresa un correo electrónico válido');
              isValid = false;
          } else {
              clearError(emailInput);
          }
      }

      if (messageInput && messageInput.value.trim() === '') {
          showError(messageInput, 'Por favor ingresa tu mensaje');
          isValid = false;
      } else if (messageInput) {
          clearError(messageInput);
      }

      return isValid;
  }

  function showError(input, message) {
      const formGroup = input.parentElement;
      
      // Limpiar cualquier error previo
      clearError(input);
      
      // Crear mensaje de error
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = message;
      
      // Agregar clase de error y mensaje
      formGroup.classList.add('error');
      formGroup.appendChild(errorMessage);
      
      // Destacar el input
      input.style.borderColor = '#ff3860';
  }

  function clearError(input) {
      const formGroup = input.parentElement;
      formGroup.classList.remove('error');
      
      const errorMessage = formGroup.querySelector('.error-message');
      if (errorMessage) {
          formGroup.removeChild(errorMessage);
      }
      
      // Restaurar estilo
      input.style.borderColor = '';
  }
});

// ===== FUNCIONES DE FORMULARIOS =====
// Función para enviar mensajes por WhatsApp
function sendWhatsAppMessage(event) {
  event.preventDefault();
  
  // Validar el formulario primero
  if (window.validateContactForm && !window.validateContactForm()) {
      return false;
  }
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value || 'Consulta desde la web';
  const message = document.getElementById('message').value;
  const encodedMessage = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\nAsunto: ${subject}\nMensaje: ${message}`);
  const phoneNumber = "+52 1 938 101 4602";
  window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  return false;
}

// Función para suscripción al boletín
function subscribeNewsletter(event) {
  event.preventDefault();
  const emailInput = event.target.querySelector('input[type="email"]');
  
  if (emailInput.value.trim() === '') {
      alert('Por favor ingresa tu correo electrónico');
      return false;
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
      alert('Por favor ingresa un correo electrónico válido');
      return false;
  }
  
  alert(`¡Gracias por suscribirte! Te hemos enviado un correo de confirmación a ${emailInput.value}.`);
  event.target.reset();
  
  return false;
}