import React, { useContext, useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPostRoute } from "../utills/APIroutes";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { UserContext } from "../../userContext";
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const {userInfo} = useContext(UserContext)
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  if(!userInfo.id){
    navigate('/login')
  }

  // Validations
  const [validTitle, setValidTitle] = useState(null);
  const [validSummary, setValidSummary] = useState(null);
  const [titleLength, setTitleLength] = useState(0);
  const [summaryLength, setSummaryLength] = useState(0);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
  };

  const validatInput = () => {
    if (title.length < 50 || title.length > 150) {
      toast.error("Title length: max 120 & min 50", toastOptions);
    } else if (summary.length < 150 || summary.length > 400) {
      toast.error("Summary length: max 400 & min 150", toastOptions);
    } else if (!files[0]) {
      toast.error("File is Needed", toastOptions);
    } else if (category === null) {
      toast.error("Please Select A Category", toastOptions);
    } else {
      return true;
    }
  };

  const createNewPost = async (e) => {
    e.preventDefault();
    if (validatInput() === true) {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("file", files[0]);
      data.set("category", category);
      console.log("Files is :", files[0]);
      const res = await axios.post(createPostRoute, data, {
        withCredentials: true,
      });
      if (res.data.success !== false) {
        toast.success(res.data.msg, toastOptions);
        navigate("/");
      } else {
        toast.error(res.data.msg, toastOptions);
      }
    }
  };

  return (
    <Container>
      <div className="section1">
        <h1>Create A Blog.</h1>
        <form>
          <span
            className={` ${validTitle ? "validlength" : ""} ${
              validTitle === false ? "invalidlength" : ""
            } `}
          >
            Title Length Cound : {titleLength}
          </span>
          <textarea
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length < 50 || e.target.value.length > 150) {
                setValidTitle(false);
              } else {
                setValidTitle(true);
              }
              setTitle(e.target.value);
              setTitleLength(e.target.value.length);
            }}
            placeholder="Title of Blog : min 50 words and max 150 words required"
            className={`summaryText ${validTitle ? "validInput" : ""} ${
              validTitle === false ? "invalidInput" : ""
            }`}
            rows="4"
            cols="50"
          />

          <br />
          <span
            className={` ${validSummary ? "validlength" : ""} ${
              validSummary === false ? "invalidlength" : ""
            }  `}
          >
            Summary length Count : {summaryLength}
          </span>
          <textarea
            type="text"
            value={summary}
            onChange={(e) => {
              if (e.target.value.length < 150 || e.target.value.length > 400) {
                setValidSummary(false);
              } else {
                setValidSummary(true);
              }
              setSummary(e.target.value);
              setSummaryLength(e.target.value.length);
            }}
            placeholder="Summary : min 150 words and max 450 words required"
            rows="6"
            cols="50"
            className={`summaryText ${validSummary ? "validInput" : ""} ${
              validSummary === false ? "invalidInput" : ""
            }`}
          />
          <input
            type="file"
            onChange={(ev) => {
              setFiles(ev.target.files);
            }}
            className="fileInput"
          />

          <div className="selectBar">
            <label htmlFor="category">Select The Category of Blog: </label>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select</option>
              <option value="Science">Science</option>
              <option value="Politics">Politics</option>
              <option value="Fiction">Fiction</option>
              <option value="Astronomy">Astronomy</option>
              <option value="Geography">Geography</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="History">History</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
            </select>
          </div>
        </form>
      </div>

      <div className="section2">
        <ReactQuill
          value={content}
          modules={modules}
          onChange={(newValue) => setContent(newValue)}
          formats={formats}
          className="quill"
        />
      </div>
      <Button variant="contained" onClick={createNewPost}>
        Create Post
      </Button>
    </Container>
  );
};

const Container = styled.div`
  min-height: 90vh;
  width: 100%;
  padding-top:60px !important;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 45% 55%;
  .section1 {
    height: 100%;
    h1 {
      font-size: 2.2rem;
      margin-bottom: 15px;
      padding: 8px 12px;
      background: #007bff;
      border-radius: 8px;
      color: #fff;
      width: 60%;
      margin: 30px auto;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      width: 80%;
      margin: 15px 20px;

      input {
        padding: 5px 10px;
        font-size: 1.1em;
        outline: none;
        border: 1px solid #000;
        background: transparent;
      }
      .fileInput {
        border: none;
        display: inline-block;
      }
      .fileInput#file-upload-button {
        border-bottom: none;
        display: inline-block;
        background: red !important;
      }
      .summaryText {
        font-size: 1.1em;
        padding: 8px 12px;
        outline: none;
      }
      .validInput {
        border: 2px solid #00e400 !important;
      }
      .invalidInput {
        border: 2px solid #ff1b1b !important;
      }
      .validlength {
        color: #00e400;
      }
      .invalidlength {
        color: #ff1b1b;
      }
    }
  }
  .section2 {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-left: 1px solid #000;
    .quill {
      min-height: 50vh;
      width: 80%;
    }
  }

  button {
    width: 40%;
    margin: 0 auto;
  }

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    .section1 {
      height: 100%;
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h1 {
        font-size: 2rem;
        margin-bottom: 15px;
        padding: 5px 8px;
        width: 50%;
      }

      form {
        margin: 15px 0px;
        input {
          padding: 5px 10px;
          font-size: 1.1em;
        }
        .summaryText {
          font-size: 1.1em;
          padding: 8px 12px;
          outline: none;
        }
      }
    }
    .section2 {
      border-left: none;
      .quill {
        min-height: 100px;
        width: 85%;

        .ql-toolbar {
          .ql-formats {
            .ql-font {
              margin-top: 14px;
            }
          }
        }
      }
    }

    button {
      margin: 18px 0;
    }
  }
  @media (max-width: 650px) {
    justify-content: normal;
    .section1 {
      padding-bottom: 20px;
      h1 {
        font-size: 1.5rem;
        margin-bottom: 15px;
        padding: 5px 8px;
      }
      form {
        width: 400px;
        input {
          padding: 5px 10px;
          font-size: 0.8em;
        }
        .summaryText {
          font-size: 0.8em;
          padding: 8px 12px;
        }
      }
    }
    .section2 {
      border-left: none;
      .quill {
        width: 85%;
        .ql-container {
          min-height: 100px;
        }
      }
    }

    button {
      margin: 18px 0;
    }
  }
  @media (max-width: 490px) {
    width: 100%;
    .section1 {
      h1 {
        font-size: 1.3rem;
      }
      form {
        width: 300px;
        input {
          padding: 5px 10px;
          font-size: 0.7em;
        }
        .summaryText {
          font-size: 0.7em;
          padding: 8px 12px;
        }
      }
    }
    .section2 {
      width: 90% !important;
      .quill {
        min-height: 100px;
        width: 100%;

        .ql-toolbar {
          .ql-formats {
            .ql-font {
              margin-top: 0px;
            }
            button {
              margin: 0 0 !important;
            }
          }
        }
      }
    }

    button {
      margin: 18px 0;
    }
  }
`;

export default CreatePost;
