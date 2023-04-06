import React from "react";
import "../styles/listStyle.css";
import { useState, useEffect } from "react";
const Listitem = ({ data }) => {
  const [display, setDisplay] = useState("");
  const click = () => {
    setDisplay("none");

  };
  useEffect(()=>{
    setDisplay("block")

  },[data])
  return (
    <>
      <div className="list">
        <div className="tags" style={{display:display}} onClick={click}>
          <textarea
          rows={1}
            style={{ display: data.title ? "block" : "none"  }}
            disabled
            className="show-title"
            value={data?.title}
          ></textarea>
          <textarea
            className="body"
            rows={3}
            disabled
            value={data?.body}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Listitem;
