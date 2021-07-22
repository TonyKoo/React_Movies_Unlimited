import React from "react";
import Select from "react-select";

import { Row, Col, Button, Form, FormControl } from "react-bootstrap";

function DiscoverSearchBar(props) {
  const thisYear = new Date().getFullYear();
  return (
    <Form onSubmit={props.handleSubmitClick}>
      <Row>
        <Col md={5} lg={6}>
          <Select
            isMulti
            placeholder="Select Genres ..."
            className="dropdown"
            isClearable={true}
            isSearchable={true}
            options={props.apiGenres}
            value={props.genresSelected}
            onChange={props.HandleGenrePreference}
          />
        </Col>
        <Col md={4} lg={{ span: 3 }}>
          <FormControl
            type="number"
            min={1920}
            max={thisYear}
            placeholder={`Search Year (1920 - ${thisYear})`}
            value={props.searchYear}
            onChange={props.handleSearchYearChange}
            onBlur={props.handleYearValidate}
          />
        </Col>
        <Col md={3} lg={{ span: 2, offset: 1 }}>
          <Button block type="submit" variant="success">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default DiscoverSearchBar;
