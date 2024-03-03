import React from "react";
import { TextField, Grid } from "@mui/material";
import SalonsList from "./SalonsList";
import FilterPage from "./FilterOptions";
import SortAndSearch from "./SortbyPage";
import Header from "../landing/HeroSection";

function AllSalons() {
  return (
    <Grid container spacing={2} sx={{minHeight:"500px"}} >
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} >
        <SalonsList />
      </Grid>
    </Grid>
  );
}

export default AllSalons;
