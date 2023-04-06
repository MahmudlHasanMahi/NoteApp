import React from "react";
import { useState, useEffect } from "react";
import Listitem from "./Listitem";
import "../styles/listStyle.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Lists = () => {
  const location = useLocation();

  let [notes, setNotes] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getNote();
    }, 40);
  }, [location]);

  let getNote = async () => {
    let response = await fetch("note/");
    let data = await response.json();

    setNotes(data);
  };
  return (
    <div className="list-container">
      {notes.map((data, id) => (
        <Link to={`note/${data.id}`} className="link">
          <Listitem key={id} data={data} />
        </Link>
      ))}
    </div>
  );
};

export default Lists;
