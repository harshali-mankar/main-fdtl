import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button
} from '@mui/material';
import { useState } from 'react';
import { heroPageData } from '../data/hero_page_data';

const MAX_LINES = 3;

const Hero = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };


const handleOpenProject = (link: string) => {
  const session_token = localStorage.getItem("session_token");
  const tenantId = localStorage.getItem("tenantId");

  if (!session_token) {
    alert("Please login first!");
    return;
  }

  const newWindow = window.open(link, "_blank");

  // extract only origin (protocol + host)
  const url = new URL(link);
  const targetOrigin = url.origin;

  // try sending multiple times (child may not be ready yet)
  let attempts = 0;
  const interval = setInterval(() => {
    if (attempts > 5) {
      clearInterval(interval);
      return;
    }
    newWindow?.postMessage({ session_token, tenantId }, targetOrigin);
    attempts++;
  }, 1000);
};


 
//   const handleOpenProject = (link: string) => {
//   const session_token = localStorage.getItem("session_token");
//   const tenantId = localStorage.getItem("tenantId");
//   if (!session_token) {
//     alert("Please login first!");
//     return;
//   }
//   const params = new URLSearchParams({
//     session_token,
//     tenantId: tenantId || "",
    
//   });

//   window.open(`${link}?${params.toString()}`, "_blank");
// };

  return (
    <Box sx={{ py: 8, backgroundColor: '#f9f9f9', overflowX: 'auto' }}>
      <Container maxWidth={false}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 600, mb: 4 }}
        >
          Featured Products
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            px: 2,
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc',
              borderRadius: 3,
            },
          }}
        >
          {heroPageData.map((product, index) => {
            const isExpanded = expandedIndex === index;
            const description = product.desc;

            return (
              <Card
                key={index}
                sx={{
                  width: 330,
                  minHeight: 420,
                  flex: '0 0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src = "";
                  }}
                  sx={{
                    objectFit: 'contain',
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {product.name || 'Product Name'}
                    </Typography>
                    
                    {product.link && (
                      <Button
                        onClick={() => handleOpenProject(product.link)}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Open Project
                      </Button>
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: isExpanded ? 'none' : MAX_LINES,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      mt: 1,
                    }}
                  >
                    {description}
                  </Typography>

                  <Button
                    onClick={() => handleToggle(index)}
                    size="small"
                    sx={{ mt: 1, textTransform: 'none', fontSize: '0.85rem' }}
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
