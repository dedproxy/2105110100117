import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Grid, Card, CardContent, CircularProgress, Snackbar, Alert } from '@mui/material';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [n, setN] = useState(10);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/api/categories/all/products', {
          params: { page, n },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, n]);

  const handlePageChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value, 10));
    setPage(value);
  };

  const handleNChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value, 10));
    setN(value);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Top Products</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Snackbar open={Boolean(error)} autoHideDuration={6000}><Alert severity="error">{error}</Alert></Snackbar>}
          <TextField
            label="Products per page"
            type="number"
            value={n}
            onChange={handleNChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Page number"
            type="number"
            value={page}
            onChange={handlePageChange}
            margin="normal"
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleLoadMore}>
            Load More
          </Button>
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1">Price: ${product.price}</Typography>
                    <Typography variant="body2">Rating: {product.rating}</Typography>
                    <Typography variant="body2">Discount: {product.discount}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}

export default App;
