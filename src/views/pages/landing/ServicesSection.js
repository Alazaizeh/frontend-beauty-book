import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
// img

import imgDetail from "../../../assets/images/landing/sub2.jpg";
import imgDetail2 from "../../../assets/images/landing/sub1.jpg";

const Title = ({ text, textAlign }) => {
  return (
    <Typography
      variant="h4"
      component="h3"
      sx={{
        fontWeight: "800",
        textAlign: textAlign,
      }}
    >
      {text}
    </Typography>
  );
};

const GetStarted = () => {
  const CustomGridItem = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  });

  const CustomTypography = styled(Typography)({
    fontSize: "1.1rem",
    textAlign: "start",
    lineHeight: "1.5",
    color: "#515151",
    marginTop: "1.5rem",
  });

  return (
    <Grid
      container
      spacing={{ xs: 4, sm: 4, md: 0 }}
      sx={{
        py: 10,
        px: 5,
      }}
    >
      <CustomGridItem item xs={12} sm={8} md={6} component="section">
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Title text={"Reserved Slots"} textAlign={"start"} />
          <CustomTypography>
            The best part is you can take any service at your convenience. The
            slot you book will stay untouched until you take the service.
          </CustomTypography>
        </Box>
      </CustomGridItem>

      <Grid item xs={12} sm={4} md={6}>
        <img style={{width:"80%"}} src={imgDetail} alt="service" />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        md={6}
        sx={{
          order: { xs: 4, sm: 4, md: 3 },
        }}
      >
        <img style={{width:"80%"}} src={imgDetail2} alt="service" />
      </Grid>

      <CustomGridItem
        item
        xs={12}
        sm={8}
        md={6}
        sx={{
          order: { xs: 3, sm: 3, md: 4 },
        }}
      >
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Title text={"Salon At Home Services"} textAlign={"start"} />
          <CustomTypography>
            Beating busy schedules all around, we delivers your desired services
            to your doorstep at the time you choose.
          </CustomTypography>
        </Box>
      </CustomGridItem>
    </Grid>
  );
};

export default GetStarted;
