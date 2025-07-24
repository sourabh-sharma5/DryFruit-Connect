import { Link } from "react-router-dom";
import {Button, Typography, Paper, Box, Container, Divider, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryScroll from "../components/CategoryScroller";
import ProductCardGrid from "../components/ProductCardGrid";
import { useEffect } from "react";
import AOS from "aos";

import FeaturedCombos from "../components/FeaturedCombos";
import Footer from "../components/Footer";
import 'aos/dist/aos.css';
import ProductCard from "../components/ProductCard";
import uploadDummyData from "../utils/uploadDummyData";

const Home = () => {
  useEffect (() => {
    AOS.init({ duration: 1000 });
  }, []);


  return (
     <Box sx={{ mt:2 }}>
      <HeroSection />

<Container maxWidth="xl" sx={{ mt: 5 }}>
        <Box data-aos="fade-up">
          {/* <Typography variant="h5" fontWeight={600} mb={2}>
            Shop by Category
          </Typography> */}
          <CategoryScroll />
        </Box>

          <Divider sx={{ my: 5 }} />

        <Box data-aos="fade-up">
          <Typography variant="h5" fontWeight={600} mb={2}>
            Popular Products
          </Typography>
          
        
      <Grid container spacing={2}>
        {uploadDummyData.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} data-aos="fade-up" display="flex" justifyContent="center">
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    


        </Box>
        <Divider sx={{ my: 5 }} />

        <Box data-aos="fade-up">
          <Typography variant="h5" fontWeight={600} mb={2}>
            Featured Combos
          </Typography>
          <FeaturedCombos />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Home;
