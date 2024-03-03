import React from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import SalonRow from "./SalonRow";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalons } from "store/reducers/Sallons/actions";
import Booking from "./Booking";
function SalonsList() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedSalon, setSelectedSalon] = React.useState({});

  const salonsList = useSelector((state) => state.salons.salonsData);
  const isLoading = useSelector((state) => state.salons.loading.getSalons);

  const fetchMoreItems = async () => {
    if (hasMore) {
      setPage((prevPage) => {
        dispatch(
          getSalons({
            page: prevPage + 1,
            rows: 10,
            filterName: "",
            filterSort: "created_at",
          })
        );

        return prevPage + 1;
      });
    }
  };

  const handleScroll = () => {
    if (
      Math.round(window.innerHeight + window.scrollY) >=
        document.documentElement.offsetHeight &&
      !isLoading
    ) {
      fetchMoreItems();
    }
  };
  useEffect(() => {
    if (salonsList.length == 0 && items.length != 0) {
      setHasMore(false);
    }
    setItems((prevItems) => [...prevItems, ...salonsList]);
  }, [salonsList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    dispatch(
      getSalons({ page: 0, rows: 10, filterName: "", filterSort: "created_at" })
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bookAppointment = (service, day, time) => {};

  const bookNow = (salon) => {
    setSelectedSalon(salon);
    setOpen(true);
  };
  return (
    <Box sx={{ padding: "2rem" }}>
      <Booking salon={selectedSalon} open={open} setOpen={setOpen} />
      {items.map((salon, index) => (
        <SalonRow
          key={index}
          salon={salon}
          bookAppointment={bookAppointment}
          book={bookNow}
        />
      ))}
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{ cursor: "pointer" }}
          align="center"
          onClick={fetchMoreItems}
        >
          {!hasMore ? "No More Data" : isLoading ? "Loading..." : "Load More"}
        </Typography>
        {isLoading ? <CircularProgress /> : null}
      </Box>
    </Box>
  );
}

export default SalonsList;
