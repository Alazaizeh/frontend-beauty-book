import React from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
//img
import headerImg from "../../../assets/images/landing/main.jpeg";
import SearchBox from "../../../ui-component/search-box/SearchBox";
import Logo from "../../../assets/images/logo.png";

const Header = ({ Home }) => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: "70vh",
    display: "flex",
    backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.6)), url(${headerImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: theme.spacing(1),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: theme.palette.secondary.light,
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const SearchContainer = styled(Box)(({ theme }) => ({
    visibility: Home ? "visible" : "hidden",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      textAlign: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));
  const TitleContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));
  return (
    <CustomBox>
      <TitleContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: "3rem",
          }}
        >
          <Box
            sx={{
              border: "1px solid black",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "200px",
              }}
            />

            <Typography align="center" variant="h4">
              Beauty Book
            </Typography>
          </Box>
        </Box>
        <Typography align="center" fontSize={50}>
          Book local beauty and wellness services
        </Typography>
        <Typography align="center" fontSize={25}>
          Discover and book beauty & wellness professionals near you{" "}
        </Typography>
      </TitleContainer>

      <SearchContainer>
        <SearchBox />
      </SearchContainer>
      <Button
        component={Link}
        to={"/salons"}
        variant="contained"
        type="submit"
        size="medium"
        sx={{
          visibility: Home ? "visible" : "hidden",
          fontSize: "0.9rem",
          textTransform: "capitalize",
          py: 2,
          px: 4,
          mt: 3,
          mb: 2,
          borderRadius: 0,
          backgroundColor: "#14192d",
          "&:hover": {
            backgroundColor: "#1e2a5a",
          },
        }}
      >
        Explore
      </Button>
    </CustomBox>
  );
};

export default Header;
