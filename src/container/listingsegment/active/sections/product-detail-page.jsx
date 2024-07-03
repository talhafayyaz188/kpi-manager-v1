import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import CardImage from "../card/card";
import Select from "react-select";

const ProductDetail = React.memo(
  ({
    product,
    detail,
    condition,
    conditionDescription,
    onConditonChange,
    onConditionDescriptionChange,
  }) => {
    const match = product?.title?.match(/\b[A-Z]+\b/);
    const extractedWord = match ? match[0] : "No uppercase word found";

    const [Hersteller, setHersteller] = useState({
      value: extractedWord,
      label: extractedWord,
    });
    const [sku, setSku] = useState(detail.sku || "");
    const [Condition, setCondition] = useState({
      value: condition,
      label: condition,
    });

    const conditionOptions = [
      {
        value: "used excellent".toUpperCase(),
        label: "used excellent".toUpperCase(),
      },
      {
        value: "new".toUpperCase(),
        label: "new".toUpperCase(),
      },
    ];

    const [condition_description, setCondition_description] = useState(
      conditionDescription || ""
    );
    const [ean, setean] = useState(product?.ean || "");
    const maxWords = 80;

    const handleChange = (event) => {
      const inputText = event.target.value;
      const words = inputText.trim().split(/\s+/); // Split input by whitespace
      if (words.length <= maxWords || inputText === "") {
        setSku(inputText);
      }
    };

    const handleConditionDescriptionChange = (e) => {
      const inputText = e.target.value;
      setCondition_description(inputText);
      onConditionDescriptionChange(inputText);
    };

    const handleConditionChange = (selected) => {
      setCondition({
        value: selected.value,
        label: selected.label,
      });
      onConditonChange(selected.value);
    };

    const data = product?.aspects;

    const options = data
      ? Object.entries(data).map(([key, values]) => ({
          label: key,
          options: (values || []).map((value) => ({ value, label: value })),
        }))
      : [];

    const [selectedOptions, setSelectedOptions] = useState(() => {
      const initialSelectedOptions = {};
      options.forEach(({ label, options }) => {
        initialSelectedOptions[label] = options.map((option) => option.value);
      });
      return initialSelectedOptions;
    });

    const handleChangeOptions = (selectedValues, { name }) => {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [name]: selectedValues.map((option) => option.value),
      }));
    };

    return (
      <div
        className="d-flex justify-content-between flex-wrap"
        style={{
          marginBottom: "100px",
        }}
      >
        <div
          style={{
            minWidth: "800px",
            padding: "10px",
          }}
        >
          <div>
            <h4>Item Specs</h4>
            <div
              style={{
                width: "50%",
              }}
            >
              <Select
                value={Condition}
                options={conditionOptions}
                onChange={handleConditionChange}
              />
            </div>
          </div>
          <div className="mt-3">
            <h5>Condition Description</h5>
            <Form.Control
              as="textarea"
              rows={4}
              value={condition_description}
              onChange={(e) => handleConditionDescriptionChange(e)}
              style={{
                width: "50%",
              }}
            />
          </div>
          <div className="mt-3">
            <h5>SKU Custom Label (optional)</h5>
            <Form.Control
              style={{
                minHeight: 40,
                width: "50%",
              }}
              className="form-control-sm custom-toggle-style"
              type="text"
              name="tablesearch"
              placeholder="Enter SKU"
              value={sku}
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
              {sku === "" ? 0 : sku.length}/{maxWords} characters
            </h6>
            <div className="mt-3">
              <h5>UPC</h5>
              <Form.Control
                style={{
                  minHeight: 40,
                  width: "50%",
                }}
                className="form-control-sm custom-toggle-style mt-3"
                type="text"
                name="tablesearch"
                placeholder="Enter UPC"
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mt-3">
              <h5>EAN</h5>
              <Form.Control
                style={{
                  minHeight: 40,
                  width: "50%",
                }}
                className="form-control-sm custom-toggle-style mt-3"
                type="text"
                name="tablesearch"
                placeholder="Enter EAN"
                value={ean}
                onChange={(e) => setean(e.target.value)}
                aria-label=".form-control-sm example"
              />
            </div>
          </div>
          <div className="mt-3">
            <h5>Hersteller</h5>
            <div
              style={{
                width: "50%",
              }}
            >
              <Select
                value={Hersteller}
                onChange={(selectedValue) =>
                  setHersteller({
                    value: selectedValue,
                    label: selectedValue,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-3" style={{ width: "80%" }}>
            <Accordion defaultActiveKey={["1"]} alwaysOpen>
              <Accordion.Item eventKey="1" className=" custom-toggle-style-2">
                <Accordion.Header>Optional Item Specifics</Accordion.Header>
                <Accordion.Body>
                  <div>
                    <div
                      style={{
                        width: "60%",
                      }}
                    >
                      {options.map(({ label, options }) => {
                        return (
                          <div key={label}>
                            <h5 className="text-black mt-5">{label}</h5>
                            <Select
                              name={label}
                              options={options}
                              onChange={handleChangeOptions}
                              isMulti
                              value={options.filter((option) =>
                                selectedOptions[label].includes(option.value)
                              )}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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

export default ProductDetail;
