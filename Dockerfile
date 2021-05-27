# Create image based on the official Node 6 image from the dockerhub
FROM node:latest

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app/
EXPOSE 3000
CMD ["npm", "run", "dev"]