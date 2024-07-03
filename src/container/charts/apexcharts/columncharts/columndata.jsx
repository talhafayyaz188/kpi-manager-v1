import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { Button, Row, Spinner } from "react-bootstrap";

export class OrderStatistics extends Component {
  constructor(props) {
    super(props);

    const { orderSeries } = this.props;
    const OrderCount = [
      { name: "Today Orders", data: [orderSeries.today_orders_count] },
      { name: "Total Orders", data: [orderSeries.total_orders] },
      { name: "Success Orders", data: [orderSeries.success_orders] },
      { name: "Canceled Orders", data: [orderSeries.canceled_orders] },
    ];

    const {
      total_orders_stats,
      success_orders_stats,
      canceled_orders_stats,
      today_orders_stats,
    } = orderSeries;

    const Series = [
      {
        name: "Average Price",
        data: [
          today_orders_stats.avg_price,
          total_orders_stats.avg_price,
          success_orders_stats.avg_price,
          canceled_orders_stats.avg_price,
        ],
      },
      {
        name: "Minimum Price",
        data: [
          today_orders_stats.min_price,
          total_orders_stats.min_price,
          success_orders_stats.min_price,
          canceled_orders_stats.min_price,
        ],
      },
      {
        name: "Maximum Price",
        data: [
          today_orders_stats.max_price,
          total_orders_stats.max_price,
          success_orders_stats.max_price,
          canceled_orders_stats.max_price,
        ],
      },
      {
        name: "Total Sum",
        data: [
          today_orders_stats.total_sum,
          total_orders_stats.total_sum,
          success_orders_stats.total_sum,
          canceled_orders_stats.total_sum,
        ],
      },
    ];

    this.state = {
      series: Series || [],
      options: {
        chart: {
          type: "bar",
          height: 320,
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "80%",
          },
        },
        grid: {
          borderColor: "#f2f5f7",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#845adf", "#23b7e5", "#f5b849", "#52AD9C"],
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: OrderCount ? OrderCount.map((data) => data?.name) : [],
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
        yaxis: {
          title: {
            text: "Order Statistics",
            style: {
              color: "#8c9097",
            },
          },
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
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
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
          type="bar"
          height={300}
        />
        <div
          style={{
            padding: "10px",
            borderRadius: 10,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            <span
              style={{
                marginLeft: 5,
              }}
            >
              Today Orders:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {this.props.orderSeries.today_orders_count}
              </span>
            </span>
          </div>
          <div>
            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            <span
              style={{
                marginLeft: 5,
              }}
            >
              Total Orders:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {this.props.orderSeries.total_orders}
              </span>
            </span>
          </div>
          <div>
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <span
              style={{
                marginLeft: 5,
              }}
            >
              Success Orders:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {this.props.orderSeries.success_orders}
              </span>
            </span>
          </div>
          <div>
            <i className="fa fa-ban" aria-hidden="true"></i>
            <span
              style={{
                marginLeft: 5,
              }}
            >
              Canceled Orders:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {this.props.orderSeries.canceled_orders}
              </span>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export class ProductSoldColumn extends Component {
  constructor(props) {
    super(props);
    const { productSeries, category } = this.props;

    const canceled_orders_stats = productSeries
      ?.filter((filter) => filter.category_name.includes(category))
      ?.map((elem) => elem.canceled_orders_stats);

    const canceled_orders_count = productSeries
      ?.filter((filter) => filter.category_name.includes(category))
      ?.map((elem) => elem.canceled_orders_count);

    const [orderCount] = canceled_orders_count;

    const data = productSeries
      ?.filter((filter) => filter.category_name.includes(category))
      ?.map((elem) => elem.manufacturers);

    const [innerData] = data;

    let series = [];
    let uniqueObject = {};

    for (let i in innerData) {
      let objtitle;
      objtitle = innerData[i]["manufacturer"];

      uniqueObject[objtitle] = innerData[i];
    }

    for (let i in uniqueObject) {
      series.push(uniqueObject[i]);
    }

    this.state = {
      series: [
        {
          name: "Sold Count",
          data: series?.map((item) => item.total_sold),
        },
      ],
      canceled_orders_stats: canceled_orders_stats,
      orderCount: orderCount,
      loading: true,
      showOrderState: false,
      options: {
        chart: {
          type: "bar",
          height: 320,
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%",
          },
        },
        grid: {
          borderColor: "#f2f5f7",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#845adf", "#23b7e5", "#f5b849"],
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: series?.map((item) => item.manufacturer),
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
        yaxis: {
          title: {
            text: `${category}`,
            style: {
              color: "#8c9097",
            },
          },
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
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    };
  }

  render() {
    const { showOrderState, canceled_orders_stats, orderCount, loading } =
      this.state;
    return (
      <>
        {this.props.manufacture_category ? (
          <ManufacturerChart
            manufaturerSeries={this.props.productSeries}
            category={this.props.category}
            manfacturer_category={this.props.manufacture_category}
          />
        ) : (
          <>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={300}
            />
            <Row
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {this.props.productSeries
                ?.filter((item) => {
                  return item.category_name.includes(this.props.category);
                })
                .map((element, index) => (
                  <div
                    className="d-flex justify-content-evenly mb-3"
                    key={index}
                  >
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                      <span
                        style={{
                          marginLeft: 5,
                        }}
                      >
                        Total Sold Count:{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {element.total_sold}
                        </span>
                      </span>
                    </div>
                    <div>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                      <span
                        style={{
                          marginLeft: 5,
                        }}
                      >
                        Success Orders:{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {element.success_orders_count}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
            </Row>
          </>
        )}

        <div className="mb-2">
          {showOrderState ? (
            <Button
              size="sm"
              variant="light"
              onClick={() => {
                this.setState({ showOrderState: !showOrderState });
                this.setState({ loading: !loading });
              }}
            >
              Hide Canceled Orders
            </Button>
          ) : (
            <Button
              size="sm"
              variant="light"
              onClick={() => {
                this.setState({ showOrderState: !showOrderState });
                setTimeout(() => {
                  this.setState({ loading: !loading });
                }, 400);
              }}
            >
              Click to show Canceled Orders
            </Button>
          )}
        </div>

        {showOrderState ? (
          <>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h6
                style={{
                  fontSize: "0.85rem",
                }}
                className="font-medium"
              >
                Chart for Category that is selected{" "}
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {this.props.category}
                </span>
              </h6>
            </div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <OrderStateProductSold
                orderSeries={canceled_orders_stats}
                orderCount={orderCount}
              />
            )}
          </>
        ) : null}
      </>
    );
  }
}
