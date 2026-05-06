document.addEventListener('DOMContentLoaded', () => {
    // Mejora para los radio buttons de imágenes
    const labels = document.querySelectorAll('.postal-options label');
    labels.forEach(label => {
        const radio = label.querySelector('input[type="radio"]');

        // Al hacer click en cualquier parte del label (incluida la imagen)
        label.addEventListener('click', () => {
            radio.checked = true;
            updateSelectedStyle();
        });
    });

    function updateSelectedStyle() {
        labels.forEach(l => {
            const radio = l.querySelector('input[type="radio"]');
            if (radio.checked) {
                l.style.borderColor = '#3498db';
                l.style.backgroundColor = '#eef7ff';
            } else {
                l.style.borderColor = 'transparent';
                l.style.backgroundColor = 'transparent';
            }
        });
    }

    // ACCESIBILIDAD
    const btnTTS = document.getElementById("btn-tts");
    const btnTTSStop = document.getElementById("btn-tts-stop");

    btnTTS.addEventListener("click", () => {
        const texto = document.body.innerText;
        const utter = new SpeechSynthesisUtterance(texto);
        utter.lang = "es-ES";
        speechSynthesis.speak(utter);
    });

    btnTTSStop.addEventListener("click", () => {
        speechSynthesis.cancel();
    });

    let fontSize = 100;

    document.getElementById("font-inc").onclick = () => {
        fontSize = Math.min(fontSize + 10, 200);
        document.documentElement.style.fontSize = fontSize + "%";
    };

    document.getElementById("font-dec").onclick = () => {
        fontSize = Math.max(fontSize - 10, 70);
        document.documentElement.style.fontSize = fontSize + "%";
    };

    document.getElementById("font-select").onchange = (e) => {
        document.body.style.fontFamily = e.target.value;
    };

    const btnVoz = document.getElementById("btn-voz");
    const textarea = document.getElementById("mensaje");

    btnVoz.onclick = () => {
        const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        rec.lang = "es-ES";
        rec.onresult = (e) => textarea.value += e.results[0][0].transcript;
        rec.start();
    };

    document.getElementById("btn-top").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const btnTop = document.getElementById("btn-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnTop.style.display = "block";
        } else {
            btnTop.style.display = "none";
        }
    });

    const btnDaltonicos = document.getElementById("btn-daltonicos");
    btnDaltonicos.addEventListener("click", () => {
        document.body.classList.toggle("daltonicos");

        if (document.body.classList.contains("daltonicos")) {
            btnDaltonicos.textContent = "🎨 Desactivar";
        } else {
            btnDaltonicos.textContent = "🎨 Activar";
        }
    });

    // Restaurar configuración
    document.getElementById("btn-reset").addEventListener("click", () => {
        // Quitar clases de modos
        document.body.classList.remove("daltonicos");
        document.body.classList.remove("oscuro");

        // Restaurar tamaño de fuente
        document.documentElement.style.fontSize = "";

        // Restaurar tipo de letra
        document.body.style.fontFamily = "";

        // Restaurar cursor
        document.body.style.cursor = "";

        // Restaurar textos de botones
        const btnDaltonicos = document.getElementById("btn-daltonicos");
        if (btnDaltonicos) btnDaltonicos.textContent = "🎨 Modo daltónico";

        cursorNivel = 1;
        aplicarCursor();

        alert("Valores restaurados");
    });

    // Configuración Cursor
    let cursorNivel = 1;

    function aplicarCursor() {
        document.body.classList.remove("cursor-1", "cursor-2", "cursor-3");
        document.body.classList.add(`cursor-${cursorNivel}`);
    }

    document.getElementById("cursor-mas").addEventListener("click", () => {
        if (cursorNivel < 3) cursorNivel++;
        aplicarCursor();
    });

    document.getElementById("cursor-menos").addEventListener("click", () => {
        if (cursorNivel > 1) cursorNivel--;
        aplicarCursor();
    });

    document.getElementById("cursor-reset").addEventListener("click", () => {
        cursorNivel = 1;
        aplicarCursor();
    });

    // IMAGENES EVENTOS
    const stack = document.querySelector('.cards-stack');
    const allCards = document.querySelectorAll('.card');

    if (stack && allCards.length > 0) {

        // Función que contiene la lógica de rotación
        function rotarTarjetas(elementoPulsado) {
            const c1 = document.querySelector('.card-1');
            const c2 = document.querySelector('.card-2');
            const c3 = document.querySelector('.card-3');

            // Si interactuamos con la de la izquierda (card-1)
            if (elementoPulsado.classList.contains('card-1')) {
                c1.className = 'card card-2';
                c2.className = 'card card-3';
                c3.className = 'card card-1';
            }
            // Si interactuamos con la de la derecha (card-3)
            else if (elementoPulsado.classList.contains('card-3')) {
                c1.className = 'card card-3';
                c2.className = 'card card-1';
                c3.className = 'card card-2';
            }
        }

        allCards.forEach((selectedCard) => {
            // 1. Ratón
            selectedCard.addEventListener('click', function () {
                rotarTarjetas(this);
            });

            // 2. Enter o Espacio
            selectedCard.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); // Evita el scroll con la barra espaciadora
                    rotarTarjetas(this);
                }
            });
        });
    }

    // IMAGEN ANTES VS AHORA
    const container = document.querySelector('.modern-ba-container');
    const reveal = document.querySelector('.img-reveal-wrapper');
    const divider = document.querySelector('.divisoria-moderna');

    if (container && reveal) {
        // 1. Creamos una función centralizada para actualizar la vista
        // Así la usamos tanto para ratón como para teclado
        const updatePosition = (porcentaje) => {
            if (porcentaje < 0) porcentaje = 0;
            if (porcentaje > 100) porcentaje = 100;

            reveal.style.width = porcentaje + '%';
            if (divider) divider.style.left = porcentaje + '%';

            // Guardamos el porcentaje actual en el dataset para que el teclado sepa dónde está
            container.dataset.porcentaje = porcentaje;
        };

        const processMove = (e) => {
            const rect = container.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            if (clientX === undefined) return;

            let x = clientX - rect.left;
            let porcentaje = (x / rect.width) * 100;
            updatePosition(porcentaje);
        };

        // Teclado
        container.addEventListener('keydown', (e) => {
            let currentP = parseFloat(container.dataset.porcentaje) || 50; // Obtenemos el porcentaje actual o empezamos en 50
            let step = 5; // Cuánto se mueve en cada pulsación

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                updatePosition(currentP - step);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                updatePosition(currentP + step);
            } else if (e.key === 'Home') {
                e.preventDefault();
                updatePosition(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                updatePosition(100);
            }
        });

        // Ratón
        let isDragging = false;
        container.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        container.addEventListener('mousemove', (e) => { if (isDragging) processMove(e); });
        container.addEventListener('click', processMove);

        // Soporte móvil
        container.addEventListener('touchstart', () => isDragging = true);
        container.addEventListener('touchend', () => isDragging = false);
        container.addEventListener('touchmove', (e) => {
            if (isDragging) {
                processMove(e);
                e.preventDefault();
            }
        }, { passive: false });

        if (divider) {
            divider.addEventListener('mousedown', () => isDragging = true);
            divider.addEventListener('touchstart', () => isDragging = true);
        }

        window.addEventListener('mousemove', (e) => { if (isDragging) processMove(e); });
        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                processMove(e);
                e.preventDefault();
            }
        }, { passive: false });
    }

    // TRANSPORTE
    const contenedorTransporte = document.querySelector('.transporte-container');

    if (contenedorTransporte) {
        // 1. Mantenemos tu función de CLICK (ratón/táctil)
        contenedorTransporte.addEventListener('click', function (e) {
            const targetPanel = e.target.closest('.panel');
            activarPanel(targetPanel);
        });

        // 2. AÑADIMOS FUNCIÓN DE TECLADO (Enter o Espacio)
        contenedorTransporte.addEventListener('keydown', function (e) {
            const targetPanel = e.target.closest('.panel');

            // Si el usuario pulsa Enter (o Espacio) sobre un panel con el foco
            if (targetPanel && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault(); // Evita que la página haga scroll al pulsar espacio
                activarPanel(targetPanel);
            }
        });

        // Función auxiliar para no repetir código
        function activarPanel(panel) {
            if (panel && !panel.classList.contains('active')) {
                const panelsInContainer = contenedorTransporte.querySelectorAll('.panel');

                panelsInContainer.forEach(p => {
                    p.classList.remove('active');
                    p.setAttribute('aria-selected', 'false'); // Accesibilidad extra
                });

                panel.classList.add('active');
                panel.setAttribute('aria-selected', 'true'); // Accesibilidad extra
            }
        }
    }

    // DIVISION DE PAGINAS (OCULTAR SECCIONES)
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section'); // Ahora todo está en main section

    function navigateTo(id) {
        const targetId = id.replace('#', '') || 'inicio'; // Si está vacío, por defecto inicio

        sections.forEach(sec => {
            if (sec.id === targetId) {
                sec.classList.remove('is-hidden');
            } else {
                sec.classList.add('is-hidden');
            }
        });
        window.scrollTo(0, 0);
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                navigateTo(href);
                history.pushState(null, null, href);
            }
        });
    });

    // Controlar el inicio y botones atrás/adelante del navegador
    navigateTo(window.location.hash || '#inicio');

    window.addEventListener('popstate', () => {
        navigateTo(window.location.hash || '#inicio');
    });

});

