import React, { useContext } from 'react';
import { ColumnProps } from 'antd/lib/table';
import TableWithPagination from '../TableWithPagination';
import TableRowActions from '../Forms/TableRowActions';
import { useDeleteMutation, RoleTypeEnum } from 'generated';
import moment from 'moment';
import './index.scss';
import SmartSearch from '../SmartSearch';
import { separateCapitalLetter, capitalizeFirstLetter } from 'helpers/utils';
import { allowedWithAnyPrivileges } from 'components/Routes/Access';
import { CurrentUserContext } from 'contexts/CurrentUserContext';

interface IProps {
  onEdit?(id: string): void;
  onClone?(id: string): void;
  onView?(id: string): void;
  columns: ColumnProps<any>[];
  useTableQuery: any;
  idQuery?: string;
  completed?: boolean;
  equipmentId?: string;
  queryDocument: any;
  name: string;
  paginationTotalTitle?: string;
  hideActionsColumn?: boolean;
  showChart?: boolean;
  showUpdated?: boolean;
  showCreatedOn?: boolean;
  showCompletedOn?: boolean;
  showSelection?: boolean;
  onRowSelected?: any;
  roles?: string[];
  roleType?: RoleTypeEnum;
  permissions?: string[];
}

export default (props: IProps) => {
  document.title = 'UPM :: ' + separateCapitalLetter(capitalizeFirstLetter(props.name));
  const userContext = useContext(CurrentUserContext);
  const { columns, useTableQuery } = props;
  const [state, setState] = React.useState({ page: 1, skip: 0, pageSize: 15, searchText: '', searchView: '', loading: false });
  const { fetchMore, loading, data } = useTableQuery({
    fetchPolicy: 'network-only',
    variables: {
      skip: 0,
      pageSize: state.pageSize,
      searchText: state.searchText,
      id: props.idQuery,
      completed: props.completed,
      equipmentId: props.equipmentId,
    },
  });
  const [deleteMutation] = useDeleteMutation();

  if (props.showUpdated) {
    columns.push({
      title: 'Updated',
      dataIndex: 'updatedOn',
      key: 'updatedOn_' + props.name,
      render: item => {
        if (item) {
          return moment(item).format('MMM D');
        }
      },
    });
  }

  if (props.showCreatedOn) {
    columns.push({
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn_' + props.name,
      render: item => {
        if (item) {
          return moment(item).format('MMM D');
        }
      },
    });
  }

  if (props.showCompletedOn) {
    console.log('pushing completed on');
    columns.push({
      title: 'Completed',
      dataIndex: 'completedOn',
      key: 'completedOn_' + props.name,
      render: item => {
        if (item) {
          return moment(item).format('MMM D');
        }
      },
    });
  }

  if (!props.hideActionsColumn) {
    const exists = columns.find(x => x.title === 'Actions');
    if (!exists && allowedWithAnyPrivileges(userContext.user, props.roles, props.roleType, props.permissions, ['Edit', 'Delete', 'Clone', 'Export'])) {
      columns.push({
        title: 'Actions',
        key: 'id',
        width: 100,
        align: 'center',
        render: (id: unknown, row: any) => (
          <TableRowActions
            rowKey={row.id as string}
            onView={props.onView}
            onEdit={props.onEdit}
            onDelete={onDelete}
            onClone={props.onClone}
            roles={props.roles}
            roleType={props.roleType}
            permissions={props.permissions}
          />
        ),
      });
    }
  }

  const onDelete = async (id: string) => {
    // console.log(id);
    await deleteMutation({
      variables: { id },
      refetchQueries: [
        {
          query: props.queryDocument,
          variables: { skip: state.skip, pageSize: state.pageSize, searchText: state.searchText },
        },
      ],
    });
  };

  const onShowSizeChange = (current: number, pageSize: number) => {
    // console.log('current', current, pageSize);
    setState({ ...state, pageSize });
  };

  const onChange = (page: number, pageSize?: number) => {
    const pageSizeNew = pageSize ? pageSize : 15;
    const skipCalculated = (page - 1) * pageSizeNew;
    setState({ ...state, loading: true, page });
    fetchMore({
      variables: { pageSize: state.pageSize, skip: skipCalculated, searchText: state.searchText },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        setState({ ...state, loading: false, skip: skipCalculated, page });
        return { ...prev, [props.name]: { ...fetchMoreResult[props.name] } };
      },
    });
  };

  const handleChangeSearch = (s: string) => {
    console.log(s);
    setState({ ...state, searchText: s });
  };

  const { page, pageSize } = state;

  // const getLoading = () => {
  //   if (loading) {
  //     return loading;
  //   } else {
  //     return state.loading;
  //   }
  // };

  // console.log('[SmartTable] JSON.stringify(props.columns, null, 1)', JSON.stringify(props.columns, null, 1));

  return (
    <>
      <SmartSearch onChange={handleChangeSearch} />
      <TableWithPagination
        className="table-pagination"
        loading={loading}
        page={page}
        pageSize={pageSize}
        totalRows={data && data[props.name] ? data[props.name].totalRows : 0}
        columns={columns}
        dataSource={data && data[props.name] ? data[props.name][props.name] : []}
        rowKey="id"
        position="both"
        collection={props.name}
        paginationTotalTitle={props.paginationTotalTitle}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
        showSelection={props.showSelection}
        onRowSelected={props.onRowSelected}
      />
      <br />
    </>
  );
};
