import os
import logging
from datetime import datetime
from enum import Enum
from typing import Optional
from dashboard import AgentDashboard
from fastapi import FastAPI
from langchain.llms import OpenAI
from langchain_anthropic import ChatAnthropic
from langchain_mistralai import ChatMistralAI
from langchain_groq import ChatGroq
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='\033[36m%(asctime)s\033[0m | \033[32m%(levelname)s\033[0m | %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

app = FastAPI()
dashboard = AgentDashboard()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

class LLMProvider(Enum):
    OPENAI = "openai"
    ANTHROPIC = "anthropic"
    MISTRAL = "mistral"
    GROQ = "groq"

def init_llm(provider: LLMProvider = LLMProvider.OPENAI) -> Optional[OpenAI]:
    """Инициализация LLM с поддержкой разных провайдеров"""
    try:
        if provider == LLMProvider.OPENAI:
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                logger.warning("OPENAI_API_KEY не установлен")
                return None
            return OpenAI(
                temperature=0.7,
                model_name="gpt-4",
                openai_api_key=api_key,
                max_retries=3,
                request_timeout=30
            )
        elif provider == LLMProvider.ANTHROPIC:
            api_key = os.getenv("ANTHROPIC_API_KEY")
            if not api_key:
                logger.warning("ANTHROPIC_API_KEY не установлен")
                return None
            return ChatAnthropic(
                model="claude-3-opus-20240229",
                temperature=0.7,
                anthropic_api_key=api_key,
                max_retries=3,
                timeout=30
            )
        elif provider == LLMProvider.MISTRAL:
            api_key = os.getenv("MISTRAL_API_KEY")
            if not api_key:
                logger.warning("MISTRAL_API_KEY не установлен")
                return None
            return ChatMistralAI(
                model="mistral-large-latest",
                temperature=0.7,
                mistral_api_key=api_key,
                max_retries=3,
                timeout=30
            )
        elif provider == LLMProvider.GROQ:
            api_key = os.getenv("GROQ_API_KEY")
            if not api_key:
                logger.warning("GROQ_API_KEY не установлен")
                return None
            return ChatGroq(
                model="mixtral-8x7b-32768",
                temperature=0.7,
                groq_api_key=api_key,
                max_retries=3,
                timeout=30
            )
    except Exception as e:
        logger.error(f"Ошибка инициализации {provider.value}: {str(e)}")
        return None

llm = init_llm()
memory = ConversationBufferMemory()
conversation = ConversationChain(llm=llm, memory=memory) if llm else None

@app.get("/health")
async def health_check():
    """Расширенный healthcheck с мониторингом всех провайдеров"""
    providers_status = {
        "openai": bool(os.getenv("OPENAI_API_KEY")),
        "anthropic": bool(os.getenv("ANTHROPIC_API_KEY")),
        "mistral": bool(os.getenv("MISTRAL_API_KEY")),
        "groq": bool(os.getenv("GROQ_API_KEY"))
    }
    
    active_provider = os.getenv("LLM_PROVIDER", "openai")
    return {
        "status": "ok" if llm else "degraded",
        "llm_ready": bool(llm),
        "active_provider": active_provider,
        "providers_status": providers_status,
        "dependencies": {
            "openai": True,
            "anthropic": True,
            "mistral": True,
            "groq": True,
            "langchain": True,
            "fastapi": True
        },
        "sandbox": {
            "timeout_ms": int(os.getenv("E2B_TIMEOUT_MS", 300000)),
            "remaining_ms": "N/A"
        },
        "timestamp": datetime.now().isoformat()
    }

@app.on_event("shutdown")
async def shutdown_event():
    """Обработчик завершения работы sandbox"""
    logger.info("Инициировано завершение работы sandbox")
    # Логика очистки при необходимости

# Системный промпт для ИИ-агента
SYSTEM_PROMPT = """Ты - профессиональный ИИ-ассистент. Следуй правилам:
1. Отвечай точно и по делу
2. Поддерживай русский и английский языки
3. Форматируй код с отступами
4. Проверяй факты перед ответом
5. Разделяй сложные ответы на пункты

Пример хорошего ответа:
\"\"\"
Для решения вашей задачи на Python:

1. Установите зависимости:
```bash
pip install requests pandas
```

2. Используйте этот код:
```python
import requests
response = requests.get('https://api.example.com/data')
print(response.json())
```

3. Альтернативные варианты:
- Вариант A: использовать aiohttp для асинхронности
- Вариант B: добавить кэширование
\"\"\"
"""

@app.post("/chat")
async def chat(message: str):
    """Основной endpoint для взаимодействия с агентом"""
    if not conversation:
        error_msg = "Сервис LLM недоступен. Проверьте API ключ и логи."
        logger.error(error_msg)
        return {"error": error_msg}, 503
        
    start_time = datetime.now()
    logger.info(f"\n{'='*40}\n📩 Входящий запрос: {message}\n{'='*40}")
    
    try:
        # Логируем системный промпт
        logger.info(f"\n📝 Системный промпт:\n{SYSTEM_PROMPT}\n{'-'*40}")
        
        # Добавляем системный промпт к сообщению
        full_message = f"{SYSTEM_PROMPT}\n\nВопрос: {message}"
        logger.info(f"\n💭 Полный промпт для ИИ:\n{full_message}\n{'-'*40}")
        
        # Получаем ответ от ИИ
        response = conversation.predict(input=full_message)
        logger.info(f"\n🤖 Ответ ИИ (сырой):\n{response}\n{'-'*40}")
        
        # Очистка ответа
        clean_response = response.replace(SYSTEM_PROMPT, "").strip()
        logger.info(f"\n✨ Очищенный ответ:\n{clean_response}\n{'-'*40}")
        
        # Логируем время выполнения
        exec_time = (datetime.now() - start_time).total_seconds()
        logger.info(f"⏱ Время выполнения: {exec_time:.2f} сек\n{'='*40}\n")
        
        # Обновляем дашборд
        dashboard.update_stats(True, exec_time)
        return {
            "response": clean_response,
            "metadata": {
                "processing_time": exec_time,
                "model": "gpt-4" if llm else "none",
                "status": "success"
            }
        }
    except Exception as e:
        error_msg = f"Ошибка обработки запроса: {str(e)}"
        logger.error(f"\n❌ Ошибка:\n{error_msg}\nТип: {type(e).__name__}\n{'='*40}")
        # Обновляем дашборд при ошибке
        dashboard.update_stats(False, 0)
        return {
            "error": error_msg,
            "type": type(e).__name__,
            "metadata": {
                "status": "error",
                "model": "gpt-4" if llm else "none"
            }
        }, 500

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)