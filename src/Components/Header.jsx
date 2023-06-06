import React, { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Css/Header.css";
import LogoWeb from "./Img/LogoWeb.png";
import { UserContext } from "../userContext";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);


  useEffect(() => {
    const setUser = async () => {
      if (!localStorage.getItem("abhishek-rauthan")) {
        setUserInfo({})
      } else {
        const getuser = JSON.parse(localStorage.getItem("abhishek-rauthan"));
        console.log("userinfo is", userInfo);
        setUserInfo(getuser);
      }
    };
    setUser();
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
  };

  const logout = async () => {
    await localStorage.clear();
    setUserInfo({});
    toast.success("User logged out successfully", toastOptions);
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <div className="logoSection">
          <img src={LogoWeb} alt="" />
        </div>
        <div className="itemsSection">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/myblogs">Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>

            {userInfo._id ? (
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
