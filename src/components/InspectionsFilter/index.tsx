import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { RouteComponentProps } from 'react-router-dom';
import { Inspection, InspectionsForListDocument, useInspectionsForEquipmentQuery } from 'generated';
import SmartTable from 'components/SmartTable';
import moment from 'moment';
import { Button } from 'antd';
import ContainerHeader from 'components/ContainerHeader';

interface IProps extends RouteComponentProps<any> {
  hideBackBtn?: boolean;
}

export const InspectionHistoryList = (props: IProps) => {
  const id = props.location.state ? props.location.state.id : undefined;

  const columns: ColumnProps<Inspection>[] = [
    {
      title: 'Usage',
      dataIndex: 'meterValue',
      key: 'meterValue',
      render: (meterValue: number, row: Inspection) => {
        if (meterValue !== null && meterValue !== undefined) return meterValue + ' ' + row.equipment.meterType;
        else return '';
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '# Items',
      dataIndex: 'checklist',
      key: 'checklist',
      render: (text, item) => item.checklist.length,
    },
    {
      title: 'Who',
      dataIndex: 'who',
      key: 'who',
      render: item => (item ? item.firstName + ' ' + item.lastName : ''),
    },
    {
      title: 'Completed',
      dataIndex: 'completedOn',
      key: 'completedOn',
      render: item => {
        if (item) {
          return moment(item).format('MMM D');
        }
      },
    },
  ];

  const cancel = () => {
    props.history.goBack();
  };

  return (
    <>
      {!props.hideBackBtn && (
        <ContainerHeader
          title="Inspections"
          subheading="Inspections for current equipment."
          icon="pe-7s-display1 icon-gradient bg-premium-dark"
          actions={
            <Button type="primary" onClick={cancel}>
              Back
            </Button>
          }
        />
      )}
      <SmartTable
        hideActionsColumn={true}
        idQuery={id}
        columns={columns}
        useTableQuery={useInspectionsForEquipmentQuery}
        queryDocument={InspectionsForListDocument}
        name="inspectionsForEquipment"
        paginationTotalTitle="Inspections For Equipment"
      />
    </>
  );
};

export default React.memo(InspectionHistoryList);