// FORMULARIO
document.getElementById('form-postal').addEventListener('submit', function (event) {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const mensajeExito = document.getElementById('mensaje-exito');
    const btnSubmit = this.querySelector('.btn-submit');

    // 1. Validar Nombre
    if (!nombre.value.trim()) {
        nombre.setCustomValidity("Escribe tu nombre");
        nombre.reportValidity();
        event.preventDefault();
        return;
    }

    // 2. Validar Email
    if (!email.validity.valid) {
        email.setCustomValidity("Escribe un email válido");
        email.reportValidity();
        event.preventDefault();
        return;
    }

    // 3. Validar Mensaje
    if (mensajeInput.value.trim() === "") {
        mensajeInput.setCustomValidity('¡Escribe un mensaje para la postal!');
        mensajeInput.reportValidity();
        event.preventDefault();
        return;
    }

    // Prevención de errores
    event.preventDefault();

    const mensajeConfirmacion = "¿Estás seguro de que quieres enviar esta postal? Revisa que tu mensaje sea correcto.";

    if (confirm(mensajeConfirmacion)) {
        // 4. Si el usuario acepta, procedemos con el envío simulado
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = "<span>Enviando...</span>";

        setTimeout(() => {
            mensajeExito.style.display = 'block';
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = "<span>Enviar Postal</span>";
            this.reset(); // Limpia el formulario

            // Limpiar las validaciones personalizadas para el siguiente envío
            nombre.setCustomValidity("");
            email.setCustomValidity("");
            mensajeInput.setCustomValidity("");

            setTimeout(() => {
                mensajeExito.style.display = 'none';
            }, 5000);
        }, 1500);
    } else {
        // Si el usuario cancela, no hacemos nada y el foco vuelve al formulario
        console.log("Envío cancelado por el usuario");
    }
});