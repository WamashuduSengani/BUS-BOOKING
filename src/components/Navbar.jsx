import React, { useEffect, useState } from "react";
import logo from "../assets/bus_logo.png";
import "./styles/Navbar/Navbar.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const [windowBool, setWindowBool] = useState(window.innerWidth <= 700);
  const [toggleBool, setToggleBool] = useState(false);
  const [styles, setStyles] = useState({ display: "none" });

  useEffect(() => {

    function handleResize() {
      setWindowBool(window.innerWidth <= 700)
    }

    if (window.innerWidth > 700) {
      setToggleBool(false)
      setStyles({ display: "flex" });
    } else {
      setToggleBool(true)
      setStyles({ display: "none" });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowBool]);

  function handleOpen() {
    const bool = false
    setToggleBool(bool)
    handleStyles(bool)
  }

  function handleClose() {
    const bool = true
    setToggleBool(bool)
    handleStyles(bool)
  }

  function handleStyles() {
    if (toggleBool) {
      setStyles({ display: "flex" });
    } else {
      setStyles({ display: "none" });
    }
  }

  return (
    <nav>
      <ul>
        <img src={logo} />
        <li style={styles}>
          <NavLink to={"#"}>Book Now</NavLink>
        </li>
        <li style={styles}>
          <NavLink to={"#"}>About Us</NavLink>
        </li>
        <li style={styles}>
          <NavLink to={"#"}>View Coaches</NavLink>
        </li>
      </ul>
      {windowBool ? (
        toggleBool ? (
          <FontAwesomeIcon onClick={handleOpen} icon={faBars} />
        ) : (
          <FontAwesomeIcon onClick={handleClose} icon={faXmark} />
        )
      ) : (
        ""
      )}
    </nav>
  );
}
