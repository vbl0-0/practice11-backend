async function loadProducts() {
  const category = document.getElementById('category').value;
  const minPrice = document.getElementById('minPrice').value;
  const sort = document.getElementById('sort').value;

  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (minPrice) params.append('minPrice', minPrice);
  if (sort) params.append('sort', sort);

  const res = await fetch('/api/products?' + params.toString());
  const data = await res.json();

  const container = document.getElementById('products');
  container.innerHTML = '';

  data.products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${p.name || 'No name'}</h3>
      ${p.category ? `<p>Category: ${p.category}</p>` : ''}
      ${p.price !== undefined ? `<p>Price: $${p.price}</p>` : ''}
    `;

    container.appendChild(card);
  });
}

loadProducts();
