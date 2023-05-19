import React,{useContext} from 'react'
import profileContext from '../context/profileContext'
import ProfileItem from './ProfileItem';

const About = () => {

  const context = useContext(profileContext)
  const {info} = context;
  return (
    <div>
          <div className="card">
      <div className="card-header bg-dark text-light">
        About E-NoteBook
      </div>
      <div className="card-body">
        <p>This a note book where users can create, update and delete their notes.</p>
        <p>And they can save their notes to cloud.</p>
        
      </div>
       
    </div>
    <div className="container">
      {info.map((info)=>{
        return  <ProfileItem info={info} key={info._id}/>
        
      })}
    </div>
    </div>
  )
}

export default About
