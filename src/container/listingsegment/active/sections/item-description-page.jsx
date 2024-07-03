import React, { useEffect, useRef, useState } from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import MonacoEditor from "@monaco-editor/react";
const ItemDescriptions = React.memo(({ detail }) => {
  const iframeRef = useRef(null);

  const [updateListingDescription, setupdateListingDescription] = useState(
    detail.listingDescription || ""
  );

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(detail.listingDescription);
      iframeDocument.close();
    }
  }, [detail.listingDescription]);

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{"item listing".toUpperCase()}</Accordion.Header>
        <Accordion.Body>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Live Preview">
              <div style={{ overflowY: "scroll", height: "100vh" }}>
                <iframe
                  ref={iframeRef}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="Listing Description"
                />
              </div>
            </Tab>
            <Tab eventKey={2} title="Edit Area">
              <MonacoEditor
                height={"70vh"}
                language="html"
                theme="vs-light"
                options={{
                  selectOnLineNumbers: true,
                  formatOnType: true,
                }}
                value={updateListingDescription}
                onChange={(updateListingDescription) =>
                  setupdateListingDescription(updateListingDescription)
                }
              />
            </Tab>
          </Tabs>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>SEO</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
});

export default ItemDescriptions;
