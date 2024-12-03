import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function UpdateNote({ note }) { // Destructure `note` prop here
  const { updateNote } = useContext(NoteContext);
    // console.log(note);
  // Local state to manage input fields
  const [editedNote, setEditedNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  // Update local state when `note` prop changes
  useEffect(() => {
    if (note) {
      setEditedNote({
        id: note._id || "",
        title: note.title || "",
        description: note.description || "",
        tag: note.tag || "",
      });

    }
  }, [note]); // Trigger this effect whenever `note` changes

  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateNote(editedNote.id, editedNote.title, editedNote.description, editedNote.tag);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Note
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={editedNote.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={editedNote.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={editedNote.tag}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
