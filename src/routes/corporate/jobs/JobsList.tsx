import React from 'react';
import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import { Job, useJobsQuery, JobsDocument, UserReference, DetailedEquipmentReference, IdNameReference, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';
interface IProps extends RouteComponentProps<any> {}

export const JobsList = (props: IProps) => {
  const onAdd = () => {
    props.history.push('/corporate/jobs/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/corporate/${id}`, { id });
  };

  const columns: ColumnProps<Job>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (item: IdNameReference, row: Job) => {
        if (item !== null) return item.name;
        else return '';
      }
    },
    {
      title: 'Job Number',
      dataIndex: 'jobNumber',
      key: 'jobNumber'
    },
    {
      title: 'Foreman',
      dataIndex: 'foreman',
      key: 'foreman',
      render: (item: UserReference, row: Job) => {
        if (item !== null) return item.firstName + ' ' + item.lastName;
        else return '';
      }
    },
    {
      title: 'Equipment',
      dataIndex: 'equipment',
      key: 'equipment',
      render: (item: DetailedEquipmentReference[], row: Job) => {
        if (item !== null) return item.length;
        else return '';
      }
    }
  ];

  return (
    <React.Fragment>
      <ContainerHeader
        title="Jobs"
        subheading="An Administration view of all Jobs."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Job
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useJobsQuery}
        queryDocument={JobsDocument}
        name="jobs"
        paginationTotalTitle="Jobs"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Jobs']}
      />
    </React.Fragment>
  );
};

export default JobsList;
