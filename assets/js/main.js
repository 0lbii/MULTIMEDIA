document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-postal');
    const mensajeExito = document.getElementById('mensaje-exito');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulación de envío
            const formData = new FormData(form);
            console.log('Datos de la postal:', Object.fromEntries(formData));

            // Feedback visual al usuario
            form.style.display = 'none';
            mensajeExito.style.display = 'block';
            
            // Scroll suave hacia el mensaje de éxito
            mensajeExito.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Mejora de accesibilidad para los radio buttons de imágenes
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

    const slider = document.querySelector('.ba-slider');
    const handle = slider.querySelector('.handle');
    const resize = slider.querySelector('.resize');

    slider.addEventListener('mousemove', (e) => {
        const rect = slider.getBoundingClientRect();
        let x = e.clientX - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        handle.style.left = x + 'px';
        resize.style.width = x + 'px';
    });

    const carousel = document.querySelector('.carousel');
    let index = 0;

    document.getElementById('next').onclick = () => {
        index = (index + 1) % carousel.children.length;
        carousel.style.transform = `translateX(-${index * 100}%)`;
    };

    document.getElementById('prev').onclick = () => {
        index = (index - 1 + carousel.children.length) % carousel.children.length;
        carousel.style.transform = `translateX(-${index * 100}%)`;
    };

    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Quitamos las clases actuales
            cards.forEach(c => c.classList.remove('card-1', 'card-2', 'card-3'));
            
            // Lógica simple para rotar clases (puedes mejorarla según necesites)
            if (index === 0) {
                cards[0].classList.add('card-2');
                cards[1].classList.add('card-3');
                cards[2].classList.add('card-1');
            } else if (index === 1) {
                cards[0].classList.add('card-1');
                cards[1].classList.add('card-2');
                cards[2].classList.add('card-3');
            } else {
                cards[0].classList.add('card-3');
                cards[1].classList.add('card-1');
                cards[2].classList.add('card-2');
            }
        });
    });

    // Busca los elementos
    const container = document.querySelector('.modern-ba-container');
    const reveal = document.querySelector('.img-reveal-wrapper');
    const divider = document.querySelector('.divisoria-moderna');

    if (container && reveal) {
        const processMove = (e) => {
            // Obtenemos coordenadas dependiendo de si es ratón o dedo
            const rect = container.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            
            if (clientX === undefined) return;

            // Cálculo de posición relativa
            let x = clientX - rect.left;
            let porcentaje = (x / rect.width) * 100;

            // Seguridad
            if (porcentaje < 0) porcentaje = 0;
            if (porcentaje > 100) porcentaje = 100;

            // Aplicamos al estilo directamente
            reveal.style.width = porcentaje + '%';
            if (divider) divider.style.left = porcentaje + '%';
        };

        // VARIABLE PARA SABER SI ESTAMOS PULSANDO
        let isDragging = false;

        // Empezar a mover
        container.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        
        // Mover al arrastrar
        container.addEventListener('mousemove', (e) => {
            if (isDragging) processMove(e);
        });

        // Mover con un solo Click
        container.addEventListener('click', processMove);

        // SOPORTE MÓVIL (Touch)
        container.addEventListener('touchstart', () => isDragging = true);
        container.addEventListener('touchend', () => isDragging = false);
        container.addEventListener('touchmove', (e) => {
            if (isDragging) {
                processMove(e);
                e.preventDefault(); // Evita que la página se mueva al arrastrar
            }
        }, { passive: false });

        divider.addEventListener('mousedown', () => isDragging = true);
        divider.addEventListener('touchstart', () => isDragging = true);

        // Listener global para asegurar que el movimiento siempre se detecta
        window.addEventListener('mousemove', (e) => {
            if (isDragging) processMove(e);
        });

        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                processMove(e);
                e.preventDefault();
            }
        }, { passive: false });

    }


});
