# Create image based on the official Node 6 image from the dockerhub
FROM node:latest

WORKDIR /app
COPY package*.json .

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]