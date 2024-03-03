import React, { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Card,
  IconButton
} from '@mui/material';
import HeadLine from 'utils/HeadLine';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles, getActions, getPages, updateRoles, addRoles, removeRoles } from 'store/reducers/Roles/actions';
import { openAddModal, openRemoveModal, openUpdateModal, closeAddModal, closeRemoveModal, closeUpdateModal } from 'store/reducers/Roles';
import { useEffect } from 'react';
import ListDialog from 'utils/ListDialog';
import ConfirmationModal from 'utils/ConfirmationModal';
  import UpdateModal from './UpdateModal';
 import AddModal from './AddModal';
import Loading from '../Loading';
import { isActionAllowed } from 'authorization/permissions';
const initialRole = {
  role_id: null,
  name: '',
  PAGES: [],
  ACTIONS: []
};

const App = () => {
  const dispatch = useDispatch();

  const [role, setRole] = useState(initialRole);
  const [selectedData, setSelectedData] = useState({ title: '', data: [] });
  const [showDetails, setShowDetails] = useState(false);

  const selectedRole = useSelector((state) => state.roles.selectedRole);
  const rolesList = useSelector((state) => state.roles.roles);
  const removeModal = useSelector((state) => state.roles.open.removeRoles);
  const isLoading = useSelector((state) => state.roles.loading.getRoles);
  const isLoadingRemoveRole = useSelector((state) => state.roles.loading.removeRoles);

  const errorMessage = useSelector((state) => state.roles.error.getRoles);

  const setOpenAddModal = () => dispatch(openAddModal(initialRole));
  const setOpenUpdateModal = (role) => dispatch(openUpdateModal(role));
  const setOpenRemoveModal = (role) => dispatch(openRemoveModal(role));

  const setCloseRemoveModal = () => dispatch(closeRemoveModal());

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getPages());
    dispatch(getActions());
  }, []);

  const handleShowDetails = (title, data) => {
    setSelectedData({ title, data });
    setShowDetails(true);
  };

  // Functions to add or update roles

  const handleRemoveRole = () => dispatch(removeRoles(selectedRole));

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="lg">
      <Card sx={{ p: 2, mb: 2, border: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <HeadLine Title={'Roles'} TitleIcon="eos-icons:role-binding" />
          {isActionAllowed('ADD_NEW_ROLE') && (
            <Button endIcon={<Icon icon="carbon:user-role" />} variant="contained" onClick={setOpenAddModal}>
              Add New Role
            </Button>
          )}
        </Box>
      </Card>

      <ListDialog
        showDialog={showDetails}
        handleCloseDialog={() => setShowDetails(false)}
        dialogData={selectedData.data}
        dialogTitle={selectedData.title}
      />
      <ConfirmationModal
        open={removeModal}
        isLoading={isLoadingRemoveRole}
        onClose={setCloseRemoveModal}
        onConfirm={handleRemoveRole}
        message={'Are you sure you want to delete the role?'}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Pages</TableCell>
              <TableCell align="center">Actions</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolesList.map((role, index) => (
              <TableRow key={role.role_id}>
                <TableCell align="center">{role.role_id}</TableCell>
                <TableCell align="center">{role.name}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleShowDetails(role.name + ' Pages', role.permissions.pages)}>Show Pages</Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleShowDetails(role.name + ' Actions', role.permissions.actions)}>Show Actions</Button>
                </TableCell>
                <TableCell align="center">
                  {isActionAllowed('EDIT_ROLE') && (
                    <IconButton onClick={() => setOpenUpdateModal(role)}>
                      <Icon color="green" icon="foundation:page-edit" />
                    </IconButton>
                  )}

                  {isActionAllowed('REMOVE_ROLE') && (
                    <IconButton onClick={() => setOpenRemoveModal(role)}>
                      <Icon color="#8B0000" icon="carbon:row-delete" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

       <UpdateModal role={role} setRole={setRole} />  

      <AddModal role={role} setRole={setRole} />
    </Container>
  );
};

export default App;
