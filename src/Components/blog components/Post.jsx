import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { host } from "../utills/APIroutes";
import "../Css/Post.css";

const Post = ({ title, summary, cover, createdAt, author, _id, category }) => {
  return (
    <>
      <div className="post-card">
        <div className="imgBox">
          <img src={`${host}/${cover}`} alt="" />
        </div>
        <div className="post-content">
            <h2 className="post-header">{title}</h2>
          <div className="info">
            <p className="name-date-feild">
              <span className="author">Author: {author}</span>
              <span className="date">
                {format(new Date(createdAt), "MMM d yyyy ,HH:mm")}
              </span>
            </p>
            <p className="category">Category - {category}</p>
          </div>
        </div>
        <div className="btn" >
          <Link to={`/post/${_id}`}>View Blog</Link>
        </div>
      </div>
    </>
  );
};

export default Post;
