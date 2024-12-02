import { useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
    // Fetch Notes on Component Mount
    const getNote = async () => {
      const url1 = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url1, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NGEzMTRmZDQ4ZDM2YmE3M2YwNWY0In0sImlhdCI6MTczMjU1ODIyN30.w84TXsHpL4lsF45gR0fG3lTgkLAk6n8t4V_ei0FIKg8",
        },
      });
      const json = await response.json(); // Resolve the Promise
      setNotes(json); // Update the notes state with resolved data
    //  console.log(json);
    };
    




  //Add a new Note
  const addNote = async(title, description, tag) => {

    //API CALL
    const url1 = host + "/api/notes/addnote";
    const response = await fetch(url1, {
      method: "POST",
      headers: {
        // Use `headers` (plural) instead of `header`
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NGEzMTRmZDQ4ZDM2YmE3M2YwNWY0In0sImlhdCI6MTczMjU1ODIyN30.w84TXsHpL4lsF45gR0fG3lTgkLAk6n8t4V_ei0FIKg8'
      },
      body: JSON.stringify({title,description,tag}),
    });


    const note = {
      _id: "6745fd812dad9147f3bdgdfc8a",
      user: "6744a314fd48d36ba73f05f4",
      title: title,
      description: description,
      tag: tag,
      date: "2024-11-26T16:55:29.804Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Update a Note
  const updateNote = async (id, title, description, tag) => {
    //API CALL
    const url1 = host + "/api/notes/updatenote/" + id;
    const response = await fetch(url1, {
      method: "POST",
      headers: {
        // Use `headers` (plural) instead of `header`
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NGEzMTRmZDQ4ZDM2YmE3M2YwNWY0In0sImlhdCI6MTczMjU1ODIyN30.w84TXsHpL4lsF45gR0fG3lTgkLAk6n8t4V_ei0FIKg8'
      },
      body: JSON.stringify({title,description,tag}),
    });

    const json=response.json();

    // Optionally handle the response
    // const data = await response.json();
    // console.log(data);

    //In Client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  //Delete a Note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, getNote,addNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
