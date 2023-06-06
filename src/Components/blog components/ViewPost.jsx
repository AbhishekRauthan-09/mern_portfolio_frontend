import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewpostRoute, host } from "../utills/APIroutes";
import styled from "styled-components";
import { UserContext } from "../../userContext";
import { useNavigate } from "react-router-dom";
import { deleteRoute } from "../utills/APIroutes";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { format } from "date-fns";

const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
};

const ViewPost = () => {
  const navigate = useNavigate();
  const { userInfo , setUserInfo} = useContext(UserContext);
  const [postInfo, setPostInfo] = useState({});
  const { id } = useParams();
  console.log("id is", id)


  useEffect(() => {
    const setUser = async () => {
      if (!localStorage.getItem("abhishek-rauthan")) {
        navigate("/login");
      } else {
        const getuser = JSON.parse(localStorage.getItem("abhishek-rauthan"));
        // setCurrentUser(getuser);
        console.log("userinfo is",userInfo);
        setUserInfo(getuser);
      }
    };
    setUser();
  }, []);

  useEffect(() => {
    const showPost = async () => {
      const url = `${viewpostRoute}/${id}`;
      const post = await axios.get(url);
      setPostInfo(post.data);
    };
    showPost();
  }, []);

  const editPost = () => {
    navigate("/editpost", { state: postInfo });
  };

  const deletePost = async () => {
    const res = await axios.post(deleteRoute, { id: postInfo._id });
    if (res.data.success !== false) {
      toast.success(res.data.msg, toastOptions);
      navigate("/myblogs");
    } else {
      toast.error(res.data.msg, toastOptions);
    }
  };
  if (!postInfo) return "";

  const time = postInfo.createdAt;
  return (
    <Container>
      {postInfo && (
        <div className="postContainer">
          <div className="postDetail">
            <h1>{postInfo.title}</h1>
            <p className="name-date-feild">
              <span>Author:{postInfo.author}</span>
              <span>
                {time !== undefined && format(new Date(postInfo.createdAt), "MMM d yyyy ,HH:mm")}
              </span>
            </p>
            <p className="category">Category - {postInfo.category}</p>
            {userInfo._id === postInfo.createrId && (
              <>
                <div className="btns">
                  <Button variant="outlined" onClick={editPost}>
                    Edit Post
                  </Button>
                  <Button
                    variant="contained"
                    onClick={deletePost}
                    className="deleteBtn"
                  >
                    Delete Post
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="imgBox">
            {
              postInfo.cover !== undefined &&
              <img src={`${host}/${postInfo.cover}`} alt="" />
            }
          </div>

          <div className="contentBox">
            <p className="summary">{postInfo.summary}</p>

            <div
              className="post-html-content"
              dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 8px;
  padding-top:80px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .postContainer {
    width: 90%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .postDetail {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 35px;
      h1 {
        font-size: 2.2rem;
        text-align: center;
        color:#35343bd6
        text-transform: capitalize;
      }
      .name-date-feild {
        display: flex;
        gap: 1rem;
        color: #1f1717bf;
        font-size: 1.1rem;
      }
      .category {
        color: #03a9f4;
        font-size: 1.1rem;
        margin-bottom: 8px;
      }
      .btns {
        margin: 4px 0;
        button {
          margin: 0 8px;
        }
        .deleteBtn {
          background-color: #e13333d1;
        }
      }
    }
    .imgBox {
      height: 65vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      object-fit: cover;
      margin-top:5px;
      img {
        height: 95%;
        width: 80%;
        object-fit: contain;
      }
    }
    .contentBox {
      width:80%;
      margin-top: 30px;
      
      p{
        font-size:1.2rem;
        font-weight:300;
        margin:10px 0;
        line-height:25px;
      }
      img{
        height:50vh;
        width:auto;
        display:block;
        margin:0 auto;
      }
      h1{
        font-size:2.2rem;
      }
      h2{
        font-size:2rem;
        font-weight:800;
      }
      h3{
        font-size:1.8rem;
      }
      .summary{
        font-size:1.2rem;
        font-style:italic;
        text-align:center;
        margin-bottom:40px;
        background: #27242414;
        padding: 10px;
        border-radius: 12px;
      }
    }
  }
  @media (max-width:920px){
    padding: 15px 8px;
    .postContainer {
      .postDetail {
        margin-top: 25px;
        h1 {
          font-size: 1.8rem;
        }
        .name-date-feild {
          font-size: 1rem;
          margin-top:5px;
        }
        .category {
          font-size: 1rem;
        }
        .btns {
          button {
            margin: 0 5px;
            padding:3px 5px;
            font-size:.8rem;
          }
        }
      }
      .imgBox {
        height: 45vh;
        width: 100%;
        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
      .contentBox {
        width:80%;
        margin-top: 22px;
        p{
          font-size:1rem;
          margin:10px 0;
          line-height:25px;
        }
        h1{
          font-size:2rem;
        }
        h2{
          font-size:1.6rem;
          font-weight:800;
        }
        h3{
          font-size:1.4rem;
        }
        .summary{
          font-size:1.1rem;
          margin-bottom:40px;
          padding: 10px;
          border-radius: 12px;
        }
      }
    }
  }
  @media (max-width:550px){
    padding: 10px 6px;
    .postContainer {
      .postDetail {
        margin-top: 15px;
        h1 {
          font-size: 1.2rem;
        }
        .name-date-feild {
          font-size: .7rem;
          margin-top:5px;
        }
        .category {
          font-size: .7rem;
        }
        .btns {
          button {
            margin: 0 5px;
            padding:2px 3px;
            font-size:.6rem;
          }
        }
      }
      .imgBox {
        height: 30vh;
        width: 100%;
        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
      .contentBox {
        width:80%;
        margin-top: 15px;
        p{
          font-size:.8rem;
          line-height:25px;
        }
        h1{
          font-size:1.2rem;
        }
        h2{
          font-size:1.2rem;
          font-weight:800;
        }
        h3{
          font-size:1.1rem;
        }
        .summary{
          font-size:.7rem;
          line-height:16px;
          margin-bottom:40px;
          padding: 10px;
          border-radius: 12px;
        }
      }
    }
  }
`;

export default ViewPost;
