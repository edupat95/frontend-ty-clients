# Use una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Compila la aplicación
RUN npm run build

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 3000 (el puerto predeterminado de React)
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "start"]