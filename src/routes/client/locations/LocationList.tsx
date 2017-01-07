import { Button } from 'antd';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router-dom';
import { OfficeLocation, useOfficeLocationsQuery, OfficeLocationsDocument } from 'generated';
import SmartTable from 'components/SmartTable';

interface IOfficeLocationListProps extends RouteComponentProps<any> {
  onEdit: (id: string) => void;
}

export const OfficeLocationList = (props: IOfficeLocationListProps) => {
  const onAdd = () => {
    props.history.push('/client/dealers/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/client/${id}`, { id });
  };

  // Columns of the table
  const columns: ColumnProps<OfficeLocation>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'OfficeLocation',
      dataIndex: 'location',
      key: 'location',
      render: location => {
        if (location) {
          return (
            <div>
              {location.city} {location.state}
            </div>
          );
        }
      },
    },
  ];
  return (
    <React.Fragment>
      <ContainerHeader
        title="OfficeLocations"
        subheading="A View of all OfficeLocations."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add OfficeLocation
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useOfficeLocationsQuery}
        queryDocument={OfficeLocationsDocument}
        name="dealers"
        paginationTotalTitle="Dealers"
      />
    </React.Fragment>
  );
};

export default OfficeLocationList;
