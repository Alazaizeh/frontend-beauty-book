
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
  // components
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
  import {
    StaffTableRow,
    StaffTableToolbar,
  } from "../../../ui-component/staff/list";
  import { useDispatch, useSelector } from "react-redux";
  import { getStaff, getStaffStatistics, removeStaff } from "../../../store/reducers/Staff/actions";
  import HeadLine from "utils/HeadLine";
  
  // ----------------------------------------------------------------------
  
  const SORT_OPTIONS = [
    { label: "Creation Date", value: "created_at" },
  ];
  
  const TABLE_HEAD = [
    { id: "name", label: "Name", align: "left" },
    { id: "salon", label: "Salon", align: "left" },
    { id: "service", label: "Service", align: "left" },
    { id: "" },
  ];
  
  // ----------------------------------------------------------------------
  
  export default function InvoiceListPage() {
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
      setOrderBy,
      setOrder,
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
    const [filterStaff, setFilterStaff] = useState("all");
    const [filterSort, setFilterSort] = useState("created_at");
    const [filterStartDate, setFilterStartDate] = useState(null);
    const [dataFiltered, setDataFiltered] = useState([]);
    const dispatch = useDispatch();
  
    const staffList = useSelector((state) => state.staff.staffData);
    const staffStatistics = useSelector(
      (state) => state.staff.staffStatistics
    );
    const isLoading = useSelector((state) => state.staff.loading.getStaff);
    const errorMessage = useSelector((state) => state.staff.error.getStaff);
  
    const getInitialData = () =>
      dispatch(getStaff({ page: 0, rows: 10, filterName, filterSort }));
  
    useEffect(() => {
      getInitialData();
      dispatch(getStaffStatistics());
    }, []);
  
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
  
    useEffect(() => {
      if (!isFiltered) {
        setTableData([...tableData, ...staffList]);
        setDataFiltered([]);
      } else {
        setDataFiltered(staffList);
      }
    }, [staffList]);
  
    useEffect(() => {
      if (
        filterName != "" ||
        filterStatus != "all" ||
        filterStaff != "all" ||
        filterStartDate != null ||
        filterEndDate != null
      ) {
        dispatch(
          getStaff({
            page: 0,
            rows: 0,
            filterName,
            filterSort,
          })
        );
      }
    }, [filterStatus, filterStaff, filterStartDate, filterEndDate]);
  
    useEffect(() => {
      if (timer) {
        clearTimeout(timer);
      }
  
      setTimer(
        setTimeout(() => {
          if (filterName != "" && filterName.length > 2)
            dispatch(
              getStaff({
                page: 0,
                rows: 0,
                filterName,
                filterSort,
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
  
    const onChangePageHandler = (e, newPage) => {
      onChangePage(e, newPage);
      if (newPage > page && newPage > lastPage && !isFiltered) {
        dispatch(
          getStaff({
            page: newPage,
            rows: 10,
            filterName,
            filterSort,
          })
        );
        setLastPage(newPage);
      }
    };
    const denseHeight = dense ? 56 : 76;
  
    const isFiltered =
      filterStatus !== "all" ||
      (filterName !== "" && filterName.length > 2) ||
      filterStaff !== "all" ||
      (!!filterStartDate && !!filterEndDate);
  
    const isNotFound =
      (!dataFiltered.length && !!filterName) ||
      (!dataFiltered.length && !!filterStatus) ||
      (!dataFiltered.length && !!filterStaff) ||
      (!dataFiltered.length && !!filterEndDate) ||
      (!dataFiltered.length && !!filterStartDate);
  
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
  
    const handleFilterStaff = (event) => {
      setPage(0);
      setLastPage(0);
  
      setTableData((prv) => {
        dispatch(
          getStaff({
            page: 0,
            rows: 10,
            filterName,
            filterSort: event.target.value,
          })
        );
        return [];
      });
  
      setFilterSort(event.target.value);
    };
  
    const handleEditRow = (id) => {};
  
    const handleViewRow = (id) => {
      navigate("/dashboard/staffs-details/" + id);
    };
  
    const handleResetFilter = () => {
      setFilterName("");
      setFilterStatus("all");
      setFilterStaff("all");
      setFilterEndDate(null);
      setFilterStartDate(null);
      setDataFiltered([]);
    };
   
    const handleDeleteRow = (id) => {
 
      const deleteRow = tableData.filter((row) => row.staff_id !== id);
      setSelected([]);
      setTableData(deleteRow);
  
      dispatch(removeStaff(id))
  
      if (page > 0) {
        if (dataInPage.length < 2) {
          setPage(page - 1);
        }
      }
    };
    return (
      <>
        <Container maxWidth="lg">
          <Card   sx={{ p: 2, mb: 2, border: "1px solid #eee" }}>
            <HeadLine Title={"Staffs"} TitleIcon="ph:users-four" />
          </Card>
        </Container>
  
        <Container maxWidth="lg">
          <Card>
            <StaffTableToolbar
              filterName={filterName}
              isFiltered={isFiltered}
              filterStaff={filterSort}
              filterEndDate={filterEndDate}
              onFilterName={handleFilterName}
              optionsStaff={SORT_OPTIONS}
              filterStartDate={filterStartDate}
              onResetFilter={handleResetFilter}
              onFilterStaff={handleFilterStaff}
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
                            <StaffTableRow
                              key={row.staff_id}
                              row={row}
                              selected={selected.includes(row.staff_id)}
                              onSelectRow={() => onSelectRow(row.staff_id)}
                              onViewRow={() => handleViewRow(row.staff_id)}
                              onEditRow={() => handleEditRow(row.staff_id)}
                              onDeleteRow={() =>
                                handleDeleteRow(row.staff_id)
                              }
                            />
                          ))
                      : tableData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => (
                            <StaffTableRow
                              key={row.staff_id}
                              row={row}
                              selected={selected.includes(row.staff_id)}
                              onSelectRow={() => onSelectRow(row.staff_id)}
                              onViewRow={() => handleViewRow(row.staff_id)}
                              onEditRow={() => handleEditRow(row.staff_id)}
                              onDeleteRow={() =>
                                handleDeleteRow(row.staff_id)
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
              count={isFiltered ? staffList.length : staffStatistics}
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
  