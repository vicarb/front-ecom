# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and yarn.lock into the working directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install --production --frozen-lockfile

# Copy the rest of your app's source code
COPY . ./

# Build the app
RUN yarn build

# Expose port 30010 for the app to be served
EXPOSE 3001

# Define the command to run your app using CMD which defines your runtime
CMD ["yarn", "start"]