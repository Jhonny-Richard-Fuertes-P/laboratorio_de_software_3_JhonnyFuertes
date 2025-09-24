# Página Personal - Jhonny Richard Fuertes Patiño

Este proyecto contiene una página web personal desarrollada en dos versiones: una versión nativa (sin framework) y otra versión con framework (Bootstrap), cumpliendo con los requisitos del proyecto académico.

## Descripción del Proyecto

La página personal incluye las siguientes secciones obligatorias:
- **Inicio**: Información personal, foto y expectativas profesionales
- **Estudios**: Trayectoria educativa en formato de tabla
- **Pasatiempos**: Mínimo 3 hobbies con imágenes y descripciones
- **Proyectos**: Lista de proyectos realizados con tecnologías utilizadas
- **Contacto**: Formulario completo con validaciones y sistema de persistencia

##  Tecnologías Utilizadas

### Versión Sin Framework (Nativa)
- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados con gradientes y animaciones
- **JavaScript ES6+**: Funcionalidad interactiva y validaciones
- **localStorage**: Persistencia de datos del formulario de contacto

### Versión Con Framework (Bootstrap)
- **HTML5**: Estructura semántica
- **Bootstrap 5.3.0**: Framework CSS para diseño responsive
- **CSS3**: Estilos personalizados adicionales
- **JavaScript ES6+**: Funcionalidad interactiva y validaciones
- **localStorage**: Persistencia de datos del formulario de contacto

##  Estructura del Proyecto

```
Pagina_Personal_Alumno/
├── README.md                          # Este archivo
├── sin-framework/                     # Versión nativa
│   ├── index.html                     # Página principal
│   ├── css/
│   │   └── estilo.css                 # Estilos personalizados
│   ├── js/
│   │   ├── script.js                  # Funciones principales
│   │   └── contacto/                  # Sistema de contacto
│   │       ├── domain/
│   │       │   └── Contacto.js        # Entidad de contacto
│   │       ├── repository/
│   │       │   └── ContactRepository.js # CRUD en localStorage
│   │       └── facade/
│   │           └── ContactFacade.js   # API simplificada
│   └── assets/                        # Recursos multimedia
│       ├── images/                    # Imágenes personales
│       ├── icons/                     # Iconos
│       └── media/                     # Videos/audios
└── con-framework/                     # Versión con Bootstrap
    ├── index.html                     # Página principal
    ├── css/
    │   └── custom.css                 # Estilos personalizados
    ├── js/
    │   ├── funciones.js               # Funciones principales
    │   └── contacto/                  # Sistema de contacto
    │       ├── domain/
    │       │   └── Contacto.js        # Entidad de contacto
    │       ├── repository/
    │       │   └── ContactRepository.js # CRUD en localStorage
    │       └── facade/
    │           └── ContactFacade.js   # API simplificada
    └── assets/                        # Recursos multimedia
        ├── images/                    # Imágenes personales
        ├── icons/                     # Iconos
        └── media/                     # Videos/audios
```

## Características Principales

### Funcionalidades JavaScript
-  **Validación de formulario**: Validación en tiempo real y al enviar
-  **Carrusel de imágenes**: Implementación nativa (versión sin framework)
-  **Sistema de contacto**: Persistencia con Repository y Facade patterns
-  **Navegación suave**: Scroll automático entre secciones
-  **Animaciones**: Efectos visuales al hacer scroll
-  **Notificaciones**: Mensajes de éxito/error con Toastify

### Sistema de Contacto
-  **Repository Pattern**: Gestión de datos en localStorage
-  **Facade Pattern**: API simplificada para operaciones CRUD
-  **Validaciones**: Validación completa de datos del formulario
-  **Persistencia**: Almacenamiento local de contactos
-  **Operaciones**: Crear, leer, actualizar, eliminar contactos

### Diseño Responsive
-  **Versión Bootstrap**: Completamente responsive con grid system
-  **Versión Nativa**: Optimizada para desktop (según requisitos)
-  **Componentes**: Cards, tablas, formularios adaptativos
-  **Navegación**: Menú responsive con hamburguesa

##  Instrucciones de Uso

### Cómo Abrir el Proyecto

1. **Descargar/Extraer** el archivo ZIP del proyecto
2. **Navegar** a la carpeta deseada:
   - `sin-framework/` para la versión nativa
   - `con-framework/` para la versión con Bootstrap
