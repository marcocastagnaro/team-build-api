FROM node:20-slim

WORKDIR /app

# Copiar package.json y package-lock.json primero para aprovechar el cache de Docker
COPY package*.json ./

# Instalar solo las dependencias necesarias
RUN npm install --omit=dev

# Copiar el resto del código fuente
COPY . .

# Generar Prisma Client y construir el proyecto
RUN apt-get update -y && apt-get install -y openssl

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
