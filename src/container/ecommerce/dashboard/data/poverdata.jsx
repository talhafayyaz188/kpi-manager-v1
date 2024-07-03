import React from "react";
import ReactApexChart from "react-apexcharts";

export class OrderTimeLine extends React.Component {
  constructor(props) {
    super(props);

    const { orderData } = this.props;

    const categories = orderData.map((data) => data.date);
    const seriesData = orderData.map((data) => data.order_count);

    this.state = {
      series: [
        {
          name: "Order_count",
          type: "area",
          data: seriesData,
        },
        // {
        //     name: 'Offline',
        //     type: 'line',
        //     data: [33, 65, 54, 99, 60, 48, 82, 57, 95, 46, 82, 67]
        // }
      ],
      options: {
        chart: {
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
          height: 305,
          type: "line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.15,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [2, 2],
          curve: "smooth",
          dashArray: [0, 8],
        },
        colors: ["rgb(74, 119, 240)", "#fdc530"],
        title: {
          align: "left",
          style: {
            fontSize: "13px",
            fontWeight: "bold",
            color: "#8c9097",
          },
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "center",
          fontWeight: 600,
          fontSize: "12px",
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
          labels: {
            colors: "#74767c",
          },
          markers: {
            width: 9,
            height: 9,
            strokeWidth: 0,
            radius: 12,
            offsetX: 0,
            offsetY: 0,
          },
        },
        markers: {
          discrete: [
            {
              seriesIndex: 0,
              dataPointIndex: 7,
              fillColor: "#fff",
              strokeColor: "var(--primary-09)",
              size: 5,
              shape: "circle",
            },
            {
              seriesIndex: 1,
              dataPointIndex: 2,
              fillColor: "#fff",
              strokeColor: "#fdc530",
              size: 5,
              shape: "circle",
            },
            {
              seriesIndex: 1,
              dataPointIndex: 6,
              fillColor: "#fff",
              strokeColor: "#fdc530",
              size: 5,
              shape: "circle",
            },
          ],
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: categories,
          labels: {
            show: true,
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-label",
            },
            rotate: -90,
          },
          axisBorder: {
            show: false,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          show: true,
          borderColor: "rgba(119, 119, 142, 0.1)",
          strokeDashArray: 4,
        },
        fill: {
          type: ["gradient", "solid"],
          opacity: [0.05, 1],
          gradient: {
            inverseColors: false,
            shade: "dark",
            type: "vertical",
            opacityFrom: 0.3,
            opacityTo: 0.2,
            stops: [0, 100],
          },
        },
      },
    };
  }

  render() {
    return (
      <>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </>
    );
  }
}

export class TrafficReportChart extends React.Component {
  constructor(props) {
    super(props);

    const { trafficData, selectedMetrics } = this.props;

    // console.log(trafficData);

    const labels = trafficData?.records?.map((record) => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const dateString = record.dimensionValues[0].value;
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);

      const date = new Date(year, month - 1, day);
      const formattedDate = `${date.getDate()} ${
        monthNames[date.getMonth()]
      } ${date.getFullYear()}`;

      return formattedDate;
    });

    const sortedDates = labels
      ?.map((dateString) => new Date(dateString))
      .sort((a, b) => a.getTime() - b.getTime())
      .map((date) => date.toDateString());

    const formattedDates = sortedDates?.map((dateString) => {
      const parts = dateString.split(" ");
      return ` ${parts[2]} ${parts[1]} ${parts[3]}`;
    });

    const foundItem = trafficData?.header?.metrics?.find(
      (item) => item.key === selectedMetrics
    );

    const result = {
      key: foundItem && foundItem.key,
      index: foundItem && trafficData?.header?.metrics?.indexOf(foundItem),
    };
    const filterRecordMetrices = trafficData?.records?.map((item) => {
      return item.metricValues[result.index]?.value;
    });
    const data = trafficData?.records?.map((record) => {
      const metricValue = record?.metricValues?.find(
        (metric) => metric.applicable
      );
      return metricValue?.value || 0;
    });

    this.state = {
      series: [
        {
          type: "area",
          name: selectedMetrics
            ? trafficData?.header?.metrics?.find(
                (metric) => metric.key === selectedMetrics
              )?.localizedName
            : "Stock_ABC",
          data: selectedMetrics ? filterRecordMetrices : data,
        },
      ],
      options: {
        chart: {
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
          height: 305,
          type: "line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.15,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [2, 2],
          curve: "smooth",
          dashArray: [0, 8],
        },
        colors: ["rgb(74, 119, 240)", "#fdc530"],
        title: {
          align: "left",
          style: {
            fontSize: "13px",
            fontWeight: "bold",
            color: "#8c9097",
          },
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "center",
          fontWeight: 600,
          fontSize: "12px",
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
          labels: {
            colors: "#74767c",
          },
          markers: {
            width: 9,
            height: 9,
            strokeWidth: 0,
            radius: 12,
            offsetX: 0,
            offsetY: 0,
          },
        },
        markers: {
          discrete: [
            {
              seriesIndex: 0,
              dataPointIndex: 7,
              fillColor: "#fff",
              strokeColor: "var(--primary-09)",
              size: 5,
              shape: "circle",
            },
            {
              seriesIndex: 1,
              dataPointIndex: 2,
              fillColor: "#fff",
              strokeColor: "#fdc530",
              size: 5,
              shape: "circle",
            },
            {
              seriesIndex: 1,
              dataPointIndex: 6,
              fillColor: "#fff",
              strokeColor: "#fdc530",
              size: 5,
              shape: "circle",
            },
          ],
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: formattedDates,
          labels: {
            show: true,
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-label",
            },
            rotate: -90,
          },
          axisBorder: {
            show: false,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          show: true,
          borderColor: "rgba(119, 119, 142, 0.1)",
          strokeDashArray: 4,
        },
        fill: {
          type: ["gradient", "solid"],
          opacity: [0.05, 1],
          gradient: {
            inverseColors: false,
            shade: "dark",
            type: "vertical",
            opacityFrom: 0.3,
            opacityTo: 0.2,
            stops: [0, 100],
          },
        },
      },
    };
  }

  render() {
    return (
      <>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </>
    );
  }
}
