import {
  Row,
  Card,
  Button,
  Col,
  Form,
  Dropdown,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Fragment } from "react/jsx-runtime";
import PageheaderDB from "../../components/common/pageheader/pageheaderDB";
import Table from "./table/table";
import React from "react";

const UploadManager = () => {
  const renderTooltip = (props) => (
    <Popover id="popover-basic" {...props}>
      <Popover.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>Automated upload</div> <div>time</div> <div>Manual</div>
        </div>
      </Popover.Body>
    </Popover>
  );
  const renderTooltip2 = (props) => (
    <Popover id="popover-basic" {...props}>
      <Popover.Header as="h3">Instructions</Popover.Header>
      <Popover.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            format for sql{" "}
            <div
              style={{
                border: "1px solid #ccc",
                padding: "4px",
                borderRadius: 12,
                textAlign: "center",
                width: 80,
                marginLeft: "2px",
              }}
            >
              Sample.sql
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            format for mongodb{" "}
            <div
              style={{
                border: "1px solid #ccc",
                padding: "4px",
                borderRadius: 12,
                textAlign: "center",
                width: 80,
                marginLeft: "2px",
              }}
            >
              Sample.json
            </div>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <Fragment>
        <PageheaderDB heading="Upload" active="Manager" />
        <div className="main-container container-fluid">
          <Row>
            <Card>
              <Card.Header>Upload Section and Connect Database</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Import (.csv) file</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    {" "}
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Import Excel (.xlsx) file</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    {" "}
                    <div
                      style={{
                        marginTop: "1.85rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            Connect Database
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Sql</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">
                              MongoDB
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip2}
                        >
                          <i
                            className="m-2 fa fa-question-circle"
                            style={{
                              cursor: "pointer",
                            }}
                            aria-hidden="true"
                          ></i>
                        </OverlayTrigger>

                        <Button
                          className="btn btn-primary mb-sm-0 me-0"
                          role="button"
                        >
                          <i className="fe fe-download me-1"></i> Import
                          Schedule
                        </Button>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <i
                            className="m-2 fa fa-question-circle"
                            style={{
                              cursor: "pointer",
                            }}
                            aria-hidden="true"
                          ></i>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Header>
                  <Card.Title>Report Table</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="deleted-table table-responsive">
                    <div className="text-center"></div>
                    <Table />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    </>
  );
};

export default UploadManager;
