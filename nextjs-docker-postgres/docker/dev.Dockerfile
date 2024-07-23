FROM oven/bun:1

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY bun.lock ./

# Install app dependencies
RUN bun install

# Bundle app source
COPY . .

RUN bun prisma migrate dev --name init

RUN bun prisma generate

CMD bun run dev
