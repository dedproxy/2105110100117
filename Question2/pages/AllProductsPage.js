import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/products', {
          params: { page, n: 10 },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Top Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1} aria-label="Previous page">
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} aria-label="Next page">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProductsPage;
