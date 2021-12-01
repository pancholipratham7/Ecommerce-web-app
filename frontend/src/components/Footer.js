import React from "react";
import CopyRight from "@material-ui/icons/Copyright";
import "./Footer.css";

const Footer = () => {
  return (
    <section className="footer-section">
      <footer className="footer-container">
        <span>Copyright&nbsp;</span>
        <CopyRight />
        <span>&nbsp;ShopZilla</span>
      </footer>
    </section>
  );
};

export default Footer;
