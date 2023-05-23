import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [series, setSeries] = useState([60, 70, 80, 90, 100, 50, 70]);

  const options = {
    labels: [
      "多肉植物",
      "瓶中生態",
      "乾燥花",
      "DIY材料",
      "期間限定",
      "線上手作",
      "實體教學",
    ],
    theme: {
      palette: "palette4",
      monochrome: {
        enabled: true,
        color: "#5AAB8E",
        shadeTo: "light",
        shadeIntensity: 0.75,
      },
      colors: [
        "#5AAB8E",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
      ],
      labels: {
        colors: ["#333"],
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 600,
      },
    },

    chart: {
      width: 380,
      height: 450,

      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: "70%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "13px",
            },
            value: {
              show: true,
              fontSize: "30px",
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "right",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: -40,
      offsetY: 0,

      labels: {
        colors: "#006D1F",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 8,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    title: {
      text: "產品分類銷售數據",
      style: {
        fontSize: "16px",
        color: "#434141",
        letterSpacing: "0.3rem",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart" className="px-20 mt-8 h-[360px]">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width={450}
        height={360}
      />
    </div>
  );
};
export default PieChart;
