// File: /api/get-news.js
export default async function handler(request, response) {
  // Get the secret key from Vercel Environment Variables
  const apiKey = process.env.NEWSAPI_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=health&q=blooddonation&apiKey=${apiKey}`;

  try {
    const newsResponse = await fetch(url);
    if (!newsResponse.ok) {
      throw new Error(`NewsAPI error: ${newsResponse.statusText}`);
    }
    const data = await newsResponse.json();

    // Send the articles back to the client
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}