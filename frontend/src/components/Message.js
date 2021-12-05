import React from "react";
import { Alert } from "react-bootstrap";
const Message = (props) => {
  return <Alert variant="danger">{`ERROR💥💥 :  ${props.errorMsg}`}</Alert>;
};

export default Message;
