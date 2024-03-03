import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from "@mui/material";
// utils
import { fDate, fDateTime } from "../../../utils/formatTime";
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../ui-component/label";
import Image from "../../image";
import Scrollbar from "../../../ui-component/scrollbar";
//
import InvoiceToolbar from "./InvoiceToolbar";
import logoImage from "../../../assets/images/logo.png";
// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  "& td": {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoiceDetails({ invoice }) {
  if (!invoice) {
    return null;
  }

  const {
    user,
    staff,
    service,
    status,
    date_time,
    created_at,
    appointment_id,
  } = invoice;
 

  return (
    <>
      <InvoiceToolbar invoice={invoice} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image
              alt="logo"
              src={logoImage}
              sx={{ maxWidth: 120 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: "right" } }}>
              <Label
                variant="soft"
                color={
                  (status === "completed" && "success") ||
                  (status === "pending" && "warning") ||
                  (status === "canceled" && "error") ||
                  "default"
                }
                sx={{ textTransform: "uppercase", mb: 1 }}
              >
                {status}
              </Label>

              <Typography variant="h6">{`${appointment_id}`}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: "text.disabled" }}
            >
              From
            </Typography>

            <Typography variant="body2">{service?.salon.name}</Typography>

            <Typography variant="body2">{service?.salon.description}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: "text.disabled" }}
            >
              To
            </Typography>

            <Typography variant="body2">{user?.full_name}</Typography>

            <Typography variant="body2">{user?.email}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: "text.disabled" }}
            >
              date create
            </Typography>

            <Typography variant="body2">{fDateTime(created_at)}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: "text.disabled" }}
            >
              Due date
            </Typography>

            <Typography variant="body2">{fDateTime(date_time)}</Typography>
          </Grid>
        </Grid>

        <TableContainer sx={{ overflow: "unset" }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  "& th": { backgroundColor: "transparent" },
                }}
              >
                <TableRow>
                  <TableCell align="left">Salon</TableCell>

                  <TableCell align="left">Service</TableCell>

                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Duration</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  key={0}
                  sx={{
                    borderBottom: (theme) =>
                      `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <TableCell>{service?.salon.name}</TableCell>

                  <TableCell align="left">
                    <Box sx={{ maxWidth: 560 }}>
                      <Typography variant="subtitle2">
                        {service?.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                      >
                        {service?.description}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="right">
                    {fCurrency(service?.price)}
                  </TableCell>

                  <TableCell align="right">
                    {service?.duration} Minutes
                  </TableCell>
                  <TableCell align="right">
                    {fCurrency(service?.price)}
                  </TableCell>
                </TableRow>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: "h6" }}>
                    Total
                  </TableCell>

                  <TableCell
                    align="right"
                    width={140}
                    sx={{ typography: "h6" }}
                  >
                    {fCurrency(service?.price)}
                  </TableCell>
                </StyledRowResult>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

   
      
      </Card>
    </>
  );
}
