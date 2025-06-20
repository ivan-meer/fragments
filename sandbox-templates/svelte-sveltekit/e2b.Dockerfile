# ⚡ SvelteKit Template Dockerfile
# Modern web development environment with SvelteKit and TypeScript

FROM node:18-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install global dependencies
RUN npm install -g @sveltejs/kit@latest create-svelte@latest

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

# Health check for SvelteKit development server
HEALTHCHECK --interval=30s --timeout=15s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:5173 || exit 1

# Expose SvelteKit development server port
EXPOSE 5173

# Expose Vite HMR port
EXPOSE 24678

# Default command to start SvelteKit development server
CMD ["npm", "run", "dev"]