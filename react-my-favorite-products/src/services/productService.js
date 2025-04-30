const BASE_URL = 'https://fakestoreapi.com';

async function getAll() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

export default { getAll };
