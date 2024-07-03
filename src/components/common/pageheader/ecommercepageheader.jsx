import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
// import { Link } from 'react-router-dom';

const Pageheaderecommerce = (props) => {
  const { dispatch } = useAuth();
  return (
    <>
      <div className="page-header">
        <div className="flex-grow-1 py-2-5">
          <h4 className="page-title mb-1">{props.title}</h4>
          <nav aria-label="breadcrumb">
            <Breadcrumb className="breadcrumb mb-0">
              <Breadcrumb.Item href="#" className="text-primary">
                {props.heading}
              </Breadcrumb.Item>
              <Breadcrumb.Item active aria-current="page">
                {props.active}
              </Breadcrumb.Item>
            </Breadcrumb>
          </nav>
        </div>
        <div className="min-w-fit-content d-flex align-items-center">
          <div className="vr mx-3"></div>
          <div className="flex-grow-1 py-2-5">
            <a
              className="btn btn-primary"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch({ type: "USER", payload: null });
                window.location.reload();
                toast.success("KPI manager Log-out Successfully!");
              }}
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i> LOG OUT
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Pageheaderecommerce;
