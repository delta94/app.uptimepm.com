import React from 'react';
import { Image, Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { InspectionChecklistItem, Inspection } from 'generated';
import moment from 'moment';

interface IProps {
  inspection: Inspection;
}

export const Print = (props: IProps) => {
  const { inspection } = props;
  // Create styles
  const styles = StyleSheet.create({
    header: {
      marginBottom: 10,
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
      // marginBottom: 10,
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
      marginTop: 3,
      marginBottom: 3,
      fontSize: 9,
      color: 'black',
    },

    textSizeBig: {
      fontSize: 14,
      marginBottom: 2,
    },

    backgroundGrey: {
      backgroundColor: '#f6f7f7',
    },
    image: { backgroundColor: 'white', padding: 5, paddingLeft: 0, marginBottom: 5, width: 232, height: 50 },
    paddingLeft: { paddingLeft: 20 },
    paddingTop: { paddingTop: 10 },
    paddingTopInfo: { paddingTop: 35 },
    paddingRight: { paddingRight: 20 },
    paddingBottom: { paddingBottom: 10 },
    marginLeft: { marginLeft: 20 },
    marginRight: { marginRight: 20 },
  });

  // console.log(props.inspection);
  return (
    <Document>
      <Page size="A4" wrap>
        {props.inspection && (
          <>
            <View style={[styles.header, styles.paddingLeft, styles.paddingRight]}>
              <View style={styles.tableNoBorder}>
                <View style={styles.tableRow}>
                  <Link src="https://www.uptimepm.com/" style={[styles.paddingTop]}>
                    <Image style={styles.image} src={require('assets/images/UptimePM-Logo-Dark-PDF.png')} />
                  </Link>
                  <View style={[styles.tableColNoBorder, styles.right, styles.paddingTopInfo]}>
                    <Text>{props.inspection.client && props.inspection.client.name}</Text>
                    <Text>Inspection #{props.inspection.id && props.inspection.id.split('/')[1]}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.tableNoBorder, styles.paddingRight]}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableColNoBorder, styles.left, styles.textSizeBig]}>
                    <Text>{props.inspection.equipment && props.inspection.equipment.name}</Text>
                  </View>
                  <View style={[styles.tableColNoBorder, styles.right]}>
                    <Text></Text>
                  </View>
                </View>
              </View>

              <View style={[styles.table]}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol4, styles.backgroundGrey]}>
                    <Text style={styles.tableCell}>Usage</Text>
                  </View>
                  <View style={[styles.tableCol4, styles.backgroundGrey]}>
                    <Text style={styles.tableCell}>Type</Text>
                  </View>
                  <View style={[styles.tableCol4, styles.backgroundGrey]}>
                    <Text style={styles.tableCell}>Submitted By</Text>
                  </View>
                  <View style={[styles.tableCol4, styles.backgroundGrey]}>
                    <Text style={styles.tableCell}>Completed</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol4}>
                    <Text style={styles.tableCell}>
                      {inspection.equipment.meterType !== '' && (
                        <>
                          {inspection.meterValue} {inspection.equipment.meterType}
                        </>
                      )}
                    </Text>
                  </View>
                  <View style={styles.tableCol4}>
                    <Text style={styles.tableCell}>{inspection.type}</Text>
                  </View>
                  <View style={styles.tableCol4}>
                    <Text style={styles.tableCell}>
                      {inspection.who.firstName} {inspection.who.lastName}
                    </Text>
                  </View>
                  <View style={styles.tableCol4}>
                    <Text style={styles.tableCell}>{moment(inspection.completedOn).format('MMM DD YYYY')}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.tableNoBorder, styles.paddingLeft]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableColNoBorder, styles.left, styles.textSizeBig]}>
                  <Text>Checklist Items ({props.inspection.checklist.length})</Text>
                </View>
                <View style={[styles.tableColNoBorder, styles.right]}>
                  <Text></Text>
                </View>
              </View>
            </View>

            <View style={[styles.table, styles.marginLeft, styles.marginRight]}>
              {props.inspection.checklist &&
                props.inspection.checklist.map((item: InspectionChecklistItem, index: number) => {
                  return (
                    <>
                      <View key={index}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.title}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.status}
                              {item.notes ? (
                                <View style={styles.tableRow}>
                                  <View style={styles.tableCol}></View>
                                  <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}> - {item.notes}</Text>
                                  </View>
                                </View>
                              ) : (
                                <></>
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </>
                  );
                })}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default Print;
