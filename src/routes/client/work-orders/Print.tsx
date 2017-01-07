import React from 'react';
import { Image, Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { WorkOrderStatusEnum, UserReference, WorkOrder } from 'generated';
import moment from 'moment';

interface IProps {
  workOrders: any[];
}

export const Print = (props: IProps) => {
  const { workOrders } = props;
  // Create styles
  const styles = StyleSheet.create({
    header: {
      marginBottom: '5%',
      textAlign: 'left',
    },
    row: {
      display: 'flex',
    },
    column: {
      // @ts-ignore
      flex: '50%',
    },
    left: {
      textAlign: 'left',
    },
    right: {
      textAlign: 'right',
    },

    table: {
      // @ts-ignore
      display: 'table',
      width: 'auto',

      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderTopColor: '#edf1f2',
      borderLeftColor: '#edf1f2',
      borderRightColor: '#edf1f2',
      borderBottomColor: '#edf1f2',
    },

    tableNoBorder: {
      // @ts-ignore
      display: 'table',
      width: 'auto',
      marginBottom: 10,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol: {
      width: '50%',
      // @ts-ignore
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightColor: '#edf1f2',
      borderBottomColor: '#edf1f2',
      textAlign: 'left',
    },
    tableCol1: {
      width: '100%',
      // @ts-ignore
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderTopColor: '#edf1f2',
      borderLeftColor: '#edf1f2',
      borderRightColor: '#edf1f2',
      borderBottomColor: '#edf1f2',
    },
    tableCol4: {
      width: '25%',
      // @ts-ignore
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderTopColor: '#edf1f2',
      borderLeftColor: '#edf1f2',
      borderRightColor: '#edf1f2',
      borderBottomColor: '#edf1f2',
    },

    tableColNoBorder: {
      width: '50%',
      fontSize: 9,
    },
    tableCell: {
      // margin: 'auto',
      marginLeft: 5,
      marginRight: 2,
      marginTop: 5,
      marginBottom: 5,
      fontSize: 10,
      color: 'black',
    },

    textSizeBig: {
      fontSize: 14,
    },

    backgroundGrey: {
      backgroundColor: '#f6f7f7',
    },
    image: { backgroundColor: 'white', padding: 5, paddingLeft: 0, marginBottom: 10, width: 150, height: 50 },
    paddingLeft: { paddingLeft: 20 },
    paddingTop: { paddingTop: 10 },
    paddingRight: { paddingRight: 20 },
    paddingBottom: { paddingBottom: 10 },
    marginLeft: { marginLeft: 20 },
    marginRight: { marginRight: 20 },
    lineBreak: { height: 20 },
  });

  const formatStatus = (status: WorkOrderStatusEnum) => {
    if (status === WorkOrderStatusEnum.AssessingRepair) return 'Assessing Repair';
    if (status === WorkOrderStatusEnum.InProgress) return 'In Progress';
    if (status === WorkOrderStatusEnum.WaitingForParts) return 'Waiting for Parts';
  };

  const formatAssignedTo = (assignedTo: UserReference[]) => {
    if (assignedTo) return assignedTo.map((x, index) => x.firstName + ' ' + x.lastName + (index !== assignedTo.length - 1 ? ', ' : ''));
    else return '';
  };

  // console.log(workOrders);

  return (
    <Document>
      {workOrders &&
        workOrders.length > 0 &&
        (workOrders as WorkOrder[]).map((workOrder: WorkOrder, parentIndex: number) => {
          return (
            <>
              <Page size="A4" wrap>
                {workOrder && (
                  <>
                    <Link src="https://www.uptimepm.com/" style={[styles.paddingLeft, styles.paddingTop]}>
                      <Image style={styles.image} src={require('assets/images/UptimePM-Logo-Light.png')} />
                    </Link>

                    <View style={[styles.header, styles.paddingLeft, styles.paddingRight]}>
                      <View style={styles.tableNoBorder}>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableColNoBorder, styles.left]}>
                            <Text>{workOrder.client && workOrder.client.name}</Text>
                          </View>
                          <View style={[styles.tableColNoBorder, styles.right]}>
                            <Text>Work Order #{workOrder.id && workOrder.id.split('/')[1]}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.lineBreak}></View>

                      <View style={[styles.tableNoBorder, styles.paddingRight]}>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableColNoBorder, styles.left, styles.textSizeBig]}>
                            <Text>{workOrder.equipment && workOrder.equipment.name}</Text>
                          </View>
                          <View style={[styles.tableColNoBorder, styles.right]}>
                            <Text></Text>
                          </View>
                        </View>
                      </View>

                      <View style={[styles.table]}>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol4, styles.backgroundGrey]}>
                            <Text style={styles.tableCell}>Issue Date</Text>
                          </View>
                          <View style={[styles.tableCol4, styles.backgroundGrey]}>
                            <Text style={styles.tableCell}>Status</Text>
                          </View>
                          <View style={[styles.tableCol4, styles.backgroundGrey]}>
                            <Text style={styles.tableCell}>Issued By</Text>
                          </View>
                          <View style={[styles.tableCol4, styles.backgroundGrey]}>
                            <Text style={styles.tableCell}>Assigned To</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableCol4}>
                            <Text style={styles.tableCell}>{workOrder.completedOn && moment(workOrder.completedOn).format('MMM DD YYYY')}</Text>
                          </View>
                          <View style={styles.tableCol4}>
                            <Text style={styles.tableCell}> {formatStatus(workOrder.status)}</Text>
                          </View>
                          <View style={styles.tableCol4}>
                            <Text style={styles.tableCell}>
                              {' '}
                              {workOrder.reportedBy ? workOrder.reportedBy.firstName + ' ' + workOrder.reportedBy.lastName : ''}
                            </Text>
                          </View>
                          <View style={styles.tableCol4}>
                            <Text style={styles.tableCell}> {formatAssignedTo(workOrder.assignedTo)} </Text>

                            {/* <Text style={styles.tableCell}>{moment(workOrder.completedOn).format('MMM DD YYYY')}</Text> */}
                          </View>
                        </View>
                      </View>

                      <View style={styles.lineBreak}></View>

                      <View style={[styles.table]}>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol1, styles.backgroundGrey]}>
                            <Text style={styles.tableCell}>Notes</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1}>
                            <Text style={styles.tableCell}>{workOrder.notes}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              </Page>
            </>
          );
        })}
    </Document>
  );
};

export default Print;
