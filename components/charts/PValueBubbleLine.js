import React from 'react';

import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  ZAxis, 
  Cell,
  ResponsiveContainer } from 'recharts';


export default function PValueBubbleLine(props) {
	// return (
	// 	<ResponsiveContainer width="99%" height={60}>
 //      <ScatterChart
 //        margin={{
 //          top: 20,
 //          right: 0,
 //          bottom: -10,
 //          left: 0,
 //        }}>
 //        <XAxis
 //          type="category"
 //          dataKey="x_key"
 //          interval={0}
 //          tick={{ fontSize: 0 }}
 //          tickLine={{ transform: 'translate(0, -6)' }}
 //        />
 //        <YAxis
 //          type="number"
 //          dataKey="y_key"
 //          tick={false}
 //          tickLine={false}
 //          axisLine={false}
 //        />
 //        <ZAxis type="number" dataKey="z_key" range={[0,150]} domain={[0,10]} scale='auto' />
 //        <Scatter data={props.data} fill="#8884d8">
 //          {props.data.map((entry, index) => (
 //            <Cell key={`cell-${index}`} fill={entry.fill} />
 //          ))}
 //        </Scatter>
 //      </ScatterChart>
 //    </ResponsiveContainer>
	// );

  return (
    <ResponsiveContainer width="99%" height={60}>
      <BarChart data={props.data}>
        <XAxis
          height={20}
          tickFormatter={(x) => x + 1}
          ticks={[0, 9]}
          datakey="x"/>
        <Bar dataKey={"count"} barSize={10}/>
      </BarChart>
    </ResponsiveContainer>
  );
}

