import React from 'react';
import { Legend, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useChartEquipmentDayQuery } from 'generated';
import {  Spin, Icon } from 'antd';
const antIcon = <Icon type="reload" spin />;

interface IProps {
  equipmentId: string;
}
export default (props: IProps) => {
  const { loading, data } = useChartEquipmentDayQuery({ variables: { equipmentId: props.equipmentId } });

  if (loading) return <Spin size="large" indicator={antIcon} style={{ width: '100%', height: 290, paddingTop:130 }} />;

  return (
    <>
      {!loading && data && (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data!.chartEquipmentDay.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actualUsage" name="Actual Usage" stroke="#4185f4" activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="estimateUsage" name="Estimated Usage" stroke="#90caf9" strokeWidth={1} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};
