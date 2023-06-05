import React from "react";
import Card from "./Card";
import "./Css/MyWorksPage.css";
import Data from "./Data/ImgData";

const MyWorksPage = () => {
  return (
    <>
      <div className="myWorksPage">
        <div className="container">
          {Data.length ? (
            Data.map((item, index) => {
              return (
                <Card
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  url={item.url}
                  key={index}
                />
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "#5b19d2",
              }}
            >
              <h1>No Works to Show</h1>
              <h1>Developer Will Post his Work soon</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyWorksPage;
