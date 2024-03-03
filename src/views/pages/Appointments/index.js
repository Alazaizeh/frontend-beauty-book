import { useEffect, useState } from "react";
import sumBy from "lodash/sumBy";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from "@mui/material";
// routes
const PATH_DASHBOARD = {};
// utils
import { fTimestamp } from "../../../utils/formatTime";

// components
import Label from "../../../ui-component/label";
import Iconify from "../../../ui-component/iconify";
import Scrollbar from "../../../ui-component/scrollbar";
import ConfirmDialog from "../../../ui-component/confirm-dialog";
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
import AppointmentAnalytic from "../../../ui-component/appointment/AppointmentAnalytic";
import {
  AppointmentTableRow,
  AppointmentTableToolbar,
} from "../../../ui-component/appointment/list";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointments,
  getAppointmentsStatistics,
} from "store/reducers/Appointments/actions";

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  "all",
  "full stack development",
  "backend development",
  "ui design",
  "ui/ux design",
  "front end development",
];

const TABLE_HEAD = [
  { id: "appointment_id", label: "Client", align: "left" },
  { id: "salon", label: "Salon", align: "left" },
  { id: "created_at", label: "Create", align: "left" },
  { id: "date_time", label: "Appointment", align: "left" },
  { id: "price", label: "Amount", align: "center", width: 140 },
  { id: "service", label: "Service", align: "center", width: 140 },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function AppointmentListPage() {
  const theme = useTheme();

  const navigate = useNavigate();

  const {
    dense,
    order,
    page,
    setPage,
    orderBy,
    selected,
    setSelected,
    setOrder,
    setOrderBy,
    onSelectRow,
    onSelectAllRows,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "created_at" });
  const rowsPerPage = 10;
  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [timer, setTimer] = useState(null);
  const [lastPage, setLastPage] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [filterService, setFilterService] = useState("all");
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filter, setfilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [dataFiltered, setDataFiltered] = useState([]);
  const dispatch = useDispatch();

  const appointmentsList = useSelector(
    (state) => state.appointments.appointmentsData
  );
  const appointmentsStatistics = useSelector(
    (state) => state.appointments.appointmentsStatistics
  );
  const isLoading = useSelector(
    (state) => state.appointments.loading.getAppointments
  );
  const errorMessage = useSelector(
    (state) => state.appointments.error.getAppointments
  );

  const getInitialData = () => dispatch(getAppointments({ page: 0, rows: 10 }));

  useEffect(() => {
    getInitialData();
    dispatch(getAppointmentsStatistics());
  }, []);

  useEffect(() => {

    if (!isFiltered) {
      setTableData([...tableData, ...appointmentsList]);
      setDataFiltered([]);
    } else {
      setDataFiltered(appointmentsList);
    }
  }, [appointmentsList]);

  useEffect(() => {
    if (
      filterName != "" ||
      filterStatus != "all" ||
      filterService != "all" ||
      filterStartDate != null ||
      filterEndDate != null
    ) {

      dispatch(
        getAppointments({
          page: 0,
          rows: 0,
          filterName,
          filterStatus,
          filterService,
          filterStartDate,
          filterEndDate,
        })
      );
    }
  }, [filterStatus, filterService, filterStartDate, filterEndDate]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        if (filterName != "" && filterName.length > 2)
          dispatch(
            getAppointments({
              page: 0,
              rows: 0,
              filterName,
              filterStatus,
              filterService,
              filterStartDate,
              filterEndDate,
            })
          );
      }, 500)
    );

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [filterName]);


  const onSort = (id) => {
    const isAsc = orderBy === id && order === "asc";

    if (id !== "") {
      let current = isAsc ? "desc" : "asc";

      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
      let stabilizedThis = [];
      const comparator = getComparator(current, id);

      if (!isFiltered) {
        stabilizedThis = tableData.map((el, index) => [el, index]);
      } else {
        stabilizedThis = dataFiltered.map((el, index) => [el, index]);
      }

      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });

      const sorted = stabilizedThis.map((el) => el[0]);

      if (!isFiltered) {
        setTableData(sorted);
      } else {
        setDataFiltered(sorted);
      }
    }
  };

  const onChangePageHandler = (e, newPage) => {
    onChangePage(e, newPage);
    if (newPage > page && newPage > lastPage && !isFiltered) {
      dispatch(
        getAppointments({
          page: newPage,
          rows: 10,
          filterName,
          filterStatus,
          filterService,
          filterStartDate,
          filterEndDate,
        })
      );
      setLastPage(newPage);
    }
  };
  const denseHeight = dense ? 56 : 76;

  const isFiltered =
    filterStatus !== "all" ||
    filterName !== "" ||
    filterService !== "all" ||
    (!!filterStartDate && !!filterEndDate);

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const getLengthByStatus = (status) =>
    appointmentsStatistics[status]?.total_appointments;
  const getPercentByStatus = (status) =>
    (appointmentsStatistics[status]?.total_appointments /
      appointmentsStatistics.total_appointments) *
    100;

  const TABS = [
    {
      value: "all",
      label: "All",
      color: "info",
      count: appointmentsStatistics.total_appointments,
    },
    {
      value: "completed",
      label: "Completed",
      color: "success",
      count: getLengthByStatus("completed"),
    },
    {
      value: "pending",
      label: "Pending",
      color: "warning",
      count: getLengthByStatus("pending"),
    },
    {
      value: "canceled",
      label: "Canceled",
      color: "error",
      count: getLengthByStatus("canceled"),
    },
  ];

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
    if (event.target.value == "") setDataFiltered([]);
  };

  const handleFilterService = (event) => {
    setPage(0);
    setFilterService(event.target.value);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id) => {
    navigate("/dashboard/appointments-details/" + id);
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("all");
    setFilterService("all");
    setFilterEndDate(null);
    setFilterStartDate(null);
    setDataFiltered([]);
  };

  return (
    <>
      <title> Appointments: List </title>

      <Container maxWidth="lg">
        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderStyle: "dashed" }}
                />
              }
              sx={{ py: 2 }}
            >
              <AppointmentAnalytic
                title="Total"
                total={appointmentsStatistics.total_appointments || 0}
                percent={100}
                price={appointmentsStatistics.total_service_price || 0}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />

              <AppointmentAnalytic
                title="Completed"
                total={
                  appointmentsStatistics.completed?.total_appointments || 0
                }
                percent={getPercentByStatus("completed")}
                price={
                  appointmentsStatistics.completed?.total_service_price || 0
                }
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />

              <AppointmentAnalytic
                title="Pending"
                total={appointmentsStatistics.pending?.total_appointments || 0}
                percent={getPercentByStatus("pending")}
                price={appointmentsStatistics.pending?.total_service_price || 0}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />

              <AppointmentAnalytic
                title="Canceled"
                total={appointmentsStatistics.canceled?.total_appointments || 0}
                percent={getPercentByStatus("canceled")}
                price={
                  appointmentsStatistics.canceled?.total_service_price || 0
                }
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <Divider />

          <AppointmentTableToolbar
            filterName={filterName}
            isFiltered={isFiltered}
            filterService={filterService}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            optionsService={SERVICE_OPTIONS}
            filterStartDate={filterStartDate}
            onResetFilter={handleResetFilter}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
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
                  {dataFiltered.length > 0 || isFiltered
                    ? dataFiltered
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <AppointmentTableRow
                            key={row.appointment_id}
                            row={row}
                            selected={selected.includes(row.appointment_id)}
                            onSelectRow={() => onSelectRow(row.appointment_id)}
                            onViewRow={() => handleViewRow(row.appointment_id)}
                            onEditRow={() => handleEditRow(row.appointment_id)}
                            onDeleteRow={() =>
                              handleDeleteRow(row.appointment_id)
                            }
                          />
                        ))
                    : tableData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <AppointmentTableRow
                            key={row.appointment_id}
                            row={row}
                            selected={selected.includes(row.appointment_id)}
                            onSelectRow={() => onSelectRow(row.appointment_id)}
                            onViewRow={() => handleViewRow(row.appointment_id)}
                            onEditRow={() => handleEditRow(row.appointment_id)}
                            onDeleteRow={() =>
                              handleDeleteRow(row.appointment_id)
                            }
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
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={
              isFiltered
                ? appointmentsList.length || 0
                : appointmentsStatistics.total_appointments || 0
            }
            page={page}
            rowsPerPageOptions={[10]}
            rowsPerPage={10}
            onPageChange={onChangePageHandler}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong>{" "}
            items?
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
      />
    </>
  );
}

// ----------------------------------------------------------------------
