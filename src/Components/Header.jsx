import React, { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Css/Header.css";
import LogoWeb from "./Img/LogoWeb.png";
import { UserContext } from "../userContext";
import { profileinfoRoute, logoutUserRoute } from "./utills/APIroutes";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const res = await axios.get(profileinfoRoute, {
        method: "GET",
        withCredentials: true,
      });
      if (res.data.id) {
        setUserInfo(res.data);
      }
    };
    isUserLoggedIn();
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
  };

  const logout = async () => {
   const res = await axios.post(
      logoutUserRoute,
      {},
      { method: "POST", withCredentials: true }
    );
    toast.success(res.data.msg, toastOptions);
    console.log("user logged out");
    setUserInfo({});
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

            {userInfo.id ? (
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
