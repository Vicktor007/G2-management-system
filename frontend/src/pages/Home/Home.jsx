import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogout } from "../../components/protect/HiddenLink";
import useHomeRedirectDeletedUser from "../../customHook/useHomeRedirectDeletedUser";

const Home = () => {
  
  useHomeRedirectDeletedUser("/")
  
  

  return (
    <div className="home  displayflex-row">
      <section className="container  hero">
        <div className="hero-text">
          <h2 className="hero-h1">Inventory {"&"} Stock Management Solution</h2>
          <p className="hero-paragraph">
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
          <ShowOnLogout>
              <Link to="/register" className="--btn --btn-secondary">Free Trial 1 Month</Link>
            </ShowOnLogout>
          </div>
          <div className="--flex-start">
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>

        <div className="hero-image ">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;


