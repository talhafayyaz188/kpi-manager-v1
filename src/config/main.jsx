import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../pages/App";
import "../index.scss";
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider, useAuth } from "../context/auth";
import Ecdashboard from "../container/ecommerce/dashboard/ecdashboard";
import KPILogin from "../container/auth/kpi_login";
import UploadManager from "../container/uploadmanager/uploadmanager";
import ActiveListing from "../container/listingsegment/active/active-listing";
import EndedListing from "../container/listingsegment/ended/ended-listing";
import ActiveditDetails from "../container/listingsegment/active/edit/edit-details";
// import CrmDashboard from '../container/crm/dashboard/crmdashboard';

const AppMain = () => {
  const { state } = useAuth();

  return (
    <React.Suspense>
      <Routes>
        {/* <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
  <Route index element={<CrmDashboard />} />
      <Route  path={`${import.meta.env.BASE_URL}crm/crmdashboard`} element={<CrmDashboard />} />
      </Route> */}

        {/* Main Layout */}
        <Route
          path={`${import.meta.env.BASE_URL}`}
          key={Math.random()}
          element={<App />}
        >
          {/* KPI Modules Layout */}
          <Route
            path={`${import.meta.env.BASE_URL}ecommerce/dashboard`}
            element={
              state ? (
                <Ecdashboard />
              ) : (
                <Navigate
                  to={`${import.meta.env.BASE_URL}ecommerce/KPI_Login`}
                />
              )
            }
          />
          <Route
            path={`${import.meta.env.BASE_URL}ecommerce/KPI_Login`}
            element={
              !state ? (
                <KPILogin />
              ) : (
                <Navigate
                  to={`${import.meta.env.BASE_URL}ecommerce/dashboard`}
                />
              )
            }
          />
          <Route
            path={`${import.meta.env.BASE_URL}uploadmanager`}
            element={<UploadManager />}
          />
          <Route
            path={`${import.meta.env.BASE_URL}listing-segments/active`}
            element={<ActiveListing />}
          />
          <Route
            path={`${import.meta.env.BASE_URL}listing-segments/active/:id`}
            element={<ActiveditDetails />}
          />
          <Route
            path={`${import.meta.env.BASE_URL}listing-segments/ended`}
            element={<EndedListing />}
          />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Fragment>
    <AuthProvider>
      <BrowserRouter>
        <AppMain />
      </BrowserRouter>
    </AuthProvider>
  </Fragment>
);
