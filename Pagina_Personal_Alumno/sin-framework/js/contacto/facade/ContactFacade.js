// ========================================
// CLASE FACADE: CONTACT FACADE
// ========================================

class ContactFacade {
    constructor() {
        this.repository = new ContactRepository();
    }
    
    // Guardar contacto (alta nivel)
    guardarContacto(datosFormulario) {
        try {
            // Crear instancia de Contacto
            const contacto = new Contacto(datosFormulario);
            
            // Guardar usando el repository
            const resultado = this.repository.add(contacto);
            
            if (resultado) {
                console.log('Contacto guardado exitosamente:', contacto.getResumen());
            }
            
            return resultado;
        } catch (error) {
            console.error('Error en ContactFacade.guardarContacto:', error);
            return false;
        }
    }
    
    // Listar todos los contactos (alta nivel)
    listarContactos() {
        try {
            const contactos = this.repository.getAll();
            console.log(`Se encontraron ${contactos.length} contactos`);
            return contactos;
        } catch (error) {
            console.error('Error en ContactFacade.listarContactos:', error);
            return [];
        }
    }
    
    // Eliminar contacto por ID (alta nivel)
    eliminarContacto(id) {
        try {
            const resultado = this.repository.remove(id);
            
            if (resultado) {
                console.log(`Contacto con ID ${id} eliminado exitosamente`);
            }
            
            return resultado;
        } catch (error) {
            console.error('Error en ContactFacade.eliminarContacto:', error);
            return false;
        }
    }
    
    // Borrar todos los contactos (alta nivel)
    borrarTodo() {
        try {
            const resultado = this.repository.clear();
            
            if (resultado) {
                console.log('Todos los contactos han sido eliminados');
            }
            
            return resultado;
        } catch (error) {
            console.error('Error en ContactFacade.borrarTodo:', error);
            return false;
        }
    }
    
    // Actualizar contacto existente (alta nivel)
    actualizarContacto(id, datosActualizados) {
        try {
            // Obtener contacto existente
            const contactoExistente = this.repository.getById(id);
            
            if (!contactoExistente) {
                console.error(`Contacto con ID ${id} no encontrado`);
                return false;
            }
            
            // Actualizar datos
            Object.keys(datosActualizados).forEach(key => {
                if (contactoExistente.hasOwnProperty(key)) {
                    contactoExistente[key] = datosActualizados[key];
                }
            });
            
            // Guardar cambios
            const resultado = this.repository.update(contactoExistente);
            
            if (resultado) {
                console.log(`Contacto con ID ${id} actualizado exitosamente`);
            }
            
            return resultado;
        } catch (error) {
            console.error('Error en ContactFacade.actualizarContacto:', error);
            return false;
        }
    }
    
    // Obtener contacto por ID (alta nivel)
    obtenerContacto(id) {
        try {
            const contacto = this.repository.getById(id);
            
            if (contacto) {
                console.log(`Contacto encontrado: ${contacto.nombre}`);
            } else {
                console.log(`Contacto con ID ${id} no encontrado`);
            }
            
            return contacto;
        } catch (error) {
            console.error('Error en ContactFacade.obtenerContacto:', error);
            return null;
        }
    }
    
    // Buscar contactos (alta nivel)
    buscarContactos(termino) {
        try {
            const resultados = this.repository.search(termino);
            console.log(`Búsqueda "${termino}": ${resultados.length} resultados encontrados`);
            return resultados;
        } catch (error) {
            console.error('Error en ContactFacade.buscarContactos:', error);
            return [];
        }
    }
    
    // Obtener estadísticas (alta nivel)
    obtenerEstadisticas() {
        try {
            const stats = this.repository.getStats();
            console.log('Estadísticas de contactos:', stats);
            return stats;
        } catch (error) {
            console.error('Error en ContactFacade.obtenerEstadisticas:', error);
            return {
                total: 0,
                recientes: 0,
                porMotivo: {},
                porMes: {}
            };
        }
    }
    
    // Obtener contactos recientes (alta nivel)
    obtenerContactosRecientes() {
        try {
            const contactos = this.listarContactos();
            const recientes = contactos.filter(contacto => contacto.esReciente());
            console.log(`Se encontraron ${recientes.length} contactos recientes`);
            return recientes;
        } catch (error) {
            console.error('Error en ContactFacade.obtenerContactosRecientes:', error);
            return [];
        }
    }
    
    // Obtener contactos por motivo (alta nivel)
    obtenerContactosPorMotivo(motivo) {
        try {
            const contactos = this.listarContactos();
            const filtrados = contactos.filter(contacto => contacto.motivo === motivo);
            console.log(`Se encontraron ${filtrados.length} contactos con motivo: ${motivo}`);
            return filtrados;
        } catch (error) {
            console.error('Error en ContactFacade.obtenerContactosPorMotivo:', error);
            return [];
        }
    }
    
    // Exportar contactos (alta nivel)
    exportarContactos() {
        try {
            const jsonData = this.repository.exportToJSON();
            
            if (jsonData) {
                // Crear y descargar archivo
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `contactos_${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                console.log('Contactos exportados exitosamente');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error en ContactFacade.exportarContactos:', error);
            return false;
        }
    }
    
    // Importar contactos (alta nivel)
    importarContactos(archivo) {
        try {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    try {
                        const jsonString = e.target.result;
                        const cantidadImportados = this.repository.importFromJSON(jsonString);
                        console.log(`${cantidadImportados} contactos importados exitosamente`);
                        resolve(cantidadImportados);
                    } catch (error) {
                        console.error('Error al procesar archivo:', error);
                        reject(error);
                    }
                };
                
                reader.onerror = (error) => {
                    console.error('Error al leer archivo:', error);
                    reject(error);
                };
                
                reader.readAsText(archivo);
            });
        } catch (error) {
            console.error('Error en ContactFacade.importarContactos:', error);
            return Promise.reject(error);
        }
    }
    
    // Validar datos antes de guardar (alta nivel)
    validarDatosContacto(datosFormulario) {
        try {
            const contacto = new Contacto(datosFormulario);
            const errores = contacto.validar();
            
            if (errores.length > 0) {
                console.warn('Datos de contacto inválidos:', errores);
                return {
                    valido: false,
                    errores: errores
                };
            }
            
            return {
                valido: true,
                errores: []
            };
        } catch (error) {
            console.error('Error en ContactFacade.validarDatosContacto:', error);
            return {
                valido: false,
                errores: ['Error interno de validación']
            };
        }
    }
    
    // Obtener resumen de contactos (alta nivel)
    obtenerResumenContactos() {
        try {
            const contactos = this.listarContactos();
            const resumen = contactos.map(contacto => contacto.getResumen());
            console.log(`Resumen de ${resumen.length} contactos generado`);
            return resumen;
        } catch (error) {
            console.error('Error en ContactFacade.obtenerResumenContactos:', error);
            return [];
        }
    }
    
    // Verificar estado del sistema (alta nivel)
    verificarEstadoSistema() {
        try {
            const estado = {
                storageDisponible: this.repository.isStorageAvailable(),
                totalContactos: this.repository.getAll().length,
                tamañoAlmacenamiento: this.repository.getStorageSize(),
                estadisticas: this.obtenerEstadisticas()
            };
            
            console.log('Estado del sistema de contactos:', estado);
            return estado;
        } catch (error) {
            console.error('Error en ContactFacade.verificarEstadoSistema:', error);
            return {
                storageDisponible: false,
                totalContactos: 0,
                tamañoAlmacenamiento: 0,
                estadisticas: {}
            };
        }
    }
}
