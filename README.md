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