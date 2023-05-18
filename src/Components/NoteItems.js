import React,{useContext} from 'react'
import noteContext from '../context/notecontext';

import {
  Link
} from "react-router-dom";
const NoteItems = (props) => {

    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote,showAlert} = props;

  return (
    <div className='col-md-3 my-2'>
      <div className="card">
  <div className="card-body">
    <div className="d-flex">
    <h5 className="card-title">{note.title}</h5>
    {/* <i className="fa-sharp fa-solid fa-pen-to-square mx-1 my-1" onClick={()=>{updateNote(note)}}></i> */}
    <Link style={{color:'grey'}} className='mx-1 ed' onClick={()=>{updateNote(note)}}>Edit</Link>
    {/* <i className="fa-sharp fa-solid fa-trash mx-1 my-1" onClick={()=>{deleteNote(note._id)}}></i> */}
    <Link style={{color:'grey'}} className='mx-1 ed' onClick={()=>{deleteNote(note._id);showAlert("Note Deleted","success")}}>Delete</Link>
    </div>
    <p className="card-text">{note.description}.</p>
  </div>
</div>
    </div>
  )
}

export default NoteItems
