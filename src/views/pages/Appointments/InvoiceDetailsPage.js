import { useParams } from "react-router-dom";
// @mui
import { Card, Container } from "@mui/material";
// routes
// components
import CustomBreadcrumbs from "../../../ui-component/custom-breadcrumbs";
// sections
import InvoiceDetails from "../../../ui-component/appointment/details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAppointmentByID } from "store/reducers/Appointments/actions";
import HeadLine from "utils/HeadLine";

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const appointment = useSelector((state) => state.appointments.appointment);
  useEffect(() => {
    dispatch(getAppointmentByID(id));
  }, []);

  return (
    <>
      <Container>
        <InvoiceDetails invoice={appointment} />
      </Container>
    </>
  );
}
