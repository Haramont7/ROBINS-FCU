const API_URL = '/Send.php';

export async function sendToBot(message: string, pageName: string) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, page: pageName }),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Bot error:', error);
    return false;
  }
}
