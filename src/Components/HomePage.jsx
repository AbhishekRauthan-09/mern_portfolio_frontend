import { React, useEffect, useRef } from "react";
import "./Css/HomePage.css";
import Img1 from "./Img/Img1.jpg";
import Img2 from "./Img/Img2.jpg";
import Img5 from "./Img/Img5.jpg";
import Img8 from "./Img/Img8.jpg";

import { NavLink} from "react-router-dom";

// Import Typed from typed.js
import Typed from "typed.js";

// Import Swiper and Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

const HomePage = () => {
  const el = useRef(null);
  const imgData = [Img8,Img1, Img2, Img5];

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["React developer", "NodeJS developer", "JavaScript developer"],
      startDelay: 300,
      typeSpeed: 100,
      backDelay: 50,
      backSpeed: 50,
      smartBackspace: true,
      showCursor: false,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="homePage">
      <div className="imgSection">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 8500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {/* <SwiperSlide></SwiperSlide> */}

          {imgData.map((val, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={val} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="textSection">
        <div className="textBox">
          <h1>Hi, I'm Abhishek Rauthan</h1>
          <h2>
            I'm a <span ref={el}></span>
          </h2>
          <p>
            I'm a software Developer based in India. I have a passion for
            building websites and applications. I love learning new technologies
            and I am always looking for new opportunities.
          </p>

          <div className="btns">
            <NavLink to="/myworks">My Works</NavLink>
            <NavLink to="/contact">Contact Me</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
