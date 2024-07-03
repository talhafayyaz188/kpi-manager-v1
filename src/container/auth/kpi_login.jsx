import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
//IMAGE IMPORTS
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import React from "react";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const KPILogin = () => {
  const { dispatch } = useAuth();
  const [isSubmit, setisSubmit] = useState(true);
  const [loginError, setloginError] = useState("");
  const {
    errors,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    values,
    setErrors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setisSubmit(false);
      if (errors.email && errors.password) {
        setisSubmit(true);
      }
      try {
        const response = await fetch("https://datapanel.x10car.parts/login/", {
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok || !data) {
          throw new Error(data.message || "Login failed");
        }
        localStorage.setItem("token", data.token);
        dispatch({ type: "USER", payload: data.token });
        window.location.replace(
          `${import.meta.env.BASE_URL}ecommerce/dashboard`
        );
        toast.success("KPI Manager Logged-in Successfully!");
      } catch (error) {
        let errorMessage = "An error occurred while logging in.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setloginError(errorMessage);
      } finally {
        setisSubmit(false);
      }
    },
  });

  return (
    <>
      <div className="main-content page main-error-page justify-content-center">
        <div className="container">
          <Row>
            <Col
              md={6}
              xl={5}
              className="justify-content-center mx-auto text-center"
            >
              <Card className="overflow-hidden">
                <div className="row g-0">
                  <div className="col-12">
                    <Card.Body>
                      <Card.Title className="text-center fw-500 mb-3">
                        KPI LOGIN
                      </Card.Title>
                      <form onSubmit={handleSubmit}>
                        <Form.Group className="form-group">
                          <Form.Control
                            type="email"
                            value={values.email}
                            onChange={(e) => {
                              handleChange(e);
                              setloginError("");
                              if (e.target.value === "") {
                                setErrors({ ...errors, email: "" });
                              }
                            }}
                            onBlur={handleBlur}
                            placeholder="Email"
                            id="email"
                          />
                        </Form.Group>
                        {errors.email && touched.email ? (
                          <Alert variant="danger">{errors.email}</Alert>
                        ) : null}
                        <Form.Group className="form-group">
                          <Form.Control
                            value={values.password}
                            onChange={(e) => {
                              handleChange(e);
                              setloginError("");
                              if (e.target.value === "") {
                                setErrors({ ...errors, password: "" });
                              }
                            }}
                            onBlur={handleBlur}
                            type="password"
                            id="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                        {errors.password && touched.password ? (
                          <Alert variant="danger">{errors.password}</Alert>
                        ) : null}
                        {loginError && (
                          <Alert variant="warning">{loginError}</Alert>
                        )}
                        <div>
                          {isSubmit ? (
                            <Button
                              type="submit"
                              role="button"
                              className="btn btn-success btn-block"
                            >
                              SignIn
                            </Button>
                          ) : (
                            <Button
                              role="button"
                              variant="light"
                              className="btn btn-block"
                            >
                              <Spinner
                                animation="border"
                                variant="info"
                                size="sm"
                              />
                            </Button>
                          )}
                        </div>
                      </form>
                      <hr className="divider" />
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>{" "}
    </>
  );
};

export default KPILogin;
