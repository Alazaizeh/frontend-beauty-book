import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Chip, Drawer, Stack, useMediaQuery } from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

// project imports
import MenuList from "./MenuList";
import LogoSection from "../LogoSection";
import MenuCard from "./MenuCard";
import { drawerWidth } from "store/constant";

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("sm"));

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      sx={{  width: drawerWidth,background:"#fff",zIndex:99 }}
      aria-label="mailbox folders"
    >
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <MenuList />
          {/* <MenuCard /> */}
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={process.env.REACT_APP_VERSION}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: "pointer" }}
            />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
 
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
