# Use Node.js official image as a base
FROM node:14

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the app code to the container
COPY . .

# Expose the app port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
