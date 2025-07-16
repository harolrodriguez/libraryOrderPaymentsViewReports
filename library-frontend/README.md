# 📚 Sistema de Gestión de Órdenes - Biblioteca

Una aplicación web simple en React para gestionar órdenes de compra de libros con simulación de API y datos mockeados.

## 🚀 Características

- **Lista de Órdenes**: Visualiza todas las órdenes con información detallada
- **Crear Nueva Orden**: Formulario de checkout completo
- **Estados de Orden**: Pagado, Pendiente, Enviado, Cancelado
- **Métodos de Pago**: Yape, Transferencia, Visa, Efectivo
- **Tipos de Entrega**: Recojo en sede o Delivery a domicilio
- **Responsive Design**: Funciona en desktop y móvil

## 🛠️ Tecnologías

- **React 19** - Framework frontend
- **Vite 4.5** - Build tool y dev server
- **React Router DOM** - Navegación entre páginas
- **Tailwind CSS** - Estilos y diseño responsive
- **Axios** - Cliente HTTP (preparado para API real)

## 📦 Instalación

### Prerrequisitos
- Node.js 20+ (usar `nvm use 20`)
- npm 10+

### Pasos

1. **Clonar y navegar al proyecto**
```bash
cd library-frontend
```

2. **Usar Node 20**
```bash
nvm use 20
```

3. **Instalar dependencias**
```bash
npm install
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
library-frontend/
├── src/
│   ├── pages/
│   │   ├── OrdersPage.jsx      # Lista de órdenes
│   │   └── CheckoutPage.jsx    # Formulario de nueva orden
│   ├── services/
│   │   └── orderService.js     # API simulada y funciones
│   ├── App.jsx                 # Router principal
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos Tailwind
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Configuración de API

### Modo Mock (Actual)
```javascript
// En src/services/orderService.js
const USE_MOCK_API = true; // ✅ Datos simulados
```

### Modo API Real (Futuro)
```javascript
// En src/services/orderService.js
const USE_MOCK_API = false; // 🔄 Conectar a API real

// Configurar URL de tu API ASP.NET Core
const API_BASE_URL = 'https://localhost:7001/api';
```

## 📊 Datos de Ejemplo

La aplicación incluye órdenes simuladas con:

- **Clientes**: Juan Pérez, María García, Carlos López
- **Productos**: Libros de programación (JavaScript, React, Python, etc.)
- **Precios**: En soles peruanos (S/)
- **Estados**: Diferentes estados de orden
- **Direcciones**: Direcciones de Lima, Perú

## 🎯 Funcionalidades Principales

### 1. Lista de Órdenes (`/`)
- Muestra todas las órdenes en tarjetas
- Filtros por estado con colores
- Información completa de cada orden
- Botón para crear nueva orden
- Botón para actualizar lista

### 2. Checkout (`/checkout`)
- Formulario de datos del cliente
- Selección de tipo de entrega
- Campo condicional para dirección
- Métodos de pago peruanos
- Resumen del carrito
- Validación de campos

## 🎨 Diseño

- **Colores**: Esquema azul profesional
- **Estados**: Verde (Pagado), Amarillo (Pendiente), Azul (Enviado), Rojo (Cancelado)
- **Layout**: Grid responsive, cards con sombras
- **Tipografía**: Sistema de fuentes nativo
- **Espaciado**: Consistente con Tailwind

## 🚦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🔄 Próximos Pasos

1. **Conectar API Real**: Cambiar `USE_MOCK_API = false`
2. **Autenticación**: Agregar login/logout
3. **Filtros**: Por fecha, estado, cliente
4. **Paginación**: Para listas grandes
5. **Notificaciones**: Toast messages
6. **Validaciones**: Más robustas
7. **Testing**: Unit tests con Jest/Vitest

## 🐛 Solución de Problemas

### Error de Node.js
```bash
# Asegúrate de usar Node 20
nvm use 20
node --version # Debe mostrar v20.x.x
```

### Error de dependencias
```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
```

### Error de Vite
```bash
# Verificar que Vite sea versión 4.5
npm list vite
```

## 📝 Notas

- **Datos Simulados**: Todos los datos son de ejemplo
- **Latencia Simulada**: Se simula delay de red (500-800ms)
- **Persistencia**: Los datos se pierden al recargar (solo en memoria)
- **Responsive**: Optimizado para móvil y desktop
- **Accesibilidad**: Formularios con labels apropiados

## 👨‍💻 Desarrollo

Creado con ❤️ para demostrar un flujo completo de órdenes de compra con React moderno y mejores prácticas.

---

**¿Necesitas ayuda?** Revisa la consola del navegador para logs detallados o contacta al equipo de desarrollo.