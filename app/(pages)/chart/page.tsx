"use client";
import { FC } from "react";
import { Chart as Gauge } from "react-google-charts";

const Chart: FC = ({}) => {
  const data = [
    ["Label", "Value"],
    ["Igor Gay", 100],
  ];

  const options = {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
  };

  return (
    <div>
      <Gauge
        chartType="Gauge"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default Chart;
