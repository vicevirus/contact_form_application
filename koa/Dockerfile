FROM node:23-alpine

WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker caching
COPY ./app/package*.json .

# Install dependencies
RUN npm ci --verbose

# Copy the rest of the application
COPY ./app .

# Expose port
EXPOSE 3000

# Run npm install before starting the app
CMD ["sh", "-c", "npm install && npm start"]