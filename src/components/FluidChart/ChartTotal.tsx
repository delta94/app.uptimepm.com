import React from 'react';
import { Bar, Legend, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ComposedChart } from 'recharts';
import { useChartTotalQuery } from 'generated';

export default () => {
  const { loading, data } = useChartTotalQuery();

  return (
    <>
      {!loading && data && data.chartTotal.chartData && (
        <>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart width={500} height={400} data={data && data.chartTotal.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fluid" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" name="Amount" fill="#2ea449" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </>
  );
};
