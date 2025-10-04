import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useState } from "react";
import { heroPageData } from "../data/hero_page_data";

const MAX_LINES = 3;

const Hero = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleOpenProject = (link: string, module: string) => {
    debugger
    const session_token = localStorage.getItem("session_token");
    const tenantId = localStorage.getItem("tenantId");
    const username = localStorage.getItem("userName");

    if (!session_token || !tenantId || !username) {
      console.warn("Please login first!");
      return;
    }

    // Build URL parameters properly
    const params = new URLSearchParams({
      token: session_token,
      tenantId: tenantId,
      userName: username,
      module: module,
    });
    console.log("params", params)
    //  Open the new subdomain with parameters in query string
    const finalUrl = `${link}?${params.toString()}`;
    window.open(finalUrl, "_blank");
  };

  return (
    <Box sx={{ py: 5, backgroundColor: "#f9f9f9" }}>
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
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 3,
            px: 2,
            pb: 2,
            overflowX: "hidden",
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
                  display: "flex",
                  flexDirection: "column",
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
                    objectFit: "contain",
                    backgroundColor: "#f0f0f0",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {product.name || "Product Name"}
                    </Typography>
                    {product.link && (
                      <Typography
                        component="a"
                        onClick={() =>
                          handleOpenProject(product.link, product.module)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "primary.main",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Click Here
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: isExpanded ? "none" : MAX_LINES,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      mt: 1,
                    }}
                  >
                    {description}
                  </Typography>

                  <Button
                    onClick={() => handleToggle(index)}
                    size="small"
                    sx={{ mt: 1, textTransform: "none", fontSize: "0.85rem" }}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
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
