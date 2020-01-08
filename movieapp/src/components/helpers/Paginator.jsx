import React from "react";
import { Row } from "react-bootstrap";
import Pagination from "rc-pagination";
import LOCALE from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";

function Paginator(props) {
  const textItemRender = (current, type, element) => {
    if (type === "prev") {
      return "Prev";
    }
    if (type === "next") {
      return "Next";
    }
    return element;
  };
  return (
    <React.Fragment>
      <Row>
        <Pagination
          defaultPageSize={20}
          hideOnSinglePage={true}
          locale={LOCALE}
          itemRender={textItemRender}
          onChange={props.onChange}
          current={props.currentPage}
          total={props.totalItems}
        />
      </Row>
    </React.Fragment>
  );
}

export default Paginator;