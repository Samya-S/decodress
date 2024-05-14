import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import logo from "@/public/decodress-logo-long.png";

const LogoIcon = () => {
  return (
    <Link href="/admin">
      <Image src={logo} alt={logo} />
    </Link>
  );
};

export default LogoIcon;
