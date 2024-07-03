import { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import PageheaderDB from "../../../components/common/pageheader/pageheaderDB";
import { Tabs, Tab, Button, Spinner } from "react-bootstrap";
import ShippingAddressPage from "../sections/shipping-address-page";
import TitleAndCategory from "../sections/title-category-page";
import SellingDetails from "../sections/selling-details-page";
import ItemDescriptions from "../sections/item-description-page";
import PhotosAndVideos from "../sections/photos-video-page";
import ProductDetail from "../sections/product-detail-page";
import React from "react";
import { useAPI } from "../../../../context/APIContext";
const ActiveditDetails = React.memo(() => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  console.log(!location.state ? "data from api" : location.state);
  const { state } = location;

  const {
    UpdateInventaryItems,
    SearchBySku,
    searchDatabyparams,
    loadingUpdate,
  } = useAPI();

  const router = useNavigate();

  const initialProduct = state?.product || {};
  const detail = state?.detail || {};
  const initialDescription = state?.conditionDescription || "";
  const initialCondition = state?.condition || "";
  const Shipping_Package = state?.packageWeightAndSize || {};

  const [product, setProduct] = useState(initialProduct);
  const [shippingPackage, setShippingPackage] = useState(Shipping_Package);
  const [condition, setCondition] = useState(initialCondition);
  const [conditionDescription, setConditionDescription] =
    useState(initialDescription);

  useEffect(() => {
    if (!location.state) {
      SearchBySku({ id: id });

      if (searchDatabyparams) {
        const data = searchDatabyparams;
        console.log(data);
        setProduct(data.product);
        setShippingPackage(data.packageWeightAndSize);
        setCondition(data.condition);
        setConditionDescription(data.conditionDescription);
      }
    }
  }, [id, state]);

  const handleConditionChange = useCallback((condition) => {
    setCondition(condition);
  }, []);

  const handleConditionDescription = useCallback((conditionDescription) => {
    setConditionDescription(conditionDescription);
  }, []);

  const handleProductUpdate = useCallback((product) => {
    setProduct(product);
  }, []);
  const handleSave = () => {
    console.log("Updated!!");

    const updatedData = {
      body: {
        product,
        condition: condition,
        conditionDescription: conditionDescription,
        packageWeightAndSize: shippingPackage,
      },
    };

    UpdateInventaryItems({ body: updatedData, id: id });
  };

  const handlePackageAndWeightSizeChange = useCallback((shippingpackage) => {
    setShippingPackage(shippingpackage);
  }, []);

  return (
    <Fragment>
      {/* <PageheaderDB heading="Listing Segments" active={`Active`} id={id} /> */}
      <div
        className="main-container container-fluid mt-2"
        style={{
          height: "100vh",
        }}
      >
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Title & Category" className="bg-white">
            <TitleAndCategory
              product={product}
              detail={detail}
              onProductUpdate={handleProductUpdate}
            />
          </Tab>
          <Tab eventKey={2} title="Product Details" className="bg-white">
            <ProductDetail
              product={product}
              detail={detail}
              condition={condition}
              // onProductUpdate={handleProductUpdate}
              conditionDescription={conditionDescription}
              onConditionDescriptionChange={handleConditionDescription}
              onConditonChange={handleConditionChange}
            />
          </Tab>
          <Tab eventKey={3} title="Selling Details" className="bg-white">
            <SellingDetails product={product} detail={detail} />
          </Tab>
          <Tab eventKey={4} title="Photos & Videos" className="bg-white">
            <PhotosAndVideos product={product} />
          </Tab>
          <Tab eventKey={5} title="Item Description" className="bg-white">
            <ItemDescriptions detail={detail} />
          </Tab>
          <Tab eventKey={6} title="Shipping & Policies" className="bg-white">
            <ShippingAddressPage
              product={product}
              detail={detail}
              packageWeightAndSize={shippingPackage}
              onPackageWeightAndSizeChange={handlePackageAndWeightSizeChange}
            />
          </Tab>
        </Tabs>
      </div>
      {/* footer */}
      <div
        className="footer"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "100%",
          backgroundColor: "#f8f9fa",
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          padding: "10px 0",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <div
          style={{
            marginRight: "30px",
          }}
        >
          <Button
            className="btn btn-danger mx-2 px-4"
            onClick={() => {
              router(`/listing-segments/active/`);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="px-4"
            onClick={() => {
              handleSave();
            }}
          >
            {loadingUpdate ? (
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
                  {"Save"}
                </div>
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </Fragment>
  );
});

export default ActiveditDetails;
