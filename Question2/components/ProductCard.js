import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

function ProductCard({ product }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">Price: ${product.price}</Typography>
        <Typography variant="body2">Rating: {product.rating}</Typography>
        <Link to={`/products/${product.id}`}>View Details</Link>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
