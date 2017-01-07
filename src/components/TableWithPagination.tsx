import * as React from 'react';
import { SpinProps } from 'antd/lib/spin';
import { Table, Icon } from 'antd';
import './LoadingSpinner/LoadingSpinner.scss';
// import { SettingsContext } from 'contexts/SettingsContext';

const antIcon = <Icon type="reload" spin />;

export interface ITableProps {
  defaultPageSize?: number;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  showQuickJumper?: boolean;
  showSelection?: boolean;
  size?: string;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  spinConfig?: SpinProps;
  showTotal?: React.ReactNode;
  collection?: string;
  paginationTotalTitle?: string;
  position?: 'top' | 'bottom' | 'both' | undefined;
  loading: boolean;
  page: number;
  pageSize: number;
  totalRows: number;
  rowKey: string;
  columns: any[];
  dataSource: any;
  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  onRowSelected?: any;
}

const TableWithPagination = (props: ITableProps) => {
  // const settingsContext = React.useContext(SettingsContext);
  // let columnsToShow = 3;
  // if (props.collection && props.collection === 'users') {
  //   columnsToShow = 2;
  // }

  // if (props.collection && props.collection === 'dealers') {
  //   // for mobile
  //   columnsToShow = 1;
  // }

  // if (settingsContext.values.width < 600) {
  //   // remove columns for smaller screens from the right
  //   if (props.columns.length > columnsToShow) {
  //     const numberOfItemsToDelete = props.columns.length - 1 - columnsToShow;
  //     props.columns.splice(columnsToShow, numberOfItemsToDelete);
  //   }
  // }

  // console.log('JSON.stringify(props.columns, null, 1)', JSON.stringify(props.columns, null, 1));
  const spinDelay = 500;
  const spinnerProps = {
    spinning: props.loading,
    delay: spinDelay,
    indicator: antIcon,
    tip: `Loading${props.collection ? ` ${props.collection}` : ''}...`,
    ...props.spinConfig,
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      props.onRowSelected(selectedRowKeys, selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const rowSelectionProps = {
    rowSelection: rowSelection,
  };

  if (!props.showSelection) delete rowSelectionProps.rowSelection;
  // console.log('props.dataSource', props.dataSource);
  return (
    <>
      <Table
        size="middle"
        bordered={false}
        loading={spinnerProps}
        className={props.className}
        columns={props.columns}
        dataSource={props.dataSource}
        rowKey={props.rowKey}
        rowClassName={(record: any, index: number) => {
          // console.log('record', record);
          if (!record.viewedOn || record.viewedOn === null) return 'grey-row';
          else return 'grey-clear';
        }}
        {...rowSelectionProps}
        style={{ backgroundColor: 'white', borderRadius: 6 }}
        pagination={{
          current: props.page,
          position: props.position ? props.position : 'bottom',
          pageSize: props.pageSize ? props.pageSize : 15,
          total: props.totalRows,
          className: 'ant-pagination ant-table-pagination',
          hideOnSinglePage: true,
          showSizeChanger: props.showSizeChanger ? props.showSizeChanger : true,
          showQuickJumper: props.showQuickJumper ? props.showQuickJumper : true,
          pageSizeOptions: props.pageSizeOptions ? props.pageSizeOptions : ['15', '25', '50'],
          showTotal: (total, range) =>
            props.showTotal ? props.showTotal : `${range[0]}-${range[1]} of ${total}${props.paginationTotalTitle ? ` ${props.paginationTotalTitle}` : ''}`,
          onShowSizeChange: (current: number, size: number) => {
            if (props.onShowSizeChange) props.onShowSizeChange(current, size);
          },
          onChange: (page: number, pageSize?: number) => {
            if (props.onChange) props.onChange(page, pageSize);
          },
        }}
      />
    </>
  );
};

export default TableWithPagination;
