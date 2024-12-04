const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const User = require('../models/User');
var fetchuser=require("../middleware/fetchuser")

//Route 1: Get All the Notes using: GET "/api/notes/fetchallnotes" .Login require
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{const notes= await Note.find({user:req.user.id});
    res.json(notes);}
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      }
})

//Route 2: Add a new note using : POST "/api/notes/addnote" .Login require
router.post('/addnote',fetchuser,[
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
], async (req,res)=>{

    const{title,description,tag}=req.body;

    const errors = validationResult(req);

    try {
      // Check whether user with the same email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: 'Sorry, a user with the same email already exists.' });
      }

      const note=new Note({
        title,description,tag,user:req.user.id
      });
      const savedNote=await note.save();
      res.json(savedNote);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }

    
    
})

// Route 3: Update an existing note using: PUT "/api/notes/updatenote/:id" . Login required
router.put(
  '/updatenote/:id',
  fetchuser,
  [
    body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    // If there are validation errors, return them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new note object
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      // Find the note to be updated
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send('Note Not Found');
      }

      // Ensure the user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Not Allowed');
      }

      // Update the note
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);


//Route 4: Delete a note using : DELETE "/api/notes/deletenote/:id" .Login require
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{

try {
    //Find the note to be deleted
    let note= await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    
    //Allow only when ehe user owns the note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    
    note= await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note})
    
} catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
}
)



module.exports=router;