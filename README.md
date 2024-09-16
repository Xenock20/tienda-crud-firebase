
# Proyecto de Gestión de Productos Tienda Online

Este proyecto consta de dos partes: un frontend desarrollado con Next.js 14 y un backend construido con Node.js y Firebase. A continuación se detallan los pasos para instalar y configurar el proyecto.


## Requisitos previos

 - Node.js
 - NPM o Yarn

## Instalación

Sigue estos pasos para clonar, configurar e iniciar el proyecto:

### 1. Clonar el repositorio

Primero, clona el repositorio desde GitHub:

```bash
  git clone https://github.com/Xenock20/tienda-crud-firebase.git
```
    
Luego, navega a la carpeta del proyecto:

```bash
  cd tienda-crud-firebase
```

### 2. Configurar el archivo .env

El proyecto utiliza Firebase para la gestión de almacenamiento y base de datos, por lo que necesitarás configurar tus credenciales de Firebase en el archivo .env.

#### 1. Ve a la carpeta backend:

```bash
  cd backend
```

#### 2. Crea un archivo .env dentro de esta carpeta y agrega las credenciales que te proporcioné por correo. Deberá contener las variables de configuración de Firebase como por ejemplo:

```plaintext
apiKey=your-api-key
authDomian=your-auth-domain
projectId=your-project-id
storageBucket=your-storage-bucket
messagingSenderId=your-sender-id
appId=your-app-id
NODE_ENV=development
SERVER_PORT=3001
```

  Asegúrate de completar estos campos con la información correcta de tu cuenta de Firebase.

### 3. Instalar dependencias

Instala las dependencias de ambos el frontend y el backend.

- Frontend:

  Navega a la carpeta frontend:

  ```bash
  cd ../frontend
    ```

  Instala las dependencias usando NPM o Yarn:

  ```bash
  npm install
    ```

- Backend:

  Navega a la carpeta backend:

  ```bash
  cd ../backend
    ```

  Instala las dependencias:

  ```bash
  npm install
    ```

### 4. Iniciar el proyecto

- Frontend:

  Navega a la carpeta frontend:

  ```bash
  cd ../frontend
    ```

  Dentro de la carpeta frontend desde una terminal, ejecuta:

  ```bash
  npm run dev

    ```

- Backend:

  Navega a la carpeta backend desde otra terminal:

  ```bash
  cd ../backend
    ```

  Navega a la carpeta backend y ejecuta:

  ```bash
  npm run start

    ```


El frontend estará disponible en http://localhost:3000 y el backend correrá en http://localhost:3001 por defecto.