import React from "react";
import {
  Card,
  Typography,
  Chip,
  Box,
  Button,
  styled,
  Grid,
  Rating,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "rgba(0,0,0,0.6)",
  },
  "& .MuiRating-iconHover": {
    color: "black",
  },
});
function SalonRow({ salon, bookAppointment, book }) {
  return (
    <Card
      key={salon.name}
      variant="outlined"
      sx={{
        p: 2,
        margin: 1,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography fontWeight="bold" noWrap gutterBottom>
            {salon.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="regular"
          >
            {salon.description} ,{salon.city}
          </Typography>

          <br />
          <Rating
            precision={0.5}
            name="read-only"
            value={salon.rating}
            readOnly
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              book(salon);
            }}
          >
            Book
          </Button>
          <br />
          <StyledRating
            name="price"
            readOnly
            size="small"
            max={Math.round(salon.price)}
            value={salon.price}
            precision={0.5}
            icon={<AttachMoneyIcon fontSize="inherit" />}
            emptyIcon={<AttachMoneyIcon fontSize="inherit" />}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default SalonRow;
