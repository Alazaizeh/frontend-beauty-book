import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  Typography,
  styled,
  ListItemButton,
  ListItemText,
  ButtonBase,
} from "@mui/material";

import DrawerItem from "./DrawerItem";
import { Link, useNavigate } from "react-router-dom";
import Logo from "ui-component/Logo";
import { useTheme } from "@mui/material/styles";
import { clearUser } from "store/actions";
import { useDispatch, useSelector } from "react-redux";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const ListMenu = styled(List)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

//rotas
const itemList = [
  {
    text: "Home",
    to: "/",
    type:"public"
  },
  {
    text: "Dashboard",
    to: "/dashboard/appointments",
    type:"protected"
  },
  {
    text: "Salons",
    to: "/salons",
    type:"public"
  },
  {
    text: "Logout",
    to: "/",
    type:"logout"
  },
  {
    text: "Login",
    to: "/login",
    type:"login"
  },
];

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const handleScroll = () => {
      // When the scroll position is greater than a certain threshold (e.g., 10), set `isScrolled` to true, otherwise false.
      setIsScrolled(window.scrollY > 10);
    };

    // Register the event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      component="nav"
      color="transparent"
      sx={{
        height: "8dvh",
        transition: "0.3s", // smooth transition effect
        borderBottomLeftRadius: "50px",
        backgroundColor: isScrolled
          ? theme.palette.primary.light
          : "transparent",
        boxShadow: isScrolled ? 4 : 0, // Optionally adjust the elevation based on scroll.
      }}
      elevation={4}
    >
      <StyledToolbar>
        <ButtonBase disableRipple component={Link} to={"/"}>
          <Logo />
        </ButtonBase>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <DrawerItem />
        </Box>
        <ListMenu>
          {itemList
            .filter((i) => {
              if (i.type == "logout") {
                if (!auth.isAuthenticated) return false;
              } else if (i.type == "login") {
                if (auth.isAuthenticated) return false;
              }else if(i.type=="protected")
              {
               return auth.pages?.includes(i.text)

              }
              return true;
            })
            .map((item) => {
              const { text } = item;

              return (
                <ListItem key={text}>
                  <ListItemButton
                    disableRipple
                    sx={{
                      ":hover": {
                        textDecoration: "underline",
                        backgroundColor: isScrolled
                          ? theme.palette.primary.light
                          : "transparent",
                      },
                    }}
                    component={Link}
                    onClick={() => {
                      if (text == "Logout") dispatch(clearUser());
                      navigate("/", { replace: true });
                    }}
                    to={item.to}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </ListMenu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
