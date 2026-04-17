# Proyecto_USO2026

## Guía para inicializar el Frontend (React)

A continuación, se detallan los pasos y comandos necesarios para crear y levantar el proyecto de React desde cero utilizando Vite.

### 1. Crear el proyecto de React
Utilizaremos **Vite** para crear el proyecto de React por su rapidez y optimización moderna.

```bash
# Crea un nuevo proyecto llamado "frontend" usando la plantilla de React
npx create-vite@latest frontend --template react
```

### 2. Navegar al directorio del proyecto
Una vez creado, debes entrar a la carpeta del nuevo proyecto.

```bash
# Ingresa a la carpeta del frontend
cd frontend
```

### 3. Instalar dependencias
Instala todas las librerías y paquetes que React necesita para funcionar.

```bash
# Instala las dependencias definidas en el package.json
npm install
```

### 4. Ejecutar el servidor de desarrollo
Finalmente, levanta el proyecto para poder verlo de forma local.

```bash
# Inicia el servidor local de desarrollo
npm run dev
```

Al ejecutar el último comando, la terminal te mostrará una URL local (generalmente `http://localhost:5173/`) a la cual podrás acceder para visualizar la aplicación inicial de React.

## Guía para inicializar el Backend (Node.js)

A continuación, se detallan los pasos para configurar y levantar el servidor de base de datos.

### 1. Inicializar el proyecto
Entra en la carpeta del backend e inicializa Node.js.

```bash
cd backend
npm init -y
```

### 2. Instalar dependencias esenciales
Instala el servidor y los conectores de base de datos.

```bash
# Instalación de librerías base
npm install express mysql2 dotenv cors morgan
```

### 3. Configurar variables de entorno
Crea un archivo llamado `.env` en la raíz de la carpeta `backend` con el siguiente contenido:

```env
PORT=4000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=sistema_laboratorio
```

### 4. Ejecutar el servidor
Puedes iniciar el servidor con:

```bash
# Ejecución normal
node src/server.js
```

---

## Estructura Actual del Proyecto

El proyecto se divide en tres áreas principales para mantener una separación clara de responsabilidades:

### 1. Base de Datos (`/database`)
Contiene los scripts SQL para la creación y gestión del esquema de la base de datos.
- `bd_sistema_laboratorio.sql`: Esquema completo de tablas y relaciones.

### 2. Backend (`/backend`)
Servidor Node.js estructurado de forma modular (JavaScript):

```text
backend/
├── src/
│   ├── config/         # Conexión a la base de datos (db.js)
│   ├── middleware/     # Funciones de filtrado y seguridad
│   ├── routes/         # Definición de rutas/endpoints
│   ├── services/       # Lógica de negocio y consultas pesadas
│   ├── controllers/    # Controladores de las rutas
│   └── server.js       # Archivo principal de configuración de Express
├── .env                # Variables de entorno
└── index.js            # Punto de entrada para el arranque del servidor
```

### 3. Frontend (`/frontend/src`)
Aplicación React estructurada de forma modular:

```text
frontend/src/
├── components/
│   └── layout/         # Componentes globales (Sidebar, Navbar, MainLayout)
├── css/                # Estilos compartidos por vistas
├── pages/
│   ├── estudiante/     # Vistas específicas del rol Estudiante
│   ├── admin/          # Vistas específicas del rol Administrador
│   └── auth/           # Vistas de inicio de sesión y registro
├── routes/             # Configuración del AppRouter
└── App.tsx             # Punto de entrada de la aplicación
```

