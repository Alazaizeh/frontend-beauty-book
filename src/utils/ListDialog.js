import React from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Checkbox,
  Box,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SubCard from 'ui-component/cards/SubCard';
import styled from '@emotion/styled';

const DataDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const ListDialog = ({ showDialog, handleCloseDialog, dialogData, dialogTitle }) => {
  //   const theme = useTheme();

  if (dialogData?.length == 0)
    return (
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth:"200px" ,padding:"50px 100px"}}>
            <Typography variant="body1">No Date </Typography>
        </Box>
      </Dialog>
    );

  return (
    <DataDialog open={showDialog} onClose={handleCloseDialog}>
      <DialogTitle sx={{ m: 0 }} id="customized-dialog-title">
        {dialogTitle}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'theme.palette.grey[500]'
        }}
      >
        <CloseIcon />
      </IconButton>

      <Card
        sx={{
          overflow: 'auto',
          scrollbarWidth: 'none', // Hide the scrollbar for firefox
          '&::-webkit-scrollbar': {
            display: 'none' // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
          },
          '&-ms-overflow-style:': {
            display: 'none' // Hide the scrollbar for IE
          },
          borderColor: 'theme.palette.primary.light',

          maxHeight: '300px'
        }}
      >
        <TableContainer style={{ minWidth: '500px' }}>
          <Table>
 
            <TableBody>
              {dialogData?.map((item, idx) => {
                return (
                  <TableRow key={item}>
                 
                    <TableCell align="center" style={{ color: 'theme.palette.primary.main' }}>
                      {item}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <DialogActions>
        <Button autoFocus onClick={handleCloseDialog}>
          Close
        </Button>
      </DialogActions>
    </DataDialog>
  );
};

export default ListDialog;
