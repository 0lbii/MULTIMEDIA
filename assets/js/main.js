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

});
