import React, { useState } from "react";
import { Form } from "react-bootstrap";
import CardImage from "../card/card";

const SellingDetails = React.memo(({ product, detail }) => {
  const [Warehouse, setWarehouse] = useState(1);
  return (
    <div className="d-flex justify-content-between flex-wrap">
      <div
        // className="bg-success"
        style={{
          minWidth: "800px",
          padding: "10px",
        }}
      >
        <div>
          <h4>Listing Type</h4>
          <h6
            className="mt-3"
            style={{
              fontSize: "1em",
              fontWeight: "normal",
            }}
          >
            Format:{" "}
            <span
              className="text-black"
              style={{
                fontWeight: "bold",
              }}
            >
              {detail.format}
            </span>
          </h6>
        </div>
        <div className="mt-3">
          <div
            style={{
              cursor: "pointer",
            }}
          >
            Buy it now
          </div>
        </div>
        <div className="mt-4">
          <h4>Inventory</h4>
          <h6 className="mt-3">Warehouse Inventory</h6>
          <Form.Control
            style={{
              minHeight: 40,
              width: 300,
            }}
            className="form-control-sm custom-toggle-style"
            type="text"
            name="tablesearch"
            placeholder="Enter Category"
            // defaultValue={1}
            value={Warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            aria-label=".form-control-sm example"
          />
        </div>
        <div className="mt-4">
          <h4>Pricing</h4>
          <h6>Price</h6>
          <Form.Control
            style={{
              minHeight: 40,
              width: 300,
            }}
            className="form-control-sm custom-toggle-style"
            type="text"
            name="tablesearch"
            placeholder="Enter Category"
            defaultValue={parseFloat(
              detail.pricingSummary?.price?.value
            ).toFixed(1)}
            aria-label=".form-control-sm example"
          />
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
              Edit Vat
            </h6>
            <Form.Check type="switch" id="custom-switch" />
          </div>
          <h6 className="mt-3">VAT Percent</h6>
          <Form.Control
            style={{
              minHeight: 40,
              width: 300,
            }}
            className="form-control-sm custom-toggle-style"
            type="text"
            name="tablesearch"
            placeholder="Enter Category"
            disabled
            value={"19"}
            // onChange={(e: any) => setWarehouse(e.target.value)}
            aria-label=".form-control-sm example"
          />
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
});

export default SellingDetails;
