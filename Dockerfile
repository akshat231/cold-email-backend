# Use an official Node.js base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your app
COPY . .

# Expose the app port (change if needed)
EXPOSE 7000

# Start the app
CMD ["npm", "start"]

