const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Note");
const { body, validationResult } = require('express-validator');
const { set } = require("mongoose");
const router = express.Router();


// ROUTE: 1 -- Fetching all the notes from user using GET req
router.get('/getNotes',fetchuser,async (req,res)=>{
    try {       
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(401).send({error:"Some internal server error"})
    }
})

// ROUTE: 2 -- Adding notes using POST req
router.post('/addNotes',fetchuser,[
    body('title','enter a valid title'),
    body('description','enter a valid description'),
    body('tag','enter a valid tag')
],async (req,res)=>{
    // data validation if there is error or emtpty string throw error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // saving notes
    const {title,description,tag} = req.body;
    const notes = new Notes({
        title,
        description,
        tag,
        user:req.user.id
    })
    const savedNotes = await notes.save();
    res.json(savedNotes);
})

// ROUTE: 2--updating the existing note using PUT req
router.put('/updateNotes/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;
    // creating new notes obj
    const newNotes = {}
    try {
        if(title){newNotes.title = title}
    if(description){newNotes.description = description}
    if(tag){newNotes.tag = tag}

    // find the notes that needs to update and update it
    let notes = await Notes.findById(req.params.id) // req.params.id==/updateNotes:id(this id)
    if(!notes){
        return res.status(401).send({error:"Notes not found"})
    }
    // comparing notes id with user id
    if(notes.user.toString() != req.user.id){
        return res.status(401).send({error:"Notes not found"})
    }
    // updating the notes
    notes = await Notes.findByIdAndUpdate(req.params.id, {$set:newNotes},{new:true}) //$set:newNote-add notes to newNote obj //new:true--if new note added it will be created
    res.json(notes);
    } catch (error) {
        res.status(401).send({error:"Some internal server error"})
    }

})

// ROUTE 3: Deleting notes using POST req
router.delete('/deleteNotes/:id',fetchuser,async (req,res)=>{

    //  find the notes to be deleted
    let notes = await Notes.findById(req.params.id);
    if(!notes){
        res.status(401).send({error:"Notes not found"})
    }
    // comparing notes id with user id
    if(notes.user.toString() != req.user.id){
        res.status(401).send({error:"Notes not found"})
    }
    // deleting notes
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted successfully"})
})
     
module.exports = router;