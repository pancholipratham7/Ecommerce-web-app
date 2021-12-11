import React from "react";
import { Alert } from "react-bootstrap";
const Message = (props) => {
  return (
    <Alert
      style={{
        height: "2.6rem",
        display: "flex",
        alignItems: "center",
        border: "none",
      }}
      variant={props.variant ? props.variant : "danger"}
    >
      {props.children}
    </Alert>
  );
};

export default Message;
