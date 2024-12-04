import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
const host = "http://localhost:5000";
const [notes, setNotes] = useState([]);

// Fetch Notes
const getNote = async () => {
  try {
    const url1 = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NGEzMTRmZDQ4ZDM2YmE3M2YwNWY0In0sImlhdCI6MTczMjU1ODIyN30.w84TXsHpL4lsF45gR0fG3lTgkLAk6n8t4V_ei0FIKg8", // Replace with actual token
      },
    });
    const json = await response.json();
    setNotes(json); // Update state with fetched notes
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

// Add a New Note
const addNote = async (title, description, tag) => {
  try {
    const url1 = `${host}/api/notes/addnote`;
    const response = await fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NGEzMTRmZDQ4ZDM2YmE3M2YwNWY0In0sImlhdCI6MTczMjU1ODIyN30.w84TXsHpL4lsF45gR0fG3lTgkLAk6n8t4V_ei0FIKg8", // Replace with actual token
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNote = await response.json();
    setNotes(notes.concat(newNote)); // Add new note to state
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

 //Update a Note
 const updateNote = async (id, title, description, tag) => {
  //API CALL
  const url1 = host + "/api/notes/updatenote/" + id;
  const response = await fetch(url1, {
    method: "PUT",
    headers: {
      // Use headers (plural) instead of header
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NGEzMTRmZDQ4ZDM2YmE3M2YwNWY0In0sImlhdCI6MTczMjU1ODIyN30.w84TXsHpL4lsF45gR0fG3lTgkLAk6n8t4V_ei0FIKg8",
    },
    body: JSON.stringify({ title, description, tag }),
  });

  const json = response.json();

  // Optionally handle the response
  // const data = await response.json();
  // console.log(data);

  //In Client side
  let newNotes= await JSON.parse(JSON.stringify(notes));
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setNotes(newNotes);
};

// Delete a Note
const deleteNote = async (id) => {
  try {
    const url1 = `${host}/api/notes/deletenote/${id}`;
    await fetch(url1, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NGEzMTRmZDQ4ZDM2YmE3M2YwNWY0In0sImlhdCI6MTczMjU1ODIyN30.w84TXsHpL4lsF45gR0fG3lTgkLAk6n8t4V_ei0FIKg8", // Replace with actual token
      },
    });

    // Update state to exclude the deleted note
    setNotes(notes.filter((note) => note._id !== id));
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

return (
  <NoteContext.Provider
    value={{ notes, getNote, addNote, updateNote, deleteNote }}
  >
    {props.children}
  </NoteContext.Provider>
);
};

export default NoteState;
