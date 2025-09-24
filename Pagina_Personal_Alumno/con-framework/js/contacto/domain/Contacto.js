// ========================================
// CLASE DOMAIN: CONTACTO
// ========================================

class Contacto {
    constructor(datosFormulario) {
        this.id = this.generarId();
        this.nombre = datosFormulario.nombre || '';
        this.email = datosFormulario.email || '';
        this.telefono = datosFormulario.telefono || '';
        this.motivo = datosFormulario.motivo || '';
        this.mensaje = datosFormulario.mensaje || '';
        this.aceptaTerminos = datosFormulario.aceptaTerminos || false;
        this.preferenciaContacto = datosFormulario.preferenciaContacto || '';
        this.fechaCreacion = new Date().toISOString();
        this.fechaActualizacion = new Date().toISOString();
    }
    
    // Generar ID único basado en timestamp y número aleatorio
    generarId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    }
    
    // Actualizar fecha de modificación
    actualizar() {
        this.fechaActualizacion = new Date().toISOString();
    }
    
    // Validar datos del contacto
    validar() {
        const errores = [];
        
        if (!this.nombre || this.nombre.trim() === '') {
            errores.push('El nombre es obligatorio');
        }
        
        if (!this.email || this.email.trim() === '') {
            errores.push('El email es obligatorio');
        } else if (!this.validarEmail(this.email)) {
            errores.push('El email no tiene un formato válido');
        }
        
        if (!this.telefono || this.telefono.trim() === '') {
            errores.push('El teléfono es obligatorio');
        }
        
        if (!this.motivo || this.motivo.trim() === '') {
            errores.push('El motivo de contacto es obligatorio');
        }
        
        if (!this.mensaje || this.mensaje.trim() === '') {
            errores.push('El mensaje es obligatorio');
        } else if (this.mensaje.length < 10) {
            errores.push('El mensaje debe tener al menos 10 caracteres');
        }
        
        if (!this.aceptaTerminos) {
            errores.push('Debe aceptar los términos y condiciones');
        }
        
        if (!this.preferenciaContacto || this.preferenciaContacto.trim() === '') {
            errores.push('La preferencia de contacto es obligatoria');
        }
        
        return errores;
    }
    
    // Validar formato de email
    validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Convertir a objeto JSON
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            motivo: this.motivo,
            mensaje: this.mensaje,
            aceptaTerminos: this.aceptaTerminos,
            preferenciaContacto: this.preferenciaContacto,
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion
        };
    }
    
    // Crear instancia desde objeto JSON
    static fromJSON(json) {
        const contacto = new Contacto({});
        contacto.id = json.id;
        contacto.nombre = json.nombre;
        contacto.email = json.email;
        contacto.telefono = json.telefono;
        contacto.motivo = json.motivo;
        contacto.mensaje = json.mensaje;
        contacto.aceptaTerminos = json.aceptaTerminos;
        contacto.preferenciaContacto = json.preferenciaContacto;
        contacto.fechaCreacion = json.fechaCreacion;
        contacto.fechaActualizacion = json.fechaActualizacion;
        return contacto;
    }
    
    // Obtener información resumida del contacto
    getResumen() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            motivo: this.motivo,
            fechaCreacion: this.fechaCreacion
        };
    }
    
    // Verificar si el contacto es reciente (últimos 7 días)
    esReciente() {
        const fechaCreacion = new Date(this.fechaCreacion);
        const fechaActual = new Date();
        const diferenciaDias = (fechaActual - fechaCreacion) / (1000 * 60 * 60 * 24);
        return diferenciaDias <= 7;
    }
    
    // Obtener días transcurridos desde la creación
    getDiasTranscurridos() {
        const fechaCreacion = new Date(this.fechaCreacion);
        const fechaActual = new Date();
        const diferenciaDias = (fechaActual - fechaCreacion) / (1000 * 60 * 60 * 24);
        return Math.floor(diferenciaDias);
    }
}
