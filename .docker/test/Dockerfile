# BUILD
FROM node:20-alpine AS build

WORKDIR /api

# Install dependencies for node-gyp
RUN apk add --no-cache python3 make g++

# Copy package.json and yarn.lock first to leverage Docker cache
COPY ./package.json ./yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm install -g @nestjs/cli && nest build

# CONTAINER
FROM node:20-alpine

WORKDIR /api

# Install debugging tools (optional)
# RUN apk add --no-cache gdb
RUN apk add --no-cache python3 make g++

# Copy only necessary files from the build stage
COPY --from=build /api/package.json ./
COPY --from=build /api/yarn.lock ./
COPY --from=build /api/dist ./dist
COPY --from=build /api/node_modules ./node_modules

# Enable core dumps (optional for debugging)
# RUN ulimit -c unlimited

CMD ["node", "dist/src/main.js"]
