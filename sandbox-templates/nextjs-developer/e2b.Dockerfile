# Используем облегченный образ Node.js
FROM node:21-slim

# Устанавливаем необходимые системные зависимости
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Копируем скрипт компиляции
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Этап 1: Создание Next.js приложения
WORKDIR /home/user/nextjs-app
RUN npx create-next-app@14.2.20 . --ts --tailwind --no-eslint \
    --import-alias "@/*" --use-npm --no-app --no-src-dir && \
    npm cache clean --force

# Этап 2: Копирование кастомного _app.tsx
COPY _app.tsx pages/_app.tsx

# Этап 3: Установка shadcn/ui компонентов
RUN npx shadcn@2.1.7 init -d && \
    npx shadcn@2.1.7 add --all && \
    npm cache clean --force

# Этап 4: Установка PostHog
RUN npm install posthog-js && \
    npm cache clean --force

# Финализация: перемещение приложения и очистка
RUN mv /home/user/nextjs-app/* /home/user/ && \
    rm -rf /home/user/nextjs-app
