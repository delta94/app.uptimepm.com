import { Button } from 'antd';
import React from 'react';
import { ExecutionResult } from 'react-apollo';
import { ColumnProps } from 'antd/lib/table';
import { RouteComponentProps } from 'react-router-dom';
import ContainerHeader from 'components/ContainerHeader';
import { camelCaseIdToDash } from 'helpers/utils';
import {
  InspectionTemplate,
  useInspectionTemplatesQuery,
  InspectionTemplatesDocument,
  useCloneInspectionTemplateMutation,
  CloneInspectionTemplateMutation,
  RoleTypeEnum,
} from 'generated';
import SmartTable from 'components/SmartTable';

interface IInspectionListProps extends RouteComponentProps<any> {
  onEdit: (id: string) => void;
}
interface ICloneResponse {
  cloneInspectionTemplate: InspectionTemplate;
}

export const InspectionList = (props: IInspectionListProps) => {
  const [cloneInspectionTemplate] = useCloneInspectionTemplateMutation();

  const onAdd = () => {
    props.history.push('/client/inspection-templates/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/client/${camelCaseIdToDash(id)}`, { id });
  };

  const onClone = async (id: string) => {
    // console.log(id);
    let result: void | ExecutionResult<CloneInspectionTemplateMutation>;
    result = await cloneInspectionTemplate({ variables: { id } });
    if (result && result.data) {
      id = result.data.cloneInspectionTemplate.id as string;
      props.history.push(`/client/${camelCaseIdToDash(id)}`, { id });
    }
  };

  const columns: ColumnProps<InspectionTemplate>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Items Count',
      dataIndex: 'checklist',
      key: 'checklist',
      render: (text, item) => {
        if (item) {
          return item.checklist.length;
        }
      },
    },
    {
      title: 'Equipment Type',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
      key: 'classification',
    },
    {
      title: 'Attachment',
      dataIndex: 'attachment',
      key: 'attachment',
    },
  ];

  return (
    <>
      <ContainerHeader
        title="Inspection Templates"
        subheading="An Administration view of all Inspection Templates across all clients."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Inspection Template
          </Button>
        }
      />

      <SmartTable
        columns={columns}
        onEdit={onEdit}
        onClone={onClone}
        useTableQuery={useInspectionTemplatesQuery}
        queryDocument={InspectionTemplatesDocument}
        name="inspectionTemplates"
        paginationTotalTitle="Inspection Templates"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Inspection Templates']}
      />
    </>
  );
};

export default InspectionList;
