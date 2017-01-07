import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import { UserReference, DetailedEquipmentReference, IdNameReference, RoleTypeEnum, useNotificationsQuery, NotificationsDocument } from 'generated';
import SmartTable from 'components/SmartTable';
import './index.scss';
interface IProps extends RouteComponentProps<any> {}

export const NotificationsList = (props: IProps) => {
  const onView = (id: string) => {
    const formattedId = id.split('/')[1];
    props.history.push('/client/notifications/' + formattedId, { id });
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'Source',
      dataIndex: 'notificationSource',
      key: 'notificationSource',
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (item: IdNameReference) => {
        if (item !== null) return item.name;
        else return '';
      },
    },
    {
      title: 'Equipment',
      dataIndex: 'equipment',
      key: 'equipment',
      render: (item: DetailedEquipmentReference) => {
        if (item !== null) return item.name;
        else return '';
      },
    },
    {
      title: 'Alerted Users',
      dataIndex: 'alertedUsers',
      key: 'alertedUsers',
      render: (item: UserReference[]) => {
        if (item !== null) return item.map((user: UserReference) => user.email).toString();
        else return '';
      },
    },
  ];

  return (
    <div className="notifications-table">
      <ContainerHeader title="Notifications" subheading="An Administration view of all Notifications." icon="pe-7s-display1 icon-gradient bg-premium-dark" />
      <SmartTable
        columns={columns}
        onView={onView}
        useTableQuery={useNotificationsQuery}
        queryDocument={NotificationsDocument}
        name="notifications"
        paginationTotalTitle="Notifications"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Notifications']}
      />
    </div>
  );
};

export default NotificationsList;
