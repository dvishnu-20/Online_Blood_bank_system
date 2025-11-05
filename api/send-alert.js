// File: /api/send-alert.js
export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { title, message } = request.body;
  const apiToken = process.env.PUSHOVER_API_TOKEN;
  const userKey = process.env.PUSHOVER_USER_KEY;

  try {
    await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: apiToken,
        user: userKey,
        message: message,
        title: title,
        priority: 1,
      }),
    });

    response.status(200).json({ success: true });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}