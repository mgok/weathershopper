# Use the Playwright base image as the base image
FROM mcr.microsoft.com/playwright:focal

# Set the working directory inside the container
WORKDIR /tests

# Copy the entire project directory to the working directory
COPY . .

# Install dependencies
RUN npm install

# Set the environment variables, if required
# ENV VARIABLE_NAME=value

# Run the CodeceptJS tests
CMD ["npx", "codeceptjs", "run"]