import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Typography,
  Box,
  Tooltip,
  CircularProgress,
  Alert,
  AlertTitle
} from '@mui/material';

import { useEffect } from 'react';
import { updateUsersRole, updateUsersStatus } from 'store/reducers/Users/actions';
import HeadLine from 'utils/HeadLine';

function EditUserDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);
  const [role, setRole] = React.useState('1');
  const [isActive, setIsActive] = React.useState(0);
  
  const rolesList = useSelector((state) => state.users.rolesData);
  const updateStatusSuccessMessage = useSelector((state) => state.users.success.updateUsersStatus);
  const updateStatusIsLoading = useSelector((state) => state.users.loading.updateUsersStatus);
  const updateStatusErrorMessage = useSelector((state) => state.users.error.updateUsersStatus);

  const updateRoleSuccessMessage = useSelector((state) => state.users.success.updateUsersRole);
  const updateRoleIsLoading = useSelector((state) => state.users.loading.updateUsersRole);
  const updateRoleErrorMessage = useSelector((state) => state.users.error.updateUsersRole);
  // Handlers
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleStatusChange = (event) => {
    setIsActive(event.target.checked ? 1 : 0);
  };
  const handleSave = () => {
    if (role != user.role_id) dispatch(updateUsersRole({ user_id: user.user_id, role_id: role }));
    if (isActive != user.isActive) dispatch(updateUsersStatus({ user_id: user.user_id, isActive: isActive==1?true:false }));
  };

  useEffect(() => {
    if (
      updateStatusSuccessMessage != '' ||
      updateRoleSuccessMessage != '' ||
      updateStatusErrorMessage != '' ||
      updateRoleErrorMessage != ''
    ) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [updateStatusSuccessMessage, updateRoleSuccessMessage, updateStatusErrorMessage, updateRoleErrorMessage]);

  useEffect(() => {
    if (user.user_id) {
      setRole(user.role_id);
      setIsActive(user.isActive);
    }
  }, [, user]);

 

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
          
        <HeadLine Title={"Edit User"} SubTitle={true} TitleIcon={"pajamas:account"}/>
      </DialogTitle>
      <DialogContent>
        {updateStatusIsLoading || updateRoleIsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : updateRoleErrorMessage != '' || updateStatusErrorMessage != '' ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something went wrong — <strong>{updateRoleErrorMessage || updateStatusErrorMessage}!</strong>
          </Alert>
        ) : updateRoleSuccessMessage != '' || updateStatusSuccessMessage != '' ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Done — <strong>{updateRoleSuccessMessage || updateStatusSuccessMessage}!</strong>
          </Alert>
        ) : (
          <>
            <Box mt={2} mb={2}>
              <Box mt={2} mb={2}>
                <Typography variant="h6">Name</Typography>
                <Box p={1}>{user.full_name}</Box>
              </Box>

              <Typography variant="h6">Role</Typography>
              <FormControl fullWidth>
                <Select value={role} onChange={handleRoleChange} variant="outlined">
                  {/* Replace these with the actual user roles in your application */}
                  {rolesList.map((role) => (
                    <MenuItem value={role.role_id} key={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box mt={2} mb={2}>
                <Typography variant="h6">Status</Typography>
                <FormControlLabel control={<Switch checked={isActive?true:false} onChange={handleStatusChange} />} label="Active" />
              </Box>
            </Box>

            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditUserDialog;
