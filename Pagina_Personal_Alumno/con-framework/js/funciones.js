// ========================================
// FUNCIONES PRINCIPALES PARA PÁGINA PERSONAL
// ========================================

// Variables globales
let contactFacade;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el facade de contactos
    contactFacade = new ContactFacade();
    
    // Configurar validaciones en tiempo real
    configurarValidacionesTiempoReal();
    
    // Configurar scroll suave para navegación
    configurarNavegacionSuave();
    
    // Configurar animaciones de scroll
    configurarAnimacionesScroll();
    
    // Cargar contactos existentes
    listarContactos();
});

// ========================================
// VALIDACIONES DEL FORMULARIO
// ========================================

function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    } else {
        errorElement.textContent = '';
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    const longitud = campo.value.trim().length;
    if (longitud < min || longitud > max) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    } else {
        errorElement.textContent = '';
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
        return true;
    }
}

function validarEmail(campo, errorElement, mensaje) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(campo.value.trim())) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    } else {
        errorElement.textContent = '';
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
        return true;
    }
}

function validarTelefono(campo, errorElement, mensaje) {
    const telefonoRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    if (!telefonoRegex.test(campo.value.trim())) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    } else {
        errorElement.textContent = '';
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
        return true;
    }
}

function validarRadioButtons(radios, errorElement, mensaje) {
    let seleccionado = false;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            seleccionado = true;
            break;
        }
    }
    
    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarCheckbox(checkbox, errorElement, mensaje) {
    if (!checkbox.checked) {
        errorElement.textContent = mensaje;
        checkbox.classList.add('is-invalid');
        return false;
    } else {
        errorElement.textContent = '';
        checkbox.classList.remove('is-invalid');
        checkbox.classList.add('is-valid');
        return true;
    }
}

// ========================================
// VALIDACIÓN PRINCIPAL DEL FORMULARIO
// ========================================

function validarFormulario() {
    // Obtener elementos del formulario
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const motivo = document.getElementById('motivo');
    const mensaje = document.getElementById('mensaje');
    const aceptaTerminos = document.getElementById('aceptaTerminos');
    const preferenciaContacto = document.getElementsByName('preferenciaContacto');
    
    // Obtener elementos de error
    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorTelefono = document.getElementById('errorTelefono');
    const errorMotivo = document.getElementById('errorMotivo');
    const errorMensaje = document.getElementById('errorMensaje');
    const errorTerminos = document.getElementById('errorTerminos');
    const errorPreferencia = document.getElementById('errorPreferencia');
    
    // Validar cada campo
    const nombreValido = validarCampoObligatorio(nombre, errorNombre, 'El nombre es obligatorio');
    const emailValido = validarEmail(email, errorEmail, 'Ingresa un email válido');
    const telefonoValido = validarTelefono(telefono, errorTelefono, 'Ingresa un teléfono válido');
    const motivoValido = validarCampoObligatorio(motivo, errorMotivo, 'Selecciona un motivo de contacto');
    const mensajeValido = validarLongitud(mensaje, errorMensaje, 10, 500, 'El mensaje debe tener entre 10 y 500 caracteres');
    const terminosValido = validarCheckbox(aceptaTerminos, errorTerminos, 'Debes aceptar los términos y condiciones');
    const preferenciaValida = validarRadioButtons(preferenciaContacto, errorPreferencia, 'Selecciona una preferencia de contacto');
    
    // Si todas las validaciones son correctas
    if (nombreValido && emailValido && telefonoValido && motivoValido && mensajeValido && terminosValido && preferenciaValida) {
        // Crear objeto de contacto
        const datosFormulario = {
            nombre: nombre.value.trim(),
            email: email.value.trim(),
            telefono: telefono.value.trim(),
            motivo: motivo.value,
            mensaje: mensaje.value.trim(),
            aceptaTerminos: aceptaTerminos.checked,
            preferenciaContacto: Array.from(preferenciaContacto).find(r => r.checked).value
        };
        
        // Guardar contacto usando el facade
        const resultado = contactFacade.guardarContacto(datosFormulario);
        
        if (resultado) {
            mostrarMensajeExito();
            // Limpiar formulario
            document.getElementById('formularioContacto').reset();
            // Remover clases de validación
            document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            // Actualizar lista de contactos
            listarContactos();
        } else {
            mostrarMensajeError('Error al guardar el contacto');
        }
        
        return false; // Evitar envío del formulario
    } else {
        mostrarMensajeError('Por favor, completa correctamente todos los campos');
        return false;
    }
}

// ========================================
// CONFIGURACIÓN DE VALIDACIONES EN TIEMPO REAL
// ========================================

