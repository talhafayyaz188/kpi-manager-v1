import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { HiOutlineTrash } from "react-icons/hi2";
import CardImage from "../card/card";
import Select from "react-select";

const TitleAndCategory = React.memo(({ product, detail, onProductUpdate }) => {
  const getCategoryFromDetail = (detail) => {
    const text =
      detail?.storeCategoryNames?.length > 0
        ? detail?.storeCategoryNames?.reduce((item) => item)
        : "Null";
    const splitText = text.split("/");
    return splitText[splitText.length - 1];
  };

  // console.log("testing......");

  const [title, setTitle] = useState(product?.title || "");
  const [category, setCategory] = useState(getCategoryFromDetail(detail));
  const [eBaySite, seteBaySite] = useState({
    value: "Germany",
    label: "Germany",
  });

  useEffect(() => {
    setTitle(product?.title || "");
    setCategory(getCategoryFromDetail(detail));
  }, [product, detail]);

  const maxWords = 80;
  const handleChange = useCallback(
    (event) => {
      const inputText = event.target.value;
      const words = inputText.trim().split(/\s+/);
      if (words.length <= maxWords || inputText === "") {
        setTitle(inputText);
        onProductUpdate({ ...product, title: inputText });
      }
    },
    [title]
  );

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
          <h4>Title</h4>
          <Form.Control
            style={{
              minHeight: 40,
            }}
            className="form-control-sm custom-toggle-style"
            type="text"
            name="tablesearch"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => handleChange(e)}
            aria-label=".form-control-sm example"
          />
          <h6
            className="mt-1 text-gray"
            style={{
              fontSize: "0.9em",
              fontWeight: "normal",
            }}
          >
            {title.trim() === "" ? 0 : title.trim().split(/\s+/).length}/
            {maxWords} characters
          </h6>
        </div>
        <div className="mt-3">
          <h5>eBay site</h5>
          <div className="mt-1">
            <Select
              value={eBaySite}
              onChange={(selected) =>
                seteBaySite({
                  value: selected,
                  label: selected,
                })
              }
            />
          </div>
        </div>
        <div className="mt-3">
          <h5>Category</h5>
          <div className="d-flex align-items-center">
            <Form.Control
              style={{
                minHeight: 40,
                width: 350,
              }}
              className="form-control-sm custom-toggle-style"
              type="text"
              name="tablesearch"
              placeholder="Enter Category"
              defaultValue={category}
              aria-label=".form-control-sm example"
            />
            <div
              className="bg-white border d-flex align-items-center justify-content-center custom-toggle-style"
              style={{
                height: 40,
                width: 40,
                borderRadius: 5,
              }}
            >
              <HiOutlineTrash size={25} />
            </div>
          </div>
          <div className="d-flex mt-3 pa align-items-center">
            <Form.Check
              type="checkbox"
              id="default-checkbox"
              label={"Add 2nd Category"}
            />
            <Form.Check
              style={{ marginLeft: "10px" }}
              type="checkbox"
              defaultChecked
              id="default-checkbox"
              label={"Store Category"}
            />
          </div>
        </div>
        <div className="mt-3">
          <h5>Store Category</h5>
          <div className="d-flex align-items-center">
            {detail?.storeCategoryNames?.join(" / ") || "Null"}
          </div>
        </div>
        <div className="mt-3">
          <h5>2nd Category</h5>
          <div className="d-flex align-items-center">{"2nd Catgory"}</div>
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

export default TitleAndCategory;
