import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const mockJsonString = JSON.stringify({
  "products": [
    { "id": 1, "name": "Washing Machine 1", "price": 100000, "rating": 4.5, "discount": 10, "availability": true, "company": "Brand A" },
    { "id": 2, "name": "Product 2", "price": 200, "rating": 4.0, "discount": 5, "availability": true, "company": "Brand B" },
    { "id": 3, "name": "Product 3", "price": 300, "rating": 3.5, "discount": 15, "availability": false, "company": "Brand C" },
    { "id": 4, "name": "Product 4", "price": 400, "rating": 4.7, "discount": 20, "availability": true, "company": "Brand D" },
    { "id": 5, "name": "Product 5", "price": 500, "rating": 4.8, "discount": 25, "availability": true, "company": "Brand E" }
  ]
});

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        console.error('Product ID is not defined');
        return;
      }

      try {
        // Mocking a response here
        const mockResponse = JSON.parse(mockJsonString);
        const product = mockResponse.products.find(p => p.id === parseInt(productId, 10));
        if (product) {
          setProduct(product);
        } else {
          console.error('Product not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error parsing mock data:', error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product?.name || 'Product Name'}</Typography>
        <Typography variant="body1">Price: ${product?.price || 'N/A'}</Typography>
        <Typography variant="body1">Rating: {product?.rating || 'N/A'}</Typography>
        <Typography variant="body2">Company: {product?.company || 'N/A'}</Typography>
        <Typography variant="body2">Discount: {product?.discount || 'N/A'}%</Typography>
        <Typography variant="body2">Availability: {product?.availability ? 'In Stock' : 'Out of Stock'}</Typography>
      </CardContent>
    </Card>
  );
}

export default ProductDetailPage;
