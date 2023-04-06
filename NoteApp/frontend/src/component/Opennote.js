import React from "react";
import "../styles/Opennote.css";
import trash from "../svg/bx_trash.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Opennote = ({ match }) => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  let closeRef = useRef();
  let editTitle = useRef();
  let editBody = useRef();
  let getNote = async () => {
    let response = await fetch(`/note/${id}`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    fetch(`/note/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };
  useEffect(() => {
    getNote();
  }, [navigate]);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (closeRef.current.contains(e.target)) {
        navigate("/");
      }
    });
  }, [navigate]);
  const redirect = () => {
    updateNote();
    navigate("/");
  };

  const change = (e) => {
    if (editTitle.current.contains(e.target)) {
      setNote({ ...note, id:id,title: e.target.value });
    }
    if (editBody.current.contains(e.target)) {
      setNote({ ...note, id:id,body: e.target.value });
    }
  };

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
  }, [note]);

  let del = async () => {
    fetch(`/note/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  };

  return (
    <>
      <div className="openNote-wrapper" ref={closeRef}></div>
      <div className="openNote">
        <textarea
          className="editTitle"
          ref={editTitle}
          value={note?.title}
          placeholder={note?.title ? "" : "Title"}
          onChange={change}
          type="text"
        ></textarea>

        <textarea
          className="editNote"
          ref={editBody}
          placeholder={note?.body ? "" : "note..."}
          onChange={change}
          defaultValue={note?.body}
        ></textarea>
        <div className="operators">
          <img className="delete" onClick={del} alt="" src={trash} />
          <div className="close-note" onClick={redirect}>
            close
          </div>
        </div>
      </div>
    </>
  );
};

export default Opennote;
