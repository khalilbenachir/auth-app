# Use the official Node.js image as the base image
FROM node:lts-alpine
# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Command to run the application
CMD ["pnpm", "dev"]