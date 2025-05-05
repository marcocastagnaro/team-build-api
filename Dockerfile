# ---- Step 1: Builder (Installs dependencies & builds the app) ----
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy package.json and package-lock.json to leverage Docker's cache
    COPY package*.json ./
    RUN npm install  # Install all dependencies, including dev dependencies
    
    # Install Nest CLI explicitly
    RUN npm install -g @nestjs/cli
    
    # Copy the entire application, including Prisma files
    COPY . .
    
    # Generate Prisma Client
    RUN npx prisma generate
    
    # Build the NestJS application
    RUN npm run build
    
    # ---- Step 2: Runtime (Minimal image for running the app) ----
    FROM node:20-alpine AS runtime
    
    WORKDIR /app
    
    # Copy only necessary files from builder
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./
    # ✅ Copy Prisma schema and migrations
    COPY --from=builder /app/prisma ./prisma
    
    # Expose the application's port
    EXPOSE 8080
    
    # Ensure database is ready before applying migrations
    CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
    