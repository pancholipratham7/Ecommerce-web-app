import React from "react";
import { Alert } from "react-bootstrap";
const Message = (props) => {
  return (
    <Alert variant={props.variant ? props.variant : "danger"}>
      {props.children}
    </Alert>
  );
};

export default Message;
