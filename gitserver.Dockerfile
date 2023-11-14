FROM node:alpine

# Install necessary packages
RUN apk add --no-cache tini git

# Install git-http-server globally
RUN yarn global add git-http-server

# Add a user for git
RUN adduser -D -g '' git

# Set environment variables for Git configuration
ENV GIT_USER_NAME="c0lum"
ENV GIT_USER_EMAIL="annelee188@gmail.com"

# Switch to git user
USER git

# Set the working directory
WORKDIR /home/git

# Initialize a bare Git repository
RUN git init --bare repository.git

# Configure Git with the specified username and email
RUN git config --global user.name "$GIT_USER_NAME" && \
    git config --global user.email "$GIT_USER_EMAIL"

# Set the entrypoint to launch git-http-server
ENTRYPOINT ["tini", "--", "git-http-server", "-p", "3000", "/home/git"]
