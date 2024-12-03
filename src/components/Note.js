import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import UpdateNote from "./UpdateNote";

export default function Note() {
  const context = useContext(NoteContext);
  const { notes, getNote } = context;

  // State for the note being edited
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      await getNote(); // Fetch notes from the server
    };
    fetchNotes();
    // eslint-disable-next-line
  }, []); // Ensure this runs only once

  // Show the modal after `currentNote` is set
  useEffect(() => {
    if (currentNote) {
      const modalElement = document.getElementById("exampleModal");
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }, [currentNote]); // Triggered whenever `currentNote` changes

  const openUpdateModal = (note) => {
    setCurrentNote(note); // Set the selected note
  };

  return (
    <>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 ? (
          <p>No notes to display!</p>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              onEdit={() => openUpdateModal(note)} // Pass edit handler as a prop
            />
          ))
        )}
      </div>

      {/* Update Note Modal */}
      {currentNote && <UpdateNote note={currentNote} />}
    </>
  );
}
