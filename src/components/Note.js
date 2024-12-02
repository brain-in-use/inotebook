import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

export default function Note() {
  const context = useContext(NoteContext);
  const { notes, getNote } = context;

  useEffect(() => {
    const fetchNotes = async () => {
      await getNote(); // Fetch notes from the server
    };
    fetchNotes();
    // eslint-disable-next-line
  }, []); // Ensure this runs only once

  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes to display!</p>
      ) : (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      )}
    </div>
  );
}
