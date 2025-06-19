# Standardized Python base image
FROM python:3.10-slim

# Install system dependencies and clean up
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install Python dependencies with cache cleanup
RUN pip3 install --no-cache-dir \
    flask \
    gunicorn \
    flask-cors \
    && pip cache purge

# Create non-root user for security
RUN useradd -m -u 1000 user && \
    chown -R user:user /home/user

# Set working directory and copy files
WORKDIR /home/user
COPY --chown=user:user . /home/user

# Switch to non-root user
USER user

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/ || exit 1