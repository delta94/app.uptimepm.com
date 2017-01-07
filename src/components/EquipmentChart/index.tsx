import React from 'react';
import { Col, Row, Select } from 'antd';
import LineChart from './LineChart';
import { useEquipmentSelectionQuery } from 'generated';
import './index.scss';

const Option = Select.Option;

interface IProps {
  equipmentId?: string;
}
export default (props: IProps) => {
  const { loading, data } = useEquipmentSelectionQuery({ variables: { skip: 0, pageSize: 100, searchText: '' } });
  const [state, setState] = React.useState({
    equipmentId: '',
    name: '',
  });

  React.useEffect(() => {
    if (!loading && data && data.equipment.equipment.length > 0) {
      const first = data.equipment.equipment[0];
      setState({
        ...state,
        equipmentId: props.equipmentId ? props.equipmentId : first.id,
        name: first.name,
      });
    }
    // eslint-disable-next-line
  }, [loading]);

  const onChange = (s: string) => {
    let name = '';
    const foundItem = data!.equipment.equipment.find(x => x.id === s);
    if (foundItem) name = foundItem.name;
    setState({ ...state, equipmentId: s, name: name });
  };

  return (
    <div className="equipmentChart" style={{ height: '300px; !important' }}>
      <>
        {!loading && data && (
          <div>
            <Row type="flex">
              <Col xs={24} sm={12}>
                <h4>Equipment Usage ({state.name})</h4>
              </Col>
              <Col className={props.equipmentId ? 'hidden' : 'equipmentSelect'} xs={24} sm={12}>
                <Select value={state.equipmentId} style={{ minWidth: '250px' }} placeholder="Please select Equipment" onChange={onChange}>
                  {data.equipment.equipment.map(item => (
                    <Option key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row type="flex" gutter={10} className="rowChart">
              <Col xs={24} sm={24}>
                <LineChart equipmentId={state.equipmentId} />
              </Col>
            </Row>
          </div>
        )}
      </>
    </div>
  );
};
