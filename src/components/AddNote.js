import React,{useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext'
export default function AddNote(props){
    const {addNote} =useContext(NoteContext);
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handleSubmit=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
        setNote(
            {...note,
                [e.target.name]:e.target.value
            }
        )
    }
    return(
        <div className="container my-3">
      <h2>Add Your Note</h2>
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
    </div>
    )
}