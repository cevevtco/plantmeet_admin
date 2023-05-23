import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const [series, setSeries] = useState([
    {
      name: "銷售數量",
      data: [
        20, 30, 50, 70, 50, 70, 60, 100, 125, 95, 140, 120, 165, 145, 145,
        140, 150, 160,
      ],
    },
  ]);

  const options = {
    chart: {
      height: 350,
      type: "line",
    },
    forecastDataPoints: {
      count: 5,
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/11/2000",
        "2/11/2000",
        "3/11/2000",
        "4/11/2000",
        "5/11/2000",
        "6/11/2000",
        "7/11/2000",
        "8/11/2000",
        "9/11/2000",
        "10/11/2000",
        "11/11/2000",
        "12/11/2000",
        "1/11/2001",
        "2/11/2001",
        "3/11/2001",
        "4/11/2001",
        "5/11/2001",
        "6/11/2001",
      ],
      tickAmount: 10,
      labels: {
        formatter: function (value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), "dd MMM");
        },
      },
    },
    title: {
      text: "銷售數據",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#434141",
        letterSpacing: "0.3rem",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    yaxis: {
      min: 0,
      max: 200,
    },
  };

  return (
    <div id="chart" className="px-5 mt-8 ">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default LineChart;
