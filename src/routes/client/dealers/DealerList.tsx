import { Button, Tag } from 'antd';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router-dom';
import { Dealer, useDealersQuery, DealersDocument, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';

interface IDealerListProps extends RouteComponentProps<any> {
  onEdit: (id: string) => void;
}

export const DealerList = (props: IDealerListProps) => {
  const onAdd = () => {
    props.history.push('/client/dealers/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/client/${id}`, { id });
  };

  // Columns of the table
  const columns: ColumnProps<Dealer>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    // {
    //   title: 'Contact',
    //   dataIndex: 'contact',
    //   key: 'contact',
    // },
    {
      title: 'Phone(s)',
      dataIndex: 'phones',
      key: 'phones',
      render: phones => {
        if (phones) {
          return phones.map((r: { type: string; digits: string }, index: number) => {
            return (
              <Tag key={index} style={{ pointerEvents: 'none', margin: '-5px 2px' }}>
                {r.type}: {r.digits}
              </Tag>
            );
          });
        }
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website'
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: location => {
        if (location) {
          return (
            <div>
              {location.city} {location.country}
            </div>
          );
        }
      }
    }
    // {
    //   title: 'Sales',
    //   dataIndex: 'sales',
    //   key: 'sales',
    //   render: item => {
    //     if (item) {
    //       return (
    //         <div>
    //           {item.firstName} {item.lastName}
    //         </div>
    //       );
    //     }
    //   },
    // },
    // {
    //   title: 'Service',
    //   dataIndex: 'service',
    //   key: 'service',
    //   render: item => {
    //     if (item) {
    //       return (
    //         <div>
    //           {item.firstName} {item.lastName}
    //         </div>
    //       );
    //     }
    //   },
    // },
  ];
  return (
    <React.Fragment>
      <ContainerHeader
        title="Dealers"
        subheading="An Administration view of all Dealers for client."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Dealer
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useDealersQuery}
        queryDocument={DealersDocument}
        name="dealers"
        paginationTotalTitle="Dealers"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Dealers']}
      />
    </React.Fragment>
  );
};

export default DealerList;
