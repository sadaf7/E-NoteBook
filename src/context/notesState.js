import React,{useState} from 'react'
import NoteContext from './notecontext'

const NoteState=(props)=>{

  const host = "http://localhost:4000";
    const notesInitial = []
    const [note, setNote] = useState(notesInitial)

    // get all notes
    const getNotes=async ()=>{
      // API call
      const response = await fetch(`${host}/api/notes/getNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
    
        body: JSON.stringify(), // body data type must match "Content-Type" header
      });
      const json =await response.json(); // parses JSON response into native JavaScript objects
      setNote(json);
    }

    //   adding notes
    const addNotes=async (title,description,tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/addNotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
      
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json =await response.json(); // parses JSON response into native JavaScript objects

        setNote(note.concat(json))
    }

    // deleting notes
    const deleteNote= async (id)=>{
         // API call
         const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
      
          body: JSON.stringify(), // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
      
        console.log(json)

        const newNote = note.filter((notes)=>{return notes._id !== id})
        setNote(newNote)
    }

    // updating existing notes
    const editNote=async (id,title,description,tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
      
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
      

        let newNotes = JSON.parse(JSON.stringify(note)); // new copy of note will be created
        // logic for cliend side
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title
            newNotes[index].description = description
            newNotes[index].tag = tag
            break;
          }
        }
        setNote(newNotes);
    }
    return (
    <NoteContext.Provider value={{note,setNote,addNotes,deleteNote,editNote,getNotes}}>
       {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;