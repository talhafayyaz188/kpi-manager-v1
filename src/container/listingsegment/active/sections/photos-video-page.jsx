import React, { useRef, useState } from "react";
import { Accordion, Alert, Button, Form, Modal } from "react-bootstrap";
import { FiAlertCircle } from "react-icons/fi";
import { FaDownload, FaUpload } from "react-icons/fa6";
import { IoIosRemoveCircle } from "react-icons/io";
import Select from "react-select";
import DraggableImage from "../dragable/dragable-image";
const PhotosAndVideos = React.memo(({ product }) => {
  const fileInputRef = useRef(null);
  const [showUrlModal, setShowUrlModal] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");

  const [images, setImages] = useState([
    {
      id: "img1",
      src: "https://via.placeholder.com/150",
      alt: "Placeholder Image 1",
    },
    {
      id: "img2",
      src: "https://via.placeholder.com/150",
      alt: "Placeholder Image 2",
    },
    {
      id: "img3",
      src: "https://via.placeholder.com/150",
      alt: "Placeholder Image 3",
    },
  ]);

  const handleEdit = (id) => {
    alert(`Edit image with id: ${id}`);
  };

  const handleDelete = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const [host, sethost] = useState({
    value: "Vendor Host",
    label: "Vendor Host",
  });

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
    }
  };

  const handleUrlUpload = () => {
    setShowUrlModal(true);
  };

  const handleUrlSubmit = () => {
    // console.log("URL submitted:", imageUrl);
    // Handle the URL upload
    setShowUrlModal(false);
  };

  const handleGalleryOpen = () => {
    // console.log("Open images gallery");
    fileInputRef.current.click();
    // Redirect to images gallery
  };
  return (
    <div
      className="mt-2 d-flex flex-column"
      style={{
        marginBottom: "60px",
      }}
    >
      <Alert variant="primary">
        <div
          className="d-flex justify-content-around align-items-center"
          style={{
            width: 600,
            padding: "5px",
          }}
        >
          <div>
            <FiAlertCircle size={40} />
          </div>
          <div
            style={{
              fontSize: "1.25em",
            }}
          >
            <div className="mt-2">
              The minimum size for images on eBay is 500 x 500 pixels.
            </div>
            <div className="mt-2">
              The maximum size image is 9000 x 9000 pixels.
            </div>
            <div className="mt-2">
              The maximum file size is 12MB. eBay allows upto 24 images in list.
            </div>
          </div>
        </div>
      </Alert>
      <div className="mt-4">
        <h4>Image Host</h4>
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ width: 300 }}
        >
          <div
            style={{
              width: "200px",
            }}
          >
            <Select
              value={host}
              onChange={(value) =>
                sethost({
                  value: value,
                  label: value,
                })
              }
            />
          </div>
          <div>
            <a href="" className="text-primary px-2">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex-grow-1 mt-3"
        // style={{ height: "calc(100% - 50px)", overflowY: "scroll" }}
        // className="mt-2"
        style={{ overflowY: "auto" }}
      >
        <Accordion defaultActiveKey={["1"]} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header>eBay gallery pictures</Accordion.Header>
            <Accordion.Body>
              <div>
                <div className="mt-1">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Button
                    className="m-1"
                    style={{
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    }}
                    onClick={handleFileUpload}
                  >
                    <FaUpload size={16} className="mb-1" />
                    <span className="px-2">Upload Photo from Computer</span>
                  </Button>
                  <Button
                    className="m-1"
                    onClick={handleUrlUpload}
                    style={{
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    }}
                  >
                    <FaUpload size={16} className="mb-1" />
                    <span className="px-2">Upload Photo from URI</span>
                  </Button>
                  <Button
                    className="m-1"
                    onClick={handleGalleryOpen}
                    style={{
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    }}
                  >
                    <FaUpload size={16} className="mb-1" />
                    <span className="px-2">Images Gallery</span>
                  </Button>

                  <Modal
                    show={showUrlModal}
                    onHide={() => setShowUrlModal(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Enter Photo URL</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="formPhotoUrl">
                          <Form.Label>Photo URL</Form.Label>
                          <Form.Control
                            type="url"
                            placeholder="Enter photo URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowUrlModal(false)}
                      >
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleUrlSubmit}>
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="mt-2">
                  <div className="m-1 d-flex flex-wrap gap-3">
                    {product?.imageUrls?.map((image, index) => {
                      return (
                        <div key={index}>
                          <DraggableImage
                            key={index}
                            id={index}
                            src={image}
                            alt={image}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="text-dark"
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <h4 className="m-1">Choose Image</h4>
                  <div className="m-1">
                    <Form.Group
                      controlId="formFileMultiple"
                      className="mb-3 mt-3"
                    >
                      <Form.Control type="file" multiple accept="image/*" />
                    </Form.Group>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    className="m-1"
                    style={{
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    }}
                  >
                    <FaDownload size={16} className="mb-1" />
                    <span className="px-2">Download All Photos</span>
                  </Button>
                  <Button
                    className="m-1"
                    style={{
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    }}
                  >
                    <IoIosRemoveCircle size={20} className="mb-1" />
                    <span className="px-2">Remove All Photos</span>
                  </Button>
                  <p className="mt-2 text-dark">
                    In case your photos are being rotated, please follow this
                    <span
                      style={{
                        marginLeft: 3,
                      }}
                    >
                      <a href="#" className="text-primary">
                        quick fix
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
});

export default PhotosAndVideos;