3. **Abrir** el archivo `index.html` en cualquier navegador moderno:
   - Google Chrome
   - Mozilla Firefox
   - Microsoft Edge
   - Safari

### Personalización

Para personalizar la página con tu información:

1. **Editar** el archivo `index.html` correspondiente
2. **Reemplazar** los siguientes elementos:
   - `[Tu Nombre Completo]` → Tu nombre real
   - `[DD/MM/AAAA]` → Tu fecha de nacimiento
   - `[Nombre de tu colegio]` → Nombre de tu institución educativa
   - `[Ciudad, País]` → Tu ubicación
3. **Agregar** tus imágenes personales en la carpeta `assets/images/`
4. **Actualizar** las rutas de las imágenes en el HTML

### Formulario de Contacto

El formulario incluye:
- **Campos obligatorios**: Nombre, email, teléfono, motivo, mensaje
- **Validaciones**: Formato de email, longitud de mensaje, campos requeridos
- **Persistencia**: Los contactos se guardan en localStorage
- **Gestión**: Ver, eliminar contactos individuales o todos

##  Características de Diseño

### Versión Sin Framework
- **Colores**: Gradientes azul-púrpura para header y elementos principales
- **Tipografía**: Segoe UI con jerarquía clara
- **Animaciones**: Efectos hover y transiciones suaves
- **Layout**: Grid y flexbox para organización
- **Responsive**: Optimizado para desktop

### Versión Con Framework
- **Bootstrap**: Componentes predefinidos con personalización
- **Grid System**: Layout responsive automático
- **Componentes**: Cards, botones, formularios estilizados
- **Responsive**: Adaptable a todos los dispositivos
- **Personalización**: Estilos adicionales en `custom.css`

## Patrones de Diseño Implementados

### Repository Pattern
- **ContactRepository**: Maneja operaciones CRUD en localStorage
- **Métodos**: `getAll()`, `getById()`, `add()`, `update()`, `remove()`, `clear()`
- **Validación**: Verificación de datos antes de guardar
- **Error Handling**: Manejo robusto de errores

### Facade Pattern
- **ContactFacade**: API simplificada para operaciones de contacto
- **Métodos**: `guardarContacto()`, `listarContactos()`, `eliminarContacto()`, `borrarTodo()`
- **Abstracción**: Oculta la complejidad del repository
- **Facilidad de uso**: Interfaz simple para la UI

## Compatibilidad

### Navegadores Soportados
-  Chrome 90+
-  Firefox 88+
-  Edge 90+
-  Safari 14+

### Características Requeridas
-  JavaScript habilitado
-  localStorage disponible
-  CSS Grid y Flexbox
-  ES6+ (Arrow functions, classes, modules)

##  Funcionalidades Avanzadas

### Sistema de Notificaciones
- **Toastify.js**: Notificaciones elegantes
- **Tipos**: Éxito, error, información
- **Posicionamiento**: Esquina superior derecha
- **Duración**: Configurable por tipo de mensaje

### Validaciones en Tiempo Real
- **Eventos**: `blur`, `change`, `input`
- **Feedback visual**: Colores de borde y mensajes de error
- **Validaciones**: Email, teléfono, longitud, campos requeridos

### Gestión de Estado
- **localStorage**: Persistencia de datos
- **Sincronización**: Actualización automática de la UI
- **Backup**: Exportación de contactos a JSON

## Notas de Desarrollo

### Consideraciones Técnicas
- **Sin Framework**: No requiere dependencias externas
- **Con Framework**: Utiliza CDN para Bootstrap y librerías
- **Performance**: Carga optimizada de recursos
- **SEO**: Estructura semántica HTML5

### Mejoras Futuras
-  Implementación de IndexedDB para mayor capacidad
-  Sistema de autenticación
-  Integración con APIs externas
-  Modo oscuro/claro
-  PWA (Progressive Web App)

##  Autor

**Nombre**: Jhonny Richard Fuertes Patiño  
**Universidad**: Universidad del Cauca  
**Programa**: Ingeniería de Sistemas  
**Año**: 2024

## Licencia

Este proyecto es parte de un trabajo académico y está destinado únicamente para fines educativos.

---

**Desarrollado con ❤️ usando HTML, CSS y JavaScript**




