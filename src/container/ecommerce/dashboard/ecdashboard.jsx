import { useEffect, useRef, useState } from "react";
import Pageheaderecommerce from "../../../components/common/pageheader/ecommercepageheader";
import {
  Alert,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import React from "react";
import {
  OrderStatistics,
  ProductSoldColumn,
} from "../../charts/apexcharts/columncharts/columndata";
import DatePicker from "react-datepicker";
import img7 from "../../../assets/images/media/7.jpg";
import { OrderTimeLine, TrafficReportChart } from "./data/poverdata";

import { Gradientcircle } from "../../charts/apexcharts/radialbarcharts/radialbardata";
import toast from "react-hot-toast";

const Ecdashboard = () => {
  //token
  const token = localStorage.getItem("token");
  // Store Limits KPI-> Module
  const [loadStoreLimit, setloadStoreLimit] = useState(false);
  const [sellingLimit, setsellingLimit] = useState(null);
  const StoreLimit = async () => {
    setloadStoreLimit(true);
    try {
      const response = await fetch(
        "https://datapanel.x10car.parts/privileges/",
        {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await response.json();
      const { sellingLimit } = data;
      const { quantity, amount } = sellingLimit;
      if (response.ok) {
        setsellingLimit({ amount, quantity });
        setloadStoreLimit(false);
      } else {
        toast.error("Error fetcing data");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    StoreLimit();
  }, []);
  const market_place_category = [
    "ebay_us",
    "ebay_de",
    "ebay_uk",
    "ebay_au",
    "ebay_es",
    "ebay_fr",
    "ebay_gb",
    "ebay_it",
  ];
  const [metrices, setmetrices] = useState("");
  const [selectedMetrics, setselectedMetrics] = useState("");
  const [start_date_traffic, setStart_date_traffic] = useState(null);
  const [end_date_traffic, setEnd_date_traffic] = useState(null);
  const [market_place, setMarket_place] = useState("");
  const [select_traffic_date, setSelect_traffic_date] = useState("");
  const [apiCalled, setApiCalled] = useState(false);
  const [loadTrafficData, setLoadTrafficData] = useState(false);
  const [trafficData, setTrafficData] = useState(null);
  const [enable_traffic_dropdown, setenable_traffic_dropdown] = useState(false);
  // Traffic Report API
  const handleTrafficReportAPI = async (startDate, endDate, market_place) => {
    setLoadTrafficData(true);
    try {
      const start_date = `${startDate.getFullYear()}${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${startDate.getDate().toString().padStart(2, "0")}`;

      const end_date = `${endDate.getFullYear()}${(endDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${endDate.getDate().toString().padStart(2, "0")}`;

      // console.log("state", start_date);
      // console.log("enddare", end_date);

      const response = await fetch(
        `https://datapanel.x10car.parts/kpis/get_traffic_report?start_date=${start_date}&end_date=${end_date}&marketplace_ids=${market_place.toUpperCase()}&dimension=day&metric=LISTING_IMPRESSION_SEARCH_RESULTS_PAGE,LISTING_IMPRESSION_STORE,LISTING_IMPRESSION_TOTAL,LISTING_VIEWS_SOURCE_SEARCH_RESULTS_PAGE,LISTING_VIEWS_SOURCE_STORE,LISTING_VIEWS_SOURCE_DIRECT,LISTING_VIEWS_TOTAL,TRANSACTION,CLICK_THROUGH_RATE,SALES_CONVERSION_RATE`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);

      setTrafficData(data);
      setenable_traffic_dropdown(true);
      setLoadTrafficData(false);
    } catch (error) {
      toast.error(error);
      // console.log(error);
    }
  };

  // when user load the page api called at once and load past 7 day data
  if (!apiCalled) {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    setSelect_traffic_date("Past 7 days");
    setMarket_place("ebay_de");
    setmetrices("Listing impressions from the search results page");
    setselectedMetrics("LISTING_IMPRESSION_SEARCH_RESULTS_PAGE");
    handleTrafficReportAPI(startDate, endDate, "EBAY_DE");
    setApiCalled(true);
  }

  // Sales Item
  const [loadSaleItems, setloadSaleItems] = useState(false);
  const [searchSale, setsearchSale] = useState("");
  const inputRef = useRef(null);
  const [reloadTable, setreloadTable] = useState(false);
  const [sortby, setSortby] = useState("");
  const [disabled, setdisabled] = useState(false);
  const [startDateSaleItems, setStartDateSaleItems] = useState(null);
  const [endDateSaleItems, setEndDateSaleItems] = useState(null);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectDate, setSelectDate] = useState(null);
  const [ErrorSaleItems, setErrorSaleItems] = useState("");
  const [DateErrorSale, setDateErrorSale] = useState("");
  const [saleItemData, setSaleItemData] = useState(null);
  const [showManufacturer, setshowManufacturer] = useState(false);
  const [selectManufacturer, setSelectManufacturer] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [DateSelected, setDateSelected] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 20;
  const lastindex = currentPage * recordPerPage;
  const firstIndex = lastindex - recordPerPage;

  const [MonthStart, setMonthStart] = useState(null);
  const [MonthEnd, setMonthEnd] = useState(null);
  const [DayStart, setDayStart] = useState(null);
  const [DayEnd, setDayEnd] = useState(null);

  const handleReloadTable = () => {
    setreloadTable(true);
    setTimeout(() => {
      setreloadTable(false);
    }, 1000);
  };

  // Sales Item
  const SaleItemsAPI = async (start_date, end_date) => {
    setloadSaleItems(true);
    setShowChart(false);
    setdisabled(false);
    if (start_date === null || end_date === null) {
      toast.error("Please select date first!");
      setloadSaleItems(false);
      return;
    } else if (start_date > end_date) {
      toast.error("Start date cannot be after end date.");
      setloadSaleItems(false);
      setSelectDate("");
      return;
    } else {
      setDateErrorSale("");
      const date1 = new Date(start_date);
      const startdate = `${date1.getFullYear()}-${(date1.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date1.getDate().toString().padStart(2, "0")}`;

      const date2 = new Date(end_date);
      const enddate = `${date2.getFullYear()}-${(date2.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date2.getDate().toString().padStart(2, "0")}`;

      setDateSelected(`From ${startdate} to ${enddate}`);

      const response = await fetch(
        `https://datapanel.x10car.parts/kpis/products_sold_by_category?start_date=${startdate}&end_date=${enddate}`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);

      if (data.length === 0) {
        setloadSaleItems(false);
        setErrorSaleItems("No Data Existed");
        toast.error("No Data Existed");
      } else {
        setSaleItemData(data);
        setdisabled(true);
        setloadSaleItems(false);
      }
    }
  };

  const [ManufacturersData, setManufacturersData] = useState([]);
  const [SearchModelData, setSearchModelData] = useState([]);

  useEffect(() => {
    selectCategory
      ? saleItemData
          ?.filter((item) => item.category_name.includes(selectCategory))
          ?.map((manufacturer) => setManufacturersData(manufacturer))
      : saleItemData;
  }, [selectCategory]);

  const [isHas, setIsHas] = useState(false);

  const handleModelCall = (searchKey) => {
    let filteredData = [];

    // console.log(searchKey);

    // const data = ManufacturersData?.manufacturers?.filter((item: any) =>
    //   item.model.some((modelItem: any) =>
    //     modelItem.toLowerCase().includes(searchKey.toLowerCase())
    //   )
    // );

    // console.log(data);

    // if (data.length === 0) {
    //   return null;
    // } else {
    //   const actualModelNames: string[] = [];
    //   data.forEach((item: any) => {
    //     item.model.forEach((model: any) => {
    //       const models = model.split(",");
    //       models.forEach((m: any) => {
    //         if (m.toLowerCase() === searchKey.toLowerCase()) {
    //           actualModelNames.push(m);
    //         }
    //       });
    //     });
    //   });

    //   console.log(actualModelNames);

    //   // console.log(actualModelNames);

    //   // Aggregate data for the specified model
    //   const aggregatedData: any = {
    //     manufacturer: data[0].manufacturer,
    //     model: Array.from(new Set(actualModelNames)),
    //     total_sold: 0,
    //     success_orders_count: 0,
    //     canceled_orders_count: 0,
    //   };

    //   data.forEach((item: any) => {
    //     aggregatedData.total_sold += item.total_sold;
    //     aggregatedData.success_orders_count += item.success_orders_count;
    //     aggregatedData.canceled_orders_count += item.canceled_orders_count;
    //   });

    //   filteredData.push(aggregatedData);
    //   console.log(filteredData);
    //   setSearchModelData(filteredData);
    // }

    filteredData = ManufacturersData?.manufacturers?.filter((item) =>
      item.model.some((modelItem) =>
        modelItem.toLowerCase().includes(searchKey.toLowerCase())
      )
    );

    // console.log(filteredData);

    if (!filteredData || filteredData.length === 0) {
      setIsHas(false);
      return null;
    } else {
      setIsHas(true);
      const actualModelNames = [];
      filteredData.forEach((item) => {
        item.model.forEach((model) => {
          const models = model.split(",");
          models.forEach((m) => {
            if (m.toLowerCase().includes(searchKey.toLowerCase())) {
              actualModelNames.push(m);
            }
          });
        });
      });

      // console.log(actualModelNames);

      const processModelNames = (modelNamesArray) => {
        const uniqueModelNames = Array.from(new Set(modelNamesArray));

        if (uniqueModelNames.length === 1) {
          return uniqueModelNames[0];
        } else {
          return modelNamesArray.join(", ");
        }
      };

      const modelNames = processModelNames(actualModelNames);
      // console.log(modelNames);

      // Aggregate data for the specified model
      const aggregatedData = {
        manufacturer: filteredData[0].manufacturer,
        model: modelNames,
        total_sold: 0,
        success_orders_count: 0,
        canceled_orders_count: 0,
      };

      filteredData.forEach((item) => {
        item.model.forEach((model) => {
          if (model.toLowerCase().includes(searchKey.toLowerCase())) {
            aggregatedData.total_sold += item.total_sold;
            aggregatedData.success_orders_count += item.success_orders_count;
            aggregatedData.canceled_orders_count += item.canceled_orders_count;
          }
        });
      });

      // console.log(aggregatedData);
      setSearchModelData([aggregatedData]);
    }

    // console.log(uniqueMergedData);
  };

  // Order Timeline KPI Module
  const [loadOrderTData, setloadOrderTData] = useState(false);
  const [disabled2, setdisabled2] = useState(false);
  const [startDateOrderTimeline, setStartDateOrderTimeline] = useState(null);
  const [endDateOrderTimeline, setEndOrderTimeline] = useState(null);
  const orderType = [
    {
      value: "Success",
    },
    {
      value: "Canceled",
    },
  ];
  const [selectType, setSelectType] = useState(null);

  const [select_Date, setSelect_Date] = useState(null);
  const [ErrorOrderTimeline, setErrorOrderTimeLine] = useState("");
  // const [DateError, setDateError] = useState("");
  const [orderTimelineData, setOrderTimelineData] = useState(null);
  const [show_Chart, setShow_Chart] = useState(false);
  // Order timeline
  const OrderTimelineAPI = async (startdate, enddate, orderType) => {
    setloadOrderTData(true);
    setShow_Chart(false);

    if (startdate !== null && enddate !== null && orderType === null) {
      setloadOrderTData(false);
      return;
    } else {
      const date1 = new Date(startdate);
      const date2 = new Date(enddate);
      const start_date = `${date1.getFullYear()}-${(date1.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date1.getDate().toString().padStart(2, "0")}`;
      const end_date = `${date2.getFullYear()}-${(date2.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date2.getDate().toString().padStart(2, "0")}`;

      const response = await fetch(
        `https://datapanel.x10car.parts/kpis/order_statistics/timeline?start_date=${start_date}&end_date=${end_date}&order_type=${orderType.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.length === 0) {
        setloadOrderTData(false);
        setErrorOrderTimeLine("No Data Existed");
        toast.error("No Data Existed");
      } else {
        setOrderTimelineData(data);
        setdisabled2(true);
        setShow_Chart(true);
        setloadOrderTData(false);
      }
    }
  };

  // Order Statistic KPI Module
  const [loadOrderdata, setLoadOrderData] = useState(true);
  const [errorStatisticData, setErrorStatisticData] = useState();
  const [orderStatisticData, setOrderStatisticData] = useState(null);

  //Order Statistic -> KPI
  const handleStatistic = async () => {
    try {
      const response = await fetch(
        "https://datapanel.x10car.parts/kpis/order_statistics/",
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await response.json();
      setOrderStatisticData(data);
    } catch (e) {
      setErrorStatisticData(e);
    } finally {
      setLoadOrderData(false);
    }
  };

  const LoadingUIForSmallCards = (length) => {
    const loading = [];
    for (let i = 0; i < length; i++) {
      loading.push(
        <Col key={i}>
          <Card>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return loading;
  };

  useEffect(() => {
    handleStatistic();
  }, []);

  const tableData = [
    {
      id: "316772888",
      rank: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis eget neque a posuere",
      image: "url",
      qualitysold: 244,
    },
    {
      id: "316772666",
      rank: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis eget neque a posuere",
      image: "url",
      qualitysold: 232,
    },
  ];

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (inputRef.current) {
        setsearchSale(inputRef.current.value);
        // console.log("Search value:", inputRef.current.value);
        handleModelCall(inputRef.current.value);
      }
    }
  };

  return (
    <React.Suspense fallback>
      <Pageheaderecommerce
        title="X-10 Reports KPI"
        heading="KPI Reports"
        active="Dashboard"
      />
      <div className="main-container container-fluid">
        {loadOrderdata ? (
          <Row>{LoadingUIForSmallCards(4)}</Row>
        ) : (
          <Row>
            {/* Today Orders */}
            <Col>
              <Card>
                <Card.Body>
                  <h6 className="mb-3 text-start">
                    Today Orders
                    <span className="badge badge-success-light float-end">
                      <i className="fa fa-plus-square" aria-hidden="true"></i>
                    </span>
                  </h6>
                  <h2 className="d-flex align-items-center justify-content-between">
                    <i className="bi bi-cart3 text-primary avatar avatar-md bg-primary-transparent br-5 fs-18"></i>
                    <span>{orderStatisticData?.today_orders_count}</span>
                  </h2>
                  <h6 className="font-weight-normal mb-0 fs-14 text-muted text-start">
                    Total Price
                    <span className="float-end">
                      {orderStatisticData?.today_orders_stats?.total_sum}
                    </span>
                  </h6>
                </Card.Body>
              </Card>
            </Col>
            {/* Total Orders */}
            <Col>
              <Card>
                <Card.Body>
                  <h6 className="mb-3 text-start">
                    Total Orders
                    <span className="badge badge-success-light float-end">
                      <i className="fa fa-plus-square" aria-hidden="true"></i>
                    </span>
                  </h6>
                  <h2 className="d-flex align-items-center justify-content-between">
                    <i className="bi bi-cart3 text-primary avatar avatar-md bg-primary-transparent br-5 fs-18"></i>
                    <span>{orderStatisticData?.total_orders}</span>
                  </h2>
                  <h6 className="font-weight-normal mb-0 fs-14 text-muted text-start">
                    Total Price
                    <span className="float-end">
                      {orderStatisticData?.total_orders_stats?.total_sum}
                    </span>
                  </h6>
                </Card.Body>
              </Card>
            </Col>
            {/* Success orders */}
            <Col>
              <Card>
                <Card.Body>
                  <h6 className="mb-3 text-start">
                    Success Orders
                    <span className="badge badge-success-light float-end">
                      <i className="bi bi-arrow-up-right"></i>
                    </span>
                  </h6>
                  <h2 className="d-flex align-items-center justify-content-between">
                    <i
                      className="fa fa-check-circle text-success avatar avatar-md bg-success-transparent br-5 fs-18"
                      aria-hidden="true"
                    ></i>
                    <span>{orderStatisticData?.success_orders}</span>
                  </h2>
                  <h6 className="font-weight-normal mb-0 fs-14 text-muted text-start">
                    Total Price
                    <span className="float-end">
                      {orderStatisticData?.success_orders_stats?.total_sum}
                    </span>
                  </h6>
                </Card.Body>
              </Card>
            </Col>
            {/* Canceled Orders */}
            <Col>
              <Card>
                <Card.Body>
                  <h6 className="mb-3 text-start">
                    Canceled Orders
                    <span className="badge badge-danger-light float-end">
                      <i className="bi bi-arrow-down-right"></i>
                    </span>
                  </h6>
                  <h2 className="d-flex align-items-center justify-content-between">
                    <i
                      className="fa fa-exclamation-triangle text-danger avatar avatar-md bg-danger-transparent br-5 fs-18"
                      aria-hidden="true"
                    ></i>
                    <span>{orderStatisticData?.canceled_orders}</span>
                  </h2>
                  <h6 className="font-weight-normal mb-0 fs-14 text-muted text-start">
                    Total Price
                    <span className="float-end">
                      {orderStatisticData?.canceled_orders_stats?.total_sum}
                    </span>
                  </h6>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {/* Header-chart */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <div>
                  <Card.Title>Traffic Report</Card.Title>
                  <div className="d-flex flex-wrap">
                    <Dropdown
                      style={{
                        marginLeft: "4px",
                        marginBottom: "4px",
                        marginRight: "4px",
                      }}
                    >
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center"
                      >
                        <i className="bi bi-calendar-date fw-semibold mx-1"></i>{" "}
                        {select_traffic_date
                          ? `${select_traffic_date}`
                          : "Select Date"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ width: "240px" }}>
                        <Dropdown.Item
                          onClick={() => {
                            setSelect_traffic_date("Past 7 Days");
                            const endDate = new Date();
                            const startDate = new Date(
                              endDate.getTime() - 7 * 24 * 60 * 60 * 1000
                            );
                            setEnd_date_traffic(endDate);
                            setStart_date_traffic(startDate);
                            toast.success(
                              "Now select Market Place to send request!"
                            );
                          }}
                        >
                          Past 7 Days
                        </Dropdown.Item>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "5px",
                          }}
                        >
                          <div
                            style={{
                              marginRight: 5,
                            }}
                          >
                            <Form.Group controlId="formDatePicker">
                              <DatePicker
                                selected={start_date_traffic}
                                onChange={(date) => setStart_date_traffic(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Start Date"
                              />
                            </Form.Group>
                          </div>
                          {/* End Date */}
                          <div>
                            <Form.Group controlId="formDatePicker">
                              <DatePicker
                                selected={end_date_traffic}
                                onChange={(date) => setEnd_date_traffic(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="End Date"
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {/* {DateErrorSale ? (
                        <Alert variant="danger">{DateErrorSale}</Alert>
                      ) : null} */}
                        </div>
                        <Dropdown.Item
                          style={{
                            padding: "5px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              if (
                                start_date_traffic === null ||
                                end_date_traffic === null
                              ) {
                                setSelect_traffic_date("");
                                toast.error(
                                  "Please provide start and end dates."
                                );
                              } else if (
                                start_date_traffic > end_date_traffic
                              ) {
                                toast.error(
                                  "Start date cannot be after end date."
                                );
                                setLoadTrafficData(false);
                                setSelect_traffic_date("Select Date");
                                return;
                              } else {
                                setSelect_traffic_date("Date Selected");
                                toast.success(
                                  "Now select Market Place to send request!"
                                );
                              }
                            }}
                            style={{
                              width: "100%",
                            }}
                            variant="primary"
                            type="submit"
                          >
                            Select Date
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown
                      style={{
                        marginLeft: "4px",
                        marginBottom: "4px",
                        marginRight: "4px",
                      }}
                    >
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center"
                      >
                        <i className="bi bi-calendar-date fw-semibold mx-1"></i>{" "}
                        {market_place
                          ? `${market_place.toUpperCase()}`
                          : "Select Market Place"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {market_place_category?.map((value, index = 0) => {
                          index = index + 1;
                          return (
                            <Dropdown.Item
                              key={value}
                              onClick={() => {
                                setMarket_place(value);
                                handleTrafficReportAPI(
                                  start_date_traffic,
                                  end_date_traffic,
                                  value
                                );
                                setStart_date_traffic(null);
                                setEnd_date_traffic(null);
                              }}
                            >
                              {value.toUpperCase()}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                    {enable_traffic_dropdown ? (
                      <Dropdown
                        style={{
                          marginLeft: "4px",
                          marginBottom: "4px",
                          marginRight: "4px",
                        }}
                      >
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center"
                        >
                          <i className="bi bi-calendar-date fw-semibold mx-1"></i>{" "}
                          {metrices ? `${metrices}` : "Select Metrices"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {trafficData?.header?.metrics?.map(
                            (value, index = 0) => {
                              index = index + 1;
                              return (
                                <Dropdown.Item
                                  key={value.key}
                                  onClick={() => {
                                    setmetrices(value.localizedName);
                                    setselectedMetrics(value.key);
                                    if (apiCalled) {
                                      setLoadTrafficData(true);
                                      setTimeout(() => {
                                        setLoadTrafficData(false);
                                      }, 1000);
                                    }
                                  }}
                                >
                                  {value.localizedName}
                                </Dropdown.Item>
                              );
                            }
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div id="ecommerceChart">
                  {loadTrafficData ? (
                    <>
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
                    </>
                  ) : (
                    trafficData && (
                      <TrafficReportChart
                        trafficData={trafficData}
                        selectedMetrics={selectedMetrics}
                      />
                    )
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Chart-Area */}
        <Row>
          <Col md={12} sm={12} xs={12} lg={12} xl={9}>
            <Tabs
              defaultActiveKey="orderstatistic"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {/* Order Statistic */}
              <Tab eventKey="orderstatistic" title="Order Statistics">
                <Card>
                  <Card.Body>
                    <div id="ecommerceChart">
                      {loadOrderdata ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      ) : orderStatisticData ? (
                        <OrderStatistics orderSeries={orderStatisticData} />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {errorStatisticData && (
                            <Alert variant="danger">{errorStatisticData}</Alert>
                          )}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Tab>
              {/* Sale Item */}
              <Tab eventKey="totalsaleitems" title="Total Sale Items">
                <Card>
                  <Card.Header className="d-flex flex-wrap">
                    <Dropdown
                      style={{
                        marginLeft: "4px",
                        marginBottom: "4px",
                        marginRight: "4px",
                      }}
                    >
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center"
                      >
                        <i className="bi bi-calendar-date fw-semibold mx-1"></i>{" "}
                        {selectDate ? `${selectDate}` : "Select Date"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ width: "240px" }}>
                        <Dropdown.Item
                          onClick={() => {
                            setSelectDate("Month");
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = today.getMonth();
                            const todayDate = new Date().getDate();
                            const end_date = new Date(year, month, todayDate);
                            const prevMonth = month === 11 ? 0 : month - 1;
                            const nextYear = month === 11 ? year + 1 : year;
                            const start_date = new Date(
                              nextYear,
                              prevMonth,
                              todayDate
                            );
                            SaleItemsAPI(start_date, end_date);

                            if (selectCategory && selectManufacturer) {
                              setSelectCategory("");
                              setSelectManufacturer("");
                            }
                            if (showManufacturer) {
                              setshowManufacturer(false);
                            }
                          }}
                        >
                          Month
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setSelectDate("7 Days");
                            const end_date = new Date();
                            const start_date = new Date(
                              end_date.getTime() - 7 * 24 * 60 * 60 * 1000
                            );
                            setStartDateSaleItems(start_date);
                            setEndDateSaleItems(end_date);
                            SaleItemsAPI(start_date, end_date);
                            if (selectCategory && selectManufacturer) {
                              setSelectCategory("");
                              setSelectManufacturer("");
                            }
                            if (showManufacturer) {
                              setshowManufacturer(false);
                            }
                          }}
                        >
                          7 Days
                        </Dropdown.Item>
                        {/* Start date */}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "5px",
                          }}
                        >
                          <div
                            style={{
                              marginRight: 5,
                            }}
                          >
                            <Form.Group controlId="formDatePicker">
                              <DatePicker
                                selected={startDateSaleItems}
                                onChange={(date) => setStartDateSaleItems(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Start Date"
                              />
                            </Form.Group>
                          </div>
                          {/* End Date */}
                          <div>
                            <Form.Group controlId="formDatePicker">
                              <DatePicker
                                selected={endDateSaleItems}
                                onChange={(date) => setEndDateSaleItems(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="End Date"
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {DateErrorSale ? (
                            <Alert variant="danger">{DateErrorSale}</Alert>
                          ) : null}
                        </div>
                        <Dropdown.Item
                          style={{
                            padding: "5px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              if (
                                startDateSaleItems === null ||
                                endDateSaleItems === null
                              ) {
                                setErrorSaleItems("Please select date");
                                setSelectDate("");
                              } else {
                                setSelectDate("Date Selected");
                              }

                              SaleItemsAPI(
                                startDateSaleItems,
                                endDateSaleItems
                              );
                              setSelectCategory("");
                              setSelectManufacturer("");
                              setshowManufacturer(false);
                            }}
                            style={{
                              width: "100%",
                            }}
                            variant="primary"
                            type="submit"
                          >
                            Select Date
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                      style={{
                        marginLeft: "4px",
                        marginBottom: "4px",
                        marginRight: "4px",
                      }}
                    >
                      <Dropdown.Toggle
                        variant=""
                        className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center "
                        disabled={!disabled}
                      >
                        <i className="bi bi-calendar-date fw-semibold mx-1"></i>{" "}
                        {selectCategory ? selectCategory : "Select Category"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div
                          style={{
                            maxHeight: "240px",
                            overflowY: "scroll",
                          }}
                        >
                          {saleItemData?.map((product, index = 0) => {
                            index = index + 1;

                            const categories =
                              product?.category_name?.split(":");
                            const category_name =
                              categories[categories.length - 1];

                            return (
                              <div key={index}>
                                <Dropdown.Item
                                  onClick={() => {
                                    setSelectCategory(category_name);
                                    setloadSaleItems(true);
                                    setTimeout(() => {
                                      setloadSaleItems(false);
                                    }, 1000);
                                    setCurrentPage(1);
                                    setshowManufacturer(true);
                                    setShowChart(true);
                                    setSortby("");
                                    setsearchSale("");
                                    setSelectManufacturer("");
                                  }}
                                >
                                  {category_name}
                                </Dropdown.Item>
                              </div>
                            );
                          })}
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                      style={{
                        marginLeft: "4px",
                        marginBottom: "4px",
                        marginRight: "4px",
                      }}
                    >
                      <Dropdown.Toggle
                        variant=""
                        className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center "
                        disabled={!showManufacturer}
                      >
                        <i className="bi bi-calendar-date fw-semibold mx-1"></i>{" "}
                        {selectManufacturer
                          ? selectManufacturer
                          : "Select Manufacturer"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {saleItemData
                          ?.filter((category) => {
                            return category.category_name.includes(
                              selectCategory
                            );
                          })
                          ?.map((product, index) => {
                            let newArray = [];
                            let uniqueObject = {};

                            for (let i in product?.manufacturers) {
                              let objtitle;
                              objtitle =
                                product?.manufacturers[i]["manufacturer"];

                              uniqueObject[objtitle] =
                                product?.manufacturers[i];
                            }

                            for (let i in uniqueObject) {
                              newArray.push(uniqueObject[i]);
                            }
                            return (
                              <div
                                style={{
                                  maxHeight: "250px",
                                  overflowY: "scroll",
                                }}
                                key={index}
                              >
                                <div>
                                  {newArray.map((element, index) => {
                                    return (
                                      <div key={index}>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setSelectManufacturer(
                                              element.manufacturer
                                            );
                                            setSortby("");
                                            setsearchSale("");
                                            setloadSaleItems(true);
                                            setTimeout(() => {
                                              setloadSaleItems(false);
                                            }, 1000);
                                          }}
                                        >
                                          {element.manufacturer}
                                        </Dropdown.Item>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Header>
                  <Card.Body>
                    <div id="ecommerceChart">
                      {loadSaleItems ? (
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
                      ) : saleItemData ? (
                        showChart && (
                          <>
                            <div>{DateSelected}</div>
                            <ProductSoldColumn
                              productSeries={saleItemData}
                              category={selectCategory}
                              manufacture_category={selectManufacturer}
                            />
                          </>
                        )
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {ErrorSaleItems && (
                            <Alert variant="danger">{ErrorSaleItems}</Alert>
                          )}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
                <Row>
                  <Col xl={12}>
                    {loadSaleItems ? (
                      <Card className="custom-card products-overview">
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
                      </Card>
                    ) : (
                      showChart &&
                      saleItemData
                        ?.filter((category) => {
                          return category.category_name.includes(
                            selectCategory
                          );
                        })
                        ?.map((product, index) => {
                          let categories;
                          let category_name;
                          categories = product?.category_name.split(":");
                          category_name = categories[categories.length - 1];

                          return reloadTable ? (
                            <Card
                              className="custom-card products-overview"
                              key={index}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "200px",
                                }}
                              >
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </Spinner>
                              </div>
                            </Card>
                          ) : (
                            <Card
                              className="custom-card products-overview"
                              key={index}
                            >
                              <Card.Header className="justify-content-between">
                                <Card.Title as="h6">
                                  {`${category_name} (${DateSelected})`}
                                </Card.Title>
                                <div className="d-block d-sm-flex">
                                  <div className="d-flex">
                                    <Form.Control
                                      className="form-control-sm"
                                      style={{
                                        marginRight: "4px",
                                      }}
                                      type="text"
                                      defaultValue={searchSale}
                                      ref={inputRef}
                                      onKeyPress={handleKeyPress}
                                      placeholder="Search Model by Press Enter"
                                      aria-label=".form-control-sm example"
                                    />
                                    {/* <Button
                                      style={{
                                        height: "30px",
                                        marginRight: "2px",
                                      }}
                                      onClick={() =>
                                        handleModelCall(inputRef.current?.value)
                                      }
                                    >
                                      Search
                                    </Button> */}

                                    <Dropdown>
                                      <Dropdown.Toggle
                                        className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center "
                                        id="dropdown-basic"
                                      >
                                        {sortby
                                          ? sortby
                                              .split("_")
                                              .map(
                                                (word) =>
                                                  word.charAt(0).toUpperCase() +
                                                  word.slice(1)
                                              )
                                              .join(" ")
                                          : "Sort by"}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setSortby("success_orders");
                                            handleReloadTable();
                                          }}
                                        >
                                          Success Orders
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setSortby("total_sold");
                                            handleReloadTable();
                                          }}
                                        >
                                          Total Sold
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setSortby("canceled_orders");
                                            handleReloadTable();
                                          }}
                                        >
                                          Canceled Orders
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <div className="table-responsive">
                                  <table className="table text-nowrap table-bordered">
                                    <thead>
                                      <tr>
                                        <th scope="col">Manufacturer</th>
                                        <th scope="col">
                                          <div>Category</div>
                                          <div>ID</div>
                                        </th>
                                        <th scope="col">
                                          <div>Total</div>
                                          <div>Sold</div>
                                        </th>
                                        <th scope="col">
                                          <div>Canceled</div>
                                          <div>Orders</div>
                                        </th>
                                        <th scope="col">
                                          <div>Success</div>
                                          <div>Orders</div>
                                        </th>
                                        <th scope="col">Model</th>
                                      </tr>
                                    </thead>
                                    <tbody className="fw-500">
                                      {product?.manufacturers ? (
                                        selectManufacturer === "" ? (
                                          searchSale ? (
                                            !isHas ? (
                                              <tr>
                                                {Array(6)
                                                  .fill(null)
                                                  .map((_, index) => (
                                                    <>
                                                      <td key={index}>
                                                        <Alert
                                                          className="pt-1 pb-1"
                                                          style={{
                                                            width: 110,
                                                          }}
                                                          variant="light"
                                                        >
                                                          Not Available
                                                        </Alert>
                                                      </td>
                                                    </>
                                                  ))}
                                              </tr>
                                            ) : (
                                              SearchModelData.sort((a, b) => {
                                                if (
                                                  sortby === "success_orders"
                                                ) {
                                                  return (
                                                    b.success_orders_count -
                                                    a.success_orders_count
                                                  );
                                                } else if (
                                                  sortby === "total_sold"
                                                ) {
                                                  return (
                                                    b.total_sold - a.total_sold
                                                  );
                                                } else if (
                                                  sortby === "canceled_orders"
                                                ) {
                                                  return (
                                                    b.canceled_orders_count -
                                                    a.canceled_orders_count
                                                  );
                                                }
                                              }).map((element, index) => {
                                                return (
                                                  <tr key={index}>
                                                    <td>
                                                      <div className="d-flex align-items-center">
                                                        <div className="me-2 lh-1">
                                                          <span>
                                                            <img
                                                              src={img7}
                                                              className="avatar avatar-sm bg-transparent br-5 "
                                                              alt="img"
                                                            />
                                                          </span>
                                                        </div>
                                                        <div className="fs-14">
                                                          {element.manufacturer}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <span className="fw-500">
                                                        #{product?.category_id}
                                                      </span>
                                                    </td>
                                                    <td>
                                                      {element.total_sold}
                                                    </td>
                                                    <td>
                                                      {
                                                        element.canceled_orders_count
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        element.success_orders_count
                                                      }
                                                    </td>
                                                    <td>{element.model}</td>
                                                  </tr>
                                                );
                                              })
                                            )
                                          ) : (
                                            product.manufacturers
                                              ?.sort((a, b) => {
                                                if (
                                                  sortby === "success_orders"
                                                ) {
                                                  return (
                                                    b.success_orders_count -
                                                    a.success_orders_count
                                                  );
                                                } else if (
                                                  sortby === "total_sold"
                                                ) {
                                                  return (
                                                    b.total_sold - a.total_sold
                                                  );
                                                } else if (
                                                  sortby === "canceled_orders"
                                                ) {
                                                  return (
                                                    b.canceled_orders_count -
                                                    a.canceled_orders_count
                                                  );
                                                }
                                              })

                                              ?.slice(firstIndex, lastindex)
                                              ?.map((element, index) => {
                                                return (
                                                  <tr key={index}>
                                                    <td>
                                                      <div className="d-flex align-items-center">
                                                        <div className="me-2 lh-1">
                                                          <span>
                                                            <img
                                                              src={img7}
                                                              className="avatar avatar-sm bg-transparent br-5 "
                                                              alt="img"
                                                            />
                                                          </span>
                                                        </div>
                                                        <div className="fs-14">
                                                          {element.manufacturer}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <span className="fw-500">
                                                        #{product?.category_id}
                                                      </span>
                                                    </td>
                                                    <td>
                                                      {element.total_sold}
                                                    </td>
                                                    <td>
                                                      {
                                                        element.canceled_orders_count
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        element.success_orders_count
                                                      }
                                                    </td>
                                                    <td>
                                                      {element.model?.length ===
                                                      1 ? (
                                                        element.model.map(
                                                          (value) => value
                                                        )
                                                      ) : (
                                                        <Alert
                                                          className="pt-1 pb-1"
                                                          style={{
                                                            width: 110,
                                                          }}
                                                          variant="light"
                                                        >
                                                          Not Available
                                                        </Alert>
                                                      )}
                                                    </td>
                                                  </tr>
                                                );
                                              })
                                          )
                                        ) : searchSale ? (
                                          isHas ? (
                                            SearchModelData.sort((a, b) => {
                                              if (sortby === "success_orders") {
                                                return (
                                                  b.success_orders_count -
                                                  a.success_orders_count
                                                );
                                              } else if (
                                                sortby === "total_sold"
                                              ) {
                                                return (
                                                  b.total_sold - a.total_sold
                                                );
                                              } else if (
                                                sortby === "canceled_orders"
                                              ) {
                                                return (
                                                  b.canceled_orders_count -
                                                  a.canceled_orders_count
                                                );
                                              }
                                            }).map((element, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>
                                                    <div className="d-flex align-items-center">
                                                      <div className="me-2 lh-1">
                                                        <span>
                                                          <img
                                                            src={img7}
                                                            className="avatar avatar-sm bg-transparent br-5 "
                                                            alt="img"
                                                          />
                                                        </span>
                                                      </div>
                                                      <div className="fs-14">
                                                        {element.manufacturer}
                                                      </div>
                                                    </div>
                                                  </td>
                                                  <td>
                                                    <span className="fw-500">
                                                      #{product?.category_id}
                                                    </span>
                                                  </td>
                                                  <td>{element.total_sold}</td>
                                                  <td>
                                                    {
                                                      element.canceled_orders_count
                                                    }
                                                  </td>
                                                  <td>
                                                    {
                                                      element.success_orders_count
                                                    }
                                                  </td>
                                                  <td>{element.model}</td>
                                                </tr>
                                              );
                                            })
                                          ) : (
                                            <tr>
                                              {Array(6)
                                                .fill(null)
                                                .map((_, index) => (
                                                  <>
                                                    <td key={index}>
                                                      <Alert
                                                        className="pt-1 pb-1"
                                                        style={{ width: 110 }}
                                                        variant="light"
                                                      >
                                                        Not Available
                                                      </Alert>
                                                    </td>
                                                  </>
                                                ))}
                                            </tr>
                                          )
                                        ) : (
                                          product.manufacturers
                                            ?.filter((item) =>
                                              item.manufacturer?.includes(
                                                selectManufacturer
                                              )
                                            )
                                            ?.sort((a, b) => {
                                              if (sortby === "success_orders") {
                                                return (
                                                  b.success_orders_count -
                                                  a.success_orders_count
                                                );
                                              } else if (
                                                sortby === "total_sold"
                                              ) {
                                                return (
                                                  b.total_sold - a.total_sold
                                                );
                                              } else if (
                                                sortby === "canceled_orders"
                                              ) {
                                                return (
                                                  b.canceled_orders_count -
                                                  a.canceled_orders_count
                                                );
                                              }
                                            })
                                            .map((element, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>
                                                    <div className="d-flex align-items-center">
                                                      <div className="me-2 lh-1">
                                                        <span>
                                                          <img
                                                            src={img7}
                                                            className="avatar avatar-sm bg-transparent br-5 "
                                                            alt="img"
                                                          />
                                                        </span>
                                                      </div>
                                                      <div className="fs-14">
                                                        {element.manufacturer}
                                                      </div>
                                                    </div>
                                                  </td>
                                                  <td>
                                                    <span className="fw-500">
                                                      #{product?.category_id}
                                                    </span>
                                                  </td>
                                                  <td>{element.total_sold}</td>
                                                  <td>
                                                    {
                                                      element.canceled_orders_count
                                                    }
                                                  </td>
                                                  <td>
                                                    {
                                                      element.success_orders_count
                                                    }
                                                  </td>
                                                  <td>
                                                    {element.model?.length ===
                                                    1 ? (
                                                      element.model.map(
                                                        (value) => value
                                                      )
                                                    ) : (
                                                      <Alert
                                                        className="pt-1 pb-1"
                                                        style={{
                                                          width: 110,
                                                        }}
                                                        variant="light"
                                                      >
                                                        Not Available
                                                      </Alert>
                                                    )}
                                                  </td>
                                                </tr>
                                              );
                                            })
                                        )
                                      ) : null}
                                    </tbody>
                                  </table>
                                </div>
                              </Card.Body>
                              {selectManufacturer === "" ? (
                                <div className="card-footer">
                                  <div className="d-flex align-items-center">
                                    <div className="ms-auto">
                                      <nav
                                        aria-label="Page navigation"
                                        className="pagination-style-4"
                                      >
                                        <ul className="pagination mb-0">
                                          <li
                                            className={`page-item ${
                                              currentPage === 1
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <div
                                              className="page-link"
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                if (currentPage !== lastindex) {
                                                  setCurrentPage(
                                                    currentPage - 1
                                                  );
                                                }
                                              }}
                                            >
                                              <i
                                                className="fa fa-angle-left"
                                                aria-hidden="true"
                                              ></i>
                                            </div>
                                          </li>
                                          <li className="page-item">
                                            <div className="page-link">
                                              {currentPage} of{" "}
                                              {Math.ceil(
                                                product?.manufacturers?.length /
                                                  recordPerPage
                                              )}
                                            </div>
                                          </li>
                                          <li
                                            className={`page-item ${
                                              currentPage ===
                                              Math.ceil(
                                                product?.manufacturers?.length /
                                                  recordPerPage
                                              )
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <div
                                              className="page-link"
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                if (
                                                  currentPage !== firstIndex
                                                ) {
                                                  setCurrentPage(
                                                    currentPage + 1
                                                  );
                                                }
                                              }}
                                            >
                                              <i className="fa fa-angle-right"></i>
                                            </div>
                                          </li>
                                        </ul>
                                      </nav>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </Card>
                          );
                        })
                    )}
                  </Col>
                </Row>
              </Tab>
              {/* Order Timeline */}
              <Tab eventKey="ordertimeline" title="Order Timeline">
                <Card>
                  <Card.Header>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example2"
                        className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center"
                      >
                        <i className="bi bi-calendar-date fw-semibold mx-1"></i>{" "}
                        {select_Date ? `${select_Date}` : "Select Date"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ width: "240px" }}>
                        <Dropdown.Item
                          onClick={() => {
                            setSelect_Date("Month");
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = today.getMonth();

                            const todayDate = new Date().getDate();

                            const enddate = new Date(year, month, todayDate);

                            const prevMonth = month === 11 ? 0 : month - 1;
                            const nextYear = month === 11 ? year + 1 : year;

                            const startdate = new Date(
                              nextYear,
                              prevMonth,
                              todayDate
                            );
                            setMonthStart(startdate);
                            setMonthEnd(enddate);
                            OrderTimelineAPI(startdate, enddate, selectType);
                            setdisabled2(true);
                            setDayStart(null);
                            setDayEnd(null);
                            setEndOrderTimeline(null);
                            setStartDateOrderTimeline(null);
                          }}
                        >
                          Month
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setSelect_Date("7 Days");
                            const endDate = new Date();
                            const startDate = new Date(
                              endDate.getTime() - 7 * 24 * 60 * 60 * 1000
                            );
                            setDayStart(startDate);
                            setDayEnd(endDate);
                            OrderTimelineAPI(startDate, endDate, selectType);
                            setdisabled2(true);
                            setEndOrderTimeline(null);
                            setStartDateOrderTimeline(null);
                            setMonthEnd(null);
                            setMonthStart(null);
                          }}
                        >
                          7 Days
                        </Dropdown.Item>
                        {/* Start date */}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "5px",
                          }}
                        >
                          <div
                            style={{
                              marginRight: 5,
                            }}
                          >
                            <Form.Group controlId="formDatePicker">
                              <DatePicker
                                selected={startDateOrderTimeline}
                                onChange={(date) =>
                                  setStartDateOrderTimeline(date)
                                }
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Start Date"
                              />
                            </Form.Group>
                          </div>
                          {/* End Date */}
                          <div>
                            <Form.Group controlId="formDatePicker">
                              <DatePicker
                                selected={endDateOrderTimeline}
                                onChange={(date) => setEndOrderTimeline(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="End Date"
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        ></div>
                        <Dropdown.Item
                          style={{
                            padding: "5px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              if (
                                startDateOrderTimeline === null ||
                                endDateOrderTimeline === null
                              ) {
                                toast.error("Please select date");
                                setSelect_Date("");
                              } else if (
                                startDateOrderTimeline > endDateOrderTimeline
                              ) {
                                toast.error(
                                  "Start date cannot be after end date."
                                );
                              } else {
                                setSelect_Date("Date Selected");
                                setdisabled2(true);
                                setDayStart(null);
                                setDayEnd(null);
                                setMonthEnd(null);
                                setMonthStart(null);
                                OrderTimelineAPI(
                                  startDateOrderTimeline,
                                  endDateOrderTimeline,
                                  selectType
                                );
                              }

                              // SaleItemsAPI();
                            }}
                            style={{
                              width: "100%",
                            }}
                            variant="primary"
                            type="submit"
                          >
                            Select Date
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                      style={{
                        marginLeft: 10,
                      }}
                    >
                      <Dropdown.Toggle
                        variant=""
                        className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center "
                        disabled={!disabled2}
                      >
                        <i className="bi bi-calendar-date fw-semibold mx-1"></i>{" "}
                        {selectType ? selectType : "Select Order Type"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {orderType?.map((type, index) => {
                          return (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                setSelectType(type.value);
                                if (MonthStart !== null && MonthEnd !== null) {
                                  OrderTimelineAPI(
                                    MonthStart,
                                    MonthEnd,
                                    type.value
                                  );
                                  setDayStart(null);
                                  setDayEnd(null);
                                  setEndOrderTimeline(null);
                                  setStartDateOrderTimeline(null);
                                }
                                if (DayStart !== null && DayStart !== null) {
                                  OrderTimelineAPI(
                                    DayStart,
                                    DayEnd,
                                    type.value
                                  );
                                  setEndOrderTimeline(null);
                                  setStartDateOrderTimeline(null);
                                  setMonthEnd(null);
                                  setMonthStart(null);
                                }

                                if (
                                  startDateOrderTimeline !== null &&
                                  endDateOrderTimeline !== null
                                ) {
                                  OrderTimelineAPI(
                                    startDateOrderTimeline,
                                    endDateOrderTimeline,
                                    type.value
                                  );
                                  setDayStart(null);
                                  setDayEnd(null);
                                  setMonthEnd(null);
                                  setMonthStart(null);
                                }
                              }}
                            >
                              {type.value}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Header>
                  <Card.Body>
                    <div id="ecommerceChart">
                      {loadOrderTData ? (
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
                      ) : orderTimelineData ? (
                        show_Chart && (
                          <OrderTimeLine orderData={orderTimelineData} />
                        )
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {ErrorOrderTimeline && (
                            <Alert variant="danger">{ErrorOrderTimeline}</Alert>
                          )}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>
          <Col className="mt-3" lg={12} md={12} sm={12} xl={3}>
            {" "}
            <Card>
              <Card.Body>
                <div id="ecommerceChart">
                  {loadStoreLimit ? (
                    <>
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
                    </>
                  ) : (
                    sellingLimit && (
                      <Gradientcircle sellingLimit={sellingLimit} />
                    )
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Table Top Selling Products */}
          <Col className="mt-3" lg={12} xs={12} md={12} sm={12} xl={9}>
            <Card>
              <Card.Header>
                <Card.Title className="h6 mt-2">
                  Top Selling Products
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="container table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((element, index = 0) => {
                        index = index + 1;
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center text-center justify-content-center">
                                <h6 className="text-center">{element.rank}</h6>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex justify-content-evenly align-items-center">
                                <span>
                                  <img
                                    src={img7}
                                    className="avatar avatar-sm bg-transparent br-5 "
                                    alt="img"
                                  />
                                </span>
                                <div
                                  style={{
                                    marginTop: "10px",
                                    marginLeft: "12px",
                                  }}
                                >
                                  <h6 className="text-justify">
                                    {element.description}
                                  </h6>
                                  <p>{element.id}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6 className="text-center">
                                {element.qualitysold}
                              </h6>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Suspense>
  );
};

export default Ecdashboard;
