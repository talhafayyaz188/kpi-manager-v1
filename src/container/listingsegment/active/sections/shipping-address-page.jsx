import React, { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import CardImage from "../card/card";
import Select from "react-select";
const ShippingAddressPage = React.memo(
  ({ product, detail, packageWeightAndSize, onPackageWeightAndSizeChange }) => {
    const initialSelectedIndex =
      packageWeightAndSize?.weight?.unit?.toLowerCase() === "kilogram"
        ? { 0: { value: packageWeightAndSize?.weight?.value }, 1: { value: 0 } }
        : {
            0: { value: 0 },
            1: { value: packageWeightAndSize?.weight?.value },
          };
    const array1 = [1, 2, 3];
    const array2 = [1, 1];

    const [selectedIndexPackage, setSelectedIndexPackage] =
      useState(initialSelectedIndex);

    const [selectedIndex, setSelectedIndex] = useState({});

    const packagetypeOptions = [
      {
        value: "Rueckgabe",
        label: "Rueckgabe",
      },
      {
        value: "India",
        label: "India",
      },
      {
        value: "Pakistan",
        label: "Pakistan",
      },
    ];

    const [Irregular, setIrregular] = useState(
      packageWeightAndSize?.shippingIrregular
    );

    const handleIrregularShipping = (e) => {
      setIrregular(e.target.checked);
      onPackageWeightAndSizeChange({
        ...packageWeightAndSize,
        shippingIrregular: e.target.checked,
      });
    };

    const [packageType, setpackageType] = useState(packagetypeOptions[0]);

    const [inventoryLocation, setInventoryLocation] = useState({
      value: detail.marketplaceId,
      label: detail.marketplaceId,
    });

    const [paymentProfile, setpaymentProfile] = useState(null);

    const [shippingInfo, setshippingInfo] = useState(null);

    const [returnPolicy, setreturnPolicy] = useState(null);

    const handleDimension = (index, value, operation) => {
      const findIndex = array1.findIndex((val) => val === value);
      if (findIndex === index) {
        setSelectedIndex((prev) => {
          const currentValue = prev[index]?.one || 0;
          let newValue = currentValue + operation;
          if (newValue < 0) {
            newValue = 0;
          }
          return {
            ...prev,
            [index]: {
              ...prev[index],
              one: newValue,
            },
          };
        });
      }
    };

    const handleWeight = (index, value, increment, unit) => {
      console.log(index);

      setSelectedIndexPackage((prevState) => {
        const newWeight = (prevState[index]?.value || 0) + increment * value;

        onPackageWeightAndSizeChange({
          ...packageWeightAndSize,
          weight: {
            value: newWeight,
            unit,
          },
        });

        return {
          ...prevState,
          [index]: {
            ...prevState[index],
            value: newWeight < 0 ? 0 : newWeight, // Ensure weight doesn't go below 0
          },
        };
      });
    };

    return (
      <div
        className="d-flex justify-content-between flex-wrap"
        style={{
          marginBottom: "10%",
        }}
      >
        <div
          style={{
            minWidth: "800px",
            padding: "10px",
          }}
        >
          <div
            style={{
              width: 300,
            }}
          >
            <h4>Business Policies</h4>
            <h6 className="mt-3">Payment Profile</h6>
            <div>
              <Select
                value={paymentProfile}
                onChange={(value) => setpaymentProfile(value)}
                placeholder="Select.."
              />
            </div>
            <h6 className="mt-3">Shipping Profile</h6>
            <div>
              <Select
                value={shippingInfo}
                onChange={(value) => setshippingInfo(value)}
                placeholder="Select.."
              />
            </div>

            <h6 className="mt-3">Return Policy</h6>
            <div>
              <Select
                value={returnPolicy}
                onChange={(value) => setreturnPolicy(value)}
                placeholder="Select.."
              />
            </div>
          </div>
          <div className="mt-3">
            <p>
              You can edit or create eBay business policies by{" "}
              <span>
                <a href="" className="text-primary">
                  clicking here
                </a>
              </span>
            </p>
          </div>
          <div className="mt-4">
            <h4 className="mt-2">Location</h4>
            <h6 className="mt-3">Inventory Locations</h6>
            <div
              style={{
                maxWidth: "100%",
                width: "50%",
              }}
            >
              <Select
                value={inventoryLocation}
                onChange={(value) =>
                  setInventoryLocation({
                    value: value,
                    label: value,
                  })
                }
              />
            </div>

            <h4 className="mt-4">Shipping Package Details</h4>
            <h6 className="mt-3">Package Type</h6>
            <div
              style={{
                maxWidth: "100%",
                width: "50%",
              }}
            >
              <Select
                options={packagetypeOptions}
                value={packageType}
                onChange={(value) => setpackageType(value)}
              />
            </div>
            <div className="d-flex mt-3 pa align-items-center">
              <Form.Check
                type="radio"
                id="default-radio"
                label={"Lbs/Inch"}
                className="border-dark"
              />
              <Form.Check
                style={{ marginLeft: "10px" }}
                type="radio"
                defaultChecked
                id="default-radio"
                className="border-dark"
                label={"Kg/Cm"}
              />
            </div>
          </div>

          <div className="mt-3">
            <h6
              style={{
                fontWeight: "normal",
              }}
            >
              Dimensions (required for calculated shipping)
            </h6>
            <div className="mt-3 d-flex">
              {array1.map((value, index) => {
                return (
                  <div key={index}>
                    <ButtonGroup
                      aria-label="Basic example"
                      className="custom-toggle-style"
                    >
                      <Button
                        variant="btn btn-light"
                        onClick={() => {
                          handleDimension(index, value, -1);
                        }}
                      >
                        <FaMinus size={10} />
                      </Button>
                      <Button
                        variant="outline-default"
                        style={{
                          minWidth: "50px",
                        }}
                      >
                        {selectedIndex[index]?.one || 0}
                      </Button>
                      <Button
                        variant="btn btn-light"
                        onClick={() => {
                          handleDimension(index, value, 1);
                        }}
                      >
                        <FaPlus size={10} />
                      </Button>
                    </ButtonGroup>
                    <span className="mx-4">centimeters x</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="mt-3"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <h6
              style={{
                marginRight: "1rem",
                marginTop: "0.4rem",
              }}
            >
              Irregular package
            </h6>
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={handleIrregularShipping}
              checked={Irregular}
            />
          </div>

          <div className="mt-4">
            <h5>Weight</h5>
            <div className="mt-3 d-flex">
              {array2.map((value, index) => (
                <div key={index}>
                  <ButtonGroup
                    aria-label="Basic example"
                    className="custom-toggle-style"
                  >
                    <Button
                      variant="btn btn-light"
                      onClick={() =>
                        handleWeight(
                          index,
                          value,
                          -1,
                          index === 0 ? "kilogram" : "gram"
                        )
                      }
                    >
                      <FaMinus size={10} />
                    </Button>
                    <Button
                      variant="outline-default"
                      style={{ minWidth: "50px" }}
                    >
                      {selectedIndexPackage[index]?.value}
                    </Button>
                    <Button
                      variant="btn btn-light"
                      onClick={() =>
                        handleWeight(
                          index,
                          value,
                          1,
                          index === 0 ? "kilogram" : "gram"
                        )
                      }
                    >
                      <FaPlus size={10} />
                    </Button>
                  </ButtonGroup>
                  <span className="mx-4">
                    {index === 0 ? "kilogram" : "gram"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "400px",
          }}
        >
          <CardImage product={product} detail={detail} />
        </div>
      </div>
    );
  }
);

export default ShippingAddressPage;
