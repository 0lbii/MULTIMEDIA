document.addEventListener('DOMContentLoaded', () => {
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

    // Cartas rotativas de eventos
    const stack = document.querySelector('.cards-stack');
    const allCards = document.querySelectorAll('.card');

    if (stack && allCards.length > 0) {
        allCards.forEach((selectedCard) => {
            selectedCard.addEventListener('click', function() {
                // Si hacemos clic en la de la izquierda (card-1)
                if (this.classList.contains('card-1')) {
                    const c1 = document.querySelector('.card-1');
                    const c2 = document.querySelector('.card-2');
                    const c3 = document.querySelector('.card-3');
                    
                    c1.className = 'card card-2';
                    c2.className = 'card card-3';
                    c3.className = 'card card-1';
                } 
                // Si hacemos clic en la de la derecha (card-3)
                else if (this.classList.contains('card-3')) {
                    const c1 = document.querySelector('.card-1');
                    const c2 = document.querySelector('.card-2');
                    const c3 = document.querySelector('.card-3');
                    
                    c1.className = 'card card-3';
                    c2.className = 'card card-1';
                    c3.className = 'card card-2';
                }
            });
        });
    }

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

    // TRANSPORTE
    const contenedorTransporte = document.querySelector('.transporte-container');
    
    if (contenedorTransporte) {
        // Usamos delegación de eventos en el contenedor padre
        contenedorTransporte.addEventListener('click', function(e) {
            // Buscamos el panel más cercano a donde se ha hecho click
            const targetPanel = e.target.closest('.panel');
            
            // Si hemos clicado en un panel y ese panel no es ya el activo
            if (targetPanel && !targetPanel.classList.contains('active')) {
                // Quitamos active de todos los paneles DENTRO de este contenedor
                const panelsInContainer = contenedorTransporte.querySelectorAll('.panel');
                panelsInContainer.forEach(p => p.classList.remove('active'));
                
                // Añadimos active al clicado
                targetPanel.classList.add('active');
            }
        });
    }

});

document.getElementById('form-postal').addEventListener('submit', function(event) {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const errorSelloDiv = document.getElementById('error-sello-claro'); // El nuevo div
    const mensajeExito = document.getElementById('mensaje-exito');
    const btnSubmit = this.querySelector('.btn-submit');

    // 1. Validar Nombre y Email (Burbujas normales en español)
    if (!nombre.value.trim()) {
        nombre.setCustomValidity("Escribe tu nombre");
        nombre.reportValidity();
        event.preventDefault();
        return;
    }
    if (!email.validity.valid) {
        email.setCustomValidity("Escribe un email válido");
        email.reportValidity();
        event.preventDefault();
        return;
    }

    // 3. Validar Mensaje (Textarea)
    if (mensajeInput.value.trim() === "") {
        mensajeInput.setCustomValidity('¡Escribe un mensaje para la postal!');
        mensajeInput.reportValidity();
        event.preventDefault();
        return;
    }

    // 4. TODO OK -> ENVÍO VISUAL
    event.preventDefault(); 
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = "<span>Enviando...</span>";

    setTimeout(() => {
        mensajeExito.style.display = 'block';
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = "<span>Enviar Postal</span>";
        this.reset(); // Limpia todo
        setTimeout(() => { mensajeExito.style.display = 'none'; }, 5000);
    }, 1500);
});