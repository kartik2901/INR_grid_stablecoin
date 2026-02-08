# Use the official Node.js image as a base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install -f 

# Copy the rest of the application files
COPY . .


# Expose the port the app runs on
EXPOSE 8080 

# Start the Next.js application
CMD ["npm", "run", "start"]
