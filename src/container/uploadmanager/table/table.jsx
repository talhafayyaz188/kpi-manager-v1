import { Button, Pagination } from "react-bootstrap";
import React from "react";

const Table = () => {
  const tabledata = [
    {
      id: 1,
      date: "2024-05-02",
      _id: "12121",
    },
    {
      id: 2,
      date: "2024-05-02",
      _id: "12121",
    },
  ];

  return (
    <div>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Date</th>
              <th scope="col">#ID</th>
            </tr>
          </thead>
          <tbody>
            {tabledata.map((element, index = 0) => {
              index = index + 1;
              return (
                <tr key={index}>
                  <td
                    style={{
                      width: 70,
                    }}
                  >
                    <div className="d-flex align-items-center text-center justify-content-center">
                      <h6 className="text-center">{element.id}</h6>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <h6 className="text-justify">{element.date}</h6>
                    </div>
                  </td>
                  <td>
                    <h6 className="text-center">{element._id}</h6>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end">
                      <div className="min-w-fit-content d-flex align-items-center">
                        <div className="flex-grow-1 py-2-5 btn-list">
                          <Button
                            className="btn btn-primary mb-sm-0 me-0"
                            role="button"
                          >
                            <i className="fe fe-download me-1"></i> Download
                            Report
                          </Button>
                          <Button
                            className="btn btn-secondary mx-2 mb-sm-0"
                            role="button"
                          >
                            <i className="fe fe-edit me-1"></i> Edit
                          </Button>
                          <Button
                            className="btn btn-danger mb-sm-0"
                            role="button"
                          >
                            <i className="fe fe-delete me-1"></i> Delete Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: 10,
          }}
        >
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Table;
