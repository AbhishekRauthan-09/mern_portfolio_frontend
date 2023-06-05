import React, { useState } from "react";
import "./Css/ContactPage.css";
import { Link } from "react-router-dom";
import { messageRoute } from "./utills/APIroutes";
import axios from "axios";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [showPopUp, setShowPopUp] = useState({
    show: "",
    message: "",
    color: "",
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
  };

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = user;

    if (name.length < 3) {
      toast.error('Name Length Should not be less than 3',toastOptions)
    } else if (email.search("@gmail.com") === -1) {
      toast.error("Please enter a valid email" , toastOptions)
    } else if (isNaN(phone) || phone.length !== 10) {
      toast.error("Please enter a valid phone number",toastOptions)
      
    } else if (message.length < 5) {
      toast.error("Message Length Should not be less than 5" , toastOptions)
    } else {
      const res = await axios.post(messageRoute, user);
      if (res.data.success === true) {
        toast.success(res.data.msg, toastOptions);
        setUser({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
      else{
        toast.error(res.data.msg, toastOptions);
      }
    }
  };

  return (
    <div className="contactPage">
      <div className="contactBox">
        <h1>Contact Me</h1>
        <div className="txtBox">
          <p>
            <span className="heading">Mobile No :</span>

            <span>
              <Link target="_blank" to="tel:7668983758">
                7668983758
              </Link>
            </span>
          </p>
          <p>
            <span className="heading">Email:</span>

            <span>
              <Link
                target="_blank"
                to="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=abhishekrauthan733@gmail.com"
              >
                abhishekrauthan733@gmail.com
              </Link>
            </span>
          </p>
          <p>
            <span className="https://www.facebook.com/profile.php?id=100045316119224">
              facebook:
            </span>

            <span>
              <Link
                target="_blank"
                to="https://www.facebook.com/profile.php?id=100045316119224"
              >
                Go to FB profile
              </Link>
            </span>
          </p>
          <p>
            <span className="heading">GitHub link:</span>
            <span>
              <Link target="_blank" to="https://github.com/">
                GitHub Link
              </Link>
            </span>
          </p>
        </div>

        <div className="logoBox">
          <div className="items">
            <Link to="https://github.com/" target="_blank">
              <ion-icon name="logo-github"></ion-icon>
            </Link>
            <p>GitHub</p>
          </div>

          <div className="items">
            <Link
              to="https://www.facebook.com/profile.php?id=100045316119224"
              target="_blank"
            >
              <ion-icon name="logo-facebook"></ion-icon>
            </Link>
            <p>Facebook</p>
          </div>

          <div className="items">
            <Link
              to="https://www.linkedin.com/in/abhishek-rauthan-9223b1229/"
              target="_blank"
            >
              <ion-icon name="logo-linkedin"></ion-icon>
            </Link>
            <p>Linkdin</p>
          </div>

          <div className="items">
            <Link
              to="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=abhishekrauthan733@gmail.com"
              target="_blank"
            >
              <ion-icon name="mail"></ion-icon>
            </Link>
            <p>Gmail</p>
          </div>
        </div>
      </div>

      <div className="messageBox">
        <h3>Message Me</h3>
        <form method="POST">
          <div className="boxes">
            <span>Enter Your Name :</span>
            <input
              type="text"
              name="name"
              autoComplete="new-password"
              value={user.name}
              onChange={getUserData}
              required
            />
          </div>
          <div className="boxes">
            <span>Enter Your Email :</span>
            <input
              type="text"
              name="email"
              autoComplete="new-password"
              value={user.email}
              onChange={getUserData}
              required
            />
          </div>
          <div className="boxes">
            <span>Enter Your Mobile Number :</span>
            <input
              type="text"
              name="phone"
              autoComplete="new-password"
              value={user.phone}
              onChange={getUserData}
              required
            />
          </div>
          <div className="boxes">
            <span>Write Your Message :</span>
            <input
              type="text"
              name="message"
              autoComplete="new-password"
              value={user.message}
              onChange={getUserData}
              required
            />
          </div>

          <button onClick={postData}>Submit</button>
        </form>
      </div>

      {showPopUp.show ? (
        <div
          className="popUpBox"
          style={{ backgroundColor: `${showPopUp.color}`, color: "#000" }}
        >
          <span>{showPopUp.message}</span>
        </div>
      ) : null}
    </div>
  );
};

export default ContactPage;
