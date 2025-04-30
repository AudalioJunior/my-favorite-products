// aqui você liga com seu backend real
const API_URL = 'https://api.example.com/favorites';

async function toggleFavorite(productId) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });
}

export default { toggleFavorite };
