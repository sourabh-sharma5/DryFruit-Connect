import { Box, Typography, Card, CardActionArea, CardMedia, CardContent,IconButton } from "@mui/material";
//import AOS from "aos";
import { useEffect, useRef } from "react";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AOS from 'aos';
import 'aos/dist/aos.css';

const categories = [
  {
    name: "Almonds",
    image: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cashews",
    image: "https://images.unsplash.com/photo-1615485925873-7ecbbe90a866?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pistachios",
    image: "https://images.unsplash.com/photo-1615485925933-379c8b6ad03c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Walnuts",
    image: "https://images.unsplash.com/photo-1597919926163-9419065218b4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Raisins",
    image: "https://images.unsplash.com/photo-1642102903918-b97c37955bbf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dates",
    image: "https://images.unsplash.com/photo-1629738601425-494c3d6ba3e2?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CategoryScroll = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  
  return (
    <Box sx={{ my: 6, px: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3} data-aos="fade-right">
        Browse Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          py: 2,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: 4,
          },
        }}
        data-aos="fade-up"
      >
        {categories.map((category, idx) => (
          <Card
            key={idx}
            sx={{
              minWidth: 200,
              flex: "0 0 auto",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s",
              ":hover": { transform: "scale(1.05)" },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.name}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {category.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryScroll;






// return (
//  <Box sx={{  my: 6, px: 3 }}>
// <Typography variant="h5" fontWeight={600} sx={{ mb: 2, px: 2 }}>
//          Browse Categories
//        </Typography>

//   <IconButton
//     onClick={() => scroll('left')}
//     sx={{
//       position: 'absolute',
//       top: '50%',
//       left: 0,
//       transform: 'translateY(-50%)',
//       zIndex: 2,
//       bgcolor: 'white',
//       boxShadow: 1,
//     }}
//   >
//     <ArrowBackIosNewIcon />
//   </IconButton>

//   <IconButton
//     onClick={() => scroll('right')}
//     sx={{
//       position: 'absolute',
//       top: '50%',
//       right: 0,
//       transform: 'translateY(-50%)',
//       zIndex: 2,
//       bgcolor: 'white',
//       boxShadow: 1,
//     }}
//   >
//     <ArrowForwardIosIcon />
//   </IconButton>

//   <Box
//     ref={scrollRef}
//     sx={{
//       display: 'flex',
//       overflowX: 'auto',
//       scrollBehavior: 'smooth',
//       gap: 2,
//       px: 5,
//       py: 2,
//       '&::-webkit-scrollbar': { display: 'none' },
//     }}
//   >
//     {categories.map((cat) => (
//       <Box
//         key={cat.name}
//         data-aos="fade-up"
//         onClick={() => navigate(`/products/${cat.path}`)}
//         sx={{
//           minWidth: 160,
//           cursor: 'pointer',
//           textAlign: 'center',
//           transition: 'transform 0.3s',
//           '&:hover': { transform: 'scale(1.05)' },
//         }}
//       >
//         <Box
//           component="img"
//           src={cat.image}
//           alt={cat.name}
//           sx={{
//             width: '100%',
//             height: 120,
//             borderRadius: 2,
//             objectFit: 'cover',
//             boxShadow: 2,
//           }}
//         />
//         <Typography mt={1}>{cat.name}</Typography>
//       </Box>
//     ))}
//   </Box>
// </Box>
// );
// };

// export default CategoryScroll;