import React from "react";
import { Card } from "react-bootstrap";

const CardImage = React.memo(({ product, detail }) => {
  return (
    <Card
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <Card.Header
        className="bg-primary d-flex justify-content-center align-items-center text-white"
        style={{
          height: "50px",
          fontSize: "1.25em",
          fontWeight: "bold",
        }}
      >
        Preview
      </Card.Header>
      <Card.Body>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              paddingRight: "10px",
            }}
          >
            <img
              src={product && product?.imageUrls[0]}
              width={100}
              height={100}
              alt="product"
            />
          </div>
          <div>
            <h5>{product?.title}</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>{detail.sku}</div>
              <div>
                {detail?.pricingSummary?.price?.value}{" "}
                {detail?.pricingSummary?.price?.currency}
              </div>
              <div className="mt-2">
                <div className="btn btn-primary">Buy it now</div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
});

export default CardImage;
