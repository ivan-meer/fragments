# 📱 React Native Expo Template Dockerfile
# Mobile development environment with Expo CLI and tools

FROM node:18-slim

# Install system dependencies for mobile development
RUN apt-get update && apt-get install -y \
    curl \
    git \
    python3 \
    python3-pip \
    default-jdk \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install global dependencies
RUN npm install -g @expo/cli@latest expo-doctor

# Create non-root user for security
RUN useradd -m -u 1000 user && \
    chown -R user:user /home/user

# Set working directory
WORKDIR /home/user

# Copy package files first for better caching
COPY --chown=user:user package*.json ./

# Install dependencies as root to avoid permission issues
RUN npm install

# Copy application files
COPY --chown=user:user . /home/user

# Switch to non-root user
USER user

# Health check for Expo development server
HEALTHCHECK --interval=30s --timeout=15s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:19000 || exit 1

# Expose Expo development server port
EXPOSE 19000 19001 19002

# TODO: Add Metro bundler port
EXPOSE 8081

# Default command to start Expo development server
CMD ["npm", "start"]