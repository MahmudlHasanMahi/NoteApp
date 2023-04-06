import React from "react";
import "../styles/headers.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [display, setDisplay] = useState(false);
  const [details, setDetails] = useState({ title: "", body: "" });
  let noteRef = useRef();
  let closeRef = useRef();
  let editTitle = useRef();
  let editBody = useRef();
  let navigate = useNavigate();
  const unfold = (e) => {
    if (
      (editBody.current.value === "" && editTitle.current.value === "") ||
      (editBody.current.value === " " && editTitle.current.value === " ")
    ) {
      setDisplay(false);
    } else {
      newNote();
      navigate("/");
      editBody.current.value = "";
      editTitle.current.value = "";

      setDisplay(false);
    }
  };

  let newNote = async () => {
    fetch("/note/createNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!noteRef.current.contains(e.target)) {
      }
      if (editBody.current.contains(e.target)) {
        setDisplay(true);

        // console.log(display);
      }
      if (closeRef.current.contains(e.target)) {
        setDisplay("none");
      }
    });
  }, [display]);

  useEffect(() => {
    if (editBody && editBody.current) {
      editBody.current.style.height = "0px";
      const taHeight = editBody.current.scrollHeight;
      editBody.current.style.height = taHeight + "px";
    }
    if (editTitle && editTitle.current) {
      editTitle.current.style.height = "0px";
      const taHeight = editTitle.current.scrollHeight;
      editTitle.current.style.height = taHeight + "px";
    }
  }, [details]);
  const change = (e) => {
    if (editTitle.current.contains(e.target)) {
      setDetails({ ...details, title: e.target.value });
    }
    if (editBody.current.contains(e.target)) {
      setDetails({ ...details, body: e.target.value });
    }
  };
  return (
    <div className="header-wrapper">
      <div className="note-wrapper" ref={noteRef}>
        <textarea
          ref={editTitle}
          className="title"
          contentEditable
          placeholder="Title"
          onChange={change}
          style={{
            display: display ? "block" : "none",
          }}
        ></textarea>
        <textarea
          ref={editBody}
          onChange={change}
          className="takeNote"
          contentEditable
          placeholder="Take a  note..."
        ></textarea>
        <div className="close-wrapper">
          <div
            className="close"
            style={{
              display: display ? "block" : "none",
            }}
            ref={closeRef}
            onClick={unfold}
          >
            close
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
