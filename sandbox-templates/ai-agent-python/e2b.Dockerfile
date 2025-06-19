# Базовый образ Python с предустановленными ML-библиотеками
FROM python:3.10-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    build-essential \
    libncursesw5-dev \
    net-tools \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Установка Python-зависимостей с ретраями и CPU-only torch
# Сначала устанавливаем torch с его индексом
RUN pip install --no-cache-dir --default-timeout=100 \
    torch==2.3.0+cpu --index-url https://download.pytorch.org/whl/cpu && \
    rm -rf /root/.cache/pip

# Затем остальные зависимости из PyPI
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --default-timeout=100 \
    langchain \
    langchain-community \
    langchain-anthropic \
    openai \
    anthropic \
    mistralai \
    groq \
    transformers \
    sentence-transformers \
    rich \
    fastapi \
    uvicorn && \
    rm -rf /root/.cache/pip

# Создание рабочей директории
WORKDIR /home/user
COPY . /home/user

# Команда запуска по умолчанию
EXPOSE 8000

# Команда запуска для создания снэпшота
# Сервер должен быть запущен до создания снэпшота
# Комплексный скрипт запуска с полной диагностикой
CMD ["sh", "-c", "echo '=== Starting FastAPI server ===' && \
     echo 'Current directory: $(pwd)' && \
     echo 'Files in directory:' && ls -la && \
     echo 'Python version:' && python --version && \
     echo 'Pip list:' && pip list && \
     echo 'Checking port 8000 before start:' && \
     (netstat -tuln | grep :8000 || echo 'Port 8000 is free') && \
     echo 'Starting uvicorn on 0.0.0.0:8000...' && \
     uvicorn agent:app --host 0.0.0.0 --port 8000 --reload > /var/log/uvicorn.log 2>&1 & \
     echo 'Server started in background. PID: $!' && \
     sleep 5 && \
     echo 'Checking server status...' && \
     (curl -s http://0.0.0.0:8000/health && echo 'Health check passed' || echo 'Health check failed') && \
     echo 'Checking port binding...' && \
     (netstat -tuln | grep :8000 && echo 'Port 8000 is bound to 0.0.0.0' || echo 'Port binding check failed') && \
     echo '=== Server startup completed ===' && \
     tail -f /var/log/uvicorn.log"]