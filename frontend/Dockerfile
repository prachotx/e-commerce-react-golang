FROM node:20

WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install -g bun && bun install
COPY . .

EXPOSE 5173
CMD ["bun", "run", "dev"]