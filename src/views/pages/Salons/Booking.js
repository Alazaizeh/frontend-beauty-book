import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import {
  Chip,
  Grid,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
const INPUT_WIDTH = 160;

export default function ResponsiveDialog({ open, setOpen, salon }) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [busySlots, setBusySlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedService("");
    setSelectedTime(null);
    setSelectedSlot("");
    setSelectedDate(null);
    setBusySlots([]);
  };
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 10; hour <= 19; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      timeSlots.push(time);
    }
    return timeSlots;
  };
  const timeSlots = generateTimeSlots();

  const checkTimeSlot = async (selectedDate, slot) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVERIP}/appointments/search`,
        {
          selectedService: salon.services.find(
            (s) => s.service_id == selectedService
          ),
          selectedDate: selectedDate,
        }
      );

      if (response.status == 200) {
        const data = response.data;

        if (data) {
          setSelectedSlot(slot);
          setSelectedTime(selectedDate);
        } else {
          setBusySlots(slot);
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };
  const handleBook = async () => {
    setLoading(true);
    try {
      const hour = selectedSlot.split(":")[0];
      const appointment = dayjs(selectedDate).add(hour, "hours").toDate();

      const response = await axios.post(
        `${process.env.REACT_APP_SERVERIP}/appointments/book`,
        {
          selectedService: salon.services.find(
            (s) => s.service_id == selectedService
          ),
          selectedDate: appointment,
        }
      );

      const data = response.data;

      handleClose();

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedSlot(null);
    setBusySlots([]);
  };

  const handleClick = (time) => {
    const hour = time.split(":")[0];
    if (hour && selectedDate)
      checkTimeSlot(dayjs(selectedDate).add(hour, "hours").toDate(), time);
  };

  const HandleSelectedService = (e) => {
    setSelectedService(e.target.value);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Book an Appointment"}
        </DialogTitle>
        <DialogContent>
          {salon?.services?.length == 0 ? (
            <Typography> No Services</Typography>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12} sx={{ m: 3 }}>
                <TextField
                  fullWidth
                  select
                  label="Service"
                  value={selectedService}
                  onChange={HandleSelectedService}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: { maxHeight: 220 },
                      },
                    },
                  }}
                  sx={{
                    maxWidth: { md: INPUT_WIDTH },
                    textTransform: "capitalize",
                  }}
                >
                  {salon?.services?.map((option) => (
                    <MenuItem
                      key={option.name}
                      value={option.service_id}
                      sx={{
                        mx: 1,
                        borderRadius: 0.75,
                        typography: "body2",
                        textTransform: "capitalize",
                      }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={9} lg={9}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    disabled={selectedService == ""}
                    minDate={dayjs().add(1, "day")}
                    onChange={handleDateChange} // Handle date change
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Grid container direction="column" spacing={1}>
                  {timeSlots.map((time, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={time}
                        variant="outlined"
                        onClick={() => handleClick(time)}
                        style={{ width: "100%" }}
                        sx={{
                          ".MuiChip-icon": {
                            fontSize: 16,
                            ml: "4px",
                            color: "success.500",
                          },
                          bgcolor:
                            time == selectedSlot
                              ? "green"
                              : busySlots.includes(time)
                              ? "red"
                              : "primary.main", // Pinkish fixed color
                          borderColor: "primary.dark",
                          color: "#ffffff",
                          "&:hover": {
                            color: "#800080",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            variant="outlined"
            autoFocus
            onClick={handleClose}
          >
            Close
          </Button>
          {salon?.services?.length > 0 && (
            <Button
              color="primary"
              variant="outlined"
              onClick={handleBook}
              disabled={selectedSlot == ""}
            >
              Book Now
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
