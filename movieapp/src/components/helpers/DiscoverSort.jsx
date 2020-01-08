import React from "react";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import { discoverSortOptions } from "../../config";

function DiscoverSort(props) {
  return (
    <React.Fragment>
      <Row>
        <Col md={{ span: 4, offset: 8 }} lg={{ span: 3, offset: 9 }}>
          <div className="sort-select">
            <Select
              isClearable={false}
              isSearchable={false}
              className="dropdown"
              options={discoverSortOptions}
              value={props.sortOption}
              onChange={props.handleSortChange}
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default DiscoverSort;
