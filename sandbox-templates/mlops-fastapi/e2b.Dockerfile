# 🤖 MLOps FastAPI Template Dockerfile
# Production-ready ML model deployment environment

FROM python:3.10-slim

# Install system dependencies and security updates
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Create non-root user for security
RUN useradd -m -u 1000 user && \
    chown -R user:user /home/user

# Install Python dependencies with caching optimization
COPY requirements.txt /tmp/
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt && \
    pip cache purge

# Set working directory
WORKDIR /home/user

# Copy application files with proper ownership
COPY --chown=user:user . /home/user

# Switch to non-root user
USER user

# Health check for container monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Expose port for FastAPI application
EXPOSE 8080

# Default command (can be overridden by e2b.toml start_cmd)
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]