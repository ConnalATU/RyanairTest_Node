# Use the official Node.js 16.4.1 image
FROM node:16.4.1

# Set the working directory
WORKDIR /usr/src/app

# Copy package* files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy local code to the container
COPY . .

# Expose port 80
EXPOSE 80

# Run the command to start your application
CMD [ "npm", "test" ]
