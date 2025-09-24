// ========================================
// CLASE REPOSITORY: CONTACT REPOSITORY
// ========================================

class ContactRepository {
    constructor() {
        this.storageKey = 'contactos';
    }
    
    // Obtener todos los contactos
    getAll() {
        try {
            const contactosJSON = localStorage.getItem(this.storageKey);
            if (!contactosJSON) {
                return [];
            }
            
            const contactosData = JSON.parse(contactosJSON);
            return contactosData.map(contactoData => Contacto.fromJSON(contactoData));
        } catch (error) {
            console.error('Error al obtener contactos:', error);
            return [];
        }
    }
    
    // Obtener contacto por ID
    getById(id) {
        try {
            const contactos = this.getAll();
            return contactos.find(contacto => contacto.id === id) || null;
        } catch (error) {
            console.error('Error al obtener contacto por ID:', error);
            return null;
        }
    }
    
    // Agregar nuevo contacto
    add(contacto) {
        try {
            // Validar el contacto antes de guardarlo
            const errores = contacto.validar();
            if (errores.length > 0) {
                throw new Error('Datos del contacto inválidos: ' + errores.join(', '));
            }
            
            const contactos = this.getAll();
            
            // Verificar si ya existe un contacto con el mismo email
            const contactoExistente = contactos.find(c => c.email === contacto.email);
            if (contactoExistente) {
                throw new Error('Ya existe un contacto con este email');
            }
            
            contactos.push(contacto);
            this.saveToStorage(contactos);
            return true;
        } catch (error) {
            console.error('Error al agregar contacto:', error);
            return false;
        }
    }
    
    // Actualizar contacto existente
    update(contacto) {
        try {
            const contactos = this.getAll();
            const index = contactos.findIndex(c => c.id === contacto.id);
            
            if (index === -1) {
                throw new Error('Contacto no encontrado');
            }
            
            // Validar el contacto antes de actualizarlo
            const errores = contacto.validar();
            if (errores.length > 0) {
                throw new Error('Datos del contacto inválidos: ' + errores.join(', '));
            }
            
            // Actualizar fecha de modificación
            contacto.actualizar();
            contactos[index] = contacto;
            
            this.saveToStorage(contactos);
            return true;
        } catch (error) {
            console.error('Error al actualizar contacto:', error);
            return false;
        }
    }
    
    // Eliminar contacto por ID
    remove(id) {
        try {
            const contactos = this.getAll();
            const contactosFiltrados = contactos.filter(contacto => contacto.id !== id);
            
            if (contactosFiltrados.length === contactos.length) {
                throw new Error('Contacto no encontrado');
            }
            
            this.saveToStorage(contactosFiltrados);
            return true;
        } catch (error) {
            console.error('Error al eliminar contacto:', error);
            return false;
        }
    }
    
    // Limpiar todos los contactos
    clear() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error al limpiar contactos:', error);
            return false;
        }
    }
    
    // Guardar contactos en localStorage
    saveToStorage(contactos) {
        try {
            const contactosJSON = JSON.stringify(contactos.map(contacto => contacto.toJSON()));
            localStorage.setItem(this.storageKey, contactosJSON);
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
            throw error;
        }
    }
    
    // Obtener estadísticas de contactos
    getStats() {
        try {
            const contactos = this.getAll();
            const stats = {
                total: contactos.length,
                recientes: contactos.filter(c => c.esReciente()).length,
                porMotivo: {},
                porMes: {}
            };
            
            // Contar por motivo
            contactos.forEach(contacto => {
                stats.porMotivo[contacto.motivo] = (stats.porMotivo[contacto.motivo] || 0) + 1;
            });
            
            // Contar por mes
            contactos.forEach(contacto => {
                const fecha = new Date(contacto.fechaCreacion);
                const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
                stats.porMes[mes] = (stats.porMes[mes] || 0) + 1;
            });
            
            return stats;
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            return {
                total: 0,
                recientes: 0,
                porMotivo: {},
                porMes: {}
            };
        }
    }
    
    // Buscar contactos por criterio
    search(criterio) {
        try {
            const contactos = this.getAll();
            const termino = criterio.toLowerCase();
            
            return contactos.filter(contacto => 
                contacto.nombre.toLowerCase().includes(termino) ||
                contacto.email.toLowerCase().includes(termino) ||
                contacto.motivo.toLowerCase().includes(termino) ||
                contacto.mensaje.toLowerCase().includes(termino)
            );
        } catch (error) {
            console.error('Error al buscar contactos:', error);
            return [];
        }
    }
    
    // Obtener contactos por rango de fechas
    getByDateRange(fechaInicio, fechaFin) {
        try {
            const contactos = this.getAll();
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);
            
            return contactos.filter(contacto => {
                const fechaContacto = new Date(contacto.fechaCreacion);
                return fechaContacto >= inicio && fechaContacto <= fin;
            });
        } catch (error) {
            console.error('Error al obtener contactos por rango de fechas:', error);
            return [];
        }
    }
    
    // Exportar contactos a JSON
    exportToJSON() {
        try {
            const contactos = this.getAll();
            return JSON.stringify(contactos.map(contacto => contacto.toJSON()), null, 2);
        } catch (error) {
            console.error('Error al exportar contactos:', error);
            return null;
        }
    }
    
    // Importar contactos desde JSON
    importFromJSON(jsonString) {
        try {
            const contactosData = JSON.parse(jsonString);
            const contactos = contactosData.map(contactoData => Contacto.fromJSON(contactoData));
            
            // Validar todos los contactos antes de importar
            const contactosValidos = contactos.filter(contacto => {
                const errores = contacto.validar();
                return errores.length === 0;
            });
            
            if (contactosValidos.length !== contactos.length) {
                console.warn('Algunos contactos no pudieron ser importados debido a datos inválidos');
            }
            
            // Guardar contactos válidos
            this.saveToStorage(contactosValidos);
            return contactosValidos.length;
        } catch (error) {
            console.error('Error al importar contactos:', error);
            return 0;
        }
    }
    
    // Verificar si localStorage está disponible
    isStorageAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    // Obtener tamaño de datos en localStorage
    getStorageSize() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? new Blob([data]).size : 0;
        } catch (error) {
            console.error('Error al obtener tamaño de almacenamiento:', error);
            return 0;
        }
    }
}
