import React from "react";
import CopyRight from "@material-ui/icons/Copyright";
import "./Footer.css";

const Footer = () => {
  return (
    <section className="footer-section">
      <footer className="footer-container">
        <span>Copyright</span>
        <CopyRight />
        <span>ShopZilla</span>
      </footer>
    </section>
  );
};

export default Footer;
