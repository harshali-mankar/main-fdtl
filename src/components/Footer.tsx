import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 3,
        py: 2,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
        // position: "absolute",
        // bottom: 0,
        // width: "100%",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} KraftNexus. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
