import { Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const FeaturedCombos = () => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const q = query(collection(db, 'products'), where('featured', '==', true));
      const snapshot = await getDocs(q);
      const comboData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCombos(comboData);
    };
    fetchFeatured();
  }, []);

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Typography variant="h4" textAlign="center" mb={4} fontWeight={700}>
         Featured Combos
      </Typography>
      <Grid container spacing={3}>
        {combos.map(combo => (
          <Grid item xs={12} sm={6} md={4} key={combo.id}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={combo.image}
                alt={combo.name}
              />
              <CardContent>
                <Typography variant="h6">{combo.name}</Typography>
                <Typography variant="body2">{combo.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedCombos;
