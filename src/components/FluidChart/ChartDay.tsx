import React from 'react';
import { Bar, Legend, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ComposedChart } from 'recharts';
import { useChartDayQuery } from 'generated';
import { Empty } from 'antd';

interface IProps {
  selectedFluids: string[];
  from: any;
  to: any;
}
export default (props: IProps) => {
  const { loading, data } = useChartDayQuery({ variables: { selectedFluids: props.selectedFluids, dateFrom: props.from, dateTo: props.to } });

  const randomColor = () => {
    return '#' + (((1 << 24) * Math.random()) | 0).toString(16);
  };

  const getFluidColor = (chartName: string) => {
    switch (chartName) {
      case 'Antifreeze':
        return '#2f017e';

      case 'Hydraulic Fluid':
        return '#adbc7f';

      case 'Engine Oil':
        return '#dd56a3';

      case 'Diesel':
        return '#2da449';

      default:
        return randomColor();
    }
  };

  if (!loading && props.selectedFluids.length === 0) return <Empty style={{ width: '100%', marginBottom: '50px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <>
      {!loading && data && data.chartDay.chartByDayDataJSON && (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <ComposedChart width={500} height={400} data={JSON.parse(data.chartDay.chartByDayDataJSON)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.chartDay.fluidNames.map(fluidName => {
                return <Bar key={fluidName} dataKey={fluidName} fill={getFluidColor(fluidName)} />;
              })}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};
