# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Copy the .env files
# COPY .env ./

# Creates a "dist" folder with the production build
RUN yarn build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["node", "dist/main.js"]

# Command Database
# docker compose -f mysql-twil.yml --env-file /var/www/pelayan-dev/.env up -d mysql