/**
 * Загружает шаблоны через API
 * @returns {Promise<import('./templates').Templates>}
 */
export async function loadTemplates() {
  try {
    let apiUrl;
    
    if (typeof window === 'undefined') {
      // Server-side
      apiUrl = `http://127.0.0.1:${process.env.PORT || 3000}/api/templates`;
    } else if (process.env.NEXT_PUBLIC_API_URL) {
      // Client-side with custom API URL
      apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/templates`;
    } else {
      // Client-side default
      apiUrl = '/api/templates';
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to load templates');
    }
    return await response.json();
  } catch (err) {
    console.error('Error loading templates:', err);
    return {};
  }
}