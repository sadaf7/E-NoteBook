import React,{useContext,useEffect,useRef,useState} from 'react'
import NoteItems from './NoteItems';
import noteContext from '../context/notecontext';
import AddNotes from './AddNotes';
import { useNavigate } from "react-router";

const Note = (props) => {
  const context = useContext(noteContext);
  const {note,getNotes,editNote} = context;
  const ref = useRef(null)
  const [notes, setNotes] = useState({id:"",etitle:"",edescription:"",etag:""})
  const refClose = useRef(null)
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  
  const updateNote =(currentNote)=>{
    ref.current.click();
    setNotes({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }
  const handleAdd=()=>{
    editNote(notes.id,notes.etitle,notes.edescription,notes.etag);
    refClose.current.click();
    props.showAlert("Note Updated","success")
  }
  const onChange =(e)=>{
    setNotes({...notes,[e.target.name]:e.target.value}) //[...notes]-initial value of notes be stay 
    // [e.target.name]:e.target.value -- add new value
}
  return (
    <>
    <AddNotes showAlert={props.showAlert}/>

    {/* <!-- Button trigger modal --> */}
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    {/* <!-- Modal --> */}
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">Title</label>
            <input onChange={onChange} value={notes.etitle} type="text" className="form-control" id="etitle" name='etitle' placeholder="Enter Title"/>
          </div>

        <form>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">Description</label>
            <textarea onChange={onChange} value={notes.edescription} placeholder="Enter Description" className="form-control" id="edescription" name='edescription' rows="3"></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="etag" className="form-label">Tag</label>
            <input type="etag"  onChange={onChange} className="form-control" id="etag" name='etag' placeholder="Enter tag"/>
          </div>
          </form>

          </div>e
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={handleAdd} className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div className='row'>
      <h1>Your Notes</h1>
      <div className='mx-1'>
        {note.length === 0 && "No Note to Show"}
      </div>
      {note.map((note)=>{
        return <NoteItems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>;
      })}
    </div>
    </div>
    </>
  )
}

export default Note
