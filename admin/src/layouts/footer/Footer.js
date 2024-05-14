import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography>
        © {new Date().getFullYear()} All rights reserved by{" "}
        <Link href={process.env.NEXT_PUBLIC_DOMAIN} target="_blank">
          Decodress
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
