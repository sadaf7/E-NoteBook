import React,{useState,useContext} from 'react'
import noteContext from '../context/notecontext'

const AddNotes = (props) => {

    const context = useContext(noteContext)
    const {addNotes} = context;
    const [notes, setNotes] = useState({title:"",description:"",tag:""})

    const handleAdd =()=>{
        addNotes(notes.title,notes.description,notes.tag);
        setNotes({title:"",description:"",tag:""})    
        props.showAlert("Note Added","success")
    }
    const onChange =(e)=>{
        setNotes({...notes,[e.target.name]:e.target.value}) //[...notes]-initial value of notes be stay 
        // [e.target.name]:e.target.value -- add new value
    }
  return (
    <div className='container mt-4 text-white' style={{backgroundColor:"#5e5c55"}} >

    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title</label>
      <input onChange={onChange} value={notes.title}type="title" className="form-control" id="title" name='title' placeholder="Enter Title"/>
    </div>

    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea onChange={onChange} value={notes.description}placeholder="Enter Description" className="form-control" id="description" name='description' rows="3"></textarea>
    </div>

    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="tag" onChange={onChange} value={notes.tag}className="form-control" id="tag" name='tag' placeholder="Enter tag"/>
    </div>

    <button type="button" onClick={handleAdd} className="btn btn-primary mb-2">Add Note</button>
    </div>
  )
}

export default AddNotes