function configurarValidacionesTiempoReal() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const motivo = document.getElementById('motivo');
    const mensaje = document.getElementById('mensaje');
    const aceptaTerminos = document.getElementById('aceptaTerminos');
    const preferenciaContacto = document.getElementsByName('preferenciaContacto');
    
    // Validaciones al perder el foco
    nombre.addEventListener('blur', () => {
        validarCampoObligatorio(nombre, document.getElementById('errorNombre'), 'El nombre es obligatorio');
    });
    
    email.addEventListener('blur', () => {
        validarEmail(email, document.getElementById('errorEmail'), 'Ingresa un email válido');
    });
    
    telefono.addEventListener('blur', () => {
        validarTelefono(telefono, document.getElementById('errorTelefono'), 'Ingresa un teléfono válido');
    });
    
    motivo.addEventListener('blur', () => {
        validarCampoObligatorio(motivo, document.getElementById('errorMotivo'), 'Selecciona un motivo de contacto');
    });
    
    mensaje.addEventListener('blur', () => {
        validarLongitud(mensaje, document.getElementById('errorMensaje'), 10, 500, 'El mensaje debe tener entre 10 y 500 caracteres');
    });
    
    aceptaTerminos.addEventListener('change', () => {
        validarCheckbox(aceptaTerminos, document.getElementById('errorTerminos'), 'Debes aceptar los términos y condiciones');
    });
    
    Array.from(preferenciaContacto).forEach(radio => {
        radio.addEventListener('change', () => {
            validarRadioButtons(preferenciaContacto, document.getElementById('errorPreferencia'), 'Selecciona una preferencia de contacto');
        });
    });
}

// ========================================
// MENSAJES DE NOTIFICACIÓN
// ========================================

function mostrarMensajeExito() {
    Toastify({
        text: "✅ ¡Mensaje enviado correctamente!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "500"
        },
        stopOnFocus: true,
    }).showToast();
}

function mostrarMensajeError(mensaje) {
    Toastify({
        text: `❌ ${mensaje}`,
        duration: 4000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "500"
        },
        stopOnFocus: true,
    }).showToast();
}

function mostrarMensajeInfo(mensaje) {
    Toastify({
        text: `ℹ️ ${mensaje}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(135deg, #0dcaf0 0%, #6f42c1 100%)",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "500"
        },
        stopOnFocus: true,
    }).showToast();
}

// ========================================
// GESTIÓN DE CONTACTOS
// ========================================

function listarContactos() {
    const contactos = contactFacade.listarContactos();
    const listaContactos = document.getElementById('listaContactos');
    
    if (contactos.length === 0) {
        listaContactos.innerHTML = '<div class="alert alert-info text-center">No hay contactos guardados</div>';
        return;
    }
    
    let tabla = `
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Motivo</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    contactos.forEach(contacto => {
        const fecha = new Date(contacto.fechaCreacion).toLocaleDateString('es-ES');
        tabla += `
            <tr>
                <td>${contacto.id}</td>
                <td>${contacto.nombre}</td>
                <td>${contacto.email}</td>
                <td>${contacto.telefono}</td>
                <td>${contacto.motivo}</td>
                <td>${fecha}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminarContacto(${contacto.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
    
    tabla += `
            </tbody>
        </table>
    `;
    
    listaContactos.innerHTML = tabla;
}

function eliminarContacto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
        const resultado = contactFacade.eliminarContacto(id);
        if (resultado) {
            mostrarMensajeInfo('Contacto eliminado correctamente');
            listarContactos();
        } else {
            mostrarMensajeError('Error al eliminar el contacto');
        }
    }
}

function borrarTodo() {
    if (confirm('¿Estás seguro de que quieres eliminar TODOS los contactos? Esta acción no se puede deshacer.')) {
        const resultado = contactFacade.borrarTodo();
        if (resultado) {
            mostrarMensajeInfo('Todos los contactos han sido eliminados');
            listarContactos();
        } else {
            mostrarMensajeError('Error al eliminar los contactos');
        }
    }
}

// ========================================
// NAVEGACIÓN Y ANIMACIONES
// ========================================

function configurarNavegacionSuave() {
    // Configurar scroll suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Actualizar navegación activa al hacer scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function configurarAnimacionesScroll() {
    // Configurar animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.card, .table, #formularioContacto').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// FUNCIONES ADICIONALES
// ========================================

// Función para mostrar/ocultar información adicional
function toggleInfo(elemento) {
    const info = elemento.nextElementSibling;
    if (info.style.display === 'none' || info.style.display === '') {
        info.style.display = 'block';
        elemento.innerHTML = 'Ver menos <i class="fas fa-chevron-up"></i>';
    } else {
        info.style.display = 'none';
        elemento.innerHTML = 'Ver más <i class="fas fa-chevron-down"></i>';
    }
}

// Función para copiar información de contacto
function copiarContacto(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        mostrarMensajeInfo('Información copiada al portapapeles');
    }, function(err) {
        mostrarMensajeError('Error al copiar la información');
    });
}

// Función para exportar contactos (futura implementación)
function exportarContactos() {
    const contactos = contactFacade.listarContactos();
    const dataStr = JSON.stringify(contactos, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'contactos.json';
    link.click();
    
    mostrarMensajeInfo('Contactos exportados correctamente');
}
