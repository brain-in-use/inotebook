import React from "react";

export default function NoteItem({ note, onEdit }) {
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title flex-grow-1">{note.title}</h5>
            <i
              className="fa-regular fa-trash-can mx-3"
              onClick={() => alert("Delete functionality not shown here!")}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-3"
              onClick={onEdit} // Trigger edit handler passed as a prop
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
