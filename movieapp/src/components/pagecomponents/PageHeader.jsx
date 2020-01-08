import React from "react";
import { Row } from "react-bootstrap";

function PageHeader(props) {
  return (
    <Row className="justify-content-center">
      <h1>{props.header_text}</h1>
    </Row>
  );
}

export default PageHeader;
