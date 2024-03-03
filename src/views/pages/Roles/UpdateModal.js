import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeUpdateModal } from "store/reducers/Roles";
import { updateRoles } from "store/reducers/Roles/actions";

function UpdateModal() {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.roles.open.updateRoles);
  const onClose = () => dispatch(closeUpdateModal());

  const actionsList = useSelector((state) => state.roles.actions);
  const pagesList = useSelector((state) => state.roles.pages);
  const selectedRole = useSelector((state) => state.roles.selectedRole);
  const errorMessage = useSelector((state) => state.roles.error.updateRoles);
  const successMessage = useSelector(
    (state) => state.roles.success.updateRoles
  );

  const [role, setRole] = useState(selectedRole);

  const handleSubmit = () => dispatch(updateRoles(role));

  useEffect(() => {
    setRole(selectedRole);
  }, [selectedRole]);

  // Function to handle form changes
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setRole({ ...role, [name]: value });
  };

  const handleFormSelectChange = (event) => {
    const { name, value } = event.target;
    let list = name == "pages" ? pagesList : actionsList;

    const filtered = list.filter((item) => value.includes(item.NAME));
    setRole({ ...role, [name]: filtered });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Role</DialogTitle>

      {errorMessage != "" ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong — <strong>{errorMessage}!</strong>
        </Alert>
      ) : successMessage != "" ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Done — <strong>{successMessage}!</strong>
        </Alert>
      ) : null}

      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Role Name"
          type="text"
          fullWidth
          value={role.name}
          onChange={handleFormChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="pages-label">Pages</InputLabel>
          <Select
            labelId="pages-label"
            name="pages"
            multiple
            value={role?.permissions?.pages}
            onChange={handleFormSelectChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {pagesList.map((page) => (
              <MenuItem key={page.name} value={page.name}>
                <Checkbox
                  checked={
                    role?.permissions?.pages.find((a) => a == page.name)
                      ? true
                      : false
                  }
                  color="secondary"
                />
                {page.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="actions-label">Actions</InputLabel>
          <Select
            labelId="actions-label"
            name="ACTIONS"
            multiple
            value={role?.permissions?.actions}
            onChange={handleFormSelectChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {actionsList.map((action) => (
              <MenuItem key={action.name} value={action.name}>
                <Checkbox
                  checked={
                    role?.permissions?.actions.find((a) => a == action.name)
                      ? true
                      : false
                  }
                  color="secondary"
                />

                {action.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          disabled={successMessage != ""}
          onClick={handleSubmit}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateModal;
