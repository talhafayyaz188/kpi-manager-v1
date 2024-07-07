import { Fragment } from "react/jsx-runtime";
import PageheaderDB from "../../../components/common/pageheader/pageheaderDB";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  Form,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import Syncloader from "react-spinners/SyncLoader";
import { FaMinus, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAPI } from "../../../context/APIContext";
import { useNavigate } from "react-router-dom";
import React from "react";

import { useGetListingDataQuery } from "../../../redux/listingSlices/rtkQuery";

const ActiveListing = () => {
  const {
    loading,
    setLoading,
    loadingSearchData,
    setLoadingSearchData,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    totalPages,
    inventoryItems,
    searchData,
    SearchBySku,
    setSearchData,
    DeleteBySku,
  } = useAPI();

  const router = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState("");
  const [selectCategory, setselectCategory] = useState("");
  const [selectedIndex, setSelectedIndex] = useState({});

  const handleWareHouse = (sku, index, value) => {
    const itemIndex = ListAPI().findIndex(
      (item) => item.offer_details.sku === sku
    );

    if (itemIndex === index) {
      setSelectedIndex((prevValues) => {
        const currentValue = prevValues[index]?.Warehouse || 0;
        let newValue = currentValue + value;

        if (newValue < 0) {
          newValue = 0;
        }

        return {
          ...prevValues,
          [index]: {
            ...prevValues[index],
            Warehouse: newValue,
          },
        };
      });
    }
  };

  const handleQuantity = (sku, index, value) => {
    const itemIndex = ListAPI().findIndex(
      (item) => item.offer_details.sku === sku
    );

    if (itemIndex === index) {
      setSelectedIndex((prevValues) => {
        const currentValue = prevValues[index]?.quantity || 0;
        let newValue = currentValue + value;

        if (newValue < 0) {
          newValue = 0;
        }

        return {
          ...prevValues,
          [index]: {
            ...prevValues[index],
            quantity: newValue,
          },
        };
      });
    }
  };

  const handlePrice = (sku, index, value) => {
    const itemIndex = ListAPI().findIndex(
      (item) => item.offer_details.sku === sku
    );

    if (itemIndex === index) {
      setSelectedIndex((prevValues) => {
        const currentValue = prevValues[index]?.price || 0;
        let newValue = currentValue + value;

        if (newValue < 0) {
          newValue = 0;
        }

        return {
          ...prevValues,
          [index]: {
            ...prevValues[index],
            price: newValue,
          },
        };
      });
    }
  };

  const handleWholeprice = (sku, index, value) => {
    const itemIndex = ListAPI().findIndex(
      (item) => item.offer_details.sku === sku
    );

    if (itemIndex === index) {
      setSelectedIndex((prevValues) => {
        const currentValue = prevValues[index]?.wholeprice || 0;
        let newValue = currentValue + value;

        if (newValue < 0) {
          newValue = 0;
        }

        return {
          ...prevValues,
          [index]: {
            ...prevValues[index],
            wholeprice: newValue,
          },
        };
      });
    }
  };

  const [filter, setFilter] = useState({
    fn: (items) => items,
  });

  const handleSearchData = () => {
    if (searchItems.trim() === "") {
      setSearchData([]);
    } else {
      SearchBySku(searchItems);
    }
  };

  const handleDelete = (sku) => {
    DeleteBySku(sku);
  };

  useEffect(() => {
    if (searchItems.trim() === "") {
      setSearchData([]);
    }
  }, [searchItems, setSearchData]);

  const ListAPI = () => {
    return searchData.length > 0
      ? filter.fn(searchData)
      : inventoryItems && filter.fn(inventoryItems);
  };

  useEffect(() => {
    let active = true;
    if (active) {
      setFilter({
        fn: (items) => {
          let filterItems = items;
          if (searchQuery.length > 0) {
            return filterItems.filter(
              (item) =>
                item.offer_details.sku
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                item.offer_details.offerId
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            );
          }
          return filterItems;
        },
      });
    }
    return () => {
      active = false;
    };
  }, [searchQuery]);

  const CustomPagination = ({ totalPages, initialPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = (page) => {
      setCurrentPage(page);
      onPageChange(page - 1);
      setLoading(true);
    };

    const generatePageNumbers = () => {
      const pageNumbers = [];
      if (totalPages <= 10) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        if (currentPage > 4) {
          pageNumbers.push(1);
          pageNumbers.push("...");
        }
        const startPage = Math.max(currentPage - 2, 1);
        const endPage = Math.min(currentPage + 2, totalPages);
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
        if (currentPage < totalPages - 3) {
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        }
      }
      return pageNumbers;
    };

    return (
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {generatePageNumbers().map((page, index) =>
          page === "..." ? (
            <Pagination.Ellipsis key={`ellipsis-${index}`} />
          ) : (
            <Pagination.Item
              key={`page-${page}`}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  const handlePageChange = (page) => {
    setPage(page + 1);
    setSearchQuery("");
    setLoading(true);
  };

  return (
    <Fragment>
      <PageheaderDB heading="Listing Segments" active="Active" />
      <div className="main-container container-fluid">
        <Row>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4>Active Listing</h4>
              <div className="d-block d-sm-flex">
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      marginRight: "5px",
                    }}
                    id="dropdown-button-dark-example1"
                    className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center p-2"
                  >
                    {selectCategory ? selectCategory : "Select type"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setselectCategory("SKU")}>
                      SKU
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setselectCategory("Item ID")}>
                      Item ID
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="d-flex">
                  <Form.Control
                    style={{
                      minWidth: "240px",
                      marginRight: "8px",
                    }}
                    className="form-control-sm"
                    type="text"
                    value={searchItems}
                    onChange={(e) => {
                      setSearchItems(e.target.value);
                    }}
                    placeholder="Search items"
                    aria-label=".form-control-sm example"
                  />
                  <Button
                    variant="success"
                    onClick={() => {
                      console.log(searchData);
                      handleSearchData();
                    }}
                    disabled={!searchItems.trim() || loading}
                  >
                    {loadingSearchData ? (
                      <div className="d-flex align-items-center">
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        <div
                          style={{
                            marginLeft: "4px",
                          }}
                        >
                          {"Search"}
                        </div>
                      </div>
                    ) : (
                      "Search"
                    )}
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={2}>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    name="tablesearch"
                    placeholder="Search in table"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label=".form-control-sm example"
                  />
                </Col>
              </Row>
              {/* Table Design */}
              {/* <BasicTable data={listData} /> */}
              <div className="table-responsive border border-light mt-4 table-wrapper">
                <table
                  className="table text-nowrap table-bordered table-hover"
                  style={{ borderCollapse: "collapse" }}
                >
                  <thead className="table-header-sticky">
                    <tr>
                      <th
                        className="bg-light"
                        scope="col"
                        style={{
                          position: "sticky",
                          left: 0,
                          margin: 0,
                          zIndex: 2,
                        }}
                      >
                        Item
                      </th>
                      <th className="bg-light" scope="col">
                        SKU
                      </th>
                      <th className="bg-light" scope="col">
                        Offer Id
                      </th>
                      <th
                        className="bg-light"
                        scope="col"
                        style={{
                          minWidth: "450px",
                        }}
                      >
                        Title
                      </th>
                      <th className="bg-light" scope="col">
                        Warehouse
                      </th>
                      <th className="bg-light" scope="col">
                        Up to quantity
                      </th>
                      <th className="bg-light" scope="col">
                        Inventory Control
                      </th>
                      <th className="bg-light" scope="col">
                        Notes
                      </th>
                      <th className="bg-light" scope="col">
                        Price
                      </th>
                      <th className="bg-light" scope="col">
                        Whole Price
                      </th>
                      <th className="bg-light" scope="col">
                        Image
                      </th>
                      <th className="bg-light" scope="col">
                        Condition
                      </th>
                      <th className="bg-light" scope="col">
                        Package & Weight
                      </th>
                      <th className="bg-light" scope="col">
                        Marketplace ID
                      </th>
                      <th className="bg-light" scope="col">
                        Price
                      </th>
                      <th className="bg-light" scope="col">
                        Category ID
                      </th>
                      <th className="bg-light" scope="col">
                        Listing ID
                      </th>
                      <th className="bg-light" scope="col">
                        Listing Status
                      </th>
                      <th className="bg-light" scope="col">
                        Status
                      </th>
                      <th className="bg-light" scope="col">
                        Availability Quantity
                      </th>
                      <th className="bg-light" scope="col">
                        Availability Key
                      </th>
                      <th
                        className="bg-light"
                        scope="col"
                        style={{
                          position: "sticky",
                          right: 0,
                          padding: "10px",
                          minWidth: "180px",
                          zIndex: 1,
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ListAPI()?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td
                            style={{
                              position: "sticky",
                              left: 0,
                              zIndex: 1,
                              padding: "20px",
                              minWidth: "350px",
                            }}
                          >
                            <div className="d-flex justify-content-around align-items-center">
                              <img
                                src={item.product.imageUrls[0]}
                                alt="logo"
                                width={60}
                                height={60}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  // backgroundColor: "forestgreen",
                                  minWidth: "250px",
                                  margin: "10px",
                                }}
                              >
                                <Form.Control
                                  style={{
                                    border: "1px solid rgb(206, 207, 208)",
                                  }}
                                  className="form-control-sm  mb-1"
                                  type="text"
                                  defaultValue={item.product.title}
                                  disabled={true}
                                  aria-label=".form-control-sm example"
                                />
                                <div>
                                  {" "}
                                  ID: {item.offer_details.offerId}{" "}
                                  <FaRegCopy style={{ marginLeft: "3px" }} />{" "}
                                  <IoOpenOutline
                                    style={{ marginLeft: "1px" }}
                                  />
                                </div>
                                <div>
                                  SKU: {item.offer_details.sku}{" "}
                                  <FaRegCopy style={{ marginLeft: "3px" }} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{item.offer_details.sku}</td>
                          <td>{item.offer_details.offerId}</td>

                          <td>{item.product.title}</td>
                          <td>
                            {/* Warehouse */}
                            <ButtonGroup
                              aria-label="Basic example"
                              className="custom-toggle-style"
                            >
                              <Button
                                variant="btn btn-light"
                                onClick={() =>
                                  handleWareHouse(
                                    item.offer_details.sku,
                                    index,
                                    -1
                                  )
                                }
                              >
                                <FaMinus size={10} />
                              </Button>
                              <Button
                                variant="outline-default"
                                style={{
                                  minWidth: "50px",
                                }}
                              >
                                {selectedIndex[index]?.Warehouse || 0}
                              </Button>
                              <Button
                                variant="btn btn-light"
                                onClick={() => {
                                  handleWareHouse(
                                    item.offer_details.sku,
                                    index,
                                    1
                                  );
                                }}
                              >
                                <FaPlus size={10} />
                              </Button>
                            </ButtonGroup>
                          </td>
                          <td>
                            {/* Quantity */}
                            <ButtonGroup
                              aria-label="Basic example"
                              className="custom-toggle-style"
                            >
                              <Button
                                variant="btn btn-light"
                                onClick={() =>
                                  handleQuantity(
                                    item.offer_details.sku,
                                    index,
                                    -1
                                  )
                                }
                              >
                                <FaMinus size={10} />
                              </Button>
                              <Button
                                variant="outline-default"
                                style={{
                                  minWidth: "50px",
                                }}
                              >
                                {selectedIndex[index]?.quantity || 0}
                              </Button>
                              <Button
                                variant="btn btn-light"
                                onClick={() => {
                                  handleQuantity(
                                    item.offer_details.sku,
                                    index,
                                    1
                                  );
                                }}
                              >
                                <FaPlus size={10} />
                              </Button>
                            </ButtonGroup>
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Form.Check
                                type="switch"
                                // label="Check this switch"
                                id="custom-switch"
                              />
                            </div>
                          </td>
                          <td>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              style={{
                                minWidth: "120px",
                              }}
                            />
                          </td>
                          <td>
                            {/* Price */}
                            <ButtonGroup
                              aria-label="Basic example"
                              className="custom-toggle-style"
                            >
                              <Button
                                variant="btn btn-light"
                                onClick={() =>
                                  handlePrice(item.offer_details.sku, index, -1)
                                }
                              >
                                <FaMinus size={10} />
                              </Button>
                              <Button
                                variant="outline-default"
                                style={{
                                  minWidth: "50px",
                                }}
                              >
                                {selectedIndex[index]?.price || 0}
                              </Button>
                              <Button
                                variant="btn btn-light"
                                onClick={() => {
                                  handlePrice(item.offer_details.sku, index, 1);
                                }}
                              >
                                <FaPlus size={10} />
                              </Button>
                            </ButtonGroup>
                          </td>
                          <td>
                            {/* WholePrice */}
                            <ButtonGroup
                              aria-label="Basic example"
                              className="custom-toggle-style"
                            >
                              <Button
                                variant="btn btn-light"
                                onClick={() =>
                                  handleWholeprice(
                                    item.offer_details.sku,
                                    index,
                                    -1
                                  )
                                }
                              >
                                <FaMinus size={10} />
                              </Button>
                              <Button
                                variant="outline-default"
                                style={{
                                  minWidth: "50px",
                                }}
                              >
                                {selectedIndex[index]?.wholeprice || 0}
                              </Button>
                              <Button
                                variant="btn btn-light"
                                onClick={() => {
                                  handleWholeprice(
                                    item.offer_details.sku,
                                    index,
                                    1
                                  );
                                }}
                              >
                                <FaPlus size={10} />
                              </Button>
                            </ButtonGroup>
                          </td>
                          <td>
                            <img
                              src={item.product.imageUrls[0]}
                              alt="logo"
                              width={50}
                              height={50}
                            />
                          </td>
                          <td>{item.condition}</td>
                          <td>
                            {item.packageWeightAndSize.weight.value}{" "}
                            {item.packageWeightAndSize.weight.unit}
                          </td>
                          <td>{item.offer_details.marketplaceId}</td>
                          <td>
                            {item.offer_details?.pricingSummary?.price.value}{" "}
                            {item.offer_details?.pricingSummary?.price.currency}
                          </td>
                          <td>
                            {item.offer_details.categoryId
                              ? item.offer_details.categoryId
                              : "NULL"}
                          </td>
                          <td>{item.offer_details.listing?.listingId}</td>
                          <td>{item.offer_details.listing?.listingStatus}</td>
                          <td>{item.offer_details?.status}</td>
                          <td>{item.offer_details?.availableQuantity}</td>
                          <td>{item.availabilityKey?.merchantLocationKey}</td>
                          <td
                            style={{
                              position: "sticky",
                              right: 0,
                              zIndex: 1,
                              minWidth: "160px",
                            }}
                          >
                            <ButtonGroup
                              aria-label="Basic example"
                              className="custom-toggle-style"
                            >
                              <Button variant="outline-primary">
                                <FaRegCopy />
                              </Button>
                              <Button
                                variant="outline-secondary"
                                onClick={() => {
                                  router(
                                    `${
                                      import.meta.env.BASE_URL
                                    }listing-segments/active/${
                                      item.offer_details.sku
                                    }`,
                                    {
                                      state: {
                                        condition: item.condition,
                                        conditionDescription:
                                          item.conditionDescription,
                                        product: item.product,
                                        detail: item.offer_details,
                                        packageWeightAndSize:
                                          item.packageWeightAndSize,
                                        availability: item.availability,
                                      },
                                    }
                                  );
                                }}
                              >
                                <FaPen />
                              </Button>
                              <Button
                                //delete module call api
                                onClick={() => {
                                  handleDelete(item?.offer_details?.sku);
                                }}
                                variant="outline-danger"
                              >
                                <FaTrash />
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {loading && (
                  <div className="loading-overlay">
                    <Syncloader color="#36d7b7" />
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center p-2">
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {page === 0 ? 1 : page} of {totalPages}
                  </span>
                </div>
                <div className="d-flex">
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{
                        height: "37px",
                        marginRight: "5px",
                      }}
                      id="dropdown-button-dark-example1"
                      className=" btn-outline-default btn-sm fw-500 text-primary fs-12 d-flex align-items-center"
                    >
                      Show {pageLimit}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setPageLimit(5);
                          setLoading(true);
                        }}
                      >
                        5
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setPageLimit(10);
                          setLoading(true);
                        }}
                      >
                        10
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setPageLimit(25);
                          setLoading(true);
                        }}
                      >
                        25
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setPageLimit(50);
                          setLoading(true);
                        }}
                      >
                        50
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <CustomPagination
                    totalPages={totalPages}
                    initialPage={page}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </Fragment>
  );
};

export default ActiveListing;
