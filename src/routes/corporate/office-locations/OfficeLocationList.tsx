import { Button } from 'antd';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router-dom';
import { OfficeLocation, useOfficeLocationsQuery, OfficeLocationsDocument, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';

interface IOfficeLocationListProps extends RouteComponentProps<any> {
  onEdit: (id: string) => void;
}

export const OfficeLocationList = (props: IOfficeLocationListProps) => {
  const onAdd = () => {
    props.history.push('/corporate/office-locations/add');
  };

  const onEdit = (id: string) => {
    const formattedId = id.split('/')[1];
    props.history.push('/corporate/office-locations/' + formattedId, { id });
  };

  // Columns of the table
  const columns: ColumnProps<OfficeLocation>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: client => {
        if (client) {
          return <div>{client.name}</div>;
        }
      }
    }
  ];
  return (
    <React.Fragment>
      <ContainerHeader
        title="Office Locations"
        subheading="A View of all Office Locations."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Office Location
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useOfficeLocationsQuery}
        queryDocument={OfficeLocationsDocument}
        name="officeLocations"
        paginationTotalTitle="Office Locations"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Office Locations']}
      />
    </React.Fragment>
  );
};

export default OfficeLocationList;
