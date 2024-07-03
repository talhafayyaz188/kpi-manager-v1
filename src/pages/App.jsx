import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/header/header";
import Sidebar from "../components/common/sidebar/sidebar";
import Switcher from "../components/common/switcher/switcher";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import Modalsearch from "../components/common/modalsearch/modalsearch";
// import Footer from "../components/common/footer/footer";
import store from "../redux/store";
import { AuthProvider } from "../context/auth";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { APIProvider } from "../context/APIContext";
import React from "react";

function App() {
  const [MyclassName, setMyClass] = useState("");

  const Bodyclickk = () => {
    if (localStorage.getItem("dashlotverticalstyles") == "icontext") {
      setMyClass("");
    }
    if (window.innerWidth > 992) {
      const html = document.documentElement;
      if (html.getAttribute("data-icon-overlay") === "open") {
        html.setAttribute("data-icon-overlay", "");
      }
    }
  };

  return (
    <APIProvider>
      <Fragment>
        <Toaster position="top-center" reverseOrder={false} />
        <Provider store={store}>
          <AuthProvider>
            <HelmetProvider>
              <Helmet
                htmlAttributes={{
                  lang: "en",
                  dir: "ltr",
                  "data-menu-styles": "dark",
                  "data-theme-mode": "light",
                  "data-nav-layout": "vertical",
                  "data-header-styles": "light",
                  "data-vertical-style": "overlay",
                  "data-loader": "disable",
                  "data-icon-text": MyclassName,
                }}
              />

              <Switcher />
              <div className="page">
                <Header />
                <Sidebar />
                <div className="main-content app-content" onClick={Bodyclickk}>
                  <Outlet />
                </div>
                {/* <Footer /> */}
              </div>
              <Modalsearch />
            </HelmetProvider>
          </AuthProvider>
        </Provider>
      </Fragment>
    </APIProvider>
  );
}

export default App;
