"use client"
import React, { useEffect, useState } from "react";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import NotFound from "@/app/not-found";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch(`/api/getUserDetails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success && data.user.isAdmin) {
          setIsAdmin(data.user.isAdmin)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {isAdmin && <MainWrapper>
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#fbfbfb",
          }}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <PageWrapper>
          <Container
            maxWidth={false}
            sx={{
              paddingTop: "20px",
              paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
            <Footer />
          </Container>
        </PageWrapper>
        <style jsx global>{`
        navbar, footer {
          display: none !important;
        }
      `}</style>
      </MainWrapper>}
      {!isAdmin && <NotFound />}
    </>
  );
};

export default FullLayout;
