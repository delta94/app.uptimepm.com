import React from 'react';
import { Bar, Legend, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ComposedChart } from 'recharts';
import { useChartInspectionQuery } from 'generated';

export default () => {
  const { loading, data } = useChartInspectionQuery();
  return (
    <>
      {!loading && data && data.chartInspection.chartData && (
        <>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart width={500} height={400} data={data && data.chartInspection.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="firstName" width={100} />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="firstName" fill="#343d45" label={true} name="Name" />
                <Bar dataKey="total" fill="#2ea449" name="Total" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </>
  );
};
