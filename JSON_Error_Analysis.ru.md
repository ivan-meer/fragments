# Анализ ошибки: "Failed to execute 'json' on 'Response': Unexpected end of JSON input"

## Описание ошибки
Ошибка возникает при попытке парсинга невалидного JSON ответа. Типичные сценарии:

1. **Пустой ответ** - сервер вернул HTTP 200 с пустым телом
2. **Неполный JSON** - обрыв соединения во время передачи
3. **Невалидный JSON** - синтаксические ошибки в данных
4. **Неправильные заголовки** - Content-Type не application/json
5. **Ошибки сети** - прерванное соединение

## Диагностика

### 1. Логирование raw response
```javascript
fetch(url)
  .then(response => {
    console.log('Status:', response.status);
    console.log('Headers:', [...response.headers.entries()]);
    return response.text(); // Получаем raw текст
  })
  .then(text => {
    console.log('Raw response:', text);
    try {
      return JSON.parse(text); // Пробуем парсить вручную
    } catch (e) {
      console.error('JSON parse error:', e);
      throw e;
    }
  });
```

### 2. Валидация JSON
```javascript
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
```

## Решения

### 1. Защитное программирование
```javascript
async function safeJsonParse(response) {
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  
  const text = await response.text();
  if (!text.trim()) throw new Error('Empty response');
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Invalid JSON:', text);
    throw new Error('Malformed JSON response');
  }
}
```

### 2. Обработка ошибок
```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await safeJsonParse(response);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    // Fallback или повтор запроса
  }
}
```

## Профилактика

1. **Валидация API контрактов**:
   - Используйте TypeScript интерфейсы
   - Библиотеки типа Zod для runtime валидации

2. **Инструменты**:
   - Chrome DevTools (Network tab)
   - JSONLint для валидации
   - Postman для тестирования API

3. **Best Practices**:
   - Всегда проверяйте response.ok
   - Используйте try-catch для JSON.parse
   - Логируйте raw response при ошибках
   - Реализуйте retry механизм для сетевых ошибок

## Пример полного решения
```javascript
async function robustFetch(url, options = {}) {
  const MAX_RETRIES = 3;
  let attempt = 0;
  
  while (attempt < MAX_RETRIES) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const text = await response.text();
      
      if (!text) {
        throw new Error('Empty response body');
      }
      
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', { text });
        throw new Error('Invalid JSON format');
      }
    } catch (error) {
      attempt++;
      if (attempt >= MAX_RETRIES) throw error;
      await new Promise(res => setTimeout(res, 1000 * attempt));
    }
  }
}