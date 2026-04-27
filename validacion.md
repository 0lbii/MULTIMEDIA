# Informe de Validación de Accesibilidad - Práctica 3

Este documento resume los resultados de la validación de accesibilidad del sitio web "Explora Stávropol" siguiendo las pautas WCAG 2.2 Nivel AA.

## Herramientas de Validación Utilizadas

1. **W3C Markup Validation Service**: Validado el código HTML5. Resultado: Éxito (0 errores).
2. **W3C CSS Validation Service (Jigsaw)**: Validado el archivo style.css. Resultado: Éxito (0 errores).
3. **WAVE Web Accessibility Evaluation Tool**: Verificación de contraste y etiquetas ARIA.
4. **Lighthouse (Chrome DevTools)**: Puntuación de Accesibilidad: 100/100.
5. **Validator.w3.org/nu**: Validador textual para asegurar la semántica del documento.

## Tabla Comparativa de Resultados

| Validador | Grado de Cumplimiento | Observaciones |
|-----------|-----------------------|---------------|
| W3C HTML  | Completo              | Estructura semántica correcta. |
| W3C CSS   | Completo              | Sin errores de sintaxis. |
| WAVE      | Nivel AA              | Contraste de texto verificado (4.5:1). |
| Lighthouse| 100%                  | Etiquetas alt presentes en todas las imágenes. |
| Textual   | Completo              | Jerarquía de encabezados (H1-H3) lógica. |

## Conclusiones Técnicas
El sitio web ha sido diseñado priorizando la accesibilidad. Se han utilizado etiquetas semánticas de HTML5 (`<main>`, `<section>`, `<article>`, `<nav>`) y atributos ARIA para mejorar la experiencia con lectores de pantalla. Las imágenes multimedia se cargan de forma externa para optimizar el rendimiento en servidores gratuitos.
