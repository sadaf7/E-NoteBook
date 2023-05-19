import ProfileContext from "./profileContext";
import React,{useState} from 'react'


const ProfileState = (props)=>{

    
    const data=[
        {
            "_id": "64632494ed5dd54e04a6a526",
            "name": "jhon2",
            "email": "jhon2@gmail.com",
            "date": "2023-05-16T06:37:08.081Z",
            "__v": 0
          }
        ]
    const [info, setInfo] = useState(data)
    
    return(
        <ProfileContext.Provider value={{info}}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export default ProfileState;