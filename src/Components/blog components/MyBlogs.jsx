import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import axios from "axios";
import { myblogsRoute } from "../utills/APIroutes";
import { useNavigate } from "react-router-dom";
const MyBlogs = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getMyAllPosts = async () => {
      const data = await axios.get(myblogsRoute, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
      });
      setPosts(data.data);
    };
    getMyAllPosts();
  }, []);

  return (
    <>
      <Container>
        <div className="blogsBox">
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return <Post {...post} key={index} />;
            })
          ) : (
            <h1>No Blogs To Show</h1>
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 80vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding-top: 90px;
  padding-bottom:10px;
  .blogsBox {
    width: 90%;
    height: auto;
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
    h1 {
      margin-top: 150px;
    }
  }

  @media (max-width:400px){
  .blogsBox {
    gap: .5rem;
    h1 {
      margin-top: 150px;
    }
  }
  }
`;

export default MyBlogs;
