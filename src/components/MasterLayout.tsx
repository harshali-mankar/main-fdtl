import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MasterLayout: React.FC = () => (
  <Box display="flex" height={"100vh"} sx={{
    padding:"0px",
    margin:"0px"
  }}>
    <Box
      display="flex"
      flexDirection={"column"}
      flexGrow={1}
      sx={{
        width: { xs: '100%', sm: 'calc(100% - 65px)', md: 'calc(100% - 240px)' }
      }}
    >
      <Header />
      <Box
        sx={{
          p: { xs: 1, sm: 2, md: 3 }, // overall padding
          pt: { xs: 1, sm: 1, md: 1 }, // overrides paddingTop only
          overflowX: 'auto'
        }}
        height={"100vh"}
      >
        <Outlet /> {/* Renders nested routes */}
      </Box>
      <Footer />
    </Box>
  </Box>
);

export default MasterLayout;
