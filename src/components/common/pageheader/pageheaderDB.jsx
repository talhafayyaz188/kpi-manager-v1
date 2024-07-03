import { Breadcrumb } from "react-bootstrap";
import React from "react";

const PageheaderDB = (props) => {
  return (
    <>
      <div className="page-header">
        <nav aria-label="breadcrumb" className="my-auto flex-grow-1 py-2-5">
          <Breadcrumb className="breadcrumb mb-0">
            <Breadcrumb.Item className="text-primary">
              {props.heading}
            </Breadcrumb.Item>
            <Breadcrumb.Item active aria-current="page">
              {props.active}
            </Breadcrumb.Item>
            <Breadcrumb.Item active aria-current="page">
              {props.id}
            </Breadcrumb.Item>
          </Breadcrumb>
        </nav>
      </div>
    </>
  );
};

export default PageheaderDB;
