import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import {
  Link,
  Stack,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from "@mui/material";
// utils
import { fDate } from "../../../utils/formatTime";
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../label";
import Iconify from "../../iconify";

import { CustomAvatar } from "../../custom-avatar";
import MenuPopover from "../../menu-popover";
import ConfirmDialog from "../../confirm-dialog";

// ----------------------------------------------------------------------

AppointmentTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function AppointmentTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { name, staff, salon, price, duration, description, appointments } =
    row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox"></TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={name} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>

         
                {`${description}`}
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left"> {salon.name}</TableCell>
        <TableCell align="left">{duration} Minutes</TableCell>

        <TableCell align="center">{fCurrency(price)}</TableCell>

        <TableCell align="center" sx={{ textTransform: "capitalize" }}>
          {staff.length}
        </TableCell>

        <TableCell align="center" >
          <Label  variant="soft" color={"success"}>
            {appointments.filter((a) => a.status == "completed").length}
          </Label>
          <Label style={{padding:"10px"}} variant="soft" color={"warning"}>
            {appointments.filter((a) => a.status == "pending").length}
          </Label>
          <Label variant="soft" color={"error"}>
            {appointments.filter((a) => a.status == "canceled").length}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
