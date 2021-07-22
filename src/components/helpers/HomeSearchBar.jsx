import React from "react";
import Select from "react-select";
import { Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { selectionBoxPrefs, homePageDisplayOptions } from "../../config";

function HomeSearchBar(props) {
  return (
    <Form>
      <Row>
        <Col md={4} lg={3}>
          <FormControl
            type="text"
            placeholder="Search Movies..."
            value={props.searchTerm}
            onChange={props.handleSearchInput}
            onKeyDown={props.handleInputKeyPress}
          />
        </Col>
        <Col md={3} lg={2}>
          <Button
            block
            variant={props.searchButtonDisabled ? "secondary" : "primary"}
            disabled={props.searchButtonDisabled}
            onClick={props.handleClearSearchButton}
          >
            Clear Search
          </Button>
        </Col>
        <Col md={{ span: 5 }} lg={{ span: 3, offset: 4 }}>
          <Select
            className="dropdown"
            isClearable={selectionBoxPrefs.isClearable}
            isSearchable={selectionBoxPrefs.isSearchable}
            options={homePageDisplayOptions}
            defaultValue={homePageDisplayOptions[0]}
            onChange={props.handleListPreference}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default HomeSearchBar;
