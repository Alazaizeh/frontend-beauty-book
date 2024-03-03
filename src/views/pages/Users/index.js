// import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Typography,
} from "@mui/material";
// routes
const PATH_DASHBOARD = {};
// _mock_
import EditUserDialog from "./EditUser";
// components
import { Icon } from "@iconify/react";

import Scrollbar from "../../../ui-component/scrollbar";
// import ConfirmDialog from '../../components/confirm-dialog';
// import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "../../../ui-component/table";
// sections

import UserTableRow from "./UserTableRow";
import UserTableToolbar from "./UserTableToolbar";
import { Box } from "@mui/system";
import HeadLine from "utils/HeadLine";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getRoles } from "store/reducers/Users/actions";
import { useEffect } from "react";
import { selectUser } from "store/reducers/Users";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["all", "active", "inactive"];

const TABLE_HEAD = [
  { id: "full_name", label: "Name", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "role", label: "Role", align: "left" },
  { id: "lastLogin", label: "Last Login", align: "left" },
  { id: "isActive", label: "Status", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function UserListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState("");

  const [filterRole, setFilterRole] = useState("all");

  const [filterStatus, setFilterStatus] = useState("all");

  const rolesList = useSelector((state) => state.users.rolesData);
  const usersList = useSelector((state) => state.users.usersData);
  const isLoading = useSelector((state) => state.users.loading.getUsers);
  const errorMessage = useSelector((state) => state.users.error.getUsers);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const denseHeight = dense ? 52 : 72;

  const isFiltered =
    filterName !== "" || filterRole !== "all" || filterStatus !== "all";

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    setTableData(usersList);
  }, [usersList]);

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id));
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterRole("all");
    setFilterStatus("all");
  };

  const handleEditUser = (user) => {
    dispatch(selectUser(user));
    setOpenEdit(true);
  };
  const handleCloseEditUser = () => {
    setOpenEdit(false);
    dispatch(selectUser({}));
    dispatch(getUsers());
  };

  return (
    <>
      <EditUserDialog open={openEdit} handleClose={handleCloseEditUser} />

      <Container maxWidth="lg">
        <Card sx={{ p: 2, mb: 2, border: "1px solid #eee" }}>
          <HeadLine Title={"Users"} TitleIcon="ph:users-four" />
        </Card>
      </Container>

      <Container maxWidth="lg">
        <Card>
          <Box sx={{ m: 4 }}></Box>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={rolesList.map((role) => role.name)}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Icon icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.user_id}
                      row={row}
                      selected={selected.includes(row.user_id)}
                      onSelectRow={() => onSelectRow(row.user_id)}
                      onDeleteRow={() => handleDeleteRow(row.user_id)}
                      onEditRow={() => handleEditUser(row)}
                    />
                  ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />
                <TableNoData
                  isNotFound={
                    tableData.length == 0 ||
                    (isFiltered && dataFiltered.length == 0)
                  }
                />
              </TableBody>
            </Table>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      {/* <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) =>
        user.full_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== "all") {
    inputData = inputData.filter(
      (user) => user.isActive === (filterStatus == "active" ? true : false)
    );
  }

  if (filterRole !== "all") {
    inputData = inputData.filter((user) => user.role.name === filterRole);
  }

  return inputData;
}
