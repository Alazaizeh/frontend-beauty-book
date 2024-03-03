import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
//
import styles from './InvoiceStyle';
import logoImage from "../../../assets/images/logo.png"

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoicePDF({ invoice }) {
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
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source={logoImage} style={{ height: 64 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{status}</Text>
            <Text> {`${appointment_id}`} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>From</Text>
            <Text style={styles.body1}> {service?.salon.name}</Text>
            <Text style={styles.body1}>{service?.salon.description}</Text>
            <Text style={styles.body1}>{service?.salon.city}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>To</Text>
            <Text style={styles.body1}>{user?.full_name}</Text>
            <Text style={styles.body1}>{user?.email}</Text>
            <Text style={styles.body1}>{user?.phone}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Create Date</Text>
            <Text style={styles.body1}>{fDateTime(created_at)}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Appointment date</Text>
            <Text style={styles.body1}>{fDateTime(date_time)}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Appointment Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>

            <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Salon</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Service</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Price</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Duration</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
              <View style={styles.tableRow} key={appointment_id}>
 

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{service?.salon.name}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{service?.name}</Text>
                  <Text>{service?.description}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{service?.price}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{service?.duration} minutes</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(service?.price )}</Text>
                </View>
              </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(service?.price)}</Text>
              </View>
            </View>
          </View>
        </View>


      </Page>
    </Document>
  );
}
