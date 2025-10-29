# Etapa 1: Build con Bun
FROM oven/bun:latest AS builder

WORKDIR /app

# Copia archivos del proyecto
COPY . .

# Instala dependencias y construye con el adapter-node
RUN bun install
RUN bun run build

# Etapa 2: Producción usando Node.js
FROM oven/bun:slim AS runner

WORKDIR /app

# Copia solo lo necesario
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expone el puerto definido en el adapter-node
ENV PORT=4321
ENV HOST=0.0.0.0
EXPOSE 4321

ENV ASTRO_NODE_FORCE_HTTP=true

# Ejecuta el servidor generado por el adapter-node
CMD ["bun", "./dist/server/entry.mjs"]
